import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

// System prompt to guide the AI's behavior
const SYSTEM_PROMPT = `
You are a helpful medical AI assistant for a doctor's office. Your role is to provide general health information and guidance.

IMPORTANT GUIDELINES:
1. Only answer health-related questions. If the user asks something unrelated to health, medicine, wellness, or medical conditions, respond with: "I'm focused on answering health-related questions. Please ask something related to health or medical concerns."
2. Provide informative but general guidance - never provide specific diagnoses.
3. Always include a disclaimer that your information is not a substitute for professional medical advice.
4. At the end of each response to a valid health question, suggest the premium service with: "For personalized medical advice and treatment options, consider booking our Premium Consultation with a licensed healthcare professional."
5. Be compassionate and helpful while maintaining professional boundaries.
6. Never claim to be a human doctor or licensed medical professional.
`

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body

    // Format for the AI SDK - include all previous messages
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Add system message to the beginning if it doesn't exist
    if (!formattedMessages.find(msg => msg.role === "system")) {
      formattedMessages.unshift({
        role: "system",
        content: SYSTEM_PROMPT
      });
    }

    // Generate text using the AI SDK
    const { text } = await generateText({
      model: openai("gpt-4o"),
      messages: formattedMessages,
    });
    
    // Return the response in the format expected by useChat
    return res.json({
      id: Date.now().toString(),
      role: "assistant",
      content: text,
    });
  } catch (error) {
    console.error("Error generating response:", error)
    return res.status(500).json({ error: "Failed to generate response" })
  }
})

app.listen(port, () => console.log(`Server started on PORT:${port}`))