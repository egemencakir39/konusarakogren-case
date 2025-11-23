import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import ResultCard from "../components/ResultCard";
import { useDispatch, useSelector } from "react-redux";
import { analyzeFeel } from "../redux/diarySlice";

const HomeScreen = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { entries, loading } = useSelector((state) => state.diary);

  const lastResult = entries[0]; // en sonki duygu durumu

  const handleAnalyze = () => {
    if (!text.trim()) return;
    dispatch(analyzeFeel(text));
    setText("");
  };
  
  return (
    <View>
      <View style={styles.logoWrapper}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
      </View>
      <View>
        <TextInput
          placeholder="Bugün nasıl hissediyorsun?"
          style={styles.input}
          value={text}
          onChangeText={setText}
        />
      </View>
      <TouchableOpacity style={styles.buttonWrapper} onPress={handleAnalyze}>
        <Text style={styles.buttonText}>
          {loading ? "Analiz ediliyor..." : "Analiz Et"}
        </Text>
      </TouchableOpacity>
      {lastResult && (
        <View style={styles.resultWrapper}>
          <ResultCard
            feel={lastResult.feel}
            sum={lastResult.sum}
            advice={lastResult.advice}
            date={lastResult.date}
          />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  input: {
    marginTop: 45,
    borderWidth: 1,
    borderColor: "#0b80dfff",
    backgroundColor: "#eef3f5ff",
    padding: 12,
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 12,
    fontSize: 16,
    color: "#000000ff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 15,
  },
  logoWrapper: {
    alignItems: "center",
    marginTop: 40,
  },

  logo: {
    width: 290,
    height: 70,
  },
  buttonWrapper: {
    padding: 12,
    backgroundColor: "#0b80dfff",
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
