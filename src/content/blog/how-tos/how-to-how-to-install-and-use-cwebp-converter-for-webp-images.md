---
title: How to Install and Use cwebp Converter for WebP Images
description: A comprehensive guide on installing the cwebp converter and using it to convert images to the WebP format, including batch conversion techniques and advanced options.
date: 2024-03-16
tag: How-To
---

WebP is a modern image format that offers superior compression compared to JPEG and PNG, resulting in smaller file sizes without sacrificing quality. In this tutorial, we'll walk through the process of installing the cwebp converter and using it to convert images to WebP format.

## Installing cwebp

The cwebp converter is part of the WebP library provided by Google. Here's how to install it on different operating systems:

### macOS (using Homebrew)

1. Open Terminal
2. Install Homebrew if you haven't already:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

3. Install WebP:

```bash
brew install webp
```

### Linux (Ubuntu/Debian)

1. Open Terminal
2. Update package list:

```bash
sudo apt-get update
```

3. Install WebP:

```bash
sudo apt-get install webp
```

### Windows

1. Download the latest WebP precompiled utilities for Windows from the [official WebP website](https://developers.google.com/speed/webp/download)
2. Extract the downloaded zip file
3. Add the extracted folder's path to your system's PATH environment variable

## Using cwebp to Convert Images

Once installed, you can use cwebp to convert images from various formats (JPEG, PNG, TIFF) to WebP. Here are some examples:

### Basic Conversion

To convert a single image with default settings:

```bash
cwebp input_image.jpg -o output_image.webp
```

### Adjusting Quality

You can control the compression level using the `-q` option (0-100, where 100 is lossless):

```bash
cwebp -q 80 input_image.png -o output_image.webp
```

### Advanced Options

cwebp offers many advanced options for fine-tuning your conversions:

- `-lossless`: Create lossless WebP file
- `-size <int>`: Target size (in bytes) for the compressed file
- `-m <int>`: Compression method (0=fast, 6=slowest)
- `-resize <width> <height>`: Resize image before encoding
- `-af`: Enable auto-filter
- `-progress`: Display encoding progress

For example, to use a slower compression method with auto-filter and progress display:

```bash
cwebp -q 80 -m 6 -af -progress input_image.png -o output_image.webp
```

For a full list of options, run `cwebp -h` in your terminal.

## Batch Conversion

### Simple One-liner

For a quick batch conversion of all images in a directory, you can use this one-liner in your terminal:

```bash
'for file in images/*; do cwebp -q 50 "$file" -o "${file%.*}.webp"; done'
```

This command converts all images in the "images" directory to WebP format with a quality of 50. Adjust the quality value and directory path as needed.

### Basic Bash Script

For a more reusable solution, you can create a simple bash script. Save this as `convert_to_webp.sh`:

```bash
#!/bin/bash

for file in *.{jpg,jpeg,png,tiff}; do
    cwebp -q 80 "$file" -o "${file%.*}.webp"
done
```

Make it executable and run it in the directory containing your images:

```bash
chmod +x convert_to_webp.sh
./convert_to_webp.sh
```

### Advanced Batch Conversion

For more control over the conversion process, you can use this more advanced script:

```bash
#!/bin/bash

PARAMS=('-m 6 -q 70 -mt -af -progress')

if [ $# -ne 0 ]; then
    PARAMS=$@
fi

cd "$(pwd)"

shopt -s nullglob nocaseglob extglob

for FILE in *.@(jpg|jpeg|tif|tiff|png); do
    cwebp $PARAMS "$FILE" -o "${FILE%.*}.webp"
done
```

This script allows you to pass custom parameters when running it. For example:

```bash
./convert_to_webp.sh -q 85 -m 4
```

### Recursive Batch Conversion

To convert images in subdirectories as well, you can use this more advanced script:

```bash
#!/bin/bash

PARAMS=('-m 6 -q 50 -mt -af -progress')
for D in `find . -type d`
do
    echo "Entered directory $D"
    cd $D

    image_types=("*.jpeg" "*.jpg" "*.tiff" "*.tif" "*.png")

    for type in "${image_types[@]}"; do
        find . -type f -iname "$type" | while read -r IMAGE; do
            filename_without_extension=${IMAGE%.*}
            cwebp $PARAMS "$IMAGE" -o "${filename_without_extension}.webp"
            echo "Converted $IMAGE to ${filename_without_extension}.webp"
        done
    done
done

echo "Conversion complete."
```

### PowerShell Script for Windows Users

For Windows users, here's a PowerShell script to convert recently modified images:

```powershell
$now = Get-Date
Get-ChildItem | ? {
  ($now - $_.LastWriteTime).TotalHours -le 1
} | % {
  cwebp $_.Name -o ($_.BaseName + ".webp")
}
```

This script converts all images modified within the last hour.

## Verifying WebP Support

To ensure your website properly serves WebP images, use the `<picture>` tag:

```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description">
</picture>
```

This allows browsers that support WebP to use the WebP version, while providing a fallback for those that don't.

## Conclusion

By using cwebp to convert your images to WebP format, you can significantly reduce file sizes and improve your website's loading speed. Remember to always test your images after conversion to ensure the quality meets your standards.

For more information on WebP and its benefits, check out the [official WebP documentation](https://developers.google.com/speed/webp).

[web.dev](https://web.dev/articles/codelab-serve-images-webp) provides an excellent codelab for serving WebP images, which includes using the `<picture>` tag for browser compatibility.

For batch conversion scripts and more advanced usage, the [GitHub Gist by tabrindle](https://gist.github.com/tabrindle/ed9f77b4e96f4c98b49b) and the [Medium article by Waldek Mastykarz](https://waldekm.medium.com/convert-multiple-images-to-webp-d85e2cbabb5e) offer valuable insights and ready-to-use scripts.
