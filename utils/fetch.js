const axios = require('axios')

module.exports = async (imgUrl) => {
  const imageBuffer = await axios.get(imgUrl, {
    responseType: 'arraybuffer'
  })

  return imageBuffer.data
}