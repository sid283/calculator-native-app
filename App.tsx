import React from "react";
import {  StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Calculator from "./components/Calculator/Calculator";
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaProvider >
      <StatusBar />
      <Calculator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});