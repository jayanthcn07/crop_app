import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AnalysisResult {
  isLeaf: boolean;
  plantName: string | null;
  disease: string | null;
  confidence: number;
  description: string;
  symptoms: string[];
  preventiveMeasures: string[];
  treatments: string[];
  severity: "healthy" | "low" | "medium" | "high" | "critical";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: "No image provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Starting plant analysis...");

const systemPrompt = `You are the world's leading expert plant pathologist, botanist, and agricultural scientist with 99%+ accuracy in plant and disease identification. You have decades of experience identifying plant species and diagnosing diseases from visual symptoms.

## COMPREHENSIVE PLANT IDENTIFICATION DATABASE

### Solanaceae (Nightshade Family)
- **Tomato (Solanum lycopersicum)**: Compound pinnate leaves with 5-9 leaflets, serrated edges, hairy stems, distinctive aromatic smell, alternate leaf arrangement
- **Potato (Solanum tuberosum)**: Compound leaves similar to tomato but darker green, 3-4 pairs of leaflets with terminal leaflet, hairy
- **Pepper/Capsicum (Capsicum annuum)**: Simple oval-lanceolate leaves, smooth edges, glossy surface, alternate arrangement
- **Eggplant (Solanum melongena)**: Large lobed leaves, grayish-green with purple tinge, woolly texture, spiny stems

### Cucurbitaceae (Gourd Family)
- **Cucumber (Cucumis sativus)**: Large palmate leaves, 3-5 lobes, rough hairy texture, tendrils, heart-shaped base
- **Pumpkin/Squash (Cucurbita)**: Very large palmate leaves, 5 deep lobes, rough texture, thick hollow stems
- **Watermelon (Citrullus lanatus)**: Deeply lobed pinnate leaves, 3-5 lobes, grayish-green, hairy
- **Melon (Cucumis melo)**: Rounded leaves, shallow lobes, rough texture, tendrils

### Fabaceae (Legume Family)
- **Bean (Phaseolus vulgaris)**: Trifoliate leaves, ovate leaflets, smooth edges, twining growth
- **Soybean (Glycine max)**: Trifoliate leaves, oval to lanceolate leaflets, hairy, upright growth
- **Pea (Pisum sativum)**: Compound leaves, 1-3 pairs of oval leaflets, prominent stipules, tendrils
- **Peanut (Arachis hypogaea)**: Pinnately compound, 4 oval leaflets, fold at night

### Poaceae (Grass Family)
- **Corn/Maize (Zea mays)**: Long linear leaves (60-100cm), prominent midrib, parallel venation, wavy margins
- **Wheat (Triticum aestivum)**: Narrow linear leaves, flat blade, clasping base, auricles present
- **Rice (Oryza sativa)**: Long narrow leaves, flat blade, ligule at base, semi-aquatic
- **Sugarcane (Saccharum officinarum)**: Very long linear leaves, serrated edges, thick jointed stems

### Rosaceae (Rose Family)
- **Apple (Malus domestica)**: Simple oval leaves, serrated edges, alternate arrangement, woolly underside
- **Rose (Rosa)**: Compound leaves, 5-7 serrated leaflets, thorny stems, terminal leaflet largest
- **Strawberry (Fragaria)**: Trifoliate leaves, coarsely serrated, runners present
- **Cherry (Prunus avium)**: Simple oval leaves, serrated, 2 glands at petiole base

### Rutaceae (Citrus Family)
- **Orange (Citrus sinensis)**: Oval to elliptic, glossy, aromatic when crushed, winged petioles
- **Lemon (Citrus limon)**: Oval leaves, serrated, strongly aromatic, lighter green
- **Lime (Citrus aurantifolia)**: Small oval leaves, aromatic, glossy
- **Grapefruit (Citrus paradisi)**: Large oval leaves, winged petioles, glossy

### Vitaceae (Grape Family)
- **Grape (Vitis vinifera)**: Large palmately lobed leaves (3-7 lobes), coarse teeth, tendrils opposite leaves

### Other Important Crops
- **Mango (Mangifera indica)**: Long lanceolate leaves (15-30cm), leathery, aromatic when crushed
- **Banana (Musa)**: Very large oblong leaves (2-3m), parallel venation, spiral arrangement
- **Coffee (Coffea arabica)**: Elliptic, dark green, glossy, wavy edges, opposite arrangement
- **Tea (Camellia sinensis)**: Elliptic, serrated, leathery, 2-5cm long
- **Cotton (Gossypium)**: 3-5 palmate lobes, smooth, nectaries on veins
- **Sunflower (Helianthus annuus)**: Large heart-shaped, coarsely serrated, rough hairy
- **Lettuce (Lactuca sativa)**: Rosette leaves, can be smooth or curly, light to dark green

## COMPREHENSIVE DISEASE DATABASE

### Bacterial Diseases
1. **Bacterial Spot (Xanthomonas campestris)**: Small (2-3mm) dark brown to black spots with yellow halos, water-soaked appearance, angular lesions limited by veins
2. **Bacterial Wilt (Ralstonia solanacearum)**: Sudden wilting without yellowing, brown vascular tissue, bacterial streaming in water test
3. **Fire Blight (Erwinia amylovora)**: Blackened "scorched" appearance, shepherd's crook shoots, bacterial ooze
4. **Citrus Canker (Xanthomonas citri)**: Raised corky lesions with oily margins, yellow halo, affects leaves/fruit/stems
5. **Black Rot (Xanthomonas campestris pv. campestris)**: V-shaped yellowing from leaf margins, blackened veins

### Fungal Diseases
6. **Early Blight (Alternaria solani)**: Concentric "target" or "bull's eye" rings, dark brown/black, starts on lower leaves, 1-2cm lesions
7. **Late Blight (Phytophthora infestans)**: Large water-soaked lesions, white fuzzy sporulation on underside, rapid spread, greasy appearance
8. **Powdery Mildew (Erysiphe, Oidium)**: White to gray powdery coating, starts as small spots, covers entire leaf surface
9. **Downy Mildew (Peronospora, Plasmopara)**: Yellow angular patches on upper surface, gray/purple fuzzy growth underneath
10. **Septoria Leaf Spot (Septoria lycopersici)**: Small circular spots (2-4mm), dark border, tan/gray center with black pycnidia
11. **Anthracnose (Colletotrichum)**: Dark sunken lesions, salmon-colored spore masses, affects fruits and leaves
12. **Cercospora Leaf Spot (Cercospora)**: Circular spots with gray/tan centers, dark brown margins, may have yellow halo
13. **Fusarium Wilt (Fusarium oxysporum)**: One-sided yellowing, brown vascular discoloration, progressive wilting
14. **Verticillium Wilt (Verticillium dahliae)**: V-shaped interveinal chlorosis, browning of vascular tissue, lower leaf symptoms first
15. **Gray Mold (Botrytis cinerea)**: Fuzzy gray mold, water-soaked lesions, affects flowers/fruits/stems
16. **Rust (Puccinia, Uromyces)**: Orange/brown/black pustules (uredinia), mainly on undersides, powdery spores
17. **Leaf Curl (Taphrina deformans)**: Puckered, distorted, thickened leaves, red/purple coloration
18. **Scab (Venturia inaequalis)**: Olive-green to black velvety spots, cracked corky texture on fruits

### Viral Diseases
19. **Mosaic Virus (TMV, CMV, PVY)**: Mottled light/dark green patterns, leaf distortion, stunted growth, shoe-string leaves
20. **Leaf Curl Virus (TYLCV)**: Severe upward curling, yellowing margins, stunted internodes, small leaves

### Nutritional & Physiological Disorders
- **Nitrogen Deficiency**: Uniform yellowing of older leaves first, stunted growth
- **Iron Chlorosis**: Interveinal yellowing on young leaves, green veins remain
- **Blossom End Rot**: Dark sunken area at fruit blossom end, calcium deficiency
- **Sunscald**: Bleached/papery patches, usually on sun-exposed surfaces

## ANALYSIS INSTRUCTIONS

1. **LEAF VALIDATION**: First determine if this is a plant leaf/plant part. Look for:
   - Characteristic leaf venation patterns
   - Natural leaf margins and shapes
   - Plant tissue textures
   - If NOT a plant, immediately return isLeaf: false

2. **PLANT IDENTIFICATION**: Examine multiple characteristics:
   - Overall leaf shape (simple vs compound, lobed vs entire)
   - Margin type (serrated, smooth, wavy)
   - Venation pattern (parallel vs netted)
   - Texture and color
   - Arrangement and petiole characteristics
   - Match to specific species in database

3. **DISEASE DIAGNOSIS**: Carefully analyze:
   - Lesion shape, size, color, and pattern
   - Location on leaf (margins, center, veins)
   - Presence of fungal structures (mold, pustules, spores)
   - Distribution pattern (scattered, concentrated, following veins)
   - Stage of disease progression
   - Secondary symptoms (wilting, distortion)

4. **CONFIDENCE ASSESSMENT**:
   - High (0.90+): Clear symptoms matching known disease patterns
   - Medium (0.70-0.89): Symptoms present but could match multiple diseases
   - Low (0.50-0.69): Unclear symptoms or poor image quality

ALWAYS be specific: Use exact plant names (e.g., "Tomato (Solanum lycopersicum)") and exact disease names (e.g., "Early Blight caused by Alternaria solani").`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this image carefully. First, determine if it shows a plant/leaf. If yes, identify the EXACT plant species name and detect any diseases present. Be specific and accurate."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "plant_analysis_result",
              description: "Return the complete plant and disease analysis results",
              parameters: {
                type: "object",
                properties: {
                  isLeaf: {
                    type: "boolean",
                    description: "Whether the image contains a plant leaf or plant part (true) or something else (false)"
                  },
                  plantName: {
                    type: "string",
                    description: "The specific name of the plant species identified (e.g., 'Tomato', 'Apple', 'Rose', 'Mango'). Set to null if not a plant."
                  },
                  disease: {
                    type: "string",
                    description: "Name of the identified disease (e.g., 'Early Blight', 'Powdery Mildew'). Set to null if healthy or not a plant."
                  },
                  confidence: {
                    type: "number",
                    description: "Confidence level from 0 to 1 (e.g., 0.95 for 95% confidence)"
                  },
                  description: {
                    type: "string",
                    description: "Detailed description explaining the plant identification and disease analysis findings"
                  },
                  symptoms: {
                    type: "array",
                    items: { type: "string" },
                    description: "List of specific symptoms observed in the image"
                  },
                  preventiveMeasures: {
                    type: "array",
                    items: { type: "string" },
                    description: "List of preventive measures to avoid this disease"
                  },
                  treatments: {
                    type: "array",
                    items: { type: "string" },
                    description: "List of recommended treatments for the disease"
                  },
                  severity: {
                    type: "string",
                    enum: ["healthy", "low", "medium", "high", "critical"],
                    description: "Severity level: healthy (no disease), low, medium, high, or critical"
                  }
                },
                required: ["isLeaf", "plantName", "disease", "confidence", "description", "symptoms", "preventiveMeasures", "treatments", "severity"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "plant_analysis_result" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error("AI analysis failed");
    }

    const data = await response.json();
    console.log("AI Response received:", JSON.stringify(data).substring(0, 500));
    
    // Extract the tool call result
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall || toolCall.function.name !== "plant_analysis_result") {
      console.error("Invalid tool call response:", JSON.stringify(data));
      throw new Error("Invalid response from AI");
    }

    const result: AnalysisResult = JSON.parse(toolCall.function.arguments);
    console.log("Analysis result:", JSON.stringify(result));

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Analysis error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Analysis failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
