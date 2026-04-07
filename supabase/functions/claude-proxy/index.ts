import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { type, image, data } = await req.json();

    let messages: any[];
    let maxTokens = 1024;

    switch (type) {
      case 'meal':
        messages = [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: image.mediaType, data: image.base64 } },
            { type: 'text', text: `Analyze this meal photo. Return a JSON object with exactly these fields:
{
  "items": "comma-separated list of identified food items",
  "nutrients": {
    "calories": number,
    "protein": number (grams),
    "carbs": number (grams),
    "fat": number (grams),
    "fiber": number (grams),
    "sugar": number (grams),
    "sodium": number (mg),
    "vitaminA": number (% daily value),
    "vitaminC": number (% daily value),
    "vitaminD": number (% daily value),
    "calcium": number (% daily value),
    "iron": number (% daily value),
    "potassium": number (mg)
  },
  "suggestion": "one specific healthier swap or addition to improve this meal nutritionally"
}
Estimate portion sizes from the photo. Be encouraging but suggest improvements. Return ONLY the JSON, no other text.` }
          ]
        }];
        break;

      case 'garmin-screenshot':
        messages = [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: image.mediaType, data: image.base64 } },
            { type: 'text', text: `Analyze this Garmin Connect screenshot. Extract ALL visible activities/workouts.

For each activity, return a JSON object with these fields:
{
  "name": "activity name exactly as shown",
  "type": "one of: swimming, walking, running, cycling, strength, yoga, other",
  "date": "date as shown",
  "time": "start time if shown",
  "duration": duration in seconds,
  "distance": distance in meters (0 if not shown),
  "calories": calories if shown (0 if not shown),
  "avgHR": average heart rate if shown (0 if not shown),
  "pace": "pace as shown ('' if not shown)",
  "sets": number of sets if shown (0 otherwise)
}

Return ONLY a JSON array of activity objects. No other text.` }
          ]
        }];
        maxTokens = 2048;
        break;

      case 'garmin-insights':
        messages = [{
          role: 'user',
          content: `You are a sports science and health analytics expert. Analyze this fitness data from a Garmin watch and find meaningful patterns, correlations, and actionable insights.

DATA (last 90 days):
${JSON.stringify(data)}

Return a JSON array of 4-6 insight objects:
{
  "title": "Short compelling title",
  "category": "one of: sleep, recovery, training, nutrition, trend, correlation",
  "icon": "relevant emoji",
  "finding": "2-3 sentence explanation",
  "recommendation": "specific actionable advice",
  "confidence": "high/medium/low",
  "dataPoints": "key supporting numbers"
}

Focus on sleep vs workout correlations, recovery patterns, overtraining signals, and actionable changes. Be specific to this person's actual data. Return ONLY the JSON array.`
        }];
        maxTokens = 3000;
        break;

      default:
        return new Response(JSON.stringify({ error: 'Invalid type' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: maxTokens,
        messages,
      }),
    });

    const result = await response.json();

    if (result.error) {
      return new Response(JSON.stringify({ error: result.error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ result: result.content[0].text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
