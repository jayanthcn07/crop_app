export interface Disease {
  id: string;
  name: string;
  scientificName?: string;
  description: string;
  symptoms: string[];
  causes: string[];
  preventiveMeasures: string[];
  treatments: string[];
  affectedCrops: string[];
  severity: 'low' | 'medium' | 'high';
  imageUrl?: string;
}

export const diseaseDatabase: Record<string, Disease> = {
  'bacterial_spot': {
    id: 'bacterial_spot',
    name: 'Bacterial Spot',
    scientificName: 'Xanthomonas campestris',
    description: 'A common bacterial disease that affects tomatoes, peppers, and other crops causing leaf spots and fruit lesions.',
    symptoms: [
      'Small, water-soaked spots on leaves',
      'Dark brown to black lesions with yellow halos',
      'Raised, scab-like spots on fruits',
      'Leaf yellowing and premature drop'
    ],
    causes: [
      'Xanthomonas bacteria',
      'Warm, wet conditions',
      'Contaminated seeds or transplants',
      'Splashing water spreading bacteria'
    ],
    preventiveMeasures: [
      'Use certified disease-free seeds',
      'Practice crop rotation (3-4 years)',
      'Avoid overhead irrigation',
      'Remove and destroy infected plant debris',
      'Apply copper-based bactericides preventively'
    ],
    treatments: [
      'Apply copper hydroxide sprays',
      'Remove severely infected plants',
      'Improve air circulation between plants',
      'Reduce leaf wetness duration'
    ],
    affectedCrops: ['Tomato', 'Pepper', 'Lettuce'],
    severity: 'medium'
  },
  'early_blight': {
    id: 'early_blight',
    name: 'Early Blight',
    scientificName: 'Alternaria solani',
    description: 'A fungal disease causing dark spots with concentric rings on leaves, starting from lower leaves.',
    symptoms: [
      'Dark brown spots with concentric rings (target-like)',
      'Yellowing around spots',
      'Lower leaves affected first',
      'Stems may develop dark, sunken cankers'
    ],
    causes: [
      'Alternaria solani fungus',
      'Warm temperatures (75-85°F)',
      'High humidity',
      'Infected plant debris in soil'
    ],
    preventiveMeasures: [
      'Remove plant debris after harvest',
      'Water at base of plants, not foliage',
      'Apply mulch to prevent soil splash',
      'Maintain proper plant spacing',
      'Use resistant varieties when available'
    ],
    treatments: [
      'Apply fungicides containing chlorothalonil',
      'Remove and destroy infected leaves',
      'Improve drainage and air flow',
      'Apply neem oil for organic treatment'
    ],
    affectedCrops: ['Tomato', 'Potato', 'Eggplant'],
    severity: 'medium'
  },
  'late_blight': {
    id: 'late_blight',
    name: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    description: 'A devastating disease that caused the Irish Potato Famine. Spreads rapidly in cool, wet conditions.',
    symptoms: [
      'Large, irregular water-soaked lesions',
      'White fuzzy growth on leaf undersides',
      'Rapid plant collapse in wet weather',
      'Brown, firm rot in tubers/fruits'
    ],
    causes: [
      'Phytophthora infestans oomycete',
      'Cool temperatures (50-70°F)',
      'High humidity and rain',
      'Wind-dispersed spores'
    ],
    preventiveMeasures: [
      'Plant resistant varieties',
      'Destroy volunteer plants',
      'Ensure good drainage',
      'Scout fields regularly during favorable conditions',
      'Apply preventive fungicides before symptoms appear'
    ],
    treatments: [
      'Apply fungicides immediately upon detection',
      'Remove and destroy all infected plants',
      'Do not compost infected material',
      'Harvest tubers in dry conditions'
    ],
    affectedCrops: ['Tomato', 'Potato'],
    severity: 'high'
  },
  'leaf_mold': {
    id: 'leaf_mold',
    name: 'Leaf Mold',
    scientificName: 'Passalora fulva',
    description: 'A fungal disease common in greenhouse tomatoes, causing yellow patches and mold growth on leaves.',
    symptoms: [
      'Pale green to yellow spots on upper leaf surface',
      'Olive-green to gray fuzzy mold on lower leaf surface',
      'Leaves curl and wither',
      'Severe cases cause defoliation'
    ],
    causes: [
      'Passalora fulva (formerly Cladosporium fulvum)',
      'High humidity (>85%)',
      'Poor air circulation',
      'Temperatures 71-75°F optimal for fungus'
    ],
    preventiveMeasures: [
      'Improve greenhouse ventilation',
      'Reduce humidity below 85%',
      'Use resistant tomato varieties',
      'Space plants adequately',
      'Avoid leaf wetness'
    ],
    treatments: [
      'Apply fungicides containing chlorothalonil or mancozeb',
      'Remove and destroy infected leaves',
      'Increase ventilation',
      'Lower humidity levels'
    ],
    affectedCrops: ['Tomato'],
    severity: 'medium'
  },
  'powdery_mildew': {
    id: 'powdery_mildew',
    name: 'Powdery Mildew',
    scientificName: 'Erysiphe spp.',
    description: 'A widespread fungal disease recognizable by white powdery coating on plant surfaces.',
    symptoms: [
      'White powdery spots on leaves and stems',
      'Distorted or stunted new growth',
      'Yellowing and premature leaf drop',
      'Reduced fruit quality and yield'
    ],
    causes: [
      'Various Erysiphe and Podosphaera species',
      'Moderate temperatures (60-80°F)',
      'High humidity but dry leaf surfaces',
      'Poor air circulation'
    ],
    preventiveMeasures: [
      'Choose resistant varieties',
      'Provide adequate spacing between plants',
      'Avoid excessive nitrogen fertilization',
      'Water plants at ground level',
      'Prune to improve air circulation'
    ],
    treatments: [
      'Apply sulfur or potassium bicarbonate sprays',
      'Use neem oil or horticultural oils',
      'Remove heavily infected plant parts',
      'Apply fungicides at first sign of disease'
    ],
    affectedCrops: ['Cucumber', 'Squash', 'Melon', 'Grape', 'Rose'],
    severity: 'medium'
  },
  'septoria_leaf_spot': {
    id: 'septoria_leaf_spot',
    name: 'Septoria Leaf Spot',
    scientificName: 'Septoria lycopersici',
    description: 'A fungal disease causing numerous small spots with dark borders on tomato leaves.',
    symptoms: [
      'Small circular spots with dark borders',
      'Gray or tan centers with tiny black dots',
      'Lower leaves affected first',
      'Severe defoliation possible'
    ],
    causes: [
      'Septoria lycopersici fungus',
      'Warm, wet weather',
      'Infected plant debris',
      'Splashing water'
    ],
    preventiveMeasures: [
      'Remove and destroy plant debris',
      'Use mulch to prevent soil splash',
      'Rotate crops for at least 2 years',
      'Stake plants to improve air circulation',
      'Avoid overhead watering'
    ],
    treatments: [
      'Apply copper-based fungicides',
      'Remove infected lower leaves',
      'Apply chlorothalonil or mancozeb',
      'Maintain good plant hygiene'
    ],
    affectedCrops: ['Tomato'],
    severity: 'medium'
  },
  'downy_mildew': {
    id: 'downy_mildew',
    name: 'Downy Mildew',
    scientificName: 'Peronospora spp.',
    description: 'A water mold disease causing yellow patches on leaves with fuzzy gray-purple growth underneath.',
    symptoms: [
      'Angular yellow patches on upper leaf surface',
      'Gray to purple fuzzy growth on leaf undersides',
      'Rapid leaf browning and death',
      'Stunted plant growth'
    ],
    causes: [
      'Peronospora and Plasmopara species',
      'Cool, moist conditions',
      'High humidity (>85%)',
      'Poor air circulation'
    ],
    preventiveMeasures: [
      'Plant resistant varieties',
      'Ensure adequate plant spacing',
      'Water in morning to allow drying',
      'Improve air circulation',
      'Remove crop debris'
    ],
    treatments: [
      'Apply fungicides containing mancozeb or copper',
      'Remove infected plant material',
      'Reduce humidity around plants',
      'Apply phosphorous acid products'
    ],
    affectedCrops: ['Grape', 'Cucumber', 'Lettuce', 'Spinach', 'Onion'],
    severity: 'high'
  },
  'anthracnose': {
    id: 'anthracnose',
    name: 'Anthracnose',
    scientificName: 'Colletotrichum spp.',
    description: 'A fungal disease causing dark, sunken lesions on fruits, leaves, and stems of many plants.',
    symptoms: [
      'Dark, sunken circular lesions on fruits',
      'Salmon-pink spore masses in wet conditions',
      'Leaf spots with dark margins',
      'Stem cankers and dieback'
    ],
    causes: [
      'Colletotrichum species fungi',
      'Warm, wet weather',
      'Splashing rain or irrigation',
      'Infected seeds or plant debris'
    ],
    preventiveMeasures: [
      'Use disease-free seeds and transplants',
      'Practice crop rotation',
      'Avoid working with wet plants',
      'Remove infected plant debris',
      'Provide good air circulation'
    ],
    treatments: [
      'Apply copper-based fungicides',
      'Remove and destroy infected fruits',
      'Use chlorothalonil or mancozeb sprays',
      'Harvest fruits promptly when ripe'
    ],
    affectedCrops: ['Bean', 'Pepper', 'Tomato', 'Cucumber', 'Mango', 'Strawberry'],
    severity: 'high'
  },
  'black_rot': {
    id: 'black_rot',
    name: 'Black Rot',
    scientificName: 'Guignardia bidwellii',
    description: 'A destructive fungal disease primarily affecting grapes, causing fruit mummification.',
    symptoms: [
      'Reddish-brown leaf spots with dark borders',
      'Black, shriveled mummified fruits',
      'Dark lesions on shoots and tendrils',
      'Circular tan spots becoming black'
    ],
    causes: [
      'Guignardia bidwellii fungus',
      'Warm, humid weather',
      'Rain splash spreading spores',
      'Overwintering in mummified fruits'
    ],
    preventiveMeasures: [
      'Remove mummified fruits and infected canes',
      'Prune for good air circulation',
      'Apply preventive fungicides',
      'Use resistant grape varieties',
      'Keep vineyard floor clean'
    ],
    treatments: [
      'Apply fungicides during bloom period',
      'Remove all infected plant material',
      'Use captan or myclobutanil sprays',
      'Improve canopy management'
    ],
    affectedCrops: ['Grape', 'Apple', 'Pear'],
    severity: 'high'
  },
  'cercospora_leaf_spot': {
    id: 'cercospora_leaf_spot',
    name: 'Cercospora Leaf Spot',
    scientificName: 'Cercospora beticola',
    description: 'A common fungal disease causing circular leaf spots with purple-red borders on many crops.',
    symptoms: [
      'Small circular gray spots with red-purple borders',
      'Spots may merge forming large dead areas',
      'Center of spots may fall out (shot-hole)',
      'Severe defoliation in wet conditions'
    ],
    causes: [
      'Cercospora species fungi',
      'Warm temperatures (75-90°F)',
      'High humidity and leaf wetness',
      'Infected crop debris'
    ],
    preventiveMeasures: [
      'Rotate crops for 2-3 years',
      'Use resistant varieties',
      'Avoid overhead irrigation',
      'Remove infected crop debris',
      'Maintain adequate plant spacing'
    ],
    treatments: [
      'Apply fungicides at first symptoms',
      'Use copper or mancozeb products',
      'Remove heavily infected leaves',
      'Improve air circulation'
    ],
    affectedCrops: ['Beet', 'Swiss Chard', 'Spinach', 'Soybean', 'Pepper'],
    severity: 'medium'
  },
  'fusarium_wilt': {
    id: 'fusarium_wilt',
    name: 'Fusarium Wilt',
    scientificName: 'Fusarium oxysporum',
    description: 'A soil-borne fungal disease that blocks water transport, causing plants to wilt and die.',
    symptoms: [
      'Yellowing and wilting of lower leaves',
      'One-sided wilting (half of plant affected first)',
      'Brown discoloration of vascular tissue',
      'Stunted growth and plant death'
    ],
    causes: [
      'Fusarium oxysporum fungus',
      'Warm soil temperatures (75-85°F)',
      'Acidic soil conditions',
      'Contaminated soil or transplants'
    ],
    preventiveMeasures: [
      'Use resistant varieties',
      'Practice long crop rotations (5-7 years)',
      'Raise soil pH above 6.5',
      'Use certified disease-free transplants',
      'Solarize soil in warm climates'
    ],
    treatments: [
      'No effective chemical treatment once infected',
      'Remove and destroy infected plants',
      'Do not compost infected material',
      'Apply biological controls preventively'
    ],
    affectedCrops: ['Tomato', 'Banana', 'Cotton', 'Watermelon', 'Basil'],
    severity: 'high'
  },
  'verticillium_wilt': {
    id: 'verticillium_wilt',
    name: 'Verticillium Wilt',
    scientificName: 'Verticillium dahliae',
    description: 'A soil-borne fungal disease causing yellowing, wilting, and death in a wide range of plants.',
    symptoms: [
      'V-shaped yellowing on leaf margins',
      'Wilting during hot days, recovery at night',
      'Brown streaking in stem vascular tissue',
      'Premature defoliation from base up'
    ],
    causes: [
      'Verticillium dahliae fungus',
      'Cool to moderate temperatures (70-80°F)',
      'Overwinters in soil for many years',
      'Spread by contaminated soil and equipment'
    ],
    preventiveMeasures: [
      'Plant resistant varieties',
      'Practice crop rotation with non-hosts',
      'Remove and destroy infected plants',
      'Avoid excessive nitrogen',
      'Solarize soil before planting'
    ],
    treatments: [
      'No effective chemical control',
      'Remove infected plants immediately',
      'Improve plant vigor through proper nutrition',
      'Use biological soil amendments'
    ],
    affectedCrops: ['Tomato', 'Potato', 'Eggplant', 'Strawberry', 'Maple'],
    severity: 'high'
  },
  'gray_mold': {
    id: 'gray_mold',
    name: 'Gray Mold (Botrytis)',
    scientificName: 'Botrytis cinerea',
    description: 'A common fungal disease causing fuzzy gray mold on flowers, fruits, and stems.',
    symptoms: [
      'Fuzzy gray-brown mold on affected tissues',
      'Water-soaked lesions on petals and fruits',
      'Soft rot of fruits and vegetables',
      'Stem cankers and dieback'
    ],
    causes: [
      'Botrytis cinerea fungus',
      'Cool, humid conditions',
      'Poor air circulation',
      'Wounded or stressed plant tissue'
    ],
    preventiveMeasures: [
      'Improve air circulation',
      'Reduce humidity in greenhouses',
      'Remove dead plant material promptly',
      'Avoid overhead watering',
      'Handle plants carefully to prevent wounds'
    ],
    treatments: [
      'Remove and destroy infected material',
      'Apply fungicides containing fenhexamid or iprodione',
      'Reduce humidity levels',
      'Improve ventilation'
    ],
    affectedCrops: ['Strawberry', 'Grape', 'Tomato', 'Rose', 'Peony'],
    severity: 'high'
  },
  'rust': {
    id: 'rust',
    name: 'Rust Disease',
    scientificName: 'Puccinia spp.',
    description: 'A fungal disease characterized by orange-brown pustules on leaves and stems.',
    symptoms: [
      'Orange-brown powdery pustules on leaves',
      'Yellow spots on upper leaf surface',
      'Premature leaf drop',
      'Weakened, stunted plant growth'
    ],
    causes: [
      'Various Puccinia species',
      'Moderate temperatures with high humidity',
      'Extended leaf wetness',
      'Wind-dispersed spores'
    ],
    preventiveMeasures: [
      'Plant resistant varieties',
      'Avoid overhead irrigation',
      'Ensure good air circulation',
      'Remove alternate hosts if applicable',
      'Apply preventive fungicides'
    ],
    treatments: [
      'Apply fungicides containing myclobutanil or chlorothalonil',
      'Remove heavily infected leaves',
      'Improve air circulation',
      'Destroy infected crop debris'
    ],
    affectedCrops: ['Wheat', 'Bean', 'Coffee', 'Rose', 'Apple', 'Corn'],
    severity: 'medium'
  },
  'mosaic_virus': {
    id: 'mosaic_virus',
    name: 'Mosaic Virus',
    scientificName: 'Various Potyvirus/Tobamovirus',
    description: 'A viral disease causing mottled light and dark green patterns on leaves.',
    symptoms: [
      'Mottled light and dark green leaf patterns',
      'Leaf curling and distortion',
      'Stunted plant growth',
      'Reduced fruit size and quality'
    ],
    causes: [
      'Various virus species (TMV, CMV, etc.)',
      'Spread by aphids and other insects',
      'Mechanical transmission through tools',
      'Infected seeds or transplants'
    ],
    preventiveMeasures: [
      'Use virus-free seeds and transplants',
      'Control aphid populations',
      'Disinfect tools between plants',
      'Remove and destroy infected plants',
      'Use resistant varieties'
    ],
    treatments: [
      'No cure for viral infections',
      'Remove infected plants immediately',
      'Control insect vectors',
      'Prevent mechanical spread'
    ],
    affectedCrops: ['Tomato', 'Tobacco', 'Pepper', 'Cucumber', 'Squash'],
    severity: 'high'
  },
  'bacterial_wilt': {
    id: 'bacterial_wilt',
    name: 'Bacterial Wilt',
    scientificName: 'Ralstonia solanacearum',
    description: 'A devastating bacterial disease causing rapid wilting without leaf yellowing.',
    symptoms: [
      'Rapid wilting of entire plant',
      'No yellowing before wilt',
      'Brown discoloration of vascular tissue',
      'Bacterial ooze from cut stems in water'
    ],
    causes: [
      'Ralstonia solanacearum bacteria',
      'Warm, moist soil conditions',
      'Contaminated soil or water',
      'Spread by infected transplants'
    ],
    preventiveMeasures: [
      'Use certified disease-free transplants',
      'Practice crop rotation (4-5 years)',
      'Improve soil drainage',
      'Avoid working in wet fields',
      'Control root-knot nematodes'
    ],
    treatments: [
      'No effective chemical treatment',
      'Remove and destroy infected plants',
      'Solarize soil in hot climates',
      'Use biological control agents'
    ],
    affectedCrops: ['Tomato', 'Potato', 'Eggplant', 'Pepper', 'Banana'],
    severity: 'high'
  },
  'target_spot': {
    id: 'target_spot',
    name: 'Target Spot',
    scientificName: 'Corynespora cassiicola',
    description: 'A fungal disease causing distinctive target-like spots on leaves of many crops.',
    symptoms: [
      'Circular spots with concentric rings',
      'Tan to brown lesions with dark borders',
      'Yellow halos around spots',
      'Severe defoliation in humid conditions'
    ],
    causes: [
      'Corynespora cassiicola fungus',
      'Warm, humid weather',
      'Extended leaf wetness',
      'Infected plant debris'
    ],
    preventiveMeasures: [
      'Use resistant varieties',
      'Rotate crops for 2-3 years',
      'Avoid overhead irrigation',
      'Remove infected plant debris',
      'Ensure adequate plant spacing'
    ],
    treatments: [
      'Apply fungicides containing chlorothalonil',
      'Remove heavily infected leaves',
      'Improve air circulation',
      'Reduce leaf wetness duration'
    ],
    affectedCrops: ['Tomato', 'Soybean', 'Cotton', 'Cucumber', 'Rubber'],
    severity: 'medium'
  },
  'leaf_curl': {
    id: 'leaf_curl',
    name: 'Leaf Curl',
    scientificName: 'Taphrina deformans / Begomovirus',
    description: 'A disease causing severe distortion, curling, and thickening of leaves.',
    symptoms: [
      'Severe leaf curling and puckering',
      'Thickened, distorted leaves',
      'Red or purple discoloration',
      'Stunted shoot growth'
    ],
    causes: [
      'Taphrina deformans fungus (peach)',
      'Begomoviruses transmitted by whiteflies',
      'Cool, wet spring weather (fungal)',
      'High whitefly populations (viral)'
    ],
    preventiveMeasures: [
      'Apply dormant fungicide sprays (fungal)',
      'Control whitefly populations (viral)',
      'Use resistant varieties',
      'Remove infected plant material',
      'Use reflective mulches'
    ],
    treatments: [
      'Apply copper sprays at bud swell (fungal)',
      'Remove infected plants (viral)',
      'Control insect vectors',
      'Cannot cure infected plants'
    ],
    affectedCrops: ['Peach', 'Nectarine', 'Tomato', 'Pepper', 'Cotton'],
    severity: 'high'
  },
  'scab': {
    id: 'scab',
    name: 'Scab',
    scientificName: 'Venturia inaequalis',
    description: 'A fungal disease causing corky, rough lesions on fruits, leaves, and twigs.',
    symptoms: [
      'Olive-green to brown velvety spots on leaves',
      'Corky, rough lesions on fruits',
      'Cracked and distorted fruits',
      'Premature leaf drop'
    ],
    causes: [
      'Venturia inaequalis (apple) or V. pirina (pear)',
      'Cool, wet spring weather',
      'Overwintering in fallen leaves',
      'Rain splash spreading spores'
    ],
    preventiveMeasures: [
      'Rake and destroy fallen leaves',
      'Plant resistant varieties',
      'Apply dormant sprays',
      'Ensure good air circulation',
      'Apply preventive fungicides'
    ],
    treatments: [
      'Apply fungicides during infection periods',
      'Use captan, mancozeb, or myclobutanil',
      'Remove heavily infected fruits',
      'Maintain spray schedule through spring'
    ],
    affectedCrops: ['Apple', 'Pear', 'Peach', 'Citrus', 'Potato'],
    severity: 'medium'
  },
  'fire_blight': {
    id: 'fire_blight',
    name: 'Fire Blight',
    scientificName: 'Erwinia amylovora',
    description: 'A destructive bacterial disease of pome fruits causing blackened, burnt-looking shoots.',
    symptoms: [
      'Blackened shoots bent in shepherd\'s crook',
      'Water-soaked blossoms turning brown',
      'Bacterial ooze from infected tissue',
      'Cankers on branches and trunk'
    ],
    causes: [
      'Erwinia amylovora bacteria',
      'Warm, humid weather during bloom',
      'Rain and insects spreading bacteria',
      'Infected pruning tools'
    ],
    preventiveMeasures: [
      'Plant resistant varieties',
      'Avoid excessive nitrogen fertilization',
      'Disinfect pruning tools between cuts',
      'Remove cankers during dry weather',
      'Apply streptomycin during bloom'
    ],
    treatments: [
      'Prune infected branches 12" below visible infection',
      'Apply copper sprays during dormancy',
      'Use antibiotics during bloom period',
      'Remove severely infected trees'
    ],
    affectedCrops: ['Apple', 'Pear', 'Quince', 'Hawthorn', 'Crabapple'],
    severity: 'high'
  },
  'healthy': {
    id: 'healthy',
    name: 'Healthy Plant',
    description: 'The plant appears healthy with no visible signs of disease.',
    symptoms: ['No disease symptoms detected'],
    causes: [],
    preventiveMeasures: [
      'Continue regular monitoring',
      'Maintain proper watering schedule',
      'Ensure adequate nutrition',
      'Practice crop rotation',
      'Keep garden clean of debris'
    ],
    treatments: [],
    affectedCrops: ['All crops'],
    severity: 'low'
  },
  'unknown': {
    id: 'unknown',
    name: 'Unknown Condition',
    description: 'Unable to identify the specific disease. Further analysis may be needed.',
    symptoms: ['Various symptoms present'],
    causes: ['Unknown - requires further diagnosis'],
    preventiveMeasures: [
      'Isolate affected plants',
      'Take samples for laboratory analysis',
      'Monitor plant closely for changes',
      'Maintain good cultural practices'
    ],
    treatments: [
      'Consult with local agricultural extension',
      'Submit samples for professional diagnosis',
      'Avoid spreading to other plants'
    ],
    affectedCrops: ['Various'],
    severity: 'medium'
  }
};

export const getDiseaseInfo = (diseaseId: string): Disease => {
  const normalizedId = diseaseId.toLowerCase().replace(/[\s-]+/g, '_');
  return diseaseDatabase[normalizedId] || diseaseDatabase['unknown'];
};

export const mapPredictionToDisease = (label: string): Disease => {
  const labelLower = label.toLowerCase();
  
  if (labelLower.includes('healthy') || labelLower.includes('normal')) {
    return diseaseDatabase['healthy'];
  }
  if (labelLower.includes('bacterial') && labelLower.includes('spot')) {
    return diseaseDatabase['bacterial_spot'];
  }
  if (labelLower.includes('bacterial') && labelLower.includes('wilt')) {
    return diseaseDatabase['bacterial_wilt'];
  }
  if (labelLower.includes('early') && labelLower.includes('blight')) {
    return diseaseDatabase['early_blight'];
  }
  if (labelLower.includes('late') && labelLower.includes('blight')) {
    return diseaseDatabase['late_blight'];
  }
  if (labelLower.includes('leaf') && labelLower.includes('mold')) {
    return diseaseDatabase['leaf_mold'];
  }
  if (labelLower.includes('powdery') && labelLower.includes('mildew')) {
    return diseaseDatabase['powdery_mildew'];
  }
  if (labelLower.includes('downy') && labelLower.includes('mildew')) {
    return diseaseDatabase['downy_mildew'];
  }
  if (labelLower.includes('septoria')) {
    return diseaseDatabase['septoria_leaf_spot'];
  }
  if (labelLower.includes('anthracnose')) {
    return diseaseDatabase['anthracnose'];
  }
  if (labelLower.includes('black') && labelLower.includes('rot')) {
    return diseaseDatabase['black_rot'];
  }
  if (labelLower.includes('cercospora')) {
    return diseaseDatabase['cercospora_leaf_spot'];
  }
  if (labelLower.includes('fusarium')) {
    return diseaseDatabase['fusarium_wilt'];
  }
  if (labelLower.includes('verticillium')) {
    return diseaseDatabase['verticillium_wilt'];
  }
  if (labelLower.includes('gray') && labelLower.includes('mold') || labelLower.includes('botrytis')) {
    return diseaseDatabase['gray_mold'];
  }
  if (labelLower.includes('rust')) {
    return diseaseDatabase['rust'];
  }
  if (labelLower.includes('mosaic') || labelLower.includes('virus')) {
    return diseaseDatabase['mosaic_virus'];
  }
  if (labelLower.includes('target') && labelLower.includes('spot')) {
    return diseaseDatabase['target_spot'];
  }
  if (labelLower.includes('leaf') && labelLower.includes('curl')) {
    return diseaseDatabase['leaf_curl'];
  }
  if (labelLower.includes('scab')) {
    return diseaseDatabase['scab'];
  }
  if (labelLower.includes('fire') && labelLower.includes('blight')) {
    return diseaseDatabase['fire_blight'];
  }
  
  return diseaseDatabase['unknown'];
};

export const getAllDiseases = (): Disease[] => {
  return Object.values(diseaseDatabase).filter(d => d.id !== 'unknown' && d.id !== 'healthy');
};
