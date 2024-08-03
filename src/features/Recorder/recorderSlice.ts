import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type TRootState } from "../../app/store";
import { Assistant_Answer_Types } from "./types";

interface IRecorderState {
  assistantAnswerType: Assistant_Answer_Types;
  isRecording: boolean;
  mediaRecorderObj: MediaRecorder | null;
  playAudio: boolean; // To automatically play recorded voice after 3 seconds
  audioText: string; // Result of transcription from API
}

const RECORDER_INITIAL_STATE: IRecorderState = {
  assistantAnswerType: Assistant_Answer_Types.AUDIO, // default answer type
  isRecording: false,
  mediaRecorderObj: null,
  playAudio: false,
  audioText: "",
};

const recorderSlice = createSlice({
  name: "recorderSlice",
  initialState: RECORDER_INITIAL_STATE,
  reducers: {
    changeAssistantAnswerType: (
      state,
      action: PayloadAction<Assistant_Answer_Types>,
    ) => {
      state.assistantAnswerType = action.payload;
    },
    setIsRecording: (state, action: PayloadAction<boolean>) => {
      state.isRecording = action.payload;
    },
    setMediaRecorderObj: (
      state,
      action: PayloadAction<IRecorderState["mediaRecorderObj"]>,
    ) => {
      state.mediaRecorderObj = action.payload;
    },
    setPlayAudio: (state, action: PayloadAction<boolean>) => {
      state.playAudio = action.payload;
    },
    setAudioText: (state, action: PayloadAction<string>) => {
      state.audioText = action.payload;
    },
  },
});

export const {
  changeAssistantAnswerType,
  setIsRecording,
  setMediaRecorderObj,
  setPlayAudio,
  setAudioText,
} = recorderSlice.actions;

// Selectors
export const selectAssistantAnswerType = (state: TRootState) =>
  state.recorderData.assistantAnswerType;
export const selectIsRecording = (state: TRootState) =>
  state.recorderData.isRecording;
export const selectMediaRecorderObj = (state: TRootState) =>
  state.recorderData.mediaRecorderObj;
export const selectPlayAudio = (state: TRootState) =>
  state.recorderData.playAudio;
export const selectAudioText = (state: TRootState) =>
  state.recorderData.audioText;

export default recorderSlice.reducer;
