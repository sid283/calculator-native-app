import React, { useState } from "react";
import { useEffect } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./Calculator.styles";

const Calculator = () => {
  const [rippleColor, setRippleColor] = useState("#8F92B4");
  const [rippleOverflow, setRippleOverflow] = useState(false);
  const [values, setValues] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const [finalResult, setFinalResult] = useState<string>();
  const operators = ["+", "-", "÷", "×", "%"];
  const numbers = [
    "C",
    "%",
    "⌫",
    "÷",
    "7",
    "8",
    "9",
    "×",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "00",
    "0",
    ".",
    "=",
  ];

  const handleClick = (val: any) => {
    if (operators.includes(val) && values.length > 0) {
      if (!operators.includes(values[values.length - 1])) {
        setValues((prev) => [...prev, val]);
      }
    } else if (!["=", "⌫", "C"].includes(val)) {
      if (val !== ".") {
        setValues((prev) => {
          const copy = prev;
          if (copy.length > 0 && !operators.includes(copy[copy.length - 1])) {
            copy[copy.length - 1] = copy[copy.length - 1] + val;
            return [...copy];
          } else {
            return [...copy, val];
          }
        });
      } else {
        setValues((prev) => {
          const copy = prev;
          if (copy.length > 0 && !operators.includes(copy[copy.length - 1])) {
            if (!copy[copy.length - 1].includes(val)) {
              copy[copy.length - 1] +=  val;
              const newCopy = [...copy]              
              return [...newCopy];
            } else {
              const newCopy = copy;
              return [...newCopy];
            }
          } else {
            const newCopy = [...copy,"0"+val];
            return [...newCopy];
          }
        });
      }
    } else if (val === "C") {
      setFinalResult("");
      setValues([]);
    } else if (val === "⌫") {
      setValues((prev) => {
        let copy = [...prev];
        if (operators.includes(copy[copy.length - 1])) {
          copy.pop();
          return [...copy];
        } else if (copy?.[copy.length - 1]?.length > 1) {
          copy[copy.length - 1] = copy[copy.length - 1].substring(
            0,
            copy[copy.length - 1].length - 1
          );
          return [...copy];
        } else {
          copy.pop();
          return [...copy];
        }
      });
    } else if (val === "=") {
      setFinalResult(result);
    }
  };

  const getResult = (values: any) => {
    let res = null;

    for (let i = 0; i < values.length; i++) {
      if (operators.includes(values[i - 1])) {
        if (values[i - 1] === "+") {
          if (res) {
            res = res + Number(values[i]);
          } else {
            res = Number(values[i - 2]) + Number(values[i]);
          }
        } else if (values[i - 1] === "-") {
          if (res) {
            res = res - Number(values[i]);
          } else {
            res = Number(values[i - 2]) - Number(values[i]);
          }
        } else if (values[i - 1] === "×") {
          if (res) {
            res = res * Number(values[i]);
          } else {
            res = Number(values[i - 2]) * Number(values[i]);
          }
        } else if (values[i - 1] === "÷") {
          if (res) {
            res = res / Number(values[i]);
          } else {
            res = Number(values[i - 2]) / Number(values[i]);
          }
        } else if (values[i - 1] === "%") {
          if (res) {
            res = res / Number(values[i]);
          } else {
            res = Number(values[i - 2]) / Number(values[i]);
          }
        }
      }
    }
    setResult(res);
  };

  useEffect(() => {
    if (
      !operators.includes(values[0]) &&
      !operators.includes(values[values.length - 1])
    ) {
      getResult(values);
    }
  }, [values]);

  console.log(values);

  return (
    <View style={{ paddingTop: 50, flexDirection: "column" }}>
      <View style={styles.textContainer}>
        <Text style={styles.result}>
          {values.map((item) =>
            Number(item) && !item.includes(".") ? Number(item).toLocaleString() : item
          )}
        </Text>
        <Text style={{ ...styles.result, paddingTop: 10 }}>
          {Number(result) ? Number(result).toLocaleString() : result}
        </Text>
        <Text style={{ ...styles.result, paddingTop: 10 }}>
          {Number(finalResult)
            ? Number(finalResult).toLocaleString()
            : finalResult}
        </Text>
      </View>
      <View>
        <View style={styles.numbers}>
          <FlatList
            data={numbers}
            renderItem={({ item }) => (
              <TouchableNativeFeedback
                onPress={() => {
                  handleClick(item);
                }}
                background={TouchableNativeFeedback.Ripple(
                  rippleColor,
                  false,
                  25
                )}
              >
                <View style={styles.keypad}>
                  <Text style={styles.text}>{item}</Text>
                </View>
              </TouchableNativeFeedback>
            )}
            numColumns={4}
          />
        </View>
      </View>
    </View>
  );
};

export default Calculator;
