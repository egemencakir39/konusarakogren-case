import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ResultCard from "../components/ResultCard";
import { useDispatch, useSelector } from "react-redux";
import { clearEntries } from "../redux/diarySlice";
import { SafeAreaView } from "react-native-safe-area-context";

const HistoryScreen = () => {
  const dispatch = useDispatch();
  const { entries } = useSelector((state) => state.diary);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
      </View>
      <View>
        <Text style={styles.title}>Geçmiş</Text>
      </View>
      <TouchableOpacity
        style={styles.clearButton}
        onPress={() => dispatch(clearEntries())}
      >
        <Text style={styles.clearButtonText}>Geçmişi Temizle</Text>
      </TouchableOpacity>
      <FlatList
        data={entries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ResultCard
            feel={item.feel}
            sum={item.sum}
            advice={item.advice}
            date={item.date}
            
          />
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#eef3f5ff",
  },
  logoWrapper: {
    alignItems: "center",
    marginTop: 40,
  },

  logo: {
    width: 290,
    height: 70,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
    color: "#000000ff",
  },
  clearButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  clearButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
