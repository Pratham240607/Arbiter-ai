import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite", // ✅ THIS IS THE FIX
    });

    const result = await model.generateContent(message);

    return Response.json({
      reply: result.response.text(),
    });
  } catch (error: any) {
    console.error("GEMINI ERROR:", error);

    return Response.json({
      reply:
        "⚠️ Gemini API error: " +
        (error?.message || "Unknown error"),
    });
  }
}