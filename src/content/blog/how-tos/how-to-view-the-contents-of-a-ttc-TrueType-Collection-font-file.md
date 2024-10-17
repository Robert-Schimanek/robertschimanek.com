---
title: How to View the Contents of a .ttc (TrueType Collection) Font File
description: A comprehensive guide on inspecting and viewing the contents of TrueType Collection font files using various command-line tools across different operating systems.
date: 2024-03-17
tag: How-To
---

TrueType Collection (.ttc) files are special font files that contain multiple fonts within a single file. This format is commonly used to package related fonts together, saving space and improving efficiency. In this guide, we'll explore various methods to view the contents of these files using command-line tools on different operating systems.

## Understanding TrueType Collection Files

Before we dive into the methods, it's important to understand what TrueType Collection files are:

- A .ttc file can contain multiple TrueType fonts
- They're often used for CJK (Chinese, Japanese, Korean) fonts to group related fonts
- TTC files can reduce overall file size and improve font loading efficiency

## Method 1: Using fonttools (Cross-platform)

Fonttools is a Python library for manipulating fonts. It includes a command-line tool called `ttx` that can inspect font files, including .ttc files.

### Installation

First, ensure you have Python installed. Then, install fonttools using pip:

```bash
pip install fonttools
```

### Usage

1. List all fonts in a .ttc file:

```
ttx -l /path/to/font.ttc
```

2. Extract information about a specific font in the collection:

```
ttx -t name -f <number> /path/to/font.ttc
```

Replace `<number>` with a number from 0 to the total number of fonts in the collection minus one. For example:

```
ttx -t name -f 0 /System/Library/Fonts/Avenir.ttc
```

3. Extract information for all fonts in the collection:

```
for i in {0..11}; do ttx -t name -f $i /System/Library/Fonts/Avenir.ttc; done
```

4. Extract the 'name' table for all fonts:

```
ttx -t name /path/to/font.ttc
```

## Method 2: Using fc-list (Linux and macOS)

The `fc-list` command, part of the Fontconfig library, can list fonts and their properties.

### Usage

1. List all .ttc files:

```
fc-list : file | grep ".ttc"
```

2. Get details about a specific .ttc file:

```
fc-query /path/to/font.ttc
```

## Method 3: Using otfinfo (Linux and macOS)

The `otfinfo` tool, part of the lcdf-typetools package, can provide detailed information about OpenType and TrueType fonts.

### Installation

On Ubuntu/Debian:

```
sudo apt install lcdf-typetools
```

On macOS (using Homebrew):

```
brew install lcdf-typetools
```

### Usage

View information about a .ttc file:

```
otfinfo -i /path/to/font.ttc
```

Note: This method may not work with all .ttc files on all systems.

## Method 4: Using macOS-specific tools

### ftxinstalledfonts

List all installed fonts, including those from .ttc files:

```
ftxinstalledfonts
```

### ftxdumperfuser

1. List all fonts in a .ttc collection:

```
ftxdumperfuser -t avar /path/to/font.ttc
```

2. Get detailed information about fonts in the collection:

```
ftxdumperfuser -t name /path/to/font.ttc
```

3. List all available tables in the font:

```
ftxdumperfuser -A /path/to/font.ttc
```

4. Extract information from a specific table:

```
ftxdumperfuser -t head /path/to/font.ttc
```

## Method 5: Using PowerShell (Windows)

On Windows, PowerShell can provide information about installed fonts, including those in .ttc files.

### Usage

Open PowerShell and run:

```
[System.Drawing.Text.InstalledFontCollection]::new().Families | Where-Object { $_.Name -like "*" } | Select-Object Name, IsStyleAvailable
```

This lists all installed font families and their available styles.

## Conclusion

These methods provide different ways to inspect the contents of .ttc font files across various operating systems:

- `fonttools` offers a cross-platform solution with detailed font information
- `fc-list` and `otfinfo` are useful for Linux and macOS users
- macOS-specific tools like `ftxinstalledfonts` and `ftxdumperfuser` provide additional options
- PowerShell provides a native Windows solution

By using these methods, you can easily view and manage the fonts within your TrueType Collection files. This knowledge is crucial for designers, developers, and system administrators working with multilingual applications or optimizing font usage in their projects.

Remember that some tools may require installation of additional packages, so ensure you have the necessary permissions on your system.

For more information on font management and typography, check out these resources:
- [W3C Web Fonts Working Group](https://www.w3.org/Fonts/WG/)
- [Microsoft Typography Documentation](https://docs.microsoft.com/en-us/typography/)
- [Apple Font Tools](https://developer.apple.com/fonts/)
