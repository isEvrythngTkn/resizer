const sharp = require('sharp')

module.exports = async (imageBuffer, width, height, format) => {
  try {
    // assumption: width and height are less than or equal to the image height
    const imageMeta = await sharp(imageBuffer).metadata()

    const left = Math.floor((imageMeta.width - width) / 2)
    const top = Math.floor((imageMeta.height - height) / 2)

    return await sharp(imageBuffer)
      .extract({
        left,
        top,
        width,
        height
      })
      .jpeg()
      .toBuffer()
  } catch (e) {
    console.log(e)
  }

  return imageBuffer
}