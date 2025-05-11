import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheetWrapper, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";
import uuid from 'react-native-uuid';

const BottomSheet = {
  Wrapper: BottomSheetWrapper,
  View: BottomSheetView,
  ScrollView: BottomSheetScrollView,
  Backdrop: BottomSheetBackdrop,
};

export {
  AsyncStorage as storage,
  BottomSheet,
  BottomSheetBackdropProps,
  Toast,
  RootSiblingParent as ToastProvider,
  uuid,
};
