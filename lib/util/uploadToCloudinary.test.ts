import { uploadToCloudinary, handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";

describe("fileUpload", () => {
    const originalEnv = process.env;

    beforeAll(() => {
        process.env = { ...originalEnv, NEXT_PUBLIC_CLOUDINARY_URL: "http://mock.cloudinary.url" };
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    beforeEach(() => {
        // Reset fetch mock before each test
        global.fetch = jest.fn();
    });

    describe("uploadToCloudinary", () => {
        it("throws an error if file is not an image", async () => {
            const file = new File(["test"], "test.txt", { type: "text/plain" });
            await expect(uploadToCloudinary(file)).rejects.toThrow(
                "Only image files are allowed."
            );
        });

        it("throws an error if NEXT_PUBLIC_CLOUDINARY_URL is undefined", async () => {
            process.env.NEXT_PUBLIC_CLOUDINARY_URL = undefined;
            const file = new File(["test"], "test.png", { type: "image/png" });
            await expect(uploadToCloudinary(file)).rejects.toThrow(
                "Cloudinary URL is not defined in environment variables"
            );
            process.env.NEXT_PUBLIC_CLOUDINARY_URL = "http://mock.cloudinary.url";
        });

        it("uploads an image successfully", async () => {
            const file = new File(["test"], "test.png", { type: "image/png" });

            (global.fetch as jest.Mock).mockResolvedValue({
                json: jest.fn().mockResolvedValue({ secure_url: "http://cloudinary.test/image.png" }),
            });

            const url = await uploadToCloudinary(file);
            expect(url).toBe("http://cloudinary.test/image.png");
            expect(fetch).toHaveBeenCalledWith(
                process.env.NEXT_PUBLIC_CLOUDINARY_URL,
                expect.objectContaining({ method: "POST" })
            );
        });

        it("throws an error if fetch fails", async () => {
            const file = new File(["test"], "test.png", { type: "image/png" });

            (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

            await expect(uploadToCloudinary(file)).rejects.toThrow(
                "Failed to upload image: Error: Network error"
            );
        });
    });

    describe("handleDynamicFileUpload", () => {
        it("returns the URL if field is already a string starting with http", async () => {
            const data = { imageField: "http://existing.url/image.png" };
            const url = await handleDynamicFileUpload(data, "imageField");
            expect(url).toBe("http://existing.url/image.png");
        });

        it("uploads the first file if field is a FileList", async () => {
            const file = new File(["test"], "test.png", { type: "image/png" });
            const fileList = { 0: file, length: 1, item: () => file } as unknown as FileList;

            (global.fetch as jest.Mock).mockResolvedValue({
                json: jest.fn().mockResolvedValue({ secure_url: "http://cloudinary.test/image.png" }),
            });

            const data = { fileField: fileList };
            const url = await handleDynamicFileUpload(data, "fileField");
            expect(url).toBe("http://cloudinary.test/image.png");
            expect(fetch).toHaveBeenCalled();
        });

        it("returns undefined if field is empty string or empty FileList", async () => {
            const emptyFileList = { length: 0, item: () => null } as unknown as FileList;
            const data1 = { fileField: "" };
            const data2 = { fileField: emptyFileList };

            expect(await handleDynamicFileUpload(data1, "fileField")).toBeUndefined();
            expect(await handleDynamicFileUpload(data2, "fileField")).toBeUndefined();
        });

        it("returns undefined if field is not string or FileList", async () => {
            const data = { fileField: 123 };
            const url = await handleDynamicFileUpload(data, "fileField");
            expect(url).toBeUndefined();
        });
    });
});
