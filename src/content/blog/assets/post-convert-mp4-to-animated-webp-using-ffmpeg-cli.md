---
title: Convert MP4 to Animated WebP using FFmpeg CLI
description: A comprehensive guide on how to convert MP4 files to animated WebP format using FFmpeg command-line tool, including maintaining aspect ratio and adjusting frame rate.
date: 2024-03-15
tag: Tutorial
---

FFmpeg is a powerful command-line tool for handling multimedia files. This guide will walk you through the process of converting MP4 videos to animated WebP images using FFmpeg, with updated information for 2024.

## 1. Install FFmpeg CLI through Homebrew

First, we need to install FFmpeg. If you're using macOS, the easiest way is through Homebrew.

Open Terminal and run:

```
brew install ffmpeg
```

To validate the installation, run:

```
which ffmpeg
```

You should see the directory path of FFmpeg, such as `/usr/local/bin/ffmpeg`.

## 2. Set WebP properties and convert

Now that FFmpeg is installed, we can use it to convert our MP4 file to WebP. Here are a couple of example commands:

### Lossless WebP with loop

This command converts an MP4 file to a lossless, looping WebP file at 20 FPS with a resolution of 800x600:

```
ffmpeg -i input_filename.mp4 -vcodec libwebp -filter:v fps=20 -lossless 1 -loop 0 -an -fps_mode vfr -s 800:600 output_filename.webp
```

### Lossy WebP with picture preset

This command exports an animated lossy WebP with preset mode 'picture':

```
ffmpeg -i input.mp4 -vcodec libwebp -filter:v fps=20 -lossless 0 -compression_level 3 -q:v 70 -loop 1 -an -fps_mode vfr -s 800:600 output.webp
```

### Maintain aspect ratio and set 30 FPS lossless with loop

To maintain the aspect ratio of the input video and set the frame rate to 30 FPS, use the following command:

```
ffmpeg -i input.mp4 -vcodec libwebp -vf "fps=30" -lossless 1 -loop 1 -an -fps_mode vfr output.webp
```

This command does the following:
- Scales the width to 800 pixels and automatically calculates the height to maintain the aspect ratio (`scale=800:-1`)
- Sets the frame rate to 30 FPS (`fps=30`)
- Uses lossy compression with a quality setting of 80 and compression level 4
- Enables looping

Adjust the width (800 in this example) as needed. You can also use `-1:600` to set a specific height instead.

## Key Options Explained

- `-filter:v fps=30`: Set frame rate to 30 FPS
- `-lossless 1`: Enable lossless mode (0 for lossy)
- `-loop 0`: Enable looping (1 for no loop)
- `-s 800:600`: Set output resolution to 800x600 pixels
- `-fps_mode vfr`: Use variable frame rate mode (replaces deprecated `-vsync`)
- `-vf "scale=800:-1"`: Scale width to 800px, maintain aspect ratio
- `-compression_level 4`: Set compression level (0-6, higher is slower but smaller file size)
- `-q:v 80`: Set quality (0-100, higher is better quality but larger file size)

## Additional Tips

- To set auto-size for width or height, use: `-vf scale=400:-2,fps=30`
- For transparent PNGs to transparent WebP: `ffmpeg -r 30 -i %04d.webp -vcodec libwebp -loop 0 -q:v 100 -lossless 1 test.webp`
- As of 2024, consider using AVIF format as it may offer better compression and quality.

For more detailed options, refer to the [FFmpeg libwebp documentation](http://ffmpeg.org/ffmpeg-all.html#libwebp).

This method is applicable for various video formats including .mov, .avi, .flv, etc., and can also be used to output .gif format.

By mastering these FFmpeg commands, you can efficiently convert your MP4 videos to optimized WebP images for web use, significantly reducing file sizes while maintaining good quality and aspect ratio.

> **Pro tip:** If all of this command-line wizardry is too much for you, just use Handbrake. It is free, open-source, and has a GUI. 😉
