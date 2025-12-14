export type ShotType = 'Close-up' | 'Medium shot' | 'Wide-angle' | 'Extreme wide' | 'Shot from behind' | 'Bird’s-eye view';
export type CameraAngle = 'Eye-level' | 'Low angle' | 'High angle' | 'Overhead';
export type SubjectType = 'Person' | 'Product' | 'Fashion Model' | 'Scene';
export type Emotion = 'Calm' | 'Focused' | 'Confident' | 'Intense' | 'Somber' | 'Neutral';
export type LightSource = 'Natural sunlight' | 'Window light' | 'Studio softbox' | 'Overcast sky' | 'Neon signage';
export type LightDirection = 'Front-left' | 'Front-right' | 'Backlit' | 'Directly above' | 'Side-lighting';
export type LightQuality = 'Soft' | 'Diffused' | 'Hard' | 'Volumetric';
export type Environment = 'Indoor studio' | 'Interior room' | 'Outdoor urban' | 'Outdoor nature' | 'Minimal background';
export type ColorGrading = 'Neutral cinematic' | 'Muted vintage' | 'Cool desaturated' | 'Warm golden' | 'Editorial fashion';
export type Lens = '35mm' | '50mm' | '85mm';
export type CameraType = 'High-end DSLR' | 'iPhone photography' | 'Analog Polaroid';

// Person Specific Types
export type PersonSex = 'Male' | 'Female' | 'Non-specified';
export type PersonAge = 'Child (6–12)' | 'Teen (13–19)' | 'Young adult (20–30)' | 'Adult (30–45)' | 'Middle-aged (45–60)' | 'Elderly (60+)';
export type PersonEthnicity = 'South Asian' | 'East Asian' | 'Southeast Asian' | 'Middle Eastern' | 'African' | 'European' | 'Latin American' | 'Mixed heritage' | 'Not specified';
export type PersonSkinTone = 'Light' | 'Medium' | 'Olive' | 'Deep';
export type PersonBodyType = 'Slim' | 'Athletic' | 'Average' | 'Stocky';
export type PersonHairLength = 'Short' | 'Medium' | 'Long' | 'Tied';
export type PersonHairTexture = 'Straight' | 'Wavy' | 'Curly' | 'Coiled';
export type PersonHairColor = 'Black' | 'Dark brown' | 'Brown' | 'Light brown' | 'Blonde' | 'Gray';
export type PersonFabric = 'Cotton' | 'Linen' | 'Denim' | 'Wool' | 'Leather' | 'Synthetic blend';

export interface PromptState {
  shotType: ShotType;
  cameraAngle: CameraAngle;
  subjectType: SubjectType;
  subjectDetail: string;
  emotion: Emotion;
  lightSource: LightSource;
  lightDirection: LightDirection;
  lightQuality: LightQuality;
  materials: string[];
  environment: Environment;
  environmentOptions: string[];
  colorGrading: ColorGrading;
  lens: Lens;
  cameraType: CameraType;
  styles: string[];
  extraDetails: string;

  // New Person Logic
  personSex: PersonSex;
  personAge: PersonAge;
  personEthnicity: PersonEthnicity;
  personSkinTone: PersonSkinTone;
  personBodyType: PersonBodyType;
  personHairLength: PersonHairLength;
  personHairTexture: PersonHairTexture;
  personHairColor: PersonHairColor;
  personFacialFeatures: string[];
  personClothingPrimary: string;
  personClothingSecondary: string;
  personClothingColor: string;
  personClothingFabric: PersonFabric;
  personAccessories: string[];
}

export const INITIAL_STATE: PromptState = {
  shotType: 'Medium shot',
  cameraAngle: 'Eye-level',
  subjectType: 'Person',
  subjectDetail: '',
  emotion: 'Neutral',
  lightSource: 'Natural sunlight',
  lightDirection: 'Front-left',
  lightQuality: 'Soft',
  materials: [],
  environment: 'Indoor studio',
  environmentOptions: [],
  colorGrading: 'Neutral cinematic',
  lens: '50mm',
  cameraType: 'High-end DSLR',
  styles: [],
  extraDetails: '',

  // Person Defaults
  personSex: 'Non-specified',
  personAge: 'Young adult (20–30)',
  personEthnicity: 'Not specified',
  personSkinTone: 'Medium',
  personBodyType: 'Average',
  personHairLength: 'Medium',
  personHairTexture: 'Wavy',
  personHairColor: 'Brown',
  personFacialFeatures: [],
  personClothingPrimary: 'Shirt',
  personClothingSecondary: '',
  personClothingColor: 'Neutral',
  personClothingFabric: 'Cotton',
  personAccessories: []
};

export interface User {
  id: string;
  email: string;
  credits: number;
  isPro: boolean;
  lastReset: string; // ISO date string
}
