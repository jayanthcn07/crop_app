export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  family: string;
  origin: string;
  growingConditions: {
    light: string;
    water: string;
    soil: string;
    temperature: string;
  };
  commonDiseases: string[];
  careLevel: 'easy' | 'moderate' | 'advanced';
  imageUrl?: string;
}

export const plantDatabase: Record<string, Plant> = {
  'tomato': {
    id: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    description: 'A popular fruit-bearing plant grown worldwide for its edible fruits. Tomatoes are versatile in cooking and rich in vitamins.',
    family: 'Solanaceae (Nightshade)',
    origin: 'South America',
    growingConditions: {
      light: 'Full sun (6-8 hours daily)',
      water: 'Regular, consistent moisture',
      soil: 'Well-draining, fertile, pH 6.0-6.8',
      temperature: '65-85°F (18-29°C)'
    },
    commonDiseases: ['early_blight', 'late_blight', 'bacterial_spot', 'septoria_leaf_spot', 'fusarium_wilt'],
    careLevel: 'moderate'
  },
  'potato': {
    id: 'potato',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    description: 'A starchy root vegetable and one of the world\'s most important food crops. Grown for its underground tubers.',
    family: 'Solanaceae (Nightshade)',
    origin: 'South America (Andes)',
    growingConditions: {
      light: 'Full sun to partial shade',
      water: 'Consistent moisture, 1-2 inches/week',
      soil: 'Loose, well-draining, acidic pH 5.0-6.0',
      temperature: '60-70°F (15-21°C)'
    },
    commonDiseases: ['late_blight', 'early_blight', 'verticillium_wilt', 'black_rot'],
    careLevel: 'easy'
  },
  'pepper': {
    id: 'pepper',
    name: 'Pepper',
    scientificName: 'Capsicum annuum',
    description: 'A warm-season crop producing fruits ranging from sweet bell peppers to hot chili varieties.',
    family: 'Solanaceae (Nightshade)',
    origin: 'Central and South America',
    growingConditions: {
      light: 'Full sun (6-8 hours daily)',
      water: 'Moderate, avoid overwatering',
      soil: 'Well-draining, rich in organic matter, pH 6.0-6.8',
      temperature: '70-85°F (21-29°C)'
    },
    commonDiseases: ['bacterial_spot', 'anthracnose', 'cercospora_leaf_spot', 'mosaic_virus'],
    careLevel: 'moderate'
  },
  'grape': {
    id: 'grape',
    name: 'Grape',
    scientificName: 'Vitis vinifera',
    description: 'A woody vine cultivated for its berries used in winemaking, fresh consumption, and dried as raisins.',
    family: 'Vitaceae',
    origin: 'Mediterranean and Central Asia',
    growingConditions: {
      light: 'Full sun (7-8 hours daily)',
      water: 'Deep watering, drought tolerant once established',
      soil: 'Well-draining, sandy loam, pH 5.5-6.5',
      temperature: '60-90°F (15-32°C)'
    },
    commonDiseases: ['downy_mildew', 'black_rot', 'gray_mold', 'powdery_mildew'],
    careLevel: 'advanced'
  },
  'apple': {
    id: 'apple',
    name: 'Apple',
    scientificName: 'Malus domestica',
    description: 'One of the most widely cultivated fruit trees, producing crisp fruits enjoyed fresh or processed.',
    family: 'Rosaceae',
    origin: 'Central Asia',
    growingConditions: {
      light: 'Full sun (6-8 hours daily)',
      water: 'Regular watering, 1 inch/week',
      soil: 'Well-draining, loamy, pH 6.0-7.0',
      temperature: 'Requires winter chill (32-45°F for 500-1000 hours)'
    },
    commonDiseases: ['apple_scab', 'fire_blight', 'black_rot', 'rust'],
    careLevel: 'advanced'
  },
  'strawberry': {
    id: 'strawberry',
    name: 'Strawberry',
    scientificName: 'Fragaria × ananassa',
    description: 'A low-growing perennial plant producing sweet, red berries rich in vitamin C and antioxidants.',
    family: 'Rosaceae',
    origin: 'Hybrid (France, 18th century)',
    growingConditions: {
      light: 'Full sun (6-10 hours daily)',
      water: 'Consistent moisture, avoid wetting leaves',
      soil: 'Rich, well-draining, slightly acidic pH 5.5-6.8',
      temperature: '60-80°F (15-27°C)'
    },
    commonDiseases: ['gray_mold', 'anthracnose', 'verticillium_wilt', 'leaf_spot'],
    careLevel: 'moderate'
  },
  'corn': {
    id: 'corn',
    name: 'Corn (Maize)',
    scientificName: 'Zea mays',
    description: 'A tall annual grass cultivated for its grain, which is a staple food in many parts of the world.',
    family: 'Poaceae (Grass)',
    origin: 'Mexico',
    growingConditions: {
      light: 'Full sun (8+ hours daily)',
      water: 'Regular watering, especially during tasseling',
      soil: 'Fertile, well-draining, pH 5.8-7.0',
      temperature: '60-95°F (15-35°C)'
    },
    commonDiseases: ['rust', 'northern_leaf_blight', 'gray_leaf_spot', 'smut'],
    careLevel: 'easy'
  },
  'cucumber': {
    id: 'cucumber',
    name: 'Cucumber',
    scientificName: 'Cucumis sativus',
    description: 'A creeping vine plant producing cylindrical fruits eaten fresh or pickled.',
    family: 'Cucurbitaceae (Gourd)',
    origin: 'South Asia',
    growingConditions: {
      light: 'Full sun (6-8 hours daily)',
      water: 'Consistent moisture, 1-2 inches/week',
      soil: 'Rich, well-draining, pH 6.0-7.0',
      temperature: '70-85°F (21-29°C)'
    },
    commonDiseases: ['powdery_mildew', 'downy_mildew', 'anthracnose', 'bacterial_wilt'],
    careLevel: 'easy'
  },
  'rose': {
    id: 'rose',
    name: 'Rose',
    scientificName: 'Rosa spp.',
    description: 'A woody perennial flowering plant known for its beauty and fragrance, with thousands of cultivated varieties.',
    family: 'Rosaceae',
    origin: 'Asia',
    growingConditions: {
      light: 'Full sun (6+ hours daily)',
      water: 'Deep watering, 1-2 inches/week',
      soil: 'Rich, well-draining, pH 6.0-6.5',
      temperature: '60-75°F (15-24°C)'
    },
    commonDiseases: ['powdery_mildew', 'black_spot', 'rust', 'gray_mold'],
    careLevel: 'moderate'
  },
  'wheat': {
    id: 'wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    description: 'One of the world\'s most important cereal crops, used to make flour for bread, pasta, and other foods.',
    family: 'Poaceae (Grass)',
    origin: 'Fertile Crescent',
    growingConditions: {
      light: 'Full sun',
      water: 'Moderate, 12-15 inches during growing season',
      soil: 'Well-draining loam, pH 6.0-7.0',
      temperature: '70-75°F (21-24°C) optimal'
    },
    commonDiseases: ['rust', 'powdery_mildew', 'septoria_leaf_spot', 'fusarium_head_blight'],
    careLevel: 'moderate'
  },
  'banana': {
    id: 'banana',
    name: 'Banana',
    scientificName: 'Musa spp.',
    description: 'A tropical herbaceous plant producing elongated, curved fruits that are a dietary staple worldwide.',
    family: 'Musaceae',
    origin: 'Southeast Asia',
    growingConditions: {
      light: 'Full sun (6-8 hours daily)',
      water: 'Heavy watering, high humidity',
      soil: 'Rich, well-draining, pH 5.5-7.0',
      temperature: '75-95°F (24-35°C)'
    },
    commonDiseases: ['fusarium_wilt', 'black_sigatoka', 'bacterial_wilt', 'bunchy_top_virus'],
    careLevel: 'moderate'
  },
  'citrus': {
    id: 'citrus',
    name: 'Citrus',
    scientificName: 'Citrus spp.',
    description: 'A genus of flowering trees and shrubs producing fruits like oranges, lemons, limes, and grapefruits.',
    family: 'Rutaceae',
    origin: 'Southeast Asia and Australia',
    growingConditions: {
      light: 'Full sun (8-12 hours daily)',
      water: 'Deep watering, allow soil to dry between',
      soil: 'Well-draining, slightly acidic pH 6.0-7.0',
      temperature: '55-85°F (13-29°C)'
    },
    commonDiseases: ['citrus_canker', 'greening_disease', 'root_rot', 'citrus_scab'],
    careLevel: 'moderate'
  },
  'coffee': {
    id: 'coffee',
    name: 'Coffee',
    scientificName: 'Coffea arabica',
    description: 'An evergreen shrub cultivated for its beans, which are processed to produce one of the world\'s most popular beverages.',
    family: 'Rubiaceae',
    origin: 'Ethiopia',
    growingConditions: {
      light: 'Partial shade to filtered sun',
      water: 'Regular, consistent moisture',
      soil: 'Rich, acidic, well-draining, pH 6.0-6.5',
      temperature: '60-70°F (15-24°C)'
    },
    commonDiseases: ['coffee_leaf_rust', 'coffee_berry_disease', 'root_rot'],
    careLevel: 'advanced'
  },
  'lettuce': {
    id: 'lettuce',
    name: 'Lettuce',
    scientificName: 'Lactuca sativa',
    description: 'A cool-season leafy vegetable commonly used in salads, sandwiches, and wraps.',
    family: 'Asteraceae (Daisy)',
    origin: 'Mediterranean and Middle East',
    growingConditions: {
      light: 'Partial shade to full sun',
      water: 'Consistent moisture, avoid wilting',
      soil: 'Loose, well-draining, pH 6.0-7.0',
      temperature: '45-65°F (7-18°C)'
    },
    commonDiseases: ['downy_mildew', 'bacterial_spot', 'lettuce_mosaic_virus', 'bottom_rot'],
    careLevel: 'easy'
  },
  'spinach': {
    id: 'spinach',
    name: 'Spinach',
    scientificName: 'Spinacia oleracea',
    description: 'A nutrient-rich leafy green vegetable high in iron, vitamins, and antioxidants.',
    family: 'Amaranthaceae',
    origin: 'Central and Western Asia',
    growingConditions: {
      light: 'Partial shade to full sun',
      water: 'Consistent moisture',
      soil: 'Rich, well-draining, pH 6.5-7.5',
      temperature: '35-75°F (2-24°C)'
    },
    commonDiseases: ['downy_mildew', 'cercospora_leaf_spot', 'white_rust', 'fusarium_wilt'],
    careLevel: 'easy'
  },
  'bean': {
    id: 'bean',
    name: 'Bean',
    scientificName: 'Phaseolus vulgaris',
    description: 'A versatile legume grown for its edible seeds and pods, with many varieties including green beans and dry beans.',
    family: 'Fabaceae (Legume)',
    origin: 'Central and South America',
    growingConditions: {
      light: 'Full sun (6-8 hours daily)',
      water: 'Regular watering, 1 inch/week',
      soil: 'Well-draining, fertile, pH 6.0-7.0',
      temperature: '70-80°F (21-27°C)'
    },
    commonDiseases: ['anthracnose', 'rust', 'bacterial_blight', 'mosaic_virus'],
    careLevel: 'easy'
  },
  'squash': {
    id: 'squash',
    name: 'Squash',
    scientificName: 'Cucurbita spp.',
    description: 'A diverse group of vegetables including zucchini, butternut, and pumpkin varieties.',
    family: 'Cucurbitaceae (Gourd)',
    origin: 'Americas',
    growingConditions: {
      light: 'Full sun (6-8 hours daily)',
      water: 'Deep watering, 1-2 inches/week',
      soil: 'Rich, well-draining, pH 6.0-6.8',
      temperature: '65-85°F (18-29°C)'
    },
    commonDiseases: ['powdery_mildew', 'downy_mildew', 'bacterial_wilt', 'mosaic_virus'],
    careLevel: 'easy'
  },
  'mango': {
    id: 'mango',
    name: 'Mango',
    scientificName: 'Mangifera indica',
    description: 'A tropical stone fruit tree producing sweet, aromatic fruits known as the "king of fruits".',
    family: 'Anacardiaceae',
    origin: 'South Asia',
    growingConditions: {
      light: 'Full sun (8-10 hours daily)',
      water: 'Deep watering, drought tolerant once established',
      soil: 'Well-draining, sandy loam, pH 5.5-7.5',
      temperature: '70-100°F (21-38°C)'
    },
    commonDiseases: ['anthracnose', 'powdery_mildew', 'bacterial_canker', 'sooty_mold'],
    careLevel: 'moderate'
  },
  'eggplant': {
    id: 'eggplant',
    name: 'Eggplant',
    scientificName: 'Solanum melongena',
    description: 'A warm-season vegetable producing glossy, purple fruits used in cuisines worldwide.',
    family: 'Solanaceae (Nightshade)',
    origin: 'India and China',
    growingConditions: {
      light: 'Full sun (6-8 hours daily)',
      water: 'Consistent moisture, 1-2 inches/week',
      soil: 'Rich, well-draining, pH 5.5-6.5',
      temperature: '70-85°F (21-29°C)'
    },
    commonDiseases: ['verticillium_wilt', 'early_blight', 'phytophthora_blight', 'bacterial_wilt'],
    careLevel: 'moderate'
  },
  'onion': {
    id: 'onion',
    name: 'Onion',
    scientificName: 'Allium cepa',
    description: 'A bulb vegetable used worldwide as a culinary staple for its pungent flavor.',
    family: 'Amaryllidaceae',
    origin: 'Central Asia',
    growingConditions: {
      light: 'Full sun (6-7 hours daily)',
      water: 'Moderate, 1 inch/week',
      soil: 'Loose, well-draining, pH 6.0-7.0',
      temperature: '55-75°F (13-24°C)'
    },
    commonDiseases: ['downy_mildew', 'purple_blotch', 'white_rot', 'botrytis_leaf_blight'],
    careLevel: 'moderate'
  }
};
