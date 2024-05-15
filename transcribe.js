import path from 'path'
import fs from 'fs'
import wavefile from "wavefile";

import {
  pipeline,
  env
} from "@xenova/transformers";
import { fileURLToPath } from "url";

env.allowLocalModels = false;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getAudio() {
  console.log('[START_TO_GET_AUDIO_WAV]')
  const filePath = path.resolve(__dirname, '../audio.wav');
  const buffer = fs.readFileSync(filePath);

  let wav = new wavefile.WaveFile(buffer);
  wav.toBitDepth('32f');
  wav.toSampleRate(16000);
  let audioData = wav.getSamples();

  if (Array.isArray(audioData)) {
    if (audioData.length > 1) {
      const SCALING_FACTOR = Math.sqrt(2);

      for (let i = 0; i < audioData[0].length; ++i) {
        audioData[0][i] = SCALING_FACTOR * (audioData[0][i] + audioData[1][i]) / 2;
      }
    }

    audioData = audioData[0];
  }

  console.log('[END_TO_GET_AUDIO_WAV]')
  return audioData;
}

export async function transcribe() {
  const options = {
    chunk_length_s: 30,
    stride_length_s: 5,
    language: "portuguese",
    task: "transcribe",
    return_timestamps: true,
  };

  try {
    const transcriber = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-medium"
    );

    const audioData = await getAudio();

    console.log(['START_TRANSCRIPTION', audioData.length])
    console.time('[TRANSCRIBE]')
    const transcription = await transcriber(audioData, options);
    console.timeEnd('[TRANSCRIBE]')
    console.log('[TRANSCRIPTION_RESULT]', transcription)

    return transcription
  } catch (error) {
    console.error("[TRANSCRIBE_ERROR]", error);
    throw new Error();
  }
}
