import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Routes from "./src/routes";
import { Provider } from "react-redux";
import { store } from "./src/calories/store/index";
import Toast from "react-native-toast-message";
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <Routes />
          <Toast />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
