import Image from 'next/image';

interface VideoLoaderProps {
  src: string;
  className?: string;
}

const defaultProps: Partial<VideoLoaderProps> = {
  className: undefined,
};

function VideoLoader({ src, className }: VideoLoaderProps) {
  return (
    <video
      className={className}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      width={1080}
      height={720}
    >
      <source
        src={`${process.env.NEXT_PUBLIC_CLOUD_URL_VIDEO}${src}.mp4`}
        type="video/mp4"
      />
      <source
        src={`${process.env.NEXT_PUBLIC_CLOUD_URL_VIDEO}${src}.webm`}
        type="video/webm"
      />
      <source
        src={`${process.env.NEXT_PUBLIC_CLOUD_URL_VIDEO}${src}.ogg`}
        type="video/ogg"
      />
      <Image
        src={`${src}.webp`}
        width={1080}
        height={720}
        alt="src"
      />
    </video>

  );
}

VideoLoader.defaultProps = defaultProps;

export default VideoLoader;
