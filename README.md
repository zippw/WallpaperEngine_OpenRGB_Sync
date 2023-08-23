# OpenRGB x Wallpaper Engine - Wavy Wallpaper

**(Wallpapers for Wallpaper Engine haven't been released yet, but they will be available soon.)**
This wallpaper syncs with OpenRGB, receiving color data and illuminating your wallpaper like a dazzling light show!  
Many thanks to qiangqiang101 for the amazing [program](https://github.com/qiangqiang101/OpenRGB-Wallpaper-Engine), I was inspired by this idea to create my own simple one with little frontend and backend.

[![Demo video](https://img.youtube.com/vi/tdu4lweSOdQ/maxresdefault.jpg)](https://youtu.be/tdu4lweSOdQ)

## Important

1. It supports only 1 color channel.
2. It requires this server to run.
3. It has problems with "Playback" parameters in Wallpaper engine, so you should replace all `pause` options with `Stop (free memory)` otherwise it will crash a few minutes later.
4. When starting a new pm2 process, ensure that no other instances are already running to avoid encountering multiple errors.

## Installation

- Ensure you have node.js installed (I'm using 16.20.1 version).
- Clone or download the repository.
- Install dependencies: `$ npm install`.
- Build the project: `$ npm run build`.
- Launch OpenRGB software.
- In OpenRGB Settings > E1.31 Devices, add a new device with the provided parameters.

<table><tbody><tr><td>IP (Unicast)</td><td>127.0.0.1</td></tr><tr><td>Start Universe</td><td>1</td></tr><tr><td>Start Channel</td><td>1</td></tr><tr><td>Number of LEDs</td><td>1</td></tr><tr><td>Type</td><td>Single</td></tr><tr><td>RGB Order</td><td>RGB</td></tr><tr><td>Universe size</td><td>6</td></tr></tbody></table>

- Run WallpaperEngine and select the wavy wallpaper.
- Input your server port (default: `9734`, configurable in `config.json`).

## Usage

After installation, start the server with `$ npm run start`. Alternatively, use the pm2 module to run this as a process: `$ npm install pm2 -g` and launch it with a single click using `run.bat`. Monitor the process with `pm2 list` and manage it with `pm2 delete <id>` or `pm2 restart <id>`.

Thank you!
