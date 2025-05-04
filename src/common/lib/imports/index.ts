import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheetWrapper, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";


const BottomSheet = {
  Wrapper: BottomSheetWrapper,
  View: BottomSheetView,
  ScrollView: BottomSheetScrollView,
  Backdrop: BottomSheetBackdrop,
};

export { AsyncStorage as storage, BottomSheet, BottomSheetBackdropProps };
