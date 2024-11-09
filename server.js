import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";

import { demoPromptUser } from "./src/prompts/demoPromptUser.js";
import { demoPromptSystem } from "./src/prompts/demoPromptSystem.js";

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware for JSON parsing
app.use(express.json());

// Define the /api/summarize endpoint
app.post("/api/summarize", async (req, res) => {
  try {
    // Simplified OpenAI API request without JSON schema format
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Using gpt-3.5-turbo model
      messages: [
        { role: "system", content: demoPromptSystem },
        { role: "user", content: demoPromptUser }, // default prompt content
      ],
    });

    // Send the generated response directly back to the client
    const generatedText = completion.choices[0].message.content;
    res.json({ response: generatedText }); // Sending back as JSON with a key "response"
  } catch (error) {
    console.error("OpenAI API Error:", error); // Log full error
    res.status(500).json({
      error: error.message || "An unknown error occurred while generating the response.",
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
