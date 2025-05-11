import { useState } from "react";

type UseButtonProps = {
  disabled?: boolean;
};

type UseButtonReturn = {
  isHovered: boolean;
  isPressed: boolean;
  handleHoverIn: () => void;
  handleHoverOut: () => void;
  handlePressIn: () => void;
  handlePressOut: () => void;
};

export const useButton = ({ disabled = false }: UseButtonProps = {}): UseButtonReturn => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleHoverIn = () => {
    if (!disabled) {
      setIsHovered(true);
    }
  };

  const handleHoverOut = () => {
    if (!disabled) {
      setIsHovered(false);
    }
  };

  const handlePressIn = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      setIsPressed(false);
    }
  };

  return {
    isHovered,
    isPressed,
    handleHoverIn,
    handleHoverOut,
    handlePressIn,
    handlePressOut,
  };
}; 