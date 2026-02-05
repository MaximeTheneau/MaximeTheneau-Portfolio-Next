/* eslint-disable @next/next/no-img-element */

export default function Image({
  src,
  srcset,
  width,
  alt,
  height,
  priority,
  ...props
}) {
  return (
    <img
      alt={alt}
      src={src}
      height={height}
      width={width}
      srcSet={srcset || ''}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'low'}
      decoding="async"
      {...props}
    />
  );
}
