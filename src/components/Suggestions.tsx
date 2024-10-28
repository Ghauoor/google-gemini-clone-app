import {
  LayoutGrid,
  LucideIcon,
  SquareDashedBottomCode,
  User,
} from "lucide-react-native";
import React, { memo, useLayoutEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import colors from "../../colors";

interface SuggestionProps {
  onSelectSuggestion: (prompt: string) => void;
  isHide: boolean;
  handleSuggestionsHide: (value: boolean) => void;
}
interface SuggestionItemProps {
  prompt: string;
  icon: any;
  onPress: (prompt: string) => void;
  index: number;
}

const SUGGESTIONS = [
  {
    prompt: "Do you know who is Ghayoor Hussain?",
    icon: <User color={colors.blue[900]} size={20} />,
  },
  {
    prompt: "Create a script react js to create a post list",
    icon: <SquareDashedBottomCode color={colors.blue[900]} size={20} />,
  },
  {
    prompt: "Give app suggestions with React Native ",
    icon: <LayoutGrid color={colors.blue[900]} size={20} />,
  },
];

const Suggestions = memo(
  ({ onSelectSuggestion, isHide, handleSuggestionsHide }: SuggestionProps) => {
    if (isHide) return null;

    return (
      <View>
        <ScrollView
          horizontal
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          showsHorizontalScrollIndicator={false}
          className="mt-6"
        >
          {SUGGESTIONS.map((suggestion, index) => (
            <SuggestionItem
              key={`suggestion-${index}`}
              index={index}
              onPress={(prompt) => onSelectSuggestion(prompt)}
              {...suggestion}
            />
          ))}
          <TouchableOpacity onPress={() => handleSuggestionsHide(true)}>
            <View className="w-[150px] h-[140px] border-gray border-[2px] rounded-2xl mr-2 p-4 justify-center items-center">
              <Text className="text-center text-base text-black">
                Hide suggestions
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
);

const SuggestionItem = ({
  prompt,
  icon,
  onPress,
  index,
}: SuggestionItemProps) => {
  const opacityValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacityValue.value,
  }));

  useLayoutEffect(() => {
    opacityValue.value = withTiming(1, {
      duration: index * 500,
    });
  }, []);

  return (
    <TouchableOpacity onPress={() => onPress(prompt)}>
      <Animated.View
        style={animatedStyle}
        className="w-[150px] h-[140px] bg-ice-50 rounded-2xl mr-2 p-4"
      >
        <Text className="text-[16px] flex-1">{prompt}</Text>
        <View className="bg-white self-end w-9 h-9 justify-center items-center rounded-full">
          {icon}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Suggestions;
