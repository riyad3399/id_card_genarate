/* eslint-disable no-undef */
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const uploadToImgbb = async (filePath) => {
  const form = new FormData();
  form.append("image", fs.createReadStream(filePath));

  const res = await axios.post("https://api.imgbb.com/1/upload", form, {
    params: {
      key: process.env.IMGBB_API_KEY,
    },
    headers: form.getHeaders(),
  });

  return res.data.data.url; // 🔥 MUST return string
};

module.exports = uploadToImgbb;
