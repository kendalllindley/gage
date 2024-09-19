const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const DeepSpeech = require('deepspeech');

// Paths to your DeepSpeech model and scorer files
const modelPath = path.join(__dirname, 'models', 'deepspeech-0.9.3-models.pbmm');
const scorerPath = path.join(__dirname, 'models', 'deepspeech-0.9.3-models.scorer');

// Path to the downloaded video file
const videoFilePath = path.join(__dirname, 'video.mp4');

// Path where the extracted audio will be saved
const audioFilePath = path.join(__dirname, 'audio.wav');

// Initialize DeepSpeech model
const model = new DeepSpeech.Model(modelPath);
model.enableExternalScorer(scorerPath);

async function extractAudioFromVideo(videoPath, audioPath) {
    return new Promise((resolve, reject) => {
        exec(`ffmpeg -i "${videoPath}" -q:a 0 -map a "${audioPath}"`, (error, stdout, stderr) => {
            if (error) {
                reject(`Error extracting audio: ${error.message}`);
            } else {
                resolve('Audio extracted successfully.');
            }
        });
    });
}

async function transcribeAudio(audioPath) {
    const buffer = fs.readFileSync(audioPath);
    const result = model.stt(buffer);
    return result;
}

(async () => {
    try {
        console.log('Extracting audio from video...');
        const extractMessage = await extractAudioFromVideo(videoFilePath, audioFilePath);
        console.log(extractMessage);

        console.log('Transcribing audio...');
        const transcript = await transcribeAudio(audioFilePath);
        const transcriptPath = path.join(__dirname, 'transcript.txt');
        fs.writeFileSync(transcriptPath, transcript, 'utf8');
        console.log(`Transcript saved to ${transcriptPath}`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
