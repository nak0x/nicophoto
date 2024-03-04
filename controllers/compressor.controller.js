const sharp = require('sharp');
const fs = require('fs');


// Fonction qui prend en paramètre le chemin du fichier image et la hauteur de l'image à compresser
exports.compressImage = async(filePath, height = 728) => {
    // On essaye de lire le fichier image
  try {
    // On lit le fichier image
    const imageBuffer = fs.readFileSync(filePath);

    // On compresse l'image
    let compressedImageBuffer = imageBuffer;
    // Si la hauteur est spécifiée, on compresse l'image en fonction de la hauteur
    if (height) {
      compressedImageBuffer = await sharp(imageBuffer)
      // On redimensionne l'image en fonction de la hauteur, par défaut, 728px
        .resize({ height })
        // On convertit l'image en jpeg
        .toBuffer();
    }

    // On convertit l'image compressée en base64
    const base64String = Buffer.from(compressedImageBuffer).toString('base64');
    // On retourne l'image compressée en base64
    return base64String;
  } 
  // Si une erreur survient, on la log dans la console
  catch (error) {
    console.error(error);
  }
}
