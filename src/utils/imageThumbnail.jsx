export default function imageThumbnail({ src, width, quality }) {
    return `${process.env.NEXT_PUBLIC_CLOUD_URL}/c_thumb,w_${width - 500},q_${quality}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${src}`
  }