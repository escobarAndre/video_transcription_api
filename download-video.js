import ytdl from 'ytdl-core'
import fs from 'fs'

export const downloader = (videoId) => new Promise((resolve, reject) => {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`

  const download = ytdl(videoUrl, { 
    quality: 'highestaudio', 
    filter: 'audioonly'
  })

  download.on('end', () => {
    console.log('[FINISHED_DOWNLOAD]')
    resolve()
  })

  download.on('error', (error) => {
    console.error('[ERROR_DOWNLOAD]')
    reject('[ERROR_DOWNLOADING_VIDEO]')
  })

  download.pipe(fs.createWriteStream('./audio.mp4'))
})