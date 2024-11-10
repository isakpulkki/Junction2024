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

app.post("/api/summarize", async (req, res) => {
    try {
      // Request a JSON-like response from OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Model selection
        messages: [
          { role: "system", content: demoPromptSystem },
          {
            role: "user",
            content: demoPromptUser},
        ],
      });
  
      // Attempt to parse the response from OpenAI
      const generatedText = completion.choices[0].message.content;
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(generatedText);
      } catch (parseError) {
        console.error("Error parsing OpenAI response as JSON:", parseError);
        
        // In case JSON parsing fails, wrap the response in a standard format
        parsedResponse = { summary: generatedText, key_points: [] };
      }
  
      // Send parsed JSON (or fallback) back to the frontend
      res.json(parsedResponse);
    } catch (error) {
      console.error("OpenAI API Error:", error);
      res.status(500).json({ error: error.message || "An unknown error occurred" });
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
