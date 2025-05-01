import EstimateScreen from "@/src/features/estimate/EstimateScreen";
import NewEstimateScreen from "@/src/features/estimate/newEstimate/EstimateScreen";
import { Platform } from "react-native";

export default function Index() {
  return Platform.OS === "web" ? <EstimateScreen /> : <NewEstimateScreen />;
}
