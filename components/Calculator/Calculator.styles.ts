import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  numbers: {
    width: 100,
    justifyContent: 'center',
    flexWrap  : "wrap",
  },
  keypad: {
    width: 100,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    fontSize : 10
  },
  wrapper:{
    flex : 4,
  },
  textContainer : {
    minHeight : 400,
    justifyContent : "flex-end",
    textAlign : "right"
  },
  text : {
    fontSize : 25
  },
  result : {
    paddingLeft:10
  }
});
