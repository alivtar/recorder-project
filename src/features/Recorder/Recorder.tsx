import { type FC } from "react";
import styles from "./recorder.module.sass";
import VoiceAssistant from "./components/VoiceAssistant";
import UserInput from "./components/UserInput";

const Recorder: FC = () => {
  return (
    <section className={styles.recorder_section}>
      <VoiceAssistant />

      <UserInput />
    </section>
  );
};

export default Recorder;
