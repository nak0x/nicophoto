const sharp = require('sharp');
const axios = require('axios');
const fs = require('fs');

exports.compressImage = async(imageUrl) => {
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data);

        const compressedImageBuffer = await sharp(imageBuffer)
            .resize({ height: 728 })
            .toBuffer();

        const base64String = base64.from(compressedImageBuffer);
        return base64String;
    } catch (error) {
        console.error(error);
    }
};