import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const CustomButton01 = ({ title, onPress, mode = "contained", style }) => {
  return (
    <Button mode={mode} onPress={onPress} style={[styles.button, style]}>
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 5,
    paddingVertical: 8,
    backgroundColor: "#36d5bf",
    borderColor: '#fafafa',
  },
});

export default CustomButton01;
