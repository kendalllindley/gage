const https = require('https');
const fs = require('fs');
const path = require('path');

// Path to the file containing the video URL
const videoSrcPath = path.join(__dirname, 'videoSrc.txt');

// Path where the downloaded file will be saved
const outputPath = path.join(__dirname, 'video.mp4');

function downloadFile(url, outputPath) {
    const file = fs.createWriteStream(outputPath);

    https.get(url, (response) => {
        const totalSize = parseInt(response.headers['content-length'], 10);
        let downloadedSize = 0;

        response.pipe(file);

        response.on('data', (chunk) => {
            downloadedSize += chunk.length;
            const percentage = ((downloadedSize / totalSize) * 100).toFixed(2);
            process.stdout.write(`Downloading: ${percentage}% (${downloadedSize} / ${totalSize} bytes)\r`);
        });

        file.on('finish', () => {
            file.close();
            console.log('\nDownload complete');
        });
    }).on('error', (err) => {
        fs.unlink(outputPath, () => {}); // Delete the file async if there's an error
        console.error('Error downloading file:', err.message);
    });
}

// Read the video URL from the file and download the video
fs.readFile(videoSrcPath, 'utf8', (err, url) => {
    if (err) {
        console.error('Error reading video URL:', err);
        return;
    }
    if (url) {
        downloadFile(url.trim(), outputPath);
    } else {
        console.error('No URL found in the file.');
    }
});
