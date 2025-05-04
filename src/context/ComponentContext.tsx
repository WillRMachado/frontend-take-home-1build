import React, { createContext, useState, useRef } from "react";
import BottomSheetWrapper from "@gorhom/bottom-sheet";

interface ComponentContextType {
  bottomSheetRef: React.RefObject<BottomSheetWrapper> | null;
  bottomSheetChild: React.ReactNode | null;
  setBottomSheetChild: (component: React.ReactNode) => void;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
  isBottomSheetOpen: boolean;
}

export const ComponentContext = createContext<ComponentContextType | undefined>(
  undefined
);

export const ComponentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const bottomSheetRef = useRef<BottomSheetWrapper>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [bottomSheetChild, setBottomSheetChild] =
    useState<React.ReactNode | null>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setBottomSheetChild(null);
    setIsBottomSheetOpen(false);
  };

  const value = {
    bottomSheetRef,
    bottomSheetChild,
    setBottomSheetChild,
    openBottomSheet,
    closeBottomSheet,
    isBottomSheetOpen,
  };

  return (
    <ComponentContext.Provider value={value}>
      {children}
    </ComponentContext.Provider>
  );
};
