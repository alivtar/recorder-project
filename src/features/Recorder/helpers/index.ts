import { MAIN_AUDIO_TAG_ID } from "../constants";

export const getMainAudioTag = (): HTMLAudioElement => {
  const audioTag = document.querySelector(
    `#${MAIN_AUDIO_TAG_ID}`,
  ) as HTMLAudioElement;
  return audioTag;
};

export function checkRecordingPermission(): Promise<MediaStream> {
  return new Promise<MediaStream>((resolve, reject) => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((mediaStreamObj) => {
        resolve(mediaStreamObj);
      })
      .catch((e) => {
        alert("Permisson denied for mic OR no mic found.");
        reject();
      });
  });
}
