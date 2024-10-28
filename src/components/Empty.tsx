import React from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import colors from "../../colors";

const Empty: React.FC = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <MaskedView
        style={{
          flex: 1,
          flexDirection: "row",
          height: "50%",
          marginTop: 0,
          zIndex: -1,
        }}
        maskElement={
          <View
            style={{
              backgroundColor: "transparent",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: -200,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: "black",
                fontWeight: "700",
              }}
            >
              Hello, Ghayoor
            </Text>
          </View>
        }
      >
        <LinearGradient
          colors={[colors.blue.DEFAULT, colors.red.DEFAULT]}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.7, y: 0 }}
          style={{ flex: 1 }}
        />
      </MaskedView>
    </View>
  );
};

export default Empty;
