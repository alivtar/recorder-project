import { type FC } from "react";
import styles from "./user_input.module.sass";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectAssistantAnswerType,
  selectIsRecording,
  selectMediaRecorderObj,
  setAudioText,
  setIsRecording,
  setMediaRecorderObj,
  setPlayAudio,
} from "../recorderSlice";
import { checkRecordingPermission, getMainAudioTag } from "../helpers";
import { Assistant_Answer_Types } from "../types";

const UserInput: FC = () => {
  const dispatch = useAppDispatch();
  const isRecording = useAppSelector(selectIsRecording);
  const mediaRecorderObj = useAppSelector(selectMediaRecorderObj);
  const assistantAnswerType = useAppSelector(selectAssistantAnswerType);

  const getTextOfVoiceFromAPI = async () => {
    const resp = await fetch(
      "https://run.mocky.io/v3/0fe94463-722f-48c4-aade-18eb5598ae76",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const text = await resp.text();
    return text;

    // const data = JSON.parse(text);

    // if (data.status === 200) {
    //   return data.message;
    // } else {
    //   return "failed to fetch API";
    // }
  };

  const handleStartRecording = async () => {
    const mediaStreamObj = (await checkRecordingPermission()) as
      | MediaStream
      | undefined;

    if (mediaStreamObj) {
      dispatch(setIsRecording(true));
      dispatch(setAudioText(""));

      const audioTag = getMainAudioTag();

      const mediaRecorder = new MediaRecorder(mediaStreamObj);
      mediaRecorder.start();

      dispatch(setMediaRecorderObj(mediaRecorder));

      let dataArray: Blob[] = [];
      mediaRecorder.ondataavailable = function (ev) {
        dataArray.push(ev.data);
      };

      mediaRecorder.onstop = async function (ev: Event) {
        let audioData = new Blob(dataArray, { type: "audio/mp3;" });

        dataArray = [];

        let audioSrc = window.URL.createObjectURL(audioData);

        audioTag.src = audioSrc;

        // JUST FOR CHROME TO REMOVE POSSIBLE OPEN EVENT LISTENERS FOR STREAM
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());

        if (assistantAnswerType === Assistant_Answer_Types.AUDIO) {
          setTimeout(() => {
            dispatch(setPlayAudio(true));
          }, 3000);
        } else {
          const text = await getTextOfVoiceFromAPI();
          dispatch(setAudioText(text));
        }
      };
    }
  };

  const handleStopRecording = () => {
    dispatch(setIsRecording(false));
    mediaRecorderObj?.stop();
  };

  return (
    <div className={styles.user_input_wrapper}>
      <p>User input as voice:</p>

      <div className={styles.get_input}>
        {isRecording ? (
          <button className="cm-stop-btn" onClick={handleStopRecording}>
            Stop recording
          </button>
        ) : (
          <button className="cm-start-btn" onClick={handleStartRecording}>
            Start recording
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInput;
