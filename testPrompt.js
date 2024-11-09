import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testAPI() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Provide three quick tips on staying productive." },
      ],
    });
    console.log("API response:", completion.choices[0].message.content);
  } catch (error) {
    console.error("Error in OpenAI test:", error);
  }
}

testAPI();
