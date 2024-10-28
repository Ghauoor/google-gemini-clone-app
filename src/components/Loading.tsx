import React, { memo, useEffect, useState } from "react";

import { Dimensions } from "react-native";
import colors from "../../colors";
import Animated, {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import {
  LinearGradient,
  Canvas,
  vec,
  RoundedRect,
} from "@shopify/react-native-skia";

type GradientType = { type: "normal" | "inverted"; width: number };

const WIDTH = Dimensions.get("window").width;
const LIGHT_GREEN = "#c0f3fa";
const TRANSPARENT = "#FFFFFF00";
const BLUE = colors.blue[400];
const DURATION = 1650;

const GRADIENTS: GradientType[] = [
  { type: "normal", width: WIDTH - 30 },
  { type: "inverted", width: WIDTH - 30 },
  { type: "normal", width: WIDTH - 30 },
  { type: "normal", width: WIDTH - 150 },
  { type: "inverted", width: WIDTH - 80 },
  { type: "inverted", width: WIDTH - 30 },
  { type: "inverted", width: WIDTH - 200 },
];

const Loading = memo(() => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, {
          duration: 1000,
        }),
        withTiming(1, {
          duration: 1000,
        })
      ),
      -1
    );
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
      }}
      className="flex-1 mt-6"
    >
      <Canvas style={{ flex: 1 }}>
        {GRADIENTS.map((gradient, index) => (
          <Gradient key={index} {...gradient} position={index} />
        ))}
      </Canvas>
    </Animated.View>
  );
});

const Gradient = ({
  type,
  width = WIDTH - 30,
  position,
}: GradientType & { position: number }) => {
  const color2 = useSharedValue(LIGHT_GREEN);
  const color1 = useSharedValue(TRANSPARENT);
  const color3 = useSharedValue(BLUE);

  const startX = useSharedValue(0);

  useEffect(() => {
    startX.value = withRepeat(
      withSequence(
        withTiming(256, {
          duration: Math.round(Math.random() * DURATION) + 1500,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(100, {
          duration: Math.round(Math.random() * DURATION) - 1500,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(0, {
          duration: Math.round(Math.random() * DURATION) - 500,
          easing: Easing.inOut(Easing.ease),
        })
      ),
      -1
    );
  }, []);

  const animatedColors = useDerivedValue(() => {
    if (type == "inverted") {
      return [color3.value, color2.value, color1.value];
    }

    return [color1.value, color2.value, color3.value];
  }, [type]);

  const startPos = useDerivedValue(() => {
    return vec(startX.value, 0);
  }, [startX]);

  return (
    <RoundedRect
      x={20}
      y={20 * position * 2.2}
      width={width}
      height={30}
      r={12}
    >
      <LinearGradient
        start={startPos}
        end={vec(256, 150)}
        colors={animatedColors}
      />
    </RoundedRect>
  );
};

export default Loading;
