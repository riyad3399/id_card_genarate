/* eslint-disable no-undef */
const sharp = require("sharp");

const TARGET_WIDTH = 260;
const TARGET_HEIGHT = 320;
const MAX_SIZE = 80 * 1024; // 80 KB

const processStudentPhoto = async (buffer) => {
  let quality = 80;
  let output = buffer;

  while (quality >= 40) {
    output = await sharp(buffer)
      .resize(TARGET_WIDTH, TARGET_HEIGHT, {
        fit: "cover",
      })
      .jpeg({
        quality,
        mozjpeg: true,
      })
      .toBuffer();

    if (output.length <= MAX_SIZE) {
      break;
    }

    quality -= 5;
  }

  return output;
};

module.exports = processStudentPhoto;
