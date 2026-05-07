import type { SanityAsset } from '../../types';
import { SmartImage } from './SmartImage';
import { YouTubePlayer } from './YouTubePlayer';
import { VimeoPlayer } from './VimeoPlayer';
import { SanityVideoPlayer } from './SanityVideoPlayer';

interface AssetRendererProps {
  asset: SanityAsset;
  isThumbnail?: boolean;
  className?: string;
}

export function AssetRenderer({ asset, isThumbnail = false, className }: AssetRendererProps) {
  if (asset.type === 'video') {
    // Determine the video provider
    if (asset.videoType === 'youtube' || asset.assetUrl.includes('youtube.com') || asset.assetUrl.includes('youtu.be')) {
      return <YouTubePlayer url={asset.assetUrl} alt={asset.altText} isThumbnail={isThumbnail} className={className} />;
    }
    if (asset.videoType === 'vimeo' || asset.assetUrl.includes('vimeo.com')) {
      return <VimeoPlayer url={asset.assetUrl} alt={asset.altText} isThumbnail={isThumbnail} className={className} />;
    }
    // Fallback to natively hosted Sanity video
    return <SanityVideoPlayer url={asset.assetUrl} alt={asset.altText} isThumbnail={isThumbnail} className={className} />;
  }

  // Fallback to standard Image
  return <SmartImage src={asset.assetUrl} alt={asset.altText} className={className} />;
}
