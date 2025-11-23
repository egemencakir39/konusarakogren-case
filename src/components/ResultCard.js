import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ResultCard = ({ feel, sum, advice, date }) => {
  const feelColor =
    feel === "positive"
      ? "#2ecc71"
      : feel === "negative"
      ? "#e74c3c"
      : "#f1c40f";

  return (
    <View style={styles.card}>
      <Text style={[styles.feel, { color: feelColor }]}>
        {feel?.toUpperCase()}
      </Text>

      <Text style={styles.label}>Özet</Text>
      <Text style={styles.text}>{sum}</Text>

      <Text style={styles.label}>Öneri</Text>
      <Text style={styles.text}>{advice}</Text>

      {date && (
        <Text style={styles.date}>{new Date(date).toLocaleString()}</Text>
      )}
    </View>
  );
};

export default ResultCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  feel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 3,
  },

  text: {
    fontSize: 15,
    color: "#000000ff",
  },

  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 10,
  },
});