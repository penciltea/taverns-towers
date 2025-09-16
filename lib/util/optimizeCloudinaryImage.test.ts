import { optimizeCloudinaryImage, getCloudinaryBlurPlaceholder } from "./optimizeCloudinaryImage";

describe("optimizeCloudinaryImage", () => {
    const baseUrl =
        "https://res.cloudinary.com/demo/image/upload/v1234567/sample.jpg";

    it("returns the same url if input is empty string", () => {
        expect(optimizeCloudinaryImage("")).toBe("");
    });

    it("returns the same url if input is not a Cloudinary URL", () => {
        const nonCloudinary = "https://example.com/image.jpg";
        expect(optimizeCloudinaryImage(nonCloudinary)).toBe(nonCloudinary);
    });

    it("inserts transformation string with defaults", () => {
        const result = optimizeCloudinaryImage(baseUrl);
        expect(result).toContain(
        "w_400,h_240,c_fill,q_auto,f_auto"
        );
        expect(result).toMatch(
        /^https:\/\/res\.cloudinary\.com\/demo\/image\/upload\/w_400,h_240,c_fill,q_auto,f_auto\/v1234567\/sample\.jpg$/
        );
    });

    it("applies custom options", () => {
        const result = optimizeCloudinaryImage(baseUrl, {
        width: 800,
        height: 600,
        crop: "scale",
        quality: "70",
        format: "webp",
        });
        expect(result).toContain("w_800,h_600,c_scale,q_70,f_webp");
    });

    it("handles malformed Cloudinary URL without /upload/", () => {
        const malformed = "https://res.cloudinary.com/demo/image/v1234567/sample.jpg";
        expect(optimizeCloudinaryImage(malformed)).toBe(malformed);
    });
});

describe("getCloudinaryBlurPlaceholder", () => {
    const baseUrl =
        "https://res.cloudinary.com/demo/image/upload/v1234567/sample.jpg";

    it("returns the same url if input is empty string", () => {
        expect(getCloudinaryBlurPlaceholder("")).toBe("");
    });

    it("returns the same url if input is not a Cloudinary URL", () => {
        const nonCloudinary = "https://example.com/image.jpg";
        expect(getCloudinaryBlurPlaceholder(nonCloudinary)).toBe(nonCloudinary);
    });

    it("inserts blur transformation string", () => {
        const result = getCloudinaryBlurPlaceholder(baseUrl);
        expect(result).toContain("e_blur:2000,q_1");
        expect(result).toMatch(
        /^https:\/\/res\.cloudinary\.com\/demo\/image\/upload\/e_blur:2000,q_1\/v1234567\/sample\.jpg$/
        );
    });

    it("handles malformed Cloudinary URL without /upload/", () => {
        const malformed = "https://res.cloudinary.com/demo/image/v1234567/sample.jpg";
        expect(getCloudinaryBlurPlaceholder(malformed)).toBe(malformed);
    });
});
