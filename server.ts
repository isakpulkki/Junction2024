// Import necessary modules
import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import { demoPromptUser } from "./src/prompts/demoPromptUser";
import { demoPromptSystem } from "./src/prompts/demoPromptSystem";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());

app.post("/api/summarize", async (req, res) => {
  try {
    // Call OpenAI API for chat completion with structured JSON schema response
    const completion = await openai.chat.completions.create({
      model: "gpt-4-2024-08-06",
      messages: [
        { role: "system", content: demoPromptSystem },
        { role: "user", content: req.body.prompt || demoPromptUser }, // Use demoPromptUser if no prompt is provided
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "summary_keypoints_schema",
          schema: {
            type: "object",
            properties: {
              summary: {
                description: "A brief summary of the input text",
                type: "string",
              },
              key_points: {
                description:
                  "An array containing exactly 3 key points from the input",
                type: "array",
                items: {
                  type: "string",
                },
                minItems: 3,
                maxItems: 3,
              },
            },
            required: ["summary", "key_points"],
            additionalProperties: false,
          },
        },
      },
    });

    // Send the structured JSON response back to the client
    res.json(completion.choices[0].message.content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
