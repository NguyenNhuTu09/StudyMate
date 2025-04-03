/*************  ✨ Codeium Command ⭐  *************/
import React from "react";
import { View, Text } from "react-native";
import { Surface } from "react-native-paper";

const CardTitle = ({ title, subtitle }) => {
  return (
    <Surface style={{ padding: 10, marginBottom: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
      <Text style={{ fontSize: 16, color: "#666" }}>{subtitle}</Text>
    </Surface>
  );
};

export default CardTitle;