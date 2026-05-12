require('dotenv').config();
const cloudinary = require('./config/cloudinary');

async function testUpload() {
  console.log("CLOUDINARY_API_SECRET starts with:", process.env.CLOUDINARY_API_SECRET ? process.env.CLOUDINARY_API_SECRET.substring(0, 4) + '...' : 'UNDEFINED');
  console.log("Cloud name:", cloudinary.config().cloud_name);
  console.log("API Key:", cloudinary.config().api_key);

  try {
    // We can test by fetching account details instead of uploading, or by uploading a tiny base64 pixel
    const pixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
    console.log("Attempting upload to Cloudinary...");
    const result = await cloudinary.uploader.upload(pixel, {
      folder: 'renthub_test'
    });
    console.log("Upload successful! URL:", result.secure_url);
  } catch (error) {
    console.error("Upload failed with error:", error);
  }
}

testUpload();
