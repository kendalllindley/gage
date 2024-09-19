const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const deepspeech = require('deepspeech');

// Paths to video and audio files
const videoFilePath = 'path/to/your/video.mp4';
const audioFilePath = path.join(__dirname, 'audio.wav');

// Paths to DeepSpeech model files
const modelPath = path.join(__dirname, 'models', 'deepspeech-0.9.3-models.pbmm');
const scorerPath = path.join(__dirname, 'models', 'deepspeech-0.9.3-models.scorer');

// Extract audio from video
exec(`ffmpeg -i ${videoFilePath} -q:a 0 -map a ${audioFilePath}`, (err, stdout, stderr) => {
    if (err) {
        console.error('Error extracting audio:', err);
    } else {
        console.log('Audio extracted successfully');
        transcribeAudio(audioFilePath);
    }
});

// Transcribe audio using DeepSpeech
function transcribeAudio(audioFilePath) {
    const model = new deepspeech.Model(modelPath);
    model.enableExternalScorer(scorerPath);

    const audioBuffer = fs.readFileSync(audioFilePath);
    const audioLength = (audioBuffer.length / 2) / 16000; // Assuming 16-bit audio, 16kHz sample rate

    const result = model.stt(audioBuffer.slice(0, audioLength));
    console.log('Transcription:', result);
}
