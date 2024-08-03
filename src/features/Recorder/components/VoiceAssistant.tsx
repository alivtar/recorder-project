import { useEffect, type FC } from "react";
import styles from "./voice_assistant.module.sass";
import { Assistant_Answer_Types } from "../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  changeAssistantAnswerType,
  selectAssistantAnswerType,
  selectAudioText,
  selectPlayAudio,
  setPlayAudio,
} from "../recorderSlice";
import { getMainAudioTag } from "../helpers";

const voiceAssistantAnswerTypes = [
  {
    id: 1,
    name: Assistant_Answer_Types.AUDIO,
    desc: "verbally",
  },
  {
    id: 2,
    name: Assistant_Answer_Types.TEXT,
    desc: null,
  },
] as const;

const VoiceAssistant: FC = () => {
  const assistantAnswerType = useAppSelector(selectAssistantAnswerType);
  const playAudio = useAppSelector(selectPlayAudio);
  const audioText = useAppSelector(selectAudioText);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (playAudio) {
      const audioTag = getMainAudioTag();

      audioTag.play();
    }
  }, [playAudio]);

  return (
    <div className={styles.voice_assistant_wrapper}>
      <p>Choose voice assistant answer type:</p>
      <ul className={styles.voice_assistant_answer_types}>
        {voiceAssistantAnswerTypes.map((voiceAssistantAnswerType, index) => {
          return (
            <li
              key={voiceAssistantAnswerType.id}
              className={styles.voice_assistant_answer_type}
            >
              <input
                type="radio"
                id={voiceAssistantAnswerType.name}
                checked={assistantAnswerType === voiceAssistantAnswerType.name}
                onChange={() => {
                  dispatch(
                    changeAssistantAnswerType(voiceAssistantAnswerType.name),
                  );
                }}
              />
              <label htmlFor={voiceAssistantAnswerType.name}>
                {voiceAssistantAnswerType.name}
              </label>
            </li>
          );
        })}
      </ul>

      <audio
        id="main-audio-el"
        controls
        onEnded={() => dispatch(setPlayAudio(false))}
      />

      {!!audioText && <p id="audio-text">{audioText}</p>}
    </div>
  );
};

export default VoiceAssistant;
