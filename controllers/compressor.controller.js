const sharp = require('sharp');
const axios = require('axios');
const fs = require('fs');

const compressImage = async (imageUrl) => {
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data);

        const compressedImageBuffer = await sharp(imageBuffer)
            .resize({ height: 728 })
            .toBuffer();

        fs.writeFileSync('imageFinallyCompressed.webp', compressedImageBuffer);
        console.log('Your image has been successfully compressed.');
    } catch (error) {
        console.error(error);
    }
};

compressImage('https://fastly.picsum.photos/id/29/4000/2670.jpg?hmac=rCbRAl24FzrSzwlR5tL-Aqzyu5tX_PA95VJtnUXegGU');
