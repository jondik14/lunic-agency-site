import React from 'react';
import {
  Phone,
  ArrowRight,
  Mail,
  ChevronRight,
  Download,
  LogIn,
  UserPlus,
  CreditCard,
  FileText,
  type LucideIcon,
} from 'lucide-react';

type Shape = 'pill' | 'rounded' | 'sharp';
type Size = 'sm' | 'md' | 'lg';
type Style = 'solid' | 'outline' | 'ghost';
type Color = 'accent' | 'white' | 'muted' | 'emerald' | 'amber' | 'rose' | 'violet' | 'teal' | 'gradientWarm';

interface CtaItem {
  id: string;
  label: string;
  shape: Shape;
  size: Size;
  style: Style;
  color: Color;
  icon?: LucideIcon;
  trailingIcon?: true;
  colSpan?: 1 | 2;
}

const ITEMS: CtaItem[] = [
  { id: '1', label: 'Schedule a consult', shape: 'pill', size: 'lg', style: 'solid', color: 'accent', icon: Phone, colSpan: 1 },
  { id: '2', label: 'Begin your project', shape: 'rounded', size: 'md', style: 'solid', color: 'white', colSpan: 1 },
  { id: '3', label: 'Create account', shape: 'rounded', size: 'sm', style: 'outline', color: 'violet', colSpan: 1 },
  { id: '4', label: 'Access dashboard', shape: 'sharp', size: 'sm', style: 'ghost', color: 'muted', icon: LogIn, colSpan: 1 },
  { id: '5', label: 'Join the list', shape: 'pill', size: 'sm', style: 'solid', color: 'rose', colSpan: 1 },
  { id: '6', label: 'Order today', shape: 'rounded', size: 'md', style: 'solid', color: 'emerald', colSpan: 1 },
  { id: '7', label: 'Try it free', shape: 'rounded', size: 'md', style: 'outline', color: 'teal', colSpan: 2 },
  { id: '8', label: 'Send a brief', shape: 'sharp', size: 'sm', style: 'ghost', color: 'teal', colSpan: 1 },
  { id: '9', label: 'See packages', shape: 'rounded', size: 'md', style: 'outline', color: 'accent', icon: CreditCard, colSpan: 1 },
  { id: '10', label: 'Browse portfolio', shape: 'rounded', size: 'sm', style: 'outline', color: 'white', icon: FileText, colSpan: 1 },
  { id: '11', label: 'Get in touch', shape: 'pill', size: 'md', style: 'solid', color: 'gradientWarm', icon: Mail, colSpan: 1 },
  { id: '12', label: 'Get the guide', shape: 'sharp', size: 'sm', style: 'ghost', color: 'amber', icon: Download, colSpan: 1 },
  { id: '13', label: 'Explore more', shape: 'rounded', size: 'md', style: 'ghost', color: 'white', trailingIcon: true, colSpan: 2 },
  { id: '14', label: 'Book a walkthrough', shape: 'rounded', size: 'md', style: 'outline', color: 'rose', colSpan: 1 },
  { id: '15', label: 'Request a quote', shape: 'sharp', size: 'md', style: 'outline', color: 'emerald', colSpan: 1 },
  { id: '16', label: 'Start a project', shape: 'pill', size: 'sm', style: 'solid', color: 'violet', colSpan: 1 },
];

/** Unique button sets for each of the 4 Discovery CTA rows (no overlap). */
export const DISCOVERY_ROWS: [CtaItem[], CtaItem[], CtaItem[], CtaItem[]] = [
  ITEMS.slice(0, 4),
  ITEMS.slice(4, 8),
  ITEMS.slice(8, 12),
  ITEMS.slice(12, 16),
];

const shapeClass: Record<Shape, string> = {
  pill: 'rounded-full',
  rounded: 'rounded-xl',
  sharp: 'rounded-md',
};

const sizeClass: Record<Size, string> = {
  sm: 'min-h-[36px] px-3 py-1.5 text-[10px]',
  md: 'min-h-[44px] px-4 py-2 text-[10px]',
  lg: 'min-h-[44px] px-5 py-2.5 text-xs',
};

function getStyleClasses(style: Style, color: Color): string {
  const base = 'font-sans font-bold tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] active:scale-[0.98] hover:-translate-y-0.5';
  const solid: Record<Color, string> = {
    accent: 'bg-studio-accent text-white hover:bg-studio-accent/90',
    white: 'bg-white/90 text-studio-ink hover:bg-white',
    muted: 'bg-white/15 text-white/90 hover:bg-white/25',
    emerald: 'bg-emerald-600/80 text-white hover:bg-emerald-500/90',
    amber: 'bg-amber-600/80 text-white hover:bg-amber-500/90',
    rose: 'bg-rose-500/90 text-white hover:bg-rose-400',
    violet: 'bg-violet-500/90 text-white hover:bg-violet-400',
    teal: 'bg-teal-500/90 text-white hover:bg-teal-400',
    gradientWarm: 'bg-gradient-to-r from-amber-400 to-orange-700 text-white hover:opacity-95',
  };
  const outline: Record<Color, string> = {
    accent: 'border border-studio-accent text-studio-accent hover:bg-studio-accent/15',
    white: 'border border-white/40 text-white hover:bg-white/10',
    muted: 'border border-white/20 text-white/80 hover:bg-white/5',
    emerald: 'border border-emerald-500/60 text-emerald-400 hover:bg-emerald-500/10',
    amber: 'border border-amber-500/60 text-amber-400 hover:bg-amber-500/10',
    rose: 'border border-rose-400/60 text-rose-300 hover:bg-rose-500/10',
    violet: 'border border-violet-400/60 text-violet-300 hover:bg-violet-500/10',
    teal: 'border border-teal-400/60 text-teal-300 hover:bg-teal-500/10',
    gradientWarm: 'border border-amber-500/60 text-amber-400 hover:bg-amber-500/10',
  };
  const ghost: Record<Color, string> = {
    accent: 'text-studio-accent hover:bg-studio-accent/15',
    white: 'text-white/90 hover:bg-white/10',
    muted: 'text-white/60 hover:bg-white/10',
    emerald: 'text-emerald-400/90 hover:bg-emerald-500/10',
    amber: 'text-amber-400/90 hover:bg-amber-500/10',
    rose: 'text-rose-300 hover:bg-rose-500/10',
    violet: 'text-violet-300 hover:bg-violet-500/10',
    teal: 'text-teal-300 hover:bg-teal-500/10',
    gradientWarm: 'text-amber-400/90 hover:bg-amber-500/10',
  };
  const map = { solid: solid[color], outline: outline[color], ghost: ghost[color] };
  return `${base} ${map[style]}`;
}

const carouselSizeClass = 'px-5 py-2.5 text-sm flex-shrink-0';

export interface CtaCarouselRowProps {
  items?: CtaItem[];
  animation?: 'ctaCarousel' | 'ctaCarouselReverse';
}

const EDGE_FADE =
  'linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)';

export const CtaCarouselRow: React.FC<CtaCarouselRowProps> = ({ items = ITEMS, animation = 'ctaCarousel' }) => {
  const duplicated = [...items, ...items];
  return (
    <div className="overflow-hidden relative">
      <div
        className="cta-carousel-inner flex gap-5 py-1"
        style={{
          width: 'max-content',
          animation: `${animation} 45s linear infinite`,
          maskImage: EDGE_FADE,
          WebkitMaskImage: EDGE_FADE,
        }}
      >
        {duplicated.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={`${item.id}-${idx}`}
              type="button"
              className={`
                inline-flex items-center justify-center gap-1.5
                ${shapeClass[item.shape]}
                ${carouselSizeClass}
                ${getStyleClasses(item.style, item.color)}
              `}
              aria-label={item.label}
            >
              {Icon && <Icon className="w-4 h-4 flex-shrink-0" aria-hidden />}
              <span className="break-words text-center whitespace-nowrap">{item.label}</span>
              {item.trailingIcon && (
                <ChevronRight className="w-4 h-4 flex-shrink-0 ml-0.5" aria-hidden />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const CtaCluster: React.FC = () => (
  <div className="mt-4 relative" role="group" aria-label="Example CTA cluster for navigation and actions">
    <CtaCarouselRow animation="ctaCarousel" />
  </div>
);

export default CtaCluster;
