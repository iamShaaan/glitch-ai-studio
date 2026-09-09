export interface VideoSlot {
  id: number;
  label: string;
  badge: string;
  title: string;
  subtitle: string;
  scriptPrompt?: string;
  showcaseHeadline?: string;
  conceptPrimary?: string;
  conceptSecondary?: string;
  metrics?: { label: string; value: string; sub?: string }[];
  category?: string;
  videoUrl: string; // Cloudflare Stream / R2 URL
  posterUrl?: string; // Optional poster image preview
  aspectRatio: "9/16" | "16/9" | "4/5" | "4/3";
  details?: string;
}

export const VIDEO_SLOTS: Record<number, VideoSlot> = {
  // ── Video #1: Hero Section (Featured 16:9 Reel) ───────────────────────────
  1: {
    id: 1,
    label: "HERO REEL",
    badge: "● LIVE SPECIMEN 01",
    title: "Use Your AI Avatar",
    subtitle: "16:9 • 4K 60FPS • Ultra-Realistic Cloned Lip-Sync & Motion",
    videoUrl: "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Use%20your%20Ai%20Avatar.mp4",
    posterUrl: "",
    aspectRatio: "16/9",
    details: "Voice Match: 99.8% • 100% Cloned Lip-Sync • 16:9 Widescreen",
  },

  // ── Video #2: Cinema Rack Showcase Slot 1: AI Travel Influencer ────────────
  2: {
    id: 2,
    label: "SPECIMEN 01",
    badge: "AI TRAVEL INFLUENCER",
    title: "Promote Tourism-Related Business\nWith AI Influencer",
    subtitle: "16:9 • Global Travel Persona • Tourism, Hotels & Travel Gear",
    showcaseHeadline: "PROMOTE TOURISM-RELATED BUSINESS WITH AI INFLUENCER",
    conceptPrimary:
      "You can create a travel AI influencer to promote your business related to travel, tourism, hotels, and anything related to travel and tourism.",
    conceptSecondary:
      "Promote destinations, hotel experiences, travel gadgets, accessories, and gear with an authentic AI travel influencer built for your audience.",
    scriptPrompt:
      "Create a custom travel AI influencer to promote travel and tourism businesses, hotels, destinations, and travel gear.",
    metrics: [
      { label: "Tourism Reach", value: "GLOBAL", sub: "Destinations & Hotels" },
      { label: "Sponsorship Scope", value: "GEAR & GADGETS", sub: "Travel Accessories" },
    ],
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Visiting%20India.mp4",
    posterUrl: "",
    aspectRatio: "16/9",
    category: "Travel & Tourism",
    details: "SPECIMEN: VISITING INDIA • TRAVEL AI INFLUENCER • 16:9",
  },

  // ── Video #3: Cinema Rack Showcase Slot 2: Promote Service With AI Clone ──
  3: {
    id: 3,
    label: "SPECIMEN 02",
    badge: "REAL HUMAN CLONE",
    title: "Promote Your Service Using\nYour AI Clone",
    subtitle: "16:9 • Real Human Clone • High-Converting Service Offers",
    showcaseHeadline: "PROMOTE YOUR SERVICE USING YOUR REAL HUMAN AI CLONE",
    conceptPrimary:
      "Promote your service using your AI clone. A real human clone that represents your business, pitches your offers, and connects with clients effortlessly.",
    conceptSecondary:
      "Scale your client acquisition and service presentations with zero filming burnout. Your AI clone delivers your authentic likeness, voice, and personal charisma on demand.",
    scriptPrompt:
      "Promote your service using your authentic real human AI clone to pitch clients, explain deliverables, and scale your personal brand.",
    metrics: [
      { label: "Human Likeness", value: "1:1 CLONE", sub: "Exact Face & Voice" },
      { label: "Client Outreach", value: "SCALE ON DEMAND", sub: "Zero Filming Burnout" },
    ],
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Fiverr%20GIG%20Update%20Video.mp4",
    posterUrl: "",
    aspectRatio: "16/9",
    category: "Real Human Clone",
    details: "SPECIMEN: PROMOTING SERVICES • REAL HUMAN CLONE • 16:9",
  },

  // ── Video #4: Cinema Rack Showcase Slot 3: Promote Your Product With AI Influencer ─
  4: {
    id: 4,
    label: "SPECIMEN 03",
    badge: "NICHE AI PERSONA",
    title: "Dominate Your Niche With A\nUnique AI Persona",
    subtitle: "16:9 • Custom AI Persona • Targeted Niche Promotion & Reviews",
    showcaseHeadline: "DOMINATE YOUR NICHE WITH A CUSTOM AI INFLUENCER",
    conceptPrimary:
      "Build an AI persona that your target audience connects with well and ultimately promotes your product in a well-targeted niche market.",
    conceptSecondary:
      "Position your AI character as a trusted specialist to review offerings, showcase unique product features, and drive consistent conversions without camera crews or studio delays.",
    scriptPrompt:
      "Create a custom AI influencer expert in your niche to review and promote your unique products.",
    metrics: [
      { label: "Audience Connection", value: "NICHE-FIRST", sub: "Deep Category Trust" },
      { label: "Content Velocity", value: "INSTANT", sub: "Zero Studio Delays" },
    ],
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Promote%20your%20product%20with%20your%20AI%20influencer.mp4",
    posterUrl: "",
    aspectRatio: "16/9",
    category: "Product Promotion",
    details: "SPECIMEN: PROMOTE YOUR PRODUCT WITH AI INFLUENCER • 16:9",
  },

  // ── Video #5: Autonomous Cinema Rack (Showcase Slot 4: Avatar For Local Business) ─
  5: {
    id: 5,
    label: "SPECIMEN 04",
    badge: "AVATAR FOR LOCAL BUSINESS",
    title: "Avatar for Local Business",
    subtitle: "16:9 • Custom AI Persona • Built From Scratch",
    showcaseHeadline: "REPRESENT YOUR BUSINESS WITH AN AI INFLUENCER",
    conceptPrimary:
      "You can create an AI character from scratch just to represent your company or your business. It's not always necessary to clone yourself.",
    conceptSecondary:
      "If you are a company and you don't want to be bound to any person, you can create a separate AI influencer that will be a representative of your brand or business. It can be applicable for local businesses as well as big enterprises.",
    scriptPrompt:
      "Create a distinct brand-owned AI persona for your company to drive authentic engagement without person dependency.",
    metrics: [
      { label: "IP Ownership", value: "100%", sub: "Full Brand Control" },
      { label: "Talent Risk", value: "ZERO", sub: "No Person Dependency" },
    ],
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/OKC%20Roofers%20Avatar.mp4",
    posterUrl: "",
    aspectRatio: "16/9",
    category: "Brand Representation",
    details: "SPECIMEN: OKC ROOFERS COMMERCIAL • 16:9 LANDSCAPE",
  },

  // ── Video #6: Cinema Rack Showcase Slot 5: Polyglot ─────────────────────────
  6: {
    id: 6,
    label: "SPECIMEN 05",
    badge: "GLOBAL VOICE CLONE",
    title: "Polyglot Voice Sync / Shan",
    subtitle: "9:16 • 6 Languages • Native Cadence & Phonetic Sync",
    showcaseHeadline: "CROSS-BORDER MULTILINGUAL LOCALIZATION AT NATIVE FIDELITY",
    conceptPrimary:
      "Seamlessly deliver video presentations in 6+ international languages while retaining your exact vocal timbre, inflection, and frame-accurate phonetic lip motion.",
    conceptSecondary:
      "Expand your brand or personal reach into European, Latin American, and Asian markets effortlessly without foreign dubbing artifacts or disconnected audio tracks.",
    scriptPrompt:
      "Autonomous multilingual cloning maintaining 99.8% vocal timbre match with precise mouth and jaw movements in every target language.",
    metrics: [
      { label: "Languages", value: "6+", sub: "Native Phonetic Sync" },
      { label: "Vocal Match", value: "99.8%", sub: "Timbre Preservation" },
    ],
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Fiverr%20GIG%20Update%20Video.mp4",
    posterUrl: "",
    aspectRatio: "9/16",
    category: "Digital Twins",
    details: "SPECIMEN: POLYGLOT VOICE SYNC • SHAN • 9:16 VERTICAL",
  },

  // ── Video #7: Selected Works 1 ──────────────────────────────────────────────
  7: {
    id: 7,
    label: "ARCHIVE 01",
    badge: "DTC LUXURY",
    title: "Aircond®",
    subtitle: "Full UGC Engine • 240+ Ads",
    details:
      "Complete autonomous synthetic video campaign generating 12 new TikTok hook variations per week without physical creators.",
    videoUrl: "", // Paste your Cloudflare video URL here
    posterUrl: "",
    aspectRatio: "4/3",
  },

  // ── Video #8: Selected Works 2 ──────────────────────────────────────────────
  8: {
    id: 8,
    label: "ARCHIVE 02",
    badge: "LOOKBOOK AI",
    title: "Fashionista",
    subtitle: "Zero Studio Shoots • Virtual Runway",
    details:
      "Seasonal outerwear collection launch rendered entirely with generative neural models, cutting catalog turnaround by 80%.",
    videoUrl: "", // Paste your Cloudflare video URL here
    posterUrl: "",
    aspectRatio: "4/3",
  },

  // ── Video #9: Selected Works 3 ──────────────────────────────────────────────
  9: {
    id: 9,
    label: "ARCHIVE 03",
    badge: "PERFORMANCE REEL",
    title: "Dancing With Stars",
    subtitle: "Entertainment Synth • Viral Reel",
    details:
      "Choreography-matched kinetic video assets and high-energy promotional teasers synthesized in 48 hours for global broadcast.",
    videoUrl: "", // Paste your Cloudflare video URL here
    posterUrl: "",
    aspectRatio: "4/3",
  },

  // ── Video #10: Selected Works 4 ─────────────────────────────────────────────
  10: {
    id: 10,
    label: "ARCHIVE 04",
    badge: "E-COMMERCE SUITE",
    title: "Clayto®",
    subtitle: "Autonomous Lookbook • 3.2M Views",
    details:
      "End-to-end synthetic lifestyle campaign generating both static print assets and 9:16 social shorts from 3D CAD references.",
    videoUrl: "", // Paste your Cloudflare video URL here
    posterUrl: "",
    aspectRatio: "4/3",
  },
};

// ── 12 Travel & Activity Influencer Reels (9:16 Vertical Format) ────────────
export interface TravelReel {
  id: number;
  title: string;
  videoUrl: string;
}

export const TRAVEL_INFLUENCER_REELS: TravelReel[] = [
  {
    id: 1,
    title: "Visiting Africa",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Visiting%20Africa.mp4",
  },
  {
    id: 2,
    title: "Visiting Cairo",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Visiting%20Cairo.mp4",
  },
  {
    id: 3,
    title: "Visiting Italy",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Visiting%20Italy.mp4",
  },
  {
    id: 4,
    title: "Visiting Japan",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Visiting%20Japan.mp4",
  },
  {
    id: 5,
    title: "Visiting Korea",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Visiting%20Korea.mp4",
  },
  {
    id: 6,
    title: "Visiting Nepal",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Visiting%20Nepal.mp4",
  },
  {
    id: 7,
    title: "Visiting Rome",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Visiting%20Rome.mp4",
  },
  {
    id: 8,
    title: "Visiting Switzerland",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Visiting%20Switzerland.mp4",
  },
  {
    id: 9,
    title: "Working Out",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Working%20out.mp4",
  },
  {
    id: 10,
    title: "Cooking",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Let%20her%20cook.mp4",
  },
  {
    id: 11,
    title: "Morning Dog Vlog",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/new/Nisha_Arora_Morning_Dog_Vlog_Seedance25.mp4",
  },
  {
    id: 12,
    title: "Football Match",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Football%20match.mp4",
  },
];

// ── 9 Real Human Clone & Service Use Case Reels (9:16 Vertical Format) ──────
export interface CloneUseCaseReel {
  id: number;
  title: string;
  videoUrl: string;
}

export const CLONE_USE_CASE_REELS: CloneUseCaseReel[] = [
  {
    id: 1,
    title: "AI Lawyer",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/AI%20lawyer.mp4",
  },
  {
    id: 2,
    title: "Real Estate Agent",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Ai%20Avatar%20for%20Real%20State%20Agent.mp4",
  },
  {
    id: 3,
    title: "Founder's Story",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Ai%20avatar%20for%20founder%27s%20story.mp4",
  },
  {
    id: 4,
    title: "Hook-Based Content",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Hook-based%20content%20creation.mp4",
  },
  {
    id: 5,
    title: "Life Insurance Broker",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Life%20insurance%20Broker%20AI%20clone.mp4",
  },
  {
    id: 6,
    title: "Immigration Lawyer",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Immigration%20lawyer.%20AI%20avatar.mp4",
  },
  {
    id: 7,
    title: "Championship Consultation",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Consultation%20-%20Championship%20.mp4",
  },
  {
    id: 8,
    title: "Life Insurance Avatar",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Life%20insurance%20AI%20avatar.mp4",
  },
  {
    id: 9,
    title: "Product Comparison",
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/With%20or%20without%20sunscreen.mp4",
  },
];

// ── 7 Niche AI Persona & Product Promotion Reels (9:16 Vertical Format) ─────
export interface NichePersonaReel {
  id: number;
  videoUrl: string;
}

export const NICHE_PERSONA_REELS: NichePersonaReel[] = [
  {
    id: 1,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/new/hf_20260725_201004_98092d1a-248b-4303-9273-c79373fa25c7.mp4",
  },
  {
    id: 2,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/new/hf_20260725_193540_749ef038-f5d6-4c81-bb44-42c12a1a502c.mp4",
  },
  {
    id: 3,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/new/82dcf1f6-07c3-42f7-ac7b-766437361b14.mp4",
  },
  {
    id: 4,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/UGC%20Sports%20Wear.mp4",
  },
  {
    id: 5,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/new/hf_20260901_160114_df043357-f2e1-4b4b-a7b0-8697994083cc.mp4",
  },
  {
    id: 6,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/new/Avatar%20IV%20Video%20(5)%20copy.mp4",
  },
  {
    id: 7,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/new/Avatar%20IV%20Video%20(5).mp4",
  },
];

// ── 13 Diverse Portfolio Works (Collage System) ─────────────────────────────
export interface PortfolioWork {
  id: number;
  videoUrl: string;
}

export const PORTFOLIO_WORKS: PortfolioWork[] = [
  {
    id: 1,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Vox-style%20content%20creation%20with%20AI.mp4",
  },
  {
    id: 2,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/new/Once%20Upon%20a%20Time%20in%20China.mp4",
  },
  {
    id: 3,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/new/a56501e1-3dc2-4768-8f68-3850c2eb09e6.mp4",
  },
  {
    id: 4,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/new/Seedance%202.5.mp4",
  },
  {
    id: 5,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Sacred%20six%203.mp4",
  },
  {
    id: 6,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/new/hf_20260518_113720_2588f020-2ac2-4bfb-90d8-4fa0c8031adc.mp4",
  },
  {
    id: 7,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/new/male_vlogger_bali_vlogmp_.mp4",
  },
  {
    id: 8,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/new/Van%20Gough.mp4",
  },
  {
    id: 9,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/new/Quench%20IV%205.mp4",
  },
  {
    id: 10,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/new/Promotion%20-%20Meshy%20AI.mp4",
  },
  {
    id: 11,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/new/mp_.mp4",
  },
  {
    id: 12,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Fitness%20influencer%20.mp4",
  },
  {
    id: 13,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/Unique%20AI%20ads.mp4",
  },
  {
    id: 14,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/new/Flux%203.mp4",
  },
  {
    id: 15,
    videoUrl:
      "https://pub-546f0ac14cda4f2d914b03b717cc56b1.r2.dev/new/mp_%20(1).mp4",
  },
];



