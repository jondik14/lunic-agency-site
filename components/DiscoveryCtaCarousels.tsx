import React from 'react';
import { CtaCarouselRow, DISCOVERY_ROWS } from './CtaCluster';

const DiscoveryCtaCarousels: React.FC = () => (
  <div className="mt-4 relative flex flex-col gap-3" role="group" aria-label="Example CTA carousels">
    <CtaCarouselRow items={DISCOVERY_ROWS[0]} animation="ctaCarouselReverse" />
    <CtaCarouselRow items={DISCOVERY_ROWS[1]} animation="ctaCarousel" />
    <CtaCarouselRow items={DISCOVERY_ROWS[2]} animation="ctaCarouselReverse" />
    <CtaCarouselRow items={DISCOVERY_ROWS[3]} animation="ctaCarousel" />
  </div>
);

export default DiscoveryCtaCarousels;
