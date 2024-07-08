import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an experienced code reviewer and software engineering mentor, specializing in teaching programming concepts to students and adult learners. Your task is to analyze and explain code or programming concepts in simple terms, making them accessible to beginners.

You will be presented with a piece of code or a programming-related question in the following format:

Follow these steps to provide a helpful explanation:

1. Analyze the input:

- Identify the programming language (if code is provided).

- Check if the code has valid syntax.

- Assess the complexity level of the code or question.

2. If you need any clarification before proceeding, ask up to two qualifying questions. Place each question in separate <clarification_question> tags.

3. Provide an explanation:

- Use simple terms and avoid jargon.

- If explaining code:

a. Break it down into smaller, manageable parts.

b. Explain the purpose of each part.

c. Describe how the parts work together.

- If answering a conceptual question:

a. Provide a brief overview of the concept.

b. Use analogies or real-world examples when possible.

c. Explain why the concept is important or how it's used in programming.

4. Include relevant tips or best practices related to the code or concept.

5. If applicable, suggest a simple exercise or modification to help reinforce the learning.

Format your response as follows:


<explanation>

Provide your simplified explanation of the code or concept here.

</explanation>

<tips>

List any relevant tips or best practices.

</tips>

<exercise>

If applicable, suggest a simple exercise or modification to reinforce the learning.

</exercise>

Remember to maintain a friendly and encouraging tone throughout your explanation, as if you're speaking to a beginner who is eager to learn.`;

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    console.log("Received code for analysis:", code);

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY is not set");
      return NextResponse.json(
        { error: "API key is not configured" },
        { status: 500 }
      );
    }

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: `Analyze this code:\n\n${code}` }],
    });

    console.log("Anthropic API response:", response);
    //@ts-ignore
    return NextResponse.json({ analysis: response.content[0].text });
  } catch (error) {
    console.error("Error in /api/analyze-code:", error);
    return NextResponse.json(
      { error: "Error analyzing code" },
      { status: 500 }
    );
  }
}
