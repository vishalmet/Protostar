import cors from "cors";
import dotenv from "dotenv";
import gTTS from 'gtts';  // Import gTTS library for Text-to-Speech
import express from "express";
import { promises as fs } from "fs";
import axios from 'axios';  // Axios to handle local chatbot API calls

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

// Function to generate speech using gTTS and save it as an MP3 file
const generateSpeech = async (text, fileName) => {
  const gtts = new gTTS(text, 'en');
  return new Promise((resolve, reject) => {
    gtts.save(fileName, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

// POST route to handle chat messages and generate the virtual girlfriend's response
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    res.send({
      messages: [
        {
          text: "Hey dear... How was your day?",
          audio: await audioFileToBase64("audios/intro_0.mp3"), // Using MP3 file directly without conversion
          facialExpression: "smile",
          animation: "Talking_1",
        },
        {
          text: "I missed you so much... Please don't go for so long!",
          audio: await audioFileToBase64("audios/intro_1.mp3"),
          facialExpression: "sad",
          animation: "Crying",
        },
      ],
    });
    return;
  }

  try {
    // Call the local chatbot service
    const chatbotResponse = await axios.post('http://127.0.0.1:5000/chat', { message: userMessage });

    let messages = chatbotResponse.data;  // Expecting direct array of messages as per the example you provided

    // Loop through the messages and generate audio data
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      const fileName = `audios/message_${i}.mp3`; // The name of the audio file to generate

      // Generate speech using gTTS
      await generateSpeech(message.text, fileName);

      // Convert the audio file to Base64 and attach it to the message
      message.audio = await audioFileToBase64(fileName);
    }

    // Send the response back to the client
    res.send({ messages });

  } catch (error) {
    console.error('Error calling the local chatbot service:', error);
    res.status(500).send({ error: 'Failed to process the request' });
  }
});

// Helper function to convert audio files to base64 format
const audioFileToBase64 = async (file) => {
  const data = await fs.readFile(file);
  return data.toString("base64");
};

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Virtual Girlfriend listening on port ${port}`);
});
