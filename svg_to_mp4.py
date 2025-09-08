#!/usr/bin/env python3
"""
SVG to MP4 Converter
Converts animated SVG to MP4 video with custom background
"""

import os
import sys
import subprocess
from pathlib import Path

def create_html_wrapper(svg_path, output_path, background_color="#fffff0"):
    """Create HTML wrapper for SVG with background"""
    html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {{
            margin: 0;
            padding: 0;
            background-color: {background_color};
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }}
        svg {{
            max-width: 100%;
            max-height: 100%;
        }}
    </style>
</head>
<body>
    <div id="svg-container">
        {open(svg_path, 'r', encoding='utf-8').read()}
    </div>
</body>
</html>
"""
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    return output_path

def convert_svg_to_mp4(svg_path, output_path, background_color="#fffff0", duration=10):
    """Convert SVG to MP4 using Puppeteer and FFmpeg"""
    
    # Create HTML wrapper
    html_path = "temp_svg.html"
    create_html_wrapper(svg_path, html_path, background_color)
    
    # Create Puppeteer script
    puppeteer_script = f"""
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {{
    const browser = await puppeteer.launch({{ headless: true }});
    const page = await browser.newPage();
    
    // Set viewport to match SVG dimensions
    await page.setViewport({{ width: 400, height: 200 }});
    
    // Load HTML file
    const htmlPath = 'file://' + __dirname + '/{html_path}';
    await page.goto(htmlPath);
    
    // Wait for animations to start
    await page.waitForTimeout(1000);
    
    // Take screenshots for video frames
    const frames = [];
    const frameCount = {duration * 10}; // 10 FPS
    
    for (let i = 0; i < frameCount; i++) {{
        const screenshot = await page.screenshot({{ 
            type: 'png',
            omitBackground: false
        }});
        frames.push(screenshot);
        await page.waitForTimeout(100); // 100ms between frames
    }}
    
    await browser.close();
    
    // Save frames as individual PNG files
    frames.forEach((frame, index) => {{
        fs.writeFileSync(`frame_${{index.toString().padStart(4, '0')}}.png`, frame);
    }});
    
    console.log('Frames saved successfully');
}})().catch(console.error);
"""
    
    # Write Puppeteer script
    with open('capture_frames.js', 'w') as f:
        f.write(puppeteer_script)
    
    try:
        # Run Puppeteer to capture frames
        print("Capturing frames...")
        subprocess.run(['node', 'capture_frames.js'], check=True)
        
        # Use FFmpeg to create MP4 (if available)
        print("Creating MP4 video...")
        ffmpeg_cmd = [
            'ffmpeg', '-y',
            '-framerate', '10',
            '-i', 'frame_%04d.png',
            '-c:v', 'libx264',
            '-pix_fmt', 'yuv420p',
            '-crf', '23',
            output_path
        ]
        
        subprocess.run(ffmpeg_cmd, check=True)
        
        # Cleanup
        for file in Path('.').glob('frame_*.png'):
            file.unlink()
        Path('capture_frames.js').unlink()
        Path(html_path).unlink()
        
        print(f"✅ MP4 video created: {output_path}")
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Error: {e}")
        print("Make sure FFmpeg is installed and available in PATH")
        return False
    except FileNotFoundError:
        print("❌ FFmpeg not found. Please install FFmpeg first.")
        print("Download from: https://ffmpeg.org/download.html")
        return False
    
    return True

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python svg_to_mp4.py <svg_file> [output_file] [background_color] [duration]")
        sys.exit(1)
    
    svg_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else "phone-ai-demo.mp4"
    background_color = sys.argv[3] if len(sys.argv) > 3 else "#fffff0"
    duration = int(sys.argv[4]) if len(sys.argv) > 4 else 10
    
    if not os.path.exists(svg_file):
        print(f"❌ SVG file not found: {svg_file}")
        sys.exit(1)
    
    print(f"Converting {svg_file} to {output_file}")
    print(f"Background color: {background_color}")
    print(f"Duration: {duration} seconds")
    
    success = convert_svg_to_mp4(svg_file, output_file, background_color, duration)
    
    if success:
        print("🎉 Conversion completed successfully!")
    else:
        print("💥 Conversion failed!")
        sys.exit(1)


