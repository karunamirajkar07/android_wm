import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { database } from "../firebaseConfig";
import { ref, set , onValue } from "firebase/database";

export default function Home() {
  const [waterLevel, setWaterLevel] = useState("Medium");
  const [mode, setMode] = useState("Normal");
  const [washingProcess, setWashingProcess] = useState("Wash");

  const [time, setTime] = useState("00:00");
  const [status, setStatus] = useState("Idle");
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
  const washingRef = ref(database, "washingMachine");

  onValue(washingRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
      console.log("Firebase Data:", data);

      if (data.status === 1) {
        setStatus("Running");
        setIsStarted(true);
        setTime("30:00");
      }else{
        setStatus("Stopped");
        setIsStarted(false);
        setTime("00:00");
      }

      if (data.water === 1) setWaterLevel("Low");
      if (data.water === 2) setWaterLevel("Medium");
      if (data.water === 3) setWaterLevel("High");
      if (data.mode === 1) setMode("Delicate");
      if (data.mode === 2) setMode("Normal");
      if (data.mode === 3) setMode("Heavy");
      if (data.process === 1) setWashingProcess("Wash");
      if (data.process === 2) setWashingProcess("Rinse");
      if (data.process === 3) setWashingProcess("Spin");

    }
  });
}, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* TIME ABOVE */}
      <Text style={styles.title}>IoT Washing Machine</Text>
      <Text style={styles.timeText}>{time}</Text>


      <View style={styles.card}>
        <Text style={styles.logo}>≋≋≋</Text>
        <Text style={styles.stageText}>Current Stage</Text>
        <Text style={styles.readyText}>Ready</Text>

        <View style={styles.row}>
          <Text style={styles.info}>Water: {waterLevel}</Text>
          <Text style={styles.info}>Mode: {mode}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.info}>Status: {status}</Text>
          <Text style={styles.info}>Process: {washingProcess}</Text>
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
              setWaterLevel(level)

              let levelNumber = 0;

              if(level === "Low") levelNumber = 1;
              if(level === "Medium") levelNumber = 2;
              if(level === "High") levelNumber = 3; 

              set(ref(database, "washingMachine/water"), levelNumber)
            }
            }
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
              setMode(m)
              
              let modeNumber = 0;

              if (m === "Delicate") modeNumber = 1;
              if (m === "Normal") modeNumber = 2;
              if (m === "Heavy") modeNumber = 3;
              set(ref(database, "washingMachine/mode"), modeNumber)
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
              setWashingProcess(m)

              let processNumber = 0;

              if(m === "Wash") processNumber = 1;
              if(m === "Rinse") processNumber = 2;
              if(m === "Spin") processNumber = 3;
              set(ref(database, "washingMachine/process"), processNumber)
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
            setStatus("Running");
            setTime("30:00");
            setIsStarted(true);
            set(ref(database, "washingMachine/status"), 1)
          }}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.stopBtn}
          onPress={() => {
            setStatus("Stopped");
            setTime("00:00");
            setIsStarted(false);
            set(ref(database, "washingMachine/status"), 0)
          }}
        >
          <Text style={styles.buttonText}>Stop</Text>
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