import { CarbonInput, Recommendation, HotspotCategory, PersonalizedReductionPlan } from '../types/index.js';
import { calculateCarbonFootprint, getScoreBenchmarks, calculateSustainabilityScore } from '../utils/calculations.js';

const EMISSION_FACTORS = {
  transportation: { car: 0.21, bike: 0, bus: 0.089, train: 0.041 },
  energy: { electricity: 0.527, ac: 0.65 },
  food: { vegetarian: 1.5, nonVegetarian: 3.3 },
  lifestyle: { onlineShopping: 2.5, waste: 1.8 },
} as const;

interface OpenRouterResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

const SYSTEM_PROMPT = `You are CarbonWise AI Sustainability Coach, a professional and friendly sustainability assistant.

CRITICAL LANGUAGE RULE: You MUST respond ONLY in English at all times.
- Never use Hindi, Hinglish, Marathi, or any mixed language.
- Never output phrases such as "kam karne", "karein", "aap", "hai", "ke tips", etc.
- Even if the user writes in Hindi or Hinglish, always reply in clear, professional English.

ANSWER THE EXACT QUESTION:
- Understand the user's actual question and answer that question directly.
- Do NOT return a generic carbon-footprint report for every question.
- Do NOT return eco-challenges unless the user specifically asks about challenges.

CARBON DATA RULE:
- Use only the carbon data actually provided by the application.
- Never invent, guess, or fabricate carbon values, historical values, savings, percentages, or trends.
- If the required data is missing, clearly explain what data is missing and what is required to answer the question.

TREND QUESTIONS:
For questions such as "Are my emissions increasing or decreasing?" or "How have my emissions changed?":
If historical data does not exist, you MUST respond exactly: "I cannot determine whether your emissions are increasing or decreasing because historical carbon-footprint data is not available. I need carbon-footprint data from at least two different time periods to calculate the trend." Do NOT invent previous month values.

QUESTION-SPECIFIC BEHAVIOR:
- "What affects me most?": Identify the highest-emission category from the available data.
- "What is my carbon footprint?": Give the current total and category breakdown.
- "How can I reduce my footprint?": Give practical recommendations based on the user's actual highest-impact categories.
- "Which combination of changes would reduce my footprint the most?": Calculate or estimate the combined impact ONLY from available data and clearly identify assumptions.
- "What lifestyle change would have the biggest impact?": Identify the highest-impact actionable change supported by the user's data.
- "Ask me questions about my lifestyle...": Ask relevant questions ONE AT A TIME before giving personalized recommendations.
- General sustainability questions: Answer the question directly. Do not unnecessarily repeat the user's complete carbon-footprint dashboard.
- Unrelated questions: Politely explain that the coach focuses on sustainability and carbon-footprint topics.

RESPONSE QUALITY:
- Professional English. Clear and concise.
- Use headings and bullet points when useful.
- Avoid unnecessarily repeating the same information or complete dashboard.
- Do not use excessive emojis.
- Do not generate random challenges or unrelated recommendations.

FINAL REQUIREMENT: Before answering, internally check if your response is entirely in English, answers the exact question, uses only available data, and avoids inventing info or repeating the dashboard unnecessarily.`;

function calculateHotspots(carbonData: CarbonInput): HotspotCategory[] {
  const result = calculateCarbonFootprint(carbonData);
  const categories: HotspotCategory[] = [
    { name: 'Transportation', value: result.transportation, percentage: 0 },
    { name: 'Energy', value: result.energy, percentage: 0 },
    { name: 'Food', value: result.food, percentage: 0 },
    { name: 'Lifestyle', value: result.lifestyle, percentage: 0 },
  ];
  const total = result.total || 1;
  return categories.map((c) => ({ ...c, percentage: (c.value / total) * 100 })).sort((a, b) => b.value - a.value);
}

function buildDeepReductionPlan(carbonData: CarbonInput): PersonalizedReductionPlan {
  const hotspots = calculateHotspots(carbonData);
  const highest = hotspots[0];
  const total = calculateCarbonFootprint(carbonData).total;

  let categorySavings = 0;
  if (highest.name === 'Transportation') {
    const input = carbonData.transportation;
    const carSave = input.carDistance * 0.21 * 0.3 * 30;
    const transitSave = input.carDistance * 0.21 * 0.6 * 30;
    categorySavings = Math.max(carSave, transitSave);
  } else if (highest.name === 'Energy') {
    const input = carbonData.energy;
    categorySavings = Math.max(input.electricityUsage * 0.527 * 0.3, input.acUsage * 0.65 * 0.25);
  } else if (highest.name === 'Food') {
    const input = carbonData.food;
    const nonVegSave = input.nonVegetarianMeals * 1.8 * 4;
    categorySavings = nonVegSave;
  } else if (highest.name === 'Lifestyle') {
    const input = carbonData.lifestyle;
    categorySavings = Math.max(input.onlineShoppingFrequency * 2.5 * 0.5, input.wasteGeneration * 1.8 * 0.6 * 4);
  }

  const reductionPercent = total > 0 ? (categorySavings / total) * 100 : 0;

  return {
    highestCategory: highest,
    categorySavings: Math.round(categorySavings * 10) / 10,
    totalFootprint: Math.round(total * 10) / 10,
    reductionPercent: Math.round(reductionPercent * 10) / 10,
    recommendations: [],
  };
}

function buildPrompt(message: string, carbonData?: CarbonInput): { system: string; context: string } {
  let context = '';
  if (carbonData) {
    const result = calculateCarbonFootprint(carbonData);
    const categories = [
      { name: 'Transportation', value: result.transportation },
      { name: 'Energy', value: result.energy },
      { name: 'Food', value: result.food },
      { name: 'Lifestyle', value: result.lifestyle },
    ];
    categories.sort((a, b) => b.value - a.value);

    context = `User's Carbon Footprint Data (monthly):
- Total: ${result.total.toFixed(1)} kg CO₂
- ${categories.map(c => `${c.name}: ${c.value.toFixed(1)} kg CO₂`).join('\n- ')}
- Biggest category: ${categories[0].name} (${result.total > 0 ? ((categories[0].value / result.total) * 100).toFixed(0) : 0}% of total)`;
  }

  return { system: SYSTEM_PROMPT, context };
}

let providerRequestCount = 0;

async function generateAIResponse(
  message: string,
  carbonData?: CarbonInput,
): Promise<string | null> {
  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_KEY) {
    throw new Error('AI Coach Error: API key is missing. Please configure GEMINI_API_KEY.');
  }

  const { system, context } = buildPrompt(message, carbonData);

  const maxRetries = 2;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      providerRequestCount++;
      console.log(`[AI Coach] Provider request #${providerRequestCount}`);

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_KEY}`;
      
      const systemText = system + (context ? `\n\nUser Data:\n${context}` : '');
      const payload = {
        systemInstruction: { parts: [{ text: systemText }] },
        contents: [{ role: 'user', parts: [{ text: message }] }]
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      });

      console.log(`[AI Coach] Provider response: HTTP ${res.status}`);

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`AI API Error Details: ${errorText}`);

        if (res.status === 429) {
          const retryAfter = res.headers.get('Retry-After');
          if (attempt < maxRetries) {
            const delayMs = retryAfter && !isNaN(parseInt(retryAfter, 10)) ? parseInt(retryAfter, 10) * 1000 : Math.pow(2, attempt) * 1000;
            console.log(`Retrying in ${delayMs}ms...`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
            attempt++;
            continue;
          }
        }

        let userMessage = `Provider returned HTTP ${res.status}`;
        if (res.status === 400 && errorText.includes('API_KEY_INVALID')) {
           userMessage = 'AI Coach authentication failed. Please check the configured AI provider credentials.';
        } else if (res.status === 401 || res.status === 403) {
          userMessage = 'AI Coach authentication failed. Please check the configured AI provider credentials.';
        } else if (res.status === 429) {
          userMessage = 'The AI Coach is temporarily rate-limited. Please wait a moment and try again.';
        } else if (res.status >= 500 && res.status <= 503) {
          userMessage = 'The AI Coach service is temporarily unavailable. Please try again shortly.';
        }

        throw new Error(`AI Coach Error: ${userMessage}`);
      }

      const data = await res.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      
      if (!content) return null;
      if (content.length < 20) return null;

      const alphaRatio = (content.match(/[a-zA-Z0-9\s]/g)?.length || 0) / content.length;
      if (alphaRatio < 0.6) return null;

      const devanagariChars = (content.match(/[\u0900-\u097F]/g) || []).length;
      if (devanagariChars > 5) return null;

      const hasEnglish = (content.match(/[a-zA-Z]\w+/g) || []).length >= 3;
      if (!hasEnglish && content.length > 50) return null;

      return content;
    } catch (error: any) {
      if (error?.message?.startsWith('AI Coach Error:')) {
        throw error;
      }
      throw new Error(`AI Coach Error: ${error?.message || 'Unknown provider error'}`);
    }
  }
  return null;
}

function generateTransportRecommendations(
  input: CarbonInput['transportation'],
): Recommendation[] {
  const recs: Recommendation[] = [];
  if (input.carDistance > 10) {
    recs.push({
      category: 'Transportation',
      suggestion:
        'Switch to carpooling or public transport for your daily commute. Buses produce approximately 60% less CO₂ than private cars per km.',
      impact: 'High',
      savings: input.carDistance * 0.21 * 0.5 * 30,
    });
  }
  if (input.bikeDistance < 5 && input.carDistance > 5) {
    recs.push({
      category: 'Transportation',
      suggestion:
        'Replace short car trips (under 5 km) with cycling — zero emissions and great exercise.',
      impact: 'Medium',
      savings: 5 * 0.21 * 30,
    });
  }
  if (input.busDistance === 0 && input.trainDistance === 0 && input.carDistance > 0) {
    recs.push({
      category: 'Transportation',
      suggestion:
        'Consider using buses or trains instead of your car — they produce 60–80% less CO₂ per km.',
      impact: 'High',
      savings: input.carDistance * 0.21 * 0.7 * 30,
    });
  }
  return recs;
}

function generateEnergyRecommendations(
  input: CarbonInput['energy'],
): Recommendation[] {
  const recs: Recommendation[] = [];
  if (input.electricityUsage > 500) {
    recs.push({
      category: 'Energy',
      suggestion:
        'Switch to LED bulbs and energy-efficient appliances, and unplug devices when not in use — electricity usage could drop by up to 30%.',
      impact: 'High',
      savings: input.electricityUsage * 0.527 * 0.3,
    });
  }
  if (input.acUsage > 4) {
    recs.push({
      category: 'Energy',
      suggestion:
        'Set your AC to 24°C instead of 18°C — each degree higher saves approximately 6% of cooling energy.',
      impact: 'Medium',
      savings: input.acUsage * 0.65 * 0.2,
    });
  }
  if (input.electricityUsage > 300 && input.electricityUsage <= 500) {
    recs.push({
      category: 'Energy',
      suggestion:
        'Unplug electronics when not in use and use smart power strips — standby power can account for up to 10% of your electricity bill.',
      impact: 'Low',
      savings: input.electricityUsage * 0.527 * 0.1,
    });
  }
  return recs;
}

function generateFoodRecommendations(input: CarbonInput['food']): Recommendation[] {
  const recs: Recommendation[] = [];
  const totalMeals = input.vegetarianMeals + input.nonVegetarianMeals;
  if (totalMeals > 0 && input.nonVegetarianMeals / totalMeals > 0.5) {
    recs.push({
      category: 'Food',
      suggestion:
        'Replace 3–4 meat-based meals per week with plant-based options — their carbon footprint is roughly half that of meat meals.',
      impact: 'High',
      savings: input.nonVegetarianMeals * 1.8 * 4,
    });
  }
  if (input.nonVegetarianMeals > 10) {
    recs.push({
      category: 'Food',
      suggestion:
        'Limit red meat to once per week — this alone can reduce your food footprint by up to 40%.',
      impact: 'Medium',
      savings: input.nonVegetarianMeals * 3.3 * 0.4 * 4,
    });
  }
  return recs;
}

function generateLifestyleRecommendations(
  input: CarbonInput['lifestyle'],
): Recommendation[] {
  const recs: Recommendation[] = [];
  if (input.onlineShoppingFrequency > 3) {
    recs.push({
      category: 'Lifestyle',
      suggestion:
        'Consolidate your online orders to reduce packaging waste and delivery trips — this can cut delivery-related emissions by up to 50%.',
      impact: 'Medium',
      savings: input.onlineShoppingFrequency * 2.5 * 0.5,
    });
  }
  if (input.wasteGeneration > 3) {
    recs.push({
      category: 'Lifestyle',
      suggestion:
        'Compost organic waste and increase recycling — this can reduce waste-related methane emissions by up to 60%.',
      impact: 'High',
      savings: input.wasteGeneration * 1.8 * 0.6 * 4,
    });
  }
  return recs;
}

export function generateRecommendations(input: CarbonInput): Recommendation[] {
  return [
    ...generateTransportRecommendations(input.transportation),
    ...generateEnergyRecommendations(input.energy),
    ...generateFoodRecommendations(input.food),
    ...generateLifestyleRecommendations(input.lifestyle),
  ];
}

function buildDataSummary(carbonData: CarbonInput): string {
  const result = calculateCarbonFootprint(carbonData);
  const categories = [
    { name: 'Transportation', value: result.transportation },
    { name: 'Energy', value: result.energy },
    { name: 'Food', value: result.food },
    { name: 'Lifestyle', value: result.lifestyle },
  ];
  categories.sort((a, b) => b.value - a.value);

  let summary = `Your estimated monthly carbon footprint is **${result.total.toFixed(1)} kg CO₂e**.\n\n### Category Breakdown\n`;
  categories.forEach((c) => {
    const pct = result.total > 0 ? ((c.value / result.total) * 100).toFixed(0) : '0';
    summary += `- **${c.name}**: ${c.value.toFixed(1)} kg CO₂e (${pct}%)\n`;
  });
  return summary;
}

function treesEquivalency(kgCO2: number): string {
  const treesPlanted = (kgCO2 / 21).toFixed(0);
  return `${treesPlanted} trees planted (1 tree absorbs ~21 kg CO₂/year)`;
}

function hotspotAnalysis(carbonData: CarbonInput): string {
  const result = calculateCarbonFootprint(carbonData);
  const categories = [
    { name: 'Transportation', value: result.transportation },
    { name: 'Energy', value: result.energy },
    { name: 'Food', value: result.food },
    { name: 'Lifestyle', value: result.lifestyle },
  ].filter(c => c.value > 0);
  categories.sort((a, b) => b.value - a.value);

  if (categories.length === 0) return '';

  const total = categories.reduce((s, c) => s + c.value, 0);
  let analysis = `\n\n### Hotspot Analysis\n`;
  categories.forEach((c, i) => {
    const pct = total > 0 ? ((c.value / total) * 100).toFixed(0) : '0';
    const bar = '█'.repeat(parseInt(pct) / 10) || '▏';
    analysis += `${i + 1}. **${c.name}**: ${bar} ${pct}% (${c.value.toFixed(1)} kg CO₂e)\n`;
  });
  return analysis;
}

function buildPersonalizedReductionPlan(carbonData: CarbonInput): string {
  const result = calculateCarbonFootprint(carbonData);
  const recs = generateRecommendations(carbonData);
  const plan = buildDeepReductionPlan(carbonData);

  const { highestCategory, categorySavings, totalFootprint, reductionPercent } = plan;

  let response = `Your biggest emission hotspot is **${highestCategory.name}**, contributing **${highestCategory.percentage.toFixed(0)}%** (${highestCategory.value.toFixed(1)} kg CO₂e) of your total ${totalFootprint} kg CO₂e/month.`;

  response += `\n\n### 📊 Savings Calculation`;
  response += `\n• **Current ${highestCategory.name} emissions**: ${highestCategory.value.toFixed(1)} kg CO₂e/month`;
  response += `\n• **Target reduction (30% of hotspot)**: ${(highestCategory.value * 0.3).toFixed(1)} kg CO₂e/month`;
  response += `\n• **Estimated savings by focusing on ${highestCategory.name}**: ~${categorySavings} kg CO₂e/month`;
  response += `\n• **Overall footprint reduction**: ~${reductionPercent}%`;
  response += `\n• **Equivalent to**: ${treesEquivalency(categorySavings)}`;

  if (highestCategory.name === 'Transportation') {
    const km = carbonData.transportation.carDistance;
    response += `\n\n### 💡 Action Plan\nReducing your car travel from ${km} km/day to ${Math.round(km * 0.7)} km/day (${Math.round(km * 0.3)} km less) could save an estimated **${(km * 0.21 * 0.3 * 30).toFixed(1)} kg CO₂e/month**.`;
  } else if (highestCategory.name === 'Energy') {
    const kwh = carbonData.energy.electricityUsage;
    response += `\n\n### 💡 Action Plan\nReducing electricity usage from ${kwh} kWh to ${Math.round(kwh * 0.8)} kWh/month could save an estimated **${(kwh * 0.527 * 0.2).toFixed(1)} kg CO₂e/month**. Setting your AC to 24°C instead of 18°C could save an additional **${(carbonData.energy.acUsage * 0.65 * 0.25).toFixed(1)} kg CO₂e/month**.`;
  } else if (highestCategory.name === 'Food') {
    const nv = carbonData.food.nonVegetarianMeals;
    const replaceCount = Math.min(5, Math.round(nv * 0.4));
    response += `\n\n### 💡 Action Plan\nReplacing ${replaceCount} non-vegetarian meals with vegetarian options per week could save an estimated **${(replaceCount * 1.8 * 4).toFixed(1)} kg CO₂e/month**.`;
  } else if (highestCategory.name === 'Lifestyle') {
    const shop = carbonData.lifestyle.onlineShoppingFrequency;
    response += `\n\n### 💡 Action Plan\nReducing online shopping from ${shop} to ${Math.max(0, shop - 2)} orders/month could save an estimated **${(Math.min(shop, 2) * 2.5 * 0.5).toFixed(1)} kg CO₂e/month**. Adding composting for your organic waste could save an additional **${(carbonData.lifestyle.wasteGeneration * 1.8 * 0.6 * 4).toFixed(1)} kg CO₂e/month**.`;
  }

  if (recs.length > 0) {
    response += '\n\n### Personalized Recommendations\n';
    recs.slice(0, 4).forEach((rec, i) => {
      response += `\n${i + 1}. **${rec.category}**: ${rec.suggestion}\n   - Estimated saving: ~${rec.savings.toFixed(0)} kg CO₂e/month (${rec.impact} impact)`;
    });
    const totalSavings = recs.reduce((s, r) => s + r.savings, 0);
    response += `\n\n**💰 Total estimated savings: ${totalSavings.toFixed(0)} kg CO₂e/month** (${result.total > 0 ? ((totalSavings / result.total) * 100).toFixed(0) : 0}% reduction potential)`;
    response += `\n🌿 ${treesEquivalency(totalSavings)}`;
  } else {
    response += '\nYou are already doing great! Keep maintaining your sustainable habits.';
  }

  response += '\n\nTry the Simulator page to explore real-time changes to your footprint!';
  return response;
}

export async function generateCoachResponse(
  message: string,
  carbonData?: CarbonInput,
): Promise<string> {
  const aiResponse = await generateAIResponse(message, carbonData);
  if (aiResponse) return aiResponse;

  const lower = message.toLowerCase();

  const isAskPurpose = /(kaam kya|kaam kese|kis liye|kya kaam|website kya|app kya|yeh kya|yh kya|ye kya|yeh website|yh website|what is this|what does this|how does this work|kya krti|kya krta|kyu bna|kyu banaya|intro|introduction|about this|about carbonwise|purpose kya)/.test(lower);
  const isGreeting = /^(hi|hello|hey|namaste|hii|yo|hlo|sup|what's up|wasup)\b/.test(lower);
  const isAskCalculation = /(calculate kese|calculate kaise|how (is|was|does|do you) .* calculat|kaise calculate|kese calculate|calculation kaise|formula kya|formula kya hai|kaise aaya|kese aaya|how does.*calculate|how do you calculate|calculation kese|calculation kaise hoti|kaise calculate kiya|explain calculation|breakdown kaise|formula kya h|method kya)/.test(lower);
  const isAskReduce = /(reduce|save|how (can|do) i|how to|tips|suggest|recommend|kam|km kr|ghatana|sudhar|improve|lower|cut|help|kya karun|kya kare|upay|upai|tarika|suggestion|kya kru|suljhaw|solution|hack|trick|best way)/.test(lower);
  const isAskImpact = /(biggest|most impact|affects me most|sabse zyada|sbse jyada|sbse jada|sabse jada|major|main|primary|highest|largest|top contributor|biggest contributor|most affect|kiska sabse|kaunsi category|category sabse|kyu energy|kyu transport)/.test(lower);
  const isAskChallenge = /(challenge|goal|gamification|chunauti|challenge kya|challenge konse|challenge kaise|mission|task|daily task|eco challenge)/.test(lower);
  const isAskScore = /(score|sustainability|rating|kitna score|score kya|mujhe kitna|mera score|my score|how bad|how good am i)/.test(lower);
  const isAskTransport = /(transport|car|bike|bus|train|vehicle|drive|commute|travel|petrol|diesel|ev|electric vehicle|fuel|emission.*car)/.test(lower);
  const isAskEnergy = /(energy|electricity|bijli|light|ac|air conditioner|heater|fan|appliance|power|battery|solar|led)/.test(lower);
  const isAskFood = /(food|diet|meal|khana|veg|vegetarian|non.veg|meat|vegan|plant|dairy|milk|cheese|chicken|mutton|beef)/.test(lower);
  const isAskLifestyle = /(lifestyle|shopping|waste|kachra|garbage|recycle|plastic|online shopping|delivery|packaging|disposal|compost)/.test(lower);
  const isAskTrend = /(increas|decreas|improv|chang|compar|trend|history|historical|last month)/.test(lower);
  const isAskFootprint = /(what is my.*footprint|show my footprint|mera footprint|current footprint|my emissions|my carbon footprint|carbon footprint kya)/.test(lower);

  if (isAskTrend) {
    return 'I cannot determine whether your emissions are increasing or decreasing because historical carbon-footprint data is not available. I need carbon-footprint data from at least two different time periods to calculate the trend.';
  }

  if (isAskFootprint && carbonData) {
    return buildDataSummary(carbonData);
  }

  if (isGreeting && !isAskReduce && !isAskImpact) {
    if (carbonData) {
      const result = calculateCarbonFootprint(carbonData);
      return `Hello! 👋 Your current monthly carbon footprint is **${result.total.toFixed(1)} kg CO₂e**. Ask me how to reduce it or which category has the biggest impact!`;
    }
    return 'Hello! I am your CarbonWise AI Sustainability Coach. Ask me for tips on reducing your carbon footprint, understanding your impact, or getting personalized eco-recommendations!';
  }

  if (isAskPurpose) {
    return 'CarbonWise AI is a smart sustainability platform that calculates your carbon footprint and provides tips to reduce it.\n\n### What can you do here?\n\n1. **Calculator** — Calculate your monthly carbon footprint across energy, transport, food, and lifestyle\n2. **Dashboard** — View a visual overview of your footprint over time\n3. **Simulator** — Explore "what if" scenarios to see how changes affect your emissions\n4. **AI Coach** — Ask me anything about sustainability and carbon reduction\n5. **Challenges** — Complete eco-friendly goals and earn points\n\n### How does it work?\nYou provide your activity data (electricity usage, car travel, meals, shopping). The system uses standard emission factors to calculate your CO₂ emissions. Then the AI gives you personalized recommendations.\n\nWould you like to start with the Calculator?';
  }

  if (isAskImpact) {
    if (!carbonData) {
      return 'Please calculate your carbon footprint on the Calculator page first. Then I can give you personalized insights based on your actual data!';
    }
    const result = calculateCarbonFootprint(carbonData);
    const categories = [
      { name: 'Transportation', value: result.transportation },
      { name: 'Energy', value: result.energy },
      { name: 'Food', value: result.food },
      { name: 'Lifestyle', value: result.lifestyle },
    ];
    categories.sort((a, b) => b.value - a.value);
    const biggest = categories[0];
    
    return `${biggest.name} is your largest emission category, accounting for ${((biggest.value / result.total) * 100).toFixed(0)}% of your current footprint (${biggest.value.toFixed(1)} kg CO₂e/month).`;
  }

  if (isAskCalculation) {
    return 'Here is how your carbon footprint is calculated:\n\n### Emission Formulas\n\n- **Energy** = electricity (kWh) × 0.527 + AC (hours) × 0.65\n- **Transport** = car (km) × 0.21 + bus (km) × 0.089 + train (km) × 0.041\n- **Food** = vegetarian meals × 1.5 + non-vegetarian meals × 3.3\n- **Lifestyle** = online shopping orders × 2.5 + waste (kg) × 1.8\n\nThe multipliers (0.527, 0.21, etc.) are standard emission factors — they represent how much CO₂ is produced per unit of each activity.\n\n**Total footprint** = Energy + Transport + Food + Lifestyle\n**Category %** = (category value ÷ total) × 100\n\nVisit the Calculator page to see your own footprint!';
  }

  if (isAskReduce) {
    if (!carbonData) {
      return 'Great question! Here are some general tips to reduce your carbon footprint:\n\n1. **Transport**: Walk, cycle, or use public transit instead of driving\n2. **Energy**: Switch to LED bulbs and unplug devices when not in use\n3. **Food**: Choose more plant-based meals during the week\n4. **Lifestyle**: Consolidate shopping orders and increase recycling\n\nFor personalized recommendations, calculate your footprint on the Calculator page first!';
    }
    return buildPersonalizedReductionPlan(carbonData);
  }

  if (isAskChallenge) {
    return 'Great idea! Here are some eco-challenges you can try:\n\n' +
      '### Transportation\n' +
      '1. **Public Transport Week** — Use only public transit for 7 days (500 pts)\n' +
      '2. **No Car Day** — Go car-free for one day (100 pts)\n' +
      '3. **Bike Commute** — Cycle to work 3+ days this week (250 pts)\n' +
      '4. **Carpool Week** — Share rides for 5 days (300 pts)\n\n' +
      '### Energy\n' +
      '5. **Save Electricity** — Reduce usage by 20% this month (300 pts)\n' +
      '6. **Solar Switch** — Use only solar chargers for one week (350 pts)\n' +
      '7. **Cold Water Wash** — Wash clothes in cold water for 2 weeks (200 pts)\n' +
      '8. **AC-Free Week** — Avoid air conditioning for 7 days (400 pts)\n\n' +
      '### Food\n' +
      '9. **Plant-Based Week** — Eat only plant-based meals for 7 days (400 pts)\n' +
      '10. **Local Food Challenge** — Buy only local produce for one week (350 pts)\n' +
      '11. **Meat-Free Month** — Go meat-free for 30 days (1000 pts)\n\n' +
      '### Lifestyle\n' +
      '12. **No Online Shopping Week** — Avoid online orders for one week (200 pts)\n' +
      '13. **Zero Waste Week** — Send zero items to landfill for 7 days (450 pts)\n' +
      '14. **Paperless Office** — Go paperless for one week (150 pts)\n' +
      '15. **Tree Planting Drive** — Plant 5 trees this month (600 pts)\n\n' +
      'Visit the Challenges page to track your progress!';
  }

  if (isAskScore) {
    if (!carbonData) {
      const benchmarks = getScoreBenchmarks();
      return 'The Sustainability Score (0–100) compares your footprint against these benchmarks:' +
        '\n\n- **Indian average**: ' + benchmarks.indianAvg + ' kg CO₂e/month' +
        '\n- **Global average**: ' + benchmarks.globalAvg + ' kg CO₂e/month' +
        '\n- **Sustainable target**: ' + benchmarks.target + ' kg CO₂e/month' +
        '\n\n### Score Categories' +
        '\n- **80–100**: Excellent' +
        '\n- **60–79**: Good' +
        '\n- **40–59**: Average' +
        '\n- **0–39**: Needs Improvement' +
        '\n\nCalculate your footprint on the Calculator page to see your personal score!';
    }
    const result = calculateCarbonFootprint(carbonData);
    const benchmarks = getScoreBenchmarks();
    const score = Math.round(Math.max(0, 100 - (result.total / benchmarks.indianAvg) * 100));
    const category = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Average' : 'Needs Improvement';

    let comparison = '';
    if (result.total < benchmarks.target) {
      comparison = '\n\nExcellent! Your footprint (' + result.total.toFixed(1) + ' kg CO₂e) is below the sustainable target of ' + benchmarks.target + ' kg CO₂e/month — keep it up!';
    } else if (result.total < benchmarks.indianAvg) {
      comparison = '\n\nYour footprint (' + result.total.toFixed(1) + ' kg CO₂e) is below the Indian average of ' + benchmarks.indianAvg + ' kg CO₂e/month. Keep improving!';
    } else if (result.total < benchmarks.globalAvg) {
      comparison = '\n\nYour footprint (' + result.total.toFixed(1) + ' kg CO₂e) is below the global average (' + benchmarks.globalAvg + ' kg CO₂e) but slightly above the Indian average (' + benchmarks.indianAvg + ' kg CO₂e).';
    } else {
      comparison = '\n\nYour footprint (' + result.total.toFixed(1) + ' kg CO₂e) is above the global average (' + benchmarks.globalAvg + ' kg CO₂e). Visit the Simulator to explore how changes can reduce it!';
    }

    return 'Your Sustainability Score is **' + score + '/100** (' + category + ').' + comparison;
  }

  if (isAskTransport) {
    return 'Tips to reduce transport emissions:\n\n1. **Walk or bike** for short distances (<5 km) — zero emissions\n2. **Public transport** (bus/train) produces 60-80% less CO₂ than cars\n3. **Carpool** — sharing a car with 4 people reduces emissions by 75%\n4. **Electric vehicles** emit 50-70% less than petrol cars\n5. **Avoid flights** — a round trip can emit over 1 ton of CO₂\n\nTip: Replacing just 10 km/day of car driving with the bus can save ~550 kg CO₂/year!';
  }

  if (isAskEnergy) {
    return 'Tips to reduce energy emissions:\n\n1. **LED bulbs** use 80% less energy than incandescent bulbs\n2. **Unplug devices** — standby power can be 10% of your bill\n3. **Set AC to 24°C** instead of 18°C — each degree saves 6% energy\n4. **Solar panels** can reduce grid electricity use by 60-90%\n5. **Energy-efficient appliances** use 30-50% less power\n\nElectricity is usually the largest contributor. Every 100 kWh saved = 53 kg CO₂ avoided!';
  }

  if (isAskFood) {
    return 'Tips to reduce food emissions:\n\n1. **Plant-based meals** have half the carbon footprint of meat meals\n2. **Eat less red meat** — beef emits 60 kg CO₂ per kg vs lentils at 2 kg per kg\n3. **Avoid food waste** — 1/3 of food is wasted, causing 8% of global emissions\n4. **Buy local & seasonal** — reduces transport emissions by up to 10x\n5. **Compost** organic waste instead of sending it to the landfill\n\nGoing vegetarian for just 3 days a week saves ~200 kg CO₂/year!';
  }

  if (isAskLifestyle) {
    return 'Tips to reduce lifestyle emissions:\n\n1. **Reduce online shopping** — consolidate orders to minimize delivery trips\n2. **Avoid single-use plastic** — every kg of plastic produces 6 kg of CO₂\n3. **Recycle and compost** — reduces waste methane emissions by up to 60%\n4. **Buy second-hand** — extends product life and reduces manufacturing emissions\n5. **Minimalism** — if you don\'t buy it, there\'s no production footprint\n\nEven small lifestyle changes can add up to significant savings over time!';
  }

  if (carbonData) {
    return buildPersonalizedReductionPlan(carbonData);
  }

  return 'How can I help you today?\n\nHere are some things you can ask me:\n1. **How to reduce my footprint?** — "How can I reduce my carbon footprint"\n2. **Biggest impact area?** — "What affects my carbon footprint most"\n3. **How calculations work?** — "How is my footprint calculated"\n4. **Eco challenges** — "Give me a sustainability challenge"\n5. **Sustainability score** — "What is my sustainability score"\n\nCalculate your carbon footprint on the Calculator page first for personalized advice!';
}
