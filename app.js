const express = require('express')
const fetch = require('./utils/fetch')
const resize = require('./utils/resize')
const crop = require('./utils/crop')

const app = express()
const port = 3000

const regionUrl = 'https://s3-us-west-2.amazonaws.com'

app.get('/*', async (req, res) => {
  try {
    const imgPath = req.params[0]
    const { h: height, w: width, format } = req.query

    let imageBuffer = await fetch(`${regionUrl}/${imgPath}`)
    imageBuffer = await crop(imageBuffer, parseInt(width), parseInt(height))
    imageBuffer = await resize(imageBuffer, parseInt(width), parseInt(height), format)

    res.setHeader( "Content-Type", "image/jpeg")
    res.setHeader( "Content-Length", imageBuffer.length)
    res.send(imageBuffer)
  } catch (e) {
    console.log(e)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})