import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheetWrapper, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";


const BottomSheet = {
  Wrapper: BottomSheetWrapper,
  View: BottomSheetView,
  Backdrop: BottomSheetBackdrop,
};

export { AsyncStorage as storage, BottomSheet, BottomSheetBackdropProps };
