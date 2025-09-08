const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function convertSvgToMp4(svgPath, outputPath = 'phone-ai-demo.mp4', backgroundColor = '#fffff0', duration = 10) {
    console.log(`Converting ${svgPath} to ${outputPath}`);
    console.log(`Background: ${backgroundColor}, Duration: ${duration}s`);
    
    // Read SVG content
    const svgContent = fs.readFileSync(svgPath, 'utf8');
    
    // Create HTML wrapper
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            margin: 0;
            padding: 20px;
            background-color: ${backgroundColor};
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: Arial, sans-serif;
        }
        svg {
            max-width: 100%;
            max-height: 100%;
        }
    </style>
</head>
<body>
    ${svgContent}
</body>
</html>
`;
    
    // Write HTML file
    const htmlPath = 'temp_svg.html';
    fs.writeFileSync(htmlPath, htmlContent);
    
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        // Set viewport to match SVG dimensions - UHD resolution
        await page.setViewport({ width: 1920, height: 1080 }); // UHD resolution
        
        // Load HTML file
        const fileUrl = `file://${path.resolve(htmlPath)}`;
        await page.goto(fileUrl);
        
        // Wait for animations to start
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Take screenshots for video frames
        const frames = [];
        const frameCount = duration * 10; // 10 FPS
        const frameDelay = 100; // 100ms between frames
        
        console.log(`Capturing ${frameCount} frames...`);
        
        for (let i = 0; i < frameCount; i++) {
                    const screenshot = await page.screenshot({ 
            type: 'png',
            omitBackground: false,
            fullPage: false,
            deviceScaleFactor: 3 // UHD quality
        });
            frames.push(screenshot);
            
            if (i % 10 === 0) {
                console.log(`Frame ${i + 1}/${frameCount}`);
            }
            
            await new Promise(resolve => setTimeout(resolve, frameDelay));
        }
        
        await browser.close();
        
        // Save frames as individual PNG files
        console.log('Saving frames...');
        frames.forEach((frame, index) => {
            const filename = `frame_${index.toString().padStart(4, '0')}.png`;
            fs.writeFileSync(filename, frame);
        });
        
        console.log('✅ Frames captured successfully!');
        console.log('📁 Frames saved as frame_XXXX.png');
        console.log('🎬 To create MP4, run:');
        console.log(`ffmpeg -y -framerate 10 -i frame_%04d.png -c:v libx264 -pix_fmt yuv420p -crf 23 ${outputPath}`);
        console.log('🧹 To cleanup frames: del frame_*.png');
        
        // Cleanup HTML file
        fs.unlinkSync(htmlPath);
        
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

// Command line usage
if (require.main === module) {
    const args = process.argv.slice(2);
    const svgPath = args[0] || 'public/images/phone-ai-demo.svg';
    const outputPath = args[1] || 'phone-ai-demo.mp4';
    const backgroundColor = args[2] || '#fffff0';
    const duration = parseInt(args[3]) || 10;
    
    convertSvgToMp4(svgPath, outputPath, backgroundColor, duration);
}

module.exports = { convertSvgToMp4 };
