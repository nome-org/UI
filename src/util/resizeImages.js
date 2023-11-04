import imageCompression from "browser-image-compression";


/**
 * @name resizeImages
 * @param {FileList} imageFiles
 * @param {number} maxSize max size in KBs
 * @returns {Promise<File[]>}
 */
const resizeImages = async (imageFiles, maxSize) => {
    const resizedImages = [];
    for (let imageFile of imageFiles) {
      const resizedImage = await imageCompression(imageFile, {
        maxSizeMB: maxSize / 1000,
        fileType: "image/webp",
        maxWidthOrHeight: 200,
      });
      resizedImages.push(resizedImage);
    }
    return resizedImages;
};



export default resizeImages;