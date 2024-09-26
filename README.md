# Gage - Local Political Engagement Made Easy

Gage is a tool designed to simplify and promote local political engagement by making it easier to access and interact with political materials such as meeting agendas, video content, and transcripts.

## Features

- **Web Scraping**: Automatically scrape meeting agendas and public content from designated websites.
- **Video Downloading**: Download MP4 videos from scraped sources.
- **Audio Extraction**: Extract audio from downloaded videos for easier handling.
- **Transcription**: Generate text transcripts from the extracted audio using DeepSpeech.

## File Overview

- `scrape.js`: Script to scrape public meeting agenda information from the web.
- `download-mp4.js`: Downloads MP4 videos of the public meetings based on the scraped data.
- `extract.js`: Extracts audio from downloaded MP4 videos.
- `transcribe.js`: Converts the extracted audio into text using the DeepSpeech transcription engine.
- `videoSrc.txt`: A text file containing the sources of video links for processing.
- `package.json`: Manages the project's dependencies and scripts.
- `package-lock.json`: Automatically generated file for locking the project dependencies.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kendalllindley/gage.git
   cd gage
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. **Scraping**:
   
   Run the scraper to gather public meeting data:
   ```bash
   node scrape.js
   ```

2. **Download Videos**:

   After scraping, use the `download-mp4.js` to download MP4 files:
   ```bash
   node download-mp4.js
   ```

3. **Extract Audio**:

   Once videos are downloaded, extract audio files:
   ```bash
   node extract.js
   ```

4. **Transcribe Audio**:

   Finally, transcribe the extracted audio into text using DeepSpeech:
   ```bash
   node transcribe.js
   ```

## Requirements

- Node.js and npm
- DeepSpeech (for transcription)

## Future Development

- **Web Interface**: To provide a user-friendly interface for browsing agendas, videos, and transcripts.
- **Database Integration**: Store and organize the scraped content for easier retrieval and searchability.
- **Advanced Search**: Allow users to search through transcripts for specific topics or keywords.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License.
```
