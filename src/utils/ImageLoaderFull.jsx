export default function ImageLoaderFull({ src, width, quality }) {
  return `${process.env.NEXT_PUBLIC_CLOUD_URL}/w_${width},q_${quality}/${process.env.NEXT_PUBLIC_CLOUD_FILE_KEY}/${src}`;
}
