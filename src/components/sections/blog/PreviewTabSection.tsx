import type { BlogPreview } from '../../../types';
import { PreviewCarousel } from '../../common/PreviewCarousel';
import { SocialIcon } from '../../common/SocialIcon';
import { ReadMoreMarkdown } from '../../common/ReadMoreMarkdown';
import { ReadMoreText } from '../../common/ReadMoreText';

interface PreviewTabSectionProps {
  data: BlogPreview;
}

export function PreviewTabSection({ data }: PreviewTabSectionProps) {
  const { profileDetails, description, carousel, profilePhoto } = data;
  const avatar = profilePhoto || profileDetails.selfPortrait;

  return (
    <section className="w-full bg-card rounded-lg overflow-hidden border border-border">
      {/* LinkedIn Style Banner */}
      <div className="relative">
        <PreviewCarousel assets={carousel} className="h-64 md:h-80" />
        
        {/* Profile Avatar Overlap */}
        <div className="absolute left-6 -bottom-16 md:left-8 md:-bottom-20 z-10">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-card overflow-hidden bg-card-hover">
            {avatar && (
              <img 
                src={avatar.assetUrl} 
                alt={avatar.altText || profileDetails.name} 
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="pt-20 pb-8 px-6 md:px-8 flex flex-col space-y-6">
        
        {/* Primary Info */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {profileDetails.name}
          </h1>
          <div className="w-full max-w-2xl">
            <ReadMoreText text={profileDetails.tagline} maxLength={120} className="text-base text-secondary" />
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4 pt-2">
            {profileDetails.links?.map((link, idx) => (
              <SocialIcon key={idx} link={link} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border" />

        {/* Description Section */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-primary">About</h2>
          <div className="w-full">
            <ReadMoreMarkdown content={description} maxHeight={160} />
          </div>
        </div>
      </div>
    </section>
  );
}
