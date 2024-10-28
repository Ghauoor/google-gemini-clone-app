import React, { memo, useEffect } from "react";
import { Dimensions, ScrollView, View } from "react-native";

import Markdown from "@ronradtke/react-native-markdown-display";
import colors from "../../colors";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

interface ResultProps {
  data: string;
  suggestionsHide: boolean;
}

const HEIGHT = Dimensions.get("window").height;

const Result = memo(({ data, suggestionsHide }: ResultProps) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 1000,
    });
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        height: !suggestionsHide ? HEIGHT / 1.85 : HEIGHT - 210,
      }}
      className={`w-full `}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        className="mt-4 px-4"
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        <Markdown
          style={{
            text: {
              fontSize: 18,
            },
            code_inline: {
              backgroundColor: colors.gray.DEFAULT,
            },
          }}
        >
          {data}
        </Markdown>
      </ScrollView>
    </Animated.View>
  );
});

export default Result;
