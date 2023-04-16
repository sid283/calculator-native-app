import React, { useRef, useState } from "react";
import { useEffect } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TouchableNativeFeedback,
  View,
  useColorScheme,
  Animated,
  Dimensions,
} from "react-native";
import { styles } from "./Calculator.styles";

const Calculator = () => {
  const [values, setValues] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const [finalResult, setFinalResult] = useState<string>();
  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const rippleColor = isDarkTheme ? "#5FE5EE" : "#E8F2F2";

  const animatedValue = new Animated.Value(0);

  const width = Dimensions.get("window").width / 4;

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
      console.log(values.length);

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
              copy[copy.length - 1] += val;
              const newCopy = [...copy];
              return [...newCopy];
            } else {
              const newCopy = copy;
              return [...newCopy];
            }
          } else {
            const newCopy = [...copy, "0" + val];
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
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
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
            res = (res / 100) * Number(values[i]);
          } else {
            res = (Number(values[i - 2]) / 100) * Number(values[i]);
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

  useEffect(() => {
    Animated.loop(
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ).start();
  }, [fadeAnim]);

  return (
    <View style={{ paddingTop: 50, flexDirection: "column" }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            color: isDarkTheme ? "#5FE5EE" : "black",
            fontSize: 30,
          }}
        >
          ℂ𝔸𝕃ℂ𝕌𝕃𝔸𝕋𝕆ℝ
        </Text>
      </View>
      <View style={{ ...styles.textContainer }}>
        <Text
          style={{
            ...styles.result,
            color: isDarkTheme ? "white" : "black",
            fontSize: 25,
          }}
        >
          {values.map((item) =>
            Number(item) && !item.includes(".")
              ? Number(item).toLocaleString()
              : item
          )}
          <Animated.View
            style={{
              opacity: fadeAnim,
            }}
          >
            <Text
              style={{ color: isDarkTheme ? "white" : "black", fontSize: 25 }}
            >
              {values?.length === 0 ? "|" : ""}
            </Text>
          </Animated.View>
        </Text>
        <Text
          style={{
            ...styles.result,
            paddingTop: 10,
            color: isDarkTheme ? "white" : "black",
            fontSize: 25,
          }}
        >
          {Number(result) ? Number(result).toLocaleString() : result}
        </Text>

        <Text
          style={{
            ...styles.result,
            paddingTop: 10,
            color: isDarkTheme ? "white" : "black",
            fontSize: 25,
            paddingBottom: 16,
          }}
        >
          {Number(finalResult)
            ? Number(finalResult).toLocaleString()
            : finalResult}
        </Text>
      </View>
      <View>
        <View style={{ ...styles.numbers, justifyContent: "center" }}>
          <FlatList
            data={numbers}
            columnWrapperStyle={{ justifyContent: "flex-start" }}
            renderItem={({ item, index }) => {
              {
                return (
                  <TouchableNativeFeedback
                    onPress={() => {
                      handleClick(item);
                    }}
                    onLongPress={() => {
                      if (item === "⌫") {
                        setValues([]);
                        setFinalResult("");
                      }
                    }}
                    background={TouchableNativeFeedback.Ripple(
                      rippleColor,
                      false,
                      25
                    )}
                  >
                    <View style={{ ...styles.keypad, width: width }}>
                      <Text
                        style={{
                          ...styles.text,
                          color: isDarkTheme ? "white" : "black",
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                );
              }
            }}
            numColumns={4}
          />
        </View>
      </View>
    </View>
  );
};

export default Calculator;
