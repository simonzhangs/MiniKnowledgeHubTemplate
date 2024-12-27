# FFmpeg

m4a 文件转换为 mp3 文件：

```
ffmpeg -i input.m4a -c:v copy -c:a libmp3lame -q:a 2 output.mp3
```
