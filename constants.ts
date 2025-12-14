import { ShotType, CameraAngle, SubjectType, Emotion, LightSource, LightDirection, LightQuality, Environment, ColorGrading, Lens, CameraType } from "./types";

export const SHOT_TYPES: ShotType[] = ['Close-up', 'Medium shot', 'Wide-angle', 'Extreme wide', 'Shot from behind', 'Bird’s-eye view'];
export const CAMERA_ANGLES: CameraAngle[] = ['Eye-level', 'Low angle', 'High angle', 'Overhead'];
export const SUBJECT_TYPES: SubjectType[] = ['Person', 'Product', 'Fashion Model', 'Scene'];
export const EMOTIONS: Emotion[] = ['Calm', 'Focused', 'Confident', 'Intense', 'Somber', 'Neutral'];
export const LIGHT_SOURCES: LightSource[] = ['Natural sunlight', 'Window light', 'Studio softbox', 'Overcast sky', 'Neon signage'];
export const LIGHT_DIRECTIONS: LightDirection[] = ['Front-left', 'Front-right', 'Backlit', 'Directly above', 'Side-lighting'];
export const LIGHT_QUALITIES: LightQuality[] = ['Soft', 'Diffused', 'Hard', 'Volumetric'];
export const ENVIRONMENTS: Environment[] = ['Indoor studio', 'Interior room', 'Outdoor urban', 'Outdoor nature', 'Minimal background'];
export const COLOR_GRADINGS: ColorGrading[] = ['Neutral cinematic', 'Muted vintage', 'Cool desaturated', 'Warm golden', 'Editorial fashion'];
export const LENSES: Lens[] = ['35mm', '50mm', '85mm'];
export const CAMERA_TYPES: CameraType[] = ['High-end DSLR', 'iPhone photography', 'Analog Polaroid'];

export const MATERIALS = [
  'Skin with pores',
  'Matte surface',
  'Brushed metal',
  'Rough fabric',
  'Plastic (non-glossy)'
];

export const IMPERFECTIONS = [
  'Micro scratches',
  'Fabric weave',
  'Subtle wear',
  'Dust particles'
];

export const STYLES = [
  'Cinematic',
  'Editorial photography',
  'Commercial brand image',
  'Indie film'
];

export const ENVIRONMENT_EXTRAS = [
  'Ambient light bounce',
  'Environmental haze'
];

export const SUBJECT_DETAILS: Record<SubjectType, { label: string, options: string[] }> = {
  'Person': {
    label: 'Build & Pose',
    options: ['Casual stance, athletic build', 'Seated pose, slender build', 'Walking away, average build', 'Portrait pose, detailed features']
  },
  'Product': {
    label: 'Category & Placement',
    options: ['Tech gadget on podium', 'Beauty product on silk', 'Furniture in situ', 'Beverage with condensation']
  },
  'Fashion Model': {
    label: 'Pose & Look',
    options: ['High-fashion dynamic pose', 'Runway walk', 'Minimalist standing pose', 'Candid backstage look']
  },
  'Scene': {
    label: 'Scale & Focus',
    options: ['Grand scale landscape', 'Intimate street corner', 'Architectural detail', 'Busy crowd scene']
  }
};

// --- PERSON SPECIFIC CONSTANTS ---

export const PERSON_SEXES = ['Male', 'Female', 'Non-specified'];
export const PERSON_AGES = ['Child (6–12)', 'Teen (13–19)', 'Young adult (20–30)', 'Adult (30–45)', 'Middle-aged (45–60)', 'Elderly (60+)'];
export const PERSON_ETHNICITIES = ['South Asian', 'East Asian', 'Southeast Asian', 'Middle Eastern', 'African', 'European', 'Latin American', 'Mixed heritage', 'Not specified'];
export const PERSON_SKIN_TONES = ['Light', 'Medium', 'Olive', 'Deep'];
export const PERSON_BODY_TYPES = ['Slim', 'Athletic', 'Average', 'Stocky'];
export const PERSON_HAIR_LENGTHS = ['Short', 'Medium', 'Long', 'Tied'];
export const PERSON_HAIR_TEXTURES = ['Straight', 'Wavy', 'Curly', 'Coiled'];
export const PERSON_HAIR_COLORS = ['Black', 'Dark brown', 'Brown', 'Light brown', 'Blonde', 'Gray'];
export const PERSON_FABRICS = ['Cotton', 'Linen', 'Denim', 'Wool', 'Leather', 'Synthetic blend'];
export const PERSON_CLOTHING_COLORS = ['Neutral', 'Beige', 'Charcoal', 'Navy', 'Olive', 'Cream', 'Black', 'White', 'Brown', 'Muted Earth'];

export const PERSON_FACIAL_FEATURES = [
  'Natural facial asymmetry',
  'Visible pores',
  'Subtle imperfections'
];

export const PERSON_ACCESSORIES = [
  'Glasses',
  'Watch',
  'Jewelry',
  'None'
];
