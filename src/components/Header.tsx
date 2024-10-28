import React from "react";
import { Image, View, StatusBar } from "react-native";

import GeminiLogo from "../assets/logo.png";

const Header: React.FC = () => {
  return (
    <View className="px-4">
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Image source={GeminiLogo} />
    </View>
  );
};

export default Header;
