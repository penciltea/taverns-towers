// helpers/cloudinaryHelper.ts
export const uploadToCloudinary = async (file: File): Promise<string | undefined> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "town_maps");
  
    const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    if (!cloudinaryUrl) {
      throw new Error("Cloudinary URL is not defined in environment variables");
    }
  
    try {
      const cloudinaryRes = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });
  
      const result = await cloudinaryRes.json();
      return result.secure_url; // Return the secure URL of the uploaded image
    } catch (err) {
      throw new Error("Failed to upload image to Cloudinary");
    }
  };
  