import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { database } from "../firebaseConfig";
import { ref, set, onValue, update, get } from "firebase/database";

export default function Home() {
  const [waterLevel, setWaterLevel] = useState("Medium");
  const [mode, setMode] = useState("Normal");
  const [washingProcess, setWashingProcess] = useState("Wash");

  const [time, setTime] = useState("00:00");
  const [status, setStatus] = useState("Idle");
  const [isStarted, setIsStarted] = useState(false);

  const PROCESS_TIME_MAP = {
    1: 1800, // Wash → 30 min
    2: 2700, // Rinse → 45 min
    3: 600, // Spin → 10 min
  };

  useEffect(() => {
    const washingRef = ref(database, "washingMachine");

    const unsubscribe = onValue(washingRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) return;

      console.log("Realtime Data:", data);

      if (data.status === 1) {
        setStatus("Running");
        setIsStarted(true);
        setTime(formatTime(data.time || 0));
      } else {
        setStatus("Stopped");
        setIsStarted(false);
        setTime("00:00");
      }

      const waterMap = {
        1: "Low",
        2: "Medium",
        3: "High",
      };
      setWaterLevel(waterMap[data.water] || "Medium");

      const modeMap = {
        1: "Delicate",
        2: "Normal",
        3: "Heavy",
      };
      setMode(modeMap[data.mode] || "Normal");

      const processMap = {
        1: "Wash",
        2: "Rinse",
        3: "Spin",
      };
      setWashingProcess(processMap[data.process] || "Wash");
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let interval;

    if (isStarted) {
      interval = setInterval(async () => {
        const timeRef = ref(database, "washingMachine/time");

        const snapshot = await get(timeRef);
        const currentTime = snapshot.val();

        if (currentTime <= 0) {
          clearInterval(interval);

          await update(ref(database, "washingMachine"), {
            status: 0,
            time: 0,
          });

          return;
        }

        await update(ref(database, "washingMachine"), {
          time: currentTime - 1,
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isStarted]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TIME ABOVE */}
      <Text style={styles.title}>IoT Washing Machine</Text>
      <Text style={styles.timeText}>{time}</Text>

      <View style={styles.card}>
        <Text style={styles.logo}>≋≋≋</Text>
        <Text style={styles.stageText}>Current Stage</Text>
        <Text style={styles.readyText}>
          {status === "Running" ? washingProcess : "Ready"}
        </Text>

        <View style={styles.row}>
          <Text style={styles.info}>Water: {waterLevel}</Text>
          <Text style={styles.info}>Mode: {mode}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.info}>Process: {washingProcess}</Text>
          <Text style={styles.info}>Status: {status}</Text>
        </View>
      </View>

      {/* OPTIONS ABOVE */}
      <Text style={styles.sectionTitle}>Water Level</Text>
      <View style={styles.row}>
        {["Low", "Medium", "High"].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.optionBtn,
              waterLevel === level && styles.activeBtn,
              isStarted && { opacity: 0.5 },
            ]}
            onPress={() => {
              setWaterLevel(level);

              let levelNumber = 0;

              if (level === "Low") levelNumber = 1;
              if (level === "Medium") levelNumber = 2;
              if (level === "High") levelNumber = 3;

              update(ref(database, "washingMachine"), {
                water: levelNumber,
              });
            }}
            disabled={isStarted}
          >
            <Text style={styles.optionText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Mode</Text>
      <View style={styles.row}>
        {["Delicate", "Normal", "Heavy"].map((m) => (
          <TouchableOpacity
            key={m}
            style={[
              styles.optionBtn,
              mode === m && styles.activeBtn,
              isStarted && { opacity: 0.5 },
            ]}
            onPress={() => {
              setMode(m);

              let modeNumber = 0;

              if (m === "Delicate") modeNumber = 1;
              if (m === "Normal") modeNumber = 2;
              if (m === "Heavy") modeNumber = 3;

              update(ref(database, "washingMachine"), {
                mode: modeNumber,
              });
            }}
            disabled={isStarted}
          >
            <Text style={styles.optionText}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Washing Process</Text>
      <View style={styles.row}>
        {["Wash", "Rinse", "Spin"].map((m) => (
          <TouchableOpacity
            key={m}
            style={[
              styles.optionBtn,
              washingProcess === m && styles.activeBtn,
              isStarted && { opacity: 0.5 },
            ]}
            onPress={() => {
              setWashingProcess(m);

              let processNumber = 0;

              if (m === "Wash") processNumber = 1;
              if (m === "Rinse") processNumber = 2;
              if (m === "Spin") processNumber = 3;

              const time = PROCESS_TIME_MAP[processNumber];

              update(ref(database, "washingMachine"), {
                process: processNumber,
                time: time,
              });
            }}
            disabled={isStarted}
          >
            <Text style={styles.optionText}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => {
            update(ref(database, "washingMachine"), {
              status: 1,
            });
          }}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.stopBtn}
          onPress={() => {
            update(ref(database, "washingMachine"), {
              status: 0,
            });
          }}
        >
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resetBtn}
          onPress={async () => {
            await update(ref(database, "washingMachine"), {
              status: 0,
              time: 0,
              process: 1,
              water: 2,
              mode: 2,
            });
          }}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f2027",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  title: {
    fontSize: 24,
    color: "#00e0ff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  timeText: {
    color: "#00e0ff",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 15,
  },
  logo: {
    fontSize: 60,
    textAlign: "center",
    color: "#00E5FF",
    // marginBottom: 5,
  },
  card: {
    backgroundColor: "#1c2b36",
    padding: 15,
    borderRadius: 15,
    marginVertical: 15,
  },
  resetBtn: {
    backgroundColor: "#ffaa00",
    padding: 12,
    borderRadius: 10,
    width: 120,
    alignItems: "center",
  },
  stageText: {
    color: "#aaa",
    textAlign: "center",
  },
  readyText: {
    color: "#00e0ff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  info: {
    color: "#fff",
    marginVertical: 5,
  },
  sectionTitle: {
    color: "#00e0ff",
    fontSize: 16,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
  },
  optionBtn: {
    backgroundColor: "#1c2b36",
    padding: 10,
    borderRadius: 10,
  },
  activeBtn: {
    backgroundColor: "#00e0ff",
  },
  optionText: {
    color: "#fff",
  },
  startBtn: {
    backgroundColor: "#00e0ff",
    padding: 12,
    borderRadius: 10,
    width: 120,
    alignItems: "center",
  },
  stopBtn: {
    backgroundColor: "#ff4d4d",
    padding: 12,
    borderRadius: 10,
    width: 120,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
});
