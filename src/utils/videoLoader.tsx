import Image from 'next/image';
import imageLoaderFull from './imageLoaderFull';

interface VideoLoaderProps {
  src: string;
}

export default function VideoLoader({ src }: VideoLoaderProps) {
    return (
        <div className="video-container">
            <video
                autoPlay
                loop
                muted
                preload="auto"
                width={1080}
                height={720}
              >
                <source
                  src={`${process.env.NEXT_PUBLIC_CLOUD_URL_VIDEO}/${src}.webm`}
                />
                <source
                  src={`${process.env.NEXT_PUBLIC_CLOUD_URL_VIDEO}/${src}.mp4`}
                />
                <Image
                  src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${src}.webp`}
                  loader={imageLoaderFull}
                  width={1080}
                  height={720}
                  alt="Video"
                  layout="fill"
                />
              </video>
        </div>

      )
  }