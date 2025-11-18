import NextImage from 'next/image';

export default function Image({
  src,
  width,
  alt,
  height,
  priority = false,
  sizes = '100vw',
  quality = 75,
  ...props
}) {
  return (
    <NextImage
      alt={alt}
      src={src}
      height={height}
      width={width}
      priority={priority}
      quality={quality}
      sizes={sizes}
      {...props}
    />
  );
}
