const { exec } = require('child_process');
const path = require('path');
const readline = require('readline');

// Paths to the video and audio files
const videoFilePath = path.join(__dirname, 'video.mp4');
const audioFilePath = path.join(__dirname, 'audio.wav');

// Function to extract audio using FFmpeg with a progress indicator
const extractAudio = (videoFilePath, audioFilePath) => {
    const command = `ffmpeg -i "${videoFilePath}" -q:a 0 -map a "${audioFilePath}"`;

    // Execute the command
    const ffmpegProcess = exec(command);

    ffmpegProcess.stderr.on('data', (data) => {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(data.toString());
    });

    // Handle process completion
    ffmpegProcess.on('close', (code) => {
        if (code === 0) {
            console.log('\nAudio extracted successfully to', audioFilePath);
        } else {
            console.error('\nError extracting audio');
        }
    });
};

// Extract audio
extractAudio(videoFilePath, audioFilePath);
