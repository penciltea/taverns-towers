import { AppError } from "../errors/app-error";

export const uploadToCloudinary = async (file: File): Promise<string | undefined> => {
  if (!file.type.startsWith("image/")) {
    throw new AppError("Only image files are allowed.", 400);
  }
  
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "realmFoundry");

  const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  if (!cloudinaryUrl) {
    throw new AppError("Cloudinary URL is not defined in environment variables", 500);
  }

  try {
    const cloudinaryRes = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    const result = await cloudinaryRes.json();
    return result.secure_url;
  } catch (err) {
    throw new AppError(`Failed to upload image: ${err}`, 500);
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

export async function handleDynamicFileUpload<
  T extends Record<string, unknown>, 
  K extends keyof T
>(
  data: T,
  field: K
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