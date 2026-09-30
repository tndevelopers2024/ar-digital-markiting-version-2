import { WebArtwork, WebContent } from "./pages/WebDevelopment";
import { ShopArtwork, ShopContent } from "./pages/Ecommerce";
import { DesignArtwork, DesignContent } from "./pages/GraphicDesign";
import { BrandArtwork, BrandContent } from "./pages/Branding";
import { AppArtwork, AppContent } from "./pages/MobileApps";
import { UxArtwork, UxContent } from "./pages/UiUx";
import { VideoArtwork, VideoContent } from "./pages/Video";
import { MarketingArtwork, MarketingContent } from "./pages/Marketing";
import { AiArtwork, AiContent } from "./pages/Ai";
import { TestingArtwork, TestingContent } from "./pages/Testing";
export const serviceExperiences = {
 'web-development': {Artwork:WebArtwork,Content:WebContent,layout:'wide',cta:'Give your business a better home online.',button:'Plan my website',related:['ui-ux-design','ecommerce-development','digital-marketing']},
 'ecommerce-development': {Artwork:ShopArtwork,Content:ShopContent,layout:'commerce',cta:'Ready for a store that works harder?',button:'Plan my online store',related:['graphic-design','web-development','digital-marketing']},
 'graphic-design': {Artwork:DesignArtwork,Content:DesignContent,layout:'studio',cta:'Let’s give your brand a look of its own.',button:'Discuss my design project',related:['branding-strategy','video-editing','ui-ux-design']},
 'branding-strategy': {Artwork:BrandArtwork,Content:BrandContent,layout:'strategy',cta:'Make your next chapter clear.',button:'Talk about my brand',related:['graphic-design','digital-marketing','web-development']},
 'mobile-app-development': {Artwork:AppArtwork,Content:AppContent,layout:'mobile',cta:'Have an app idea worth building?',button:'Plan my app',related:['ui-ux-design','web-development','software-testing']},
 'ui-ux-design': {Artwork:UxArtwork,Content:UxContent,layout:'product',cta:'Make your product easier to use.',button:'Review my product experience',related:['mobile-app-development','web-development','software-testing']},
 'video-editing': {Artwork:VideoArtwork,Content:VideoContent,layout:'cinema',cta:'Let’s turn your footage into a story.',button:'Plan my next video',related:['graphic-design','digital-marketing','branding-strategy']},
 'digital-marketing': {Artwork:MarketingArtwork,Content:MarketingContent,layout:'growth',cta:'Make your next campaign count.',button:'Discuss my marketing goals',related:['web-development','video-editing','branding-strategy']},
 'ai-development': {Artwork:AiArtwork,Content:AiContent,layout:'automation',cta:'What could your team stop doing manually?',button:'Explore an AI project',related:['web-development','software-testing','mobile-app-development']},
 'software-testing': {Artwork:TestingArtwork,Content:TestingContent,layout:'quality',cta:'Know what needs fixing before launch.',button:'Plan a product review',related:['web-development','mobile-app-development','ui-ux-design']},
} as const;
