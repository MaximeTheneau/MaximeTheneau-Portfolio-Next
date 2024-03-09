import Image from 'next/image';
import ImageLoaderFull from './ImageLoaderFull';

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
      />
      <source
        src={`${process.env.NEXT_PUBLIC_CLOUD_URL_VIDEO}${src}.webm`}
      />
      <source
        src={`${process.env.NEXT_PUBLIC_CLOUD_URL_VIDEO}${src}.ogg`}
      />
      <Image
        src={`${process.env.NEXT_PUBLIC_CLOUD_URL}${src}.webp`}
        loader={ImageLoaderFull}
        width={1080}
        height={720}
        alt="Video"
      />
    </video>

  );
}

VideoLoader.defaultProps = defaultProps;

export default VideoLoader;
