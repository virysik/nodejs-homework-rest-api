const Jimp = require('jimp')

const jimpCrop = async (filePath) => {
  try {
    const img = await Jimp.read(filePath)
    await img
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(filePath)
  } catch (error) {
    console.error(error)
  }
}

module.exports = jimpCrop
