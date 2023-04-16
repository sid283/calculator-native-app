import React from "react";
import {  StyleSheet, Text, View,useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import Calculator from "./components/Calculator/Calculator";
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  
  
  return (
    <SafeAreaProvider style={{backgroundColor : isDarkTheme ? "black":"white"}}>
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
