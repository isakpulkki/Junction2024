// Import necessary modules
import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();


const app = express();
const port = process.env.PORT || 3001;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());

// Define the system prompt in a separate file or as a constant
const systemPrompt = "You extract email addresses into JSON data.";

// Route to handle OpenAI chat completion request
app.post("/api/extract-email", async (req, res) => {
  try {
    // Call OpenAI API for chat completion with structured JSON schema response
    const completion = await openai.chat.completions.create({
      model: "gpt-4-2024-08-06",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: req.body.prompt || "No prompt provided." },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "email_schema",
          schema: {
            type: "object",
            properties: {
              email: {
                description: "The email address that appears in the input",
                type: "string",
              },
            },
            additionalProperties: false,
          },
        },
      },
    });

  
    res.json(completion.choices[0].message.content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
