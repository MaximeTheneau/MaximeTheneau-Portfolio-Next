import Image from 'next/image';
import ImageLoaderFull from './ImageLoaderFull';

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
        </div>

      )
  }