const { db }  = require("../Backend/firebaseConfige")
const { ref, onValue} = require("firebase/database")


const washingMachineRef = ref(db, "washingMachine");


onValue(washingMachineRef, (snapshot) => {
    console.log("snapshot",snapshot)
  const data = snapshot.val();

  if (!data) {
    console.log("No washing machine data.");
    return;
  }

  console.log("Current Washing Machine State:", data);

  
  if (data.status === "Running") {
    console.log(">>> Relay ON - Motor Started");
  } else if (data.status === "Stopped") {
    console.log(">>> Relay OFF - Motor Stopped");
  }

  // More simulation based on process
  switch (data.process) {
    case "Wash":
      console.log(">>> Washing cycle active");
      break;
    case "Rinse":
      console.log(">>> Rinsing cycle active");
      break;
    case "Spin":
      console.log(">>> Spinning cycle active");
      break;
    default:
      console.log(">>> Idle cycle");
  }
});