export function optimizeCloudinaryImage(
    url: string,
    {
      width = 400,
      height = 240,
      crop = 'fill',
      quality = 'auto',
      format = 'auto',
    }: {
      width?: number;
      height?: number;
      crop?: string;
      quality?: string;
      format?: string;
    } = {}
  ): string {
    if (!url || typeof url !== 'string') return url;
  
    const uploadIndex = url.indexOf('/upload/');
    if (uploadIndex === -1) return url; // Not a Cloudinary URL or malformed
  
    const transformString = `w_${width},h_${height},c_${crop},q_${quality},f_${format}`;
  
    return url.slice(0, uploadIndex + 8) + transformString + '/' + url.slice(uploadIndex + 8);
  }
  
  export function getCloudinaryBlurPlaceholder(url: string): string {
    if (!url || typeof url !== 'string') return url;
  
    const uploadIndex = url.indexOf('/upload/');
    if (uploadIndex === -1) return url;
  
    const blurTransform = `e_blur:2000,q_1`;
    return url.slice(0, uploadIndex + 8) + blurTransform + '/' + url.slice(uploadIndex + 8);
  }