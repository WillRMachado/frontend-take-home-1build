import EstimateScreen from "@/src/features/estimate/EstimateScreen";
import NewEstimateScreen from "@/src/features/estimate/newEstimate/EstimateScreen";
import { Platform, View, Text } from "react-native";

export default function Index() {
  console.log("🚀 ~ Index ~ Platform:", Platform.OS);
  if (Platform.OS === "web") {
    // return <EstimateScreen />;
  }

  return <NewEstimateScreen />;
}
