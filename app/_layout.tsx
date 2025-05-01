import { Stack } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { EstimateProvider } from "@/src/features/estimate/context";
import { ThemeProvider } from "@/src/context/ThemeContext";

export default function RootLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider>
				<EstimateProvider>
					<Stack />
				</EstimateProvider>
			</ThemeProvider>
		</GestureHandlerRootView>
	)
}
