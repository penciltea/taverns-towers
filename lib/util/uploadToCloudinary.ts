export const uploadToCloudinary = async (file: File): Promise<string | undefined> => {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed.");
  }
  
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "realmFoundry");

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
    return result.secure_url;
  } catch (err) {
    throw new Error("Failed to upload image to Cloudinary");
  }
};

function isFileList(value: unknown): value is FileList {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as FileList).length === "number" &&
    typeof (value as FileList).item === "function"
  );
}

export async function handleDynamicFileUpload<T extends Record<string, any>>(
  data: T,
  field: keyof T
): Promise<string | undefined> {
  const input = data[field];

  if (typeof input === "string" && input.startsWith("http")) {
    return input;
  }

  if (isFileList(input) && input.length > 0) {
    return await uploadToCloudinary(input[0]);
  }

  return undefined;
}