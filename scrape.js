const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: false }); // Set headless: true if you don't want to see the browser
        const page = await browser.newPage();
        
        console.log('Navigating to the page...');
        await page.goto('https://twinfallsid.portal.civicclerk.com/event/5615/media', {
            waitUntil: 'networkidle2',
        });

        console.log('Waiting for the video element to appear...');
        await page.waitForSelector('video.jw-video.jw-reset', { timeout: 10000 });

        // Introduce a delay to ensure the video element is fully loaded
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 5000)));

        console.log('Extracting the video src...');
        const videoSrc = await page.evaluate(() => {
            const videoElement = document.querySelector('video.jw-video.jw-reset');
            return videoElement ? videoElement.src : null;
        });

        if (videoSrc) {
            console.log('Video Source:', videoSrc);
            const filePath = path.join(__dirname, 'videoSrc.txt');
            fs.writeFileSync(filePath, videoSrc, 'utf8');
            console.log(`Video source saved to ${filePath}`);
        } else {
            console.log('Video element not found or src attribute is empty.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
})();
