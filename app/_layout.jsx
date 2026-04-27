import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {Provider} from "react-redux"
import { store ,persistor  } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  return (
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}