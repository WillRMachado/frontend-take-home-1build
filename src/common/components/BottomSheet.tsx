import { TrueSheet, TrueSheetProps } from "@lodev09/react-native-true-sheet"
import { forwardRef } from "react"

export type BottomSheet = TrueSheet

export const BottomSheet = forwardRef<TrueSheet, TrueSheetProps>(
	function BottomSheet(props, ref) {
		return <TrueSheet ref={ref} {...props} />
	}
)
