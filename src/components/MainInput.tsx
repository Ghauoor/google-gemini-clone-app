import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from "react-native";
import colors from "../../colors";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SendHorizonal } from "lucide-react-native";

interface MainInputProps extends TextInputProps {
  isLoading?: boolean;
  disabled?: boolean;
  hasPrompt: boolean;
  onComplete: () => void;
}

const WIDTH = Dimensions.get("window").width;

const MainInput = ({
  isLoading,
  onComplete,
  disabled,
  hasPrompt,
  ...props
}: MainInputProps) => {
  const prevHasPrompt = useRef(false);
  const translateYValue = useSharedValue(0);
  const withInput = useSharedValue(WIDTH - 50);

  useLayoutEffect(() => {
    translateYValue.value = withTiming(1, {
      duration: 600,
    });
    withInput.value = WIDTH - 50;
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          translateYValue.value,
          [0, 1, 2],
          [100, 0, 100]
        ),
      },
    ],
  }));

  const buttonStyled = useAnimatedStyle(() => ({
    bottom: interpolate(translateYValue.value, [0, 1, 2], [-48, -48, 70]),
  }));

  const handleCompletPrompt = useCallback(() => {
    Keyboard.dismiss();
    onComplete();
  }, [onComplete]);

  const handleFocusInput = useCallback(() => {
    if (translateYValue.value > 1) {
      translateYValue.value = withTiming(1, {
        duration: 600,
      });
    }
  }, [translateYValue]);

  const handleBlurInput = useCallback(() => {
    if (translateYValue.value <= 1) {
      translateYValue.value = withTiming(2, {
        duration: 600,
      });
      withInput.value = WIDTH - 100;
    }
  }, [translateYValue]);

  useEffect(() => {
    if (hasPrompt && !prevHasPrompt.current) {
      handleBlurInput();
      prevHasPrompt.current = true;
    }
  }, [hasPrompt, prevHasPrompt, handleBlurInput]);

  return (
    <Animated.View
      style={animatedStyle}
      className="bg-white rounded-t-3xl h-[220px] shadow-xl absolute bottom-0 w-full px-4 pb-2 pt-6"
    >
      <Animated.View
        style={{
          width: withInput,
        }}
      >
        <TextInput
          placeholder="Type, talk or share a photo"
          placeholderTextColor={colors.dark.DEFAULT}
          className="text-2xl h-[120px]"
          multiline
          onFocus={handleFocusInput}
          onBlur={handleBlurInput}
          {...props}
        />
      </Animated.View>

      <TouchableOpacity
        onPress={handleCompletPrompt}
        disabled={!props.value || disabled}
      >
        <Animated.View
          style={buttonStyled}
          className="absolute right-2 w-[50px] h-[50px] rounded-full justify-center items-center"
        >
          <SendHorizonal
            color={
              !props.value || disabled
                ? colors.dark.DEFAULT
                : colors.blue.DEFAULT
            }
          />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MainInput;
