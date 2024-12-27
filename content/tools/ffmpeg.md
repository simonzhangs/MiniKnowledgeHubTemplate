# FFmpeg

一个完整的跨平台解决方案，用于录制、转换和流式传输音频和视频。

网址：https://www.ffmpeg.org/

将视频转换为音频文件：

```
ffmpeg -i input.mp4 output.avi
```

m4a 文件转换为 mp3 文件：

```
ffmpeg -i input.m4a -c:v copy -c:a libmp3lame -q:a 2 output.mp3
```

mp3 转 g711a 命令：

```
ffmpeg -i test.mp3 -acodec pcm_alaw -f alaw -ac 1 -ar 8000 -vn test.alaw
```

使用 ffplay 播放测试

```
ffplay -i test.alaw -f alaw -ac 1 -ar 8000
```
