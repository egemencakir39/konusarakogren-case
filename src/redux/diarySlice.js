import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const HF_TOKEN = Constants.expoConfig.extra.HF_TOKEN;
export const analyzeFeel = createAsyncThunk(
  "diary/analyzeFeel",
  async (text, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://router.huggingface.co/hf-inference/models/savasy/bert-base-turkish-sentiment-cased",
        { inputs: text },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${HF_TOKEN}`,
          },
        }
      );
      const result = response.data[0];

      const negativeScore =
        result.find((p) => p.label === "negative")?.score || 0;
      const positiveScore =
        result.find((p) => p.label === "positive")?.score || 0;

      let feel = "neutral"; //default duygu
      if (negativeScore > 0.6) feel = "negative";
      else if (positiveScore > 0.6) feel = "positive";
      else feel = "neutral";

      let sum = "";
      let advice = "";

      //pozitif durum
      if (feel === "positive") {
        sum = "Bugün genel olarak olumlu bir ruh halindesin.";
        advice = "Bu enerjiyi devam ettir ve kendine güzel bir ödül ver!";
      }

      //negatif durum
      if (feel === "negative") {
        sum = "Biraz zorlayıcı bir gün geçiriyor gibisin.";
        advice =
          "Kendine vakit ayır, kısa bir mola veya nefes egzersizi iyi gelebilir.";
      }

      //nötr durum
      if (feel === "neutral") {
        sum = "Duygusal olarak dengeli bir durumda görünüyorsun.";
        advice =
          "Günün akışına bırakmak ve hafif bir aktivite yapmak iyi olabilir.";
      }

      return {
        text,
        feel,
        sum,
        advice,
        negativeScore,
        positiveScore,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loadEntries = createAsyncThunk("diary/loadEntries", async () => {
  const saved = await AsyncStorage.getItem("entries");
  return saved ? JSON.parse(saved) : [];
});

const diarySlice = createSlice({
  name: "diary",
  initialState: {
    entries: [], //geçmiş duygu durumlarının list olduğu dizi
    loading: false,
    error: null,
  },

  reducers: {
    clearEntries: (state) => {
      state.entries = [];
      AsyncStorage.removeItem("entries");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(analyzeFeel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzeFeel.fulfilled, (state, action) => {
        state.loading = false;
        const newEntry = {
          ...action.payload,
          date: new Date().toISOString(),
        };
        state.entries.unshift(newEntry);
        AsyncStorage.setItem("entries", JSON.stringify(state.entries));
      })
      .addCase(analyzeFeel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Bilinmeyen bir hata olustu.";
      })
      .addCase(loadEntries.fulfilled, (state, action) => {
        state.entries = action.payload;
      });
  },
});
export default diarySlice.reducer;
export const { clearEntries } = diarySlice.actions;
