/* eslint-disable no-undef */
const axios = require("axios");
const FormData = require("form-data");

const uploadToImgbb = async (buffer) => {
  const form = new FormData();
  form.append("image", buffer.toString("base64"));

  const res = await axios.post("https://api.imgbb.com/1/upload", form, {
    params: { key: process.env.IMGBB_API_KEY },
    headers: form.getHeaders(),
  });

  return res.data.data.url;
};

module.exports = uploadToImgbb;
