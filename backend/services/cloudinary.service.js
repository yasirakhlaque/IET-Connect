import cloudinary from '../config/cloudinary.config.js';

// Upload PDF to Cloudinary
export const uploadToCloudinary = async (file, folder = "iet_connect") => {
  try {
    if (!file || !file.buffer) {
      throw new Error("No file provided or file buffer is empty");
    }

    console.log('Cloudinary service - file info:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      bufferLength: file.buffer.length
    });

    // Convert buffer to base64
    const base64 = file.buffer.toString("base64");
    const dataUri = `data:${file.mimetype};base64,${base64}`;

    console.log('Base64 dataUri created, length:', dataUri.length);

    // Upload as raw resource type for PDFs
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: folder,
      resource_type: "raw",
      use_filename: true,
      unique_filename: true,
    });

    console.log('Cloudinary upload result:', {
      secure_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      format: uploadResult.format,
      bytes: uploadResult.bytes
    });

    return {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw err;
  }
};
