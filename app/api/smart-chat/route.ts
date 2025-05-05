import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const openaiKey = process.env.OPENAI_API_KEY;
    const usdaKey = process.env.USDA_API_KEY;

    if (!openaiKey) {
      return NextResponse.json({ error: "OpenAI API key not set." }, { status: 500 });
    }
    if (!usdaKey) {
      return NextResponse.json({ error: "USDA API key not set." }, { status: 500 });
    }

    // 1. Use OpenAI to classify the question
    const classifyPrompt = `Classify the following question as either "nutrition_data" if it asks for specific nutrition facts (like calories, protein, etc.), or "general" otherwise. Only reply with "nutrition_data" or "general".\n\nQuestion: ${message}`;
    const classifyRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: classifyPrompt }]
      })
    });
    if (!classifyRes.ok) {
      return NextResponse.json({ error: "OpenAI classification failed." }, { status: 500 });
    }
    const classifyData = await classifyRes.json();
    const classification = classifyData.choices?.[0]?.message?.content?.trim();

    if (classification === "nutrition_data") {
      // 2. Fetch from USDA
      const searchUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${usdaKey}&query=${encodeURIComponent(message)}&pageSize=1`;
      const searchRes = await fetch(searchUrl);
      if (!searchRes.ok) {
        return NextResponse.json({ error: "USDA API request failed." }, { status: 500 });
      }
      const searchData = await searchRes.json();

      if (!searchData.foods || searchData.foods.length === 0) {
        return NextResponse.json({ answer: "Sorry, I couldn't find nutrition data for that." });
      }

      const food = searchData.foods[0];

      // 3. Ask OpenAI to explain the nutrition data
      const explainPrompt = `Explain these nutrition facts in simple terms for a user: ${JSON.stringify(food)}`;
      const explainRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openaiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: explainPrompt }]
        })
      });
      if (!explainRes.ok) {
        return NextResponse.json({ error: "OpenAI explanation failed." }, { status: 500 });
      }
      const explainData = await explainRes.json();
      const explanation = explainData.choices?.[0]?.message?.content?.trim();

      return NextResponse.json({ answer: explanation || "Sorry, I couldn't generate an explanation.", nutrition: food });
    }
    // 4. General Q&A with OpenAI
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });
    if (!openaiRes.ok) {
      return NextResponse.json({ error: "OpenAI Q&A failed." }, { status: 500 });
    }
    const openaiData = await openaiRes.json();
    const answer = openaiData.choices?.[0]?.message?.content?.trim();
    return NextResponse.json({ answer: answer || "Sorry, I couldn't generate a response." });
  } catch (error: unknown) {
    let message = "Unknown error";
    if (typeof error === "object" && error !== null && "message" in error && typeof (error as { message?: unknown }).message === "string") {
      message = (error as { message: string }).message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 