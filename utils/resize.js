const sharp = require('sharp')

const FORMAT_SQUARE = 'square'

module.exports = async (imageBuffer, width = null, height = null, format = null) => {
  if (!width && !height && !format) {
    return imageBuffer
  }

  try {
    const options = {
      fit: sharp.fit.inside
    }

    if (format === FORMAT_SQUARE) {
      if (!width && !height) {
        const metaData = await sharp(imageBuffer).metadata()
        width = metaData.width
        height = metaData.height
      }
      
      // get the smallest dimention and make the other one the same,
      if (width < height) {
        height = width
      } else {
        width = height
      }

      options.fit = sharp.fit.cover
      options.position = sharp.strategy.entropy
    }

    if (width) {
      options.width = width
    }

    if (height) {
      options.height = height
    }

    return await sharp(imageBuffer)
      .resize(options)
      .jpeg()
      .toBuffer()
  } catch (e) {
    console.log(e)
    return null
  }
}