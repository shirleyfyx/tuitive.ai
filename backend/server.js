const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI(process.env.OPENAI_SECRET_KEY);

app.post('/api/chat', async (req, res) => {
    console.log(req.body.messages); // Log to inspect the incoming messages
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4", // You can specify other models as needed
      messages: req.body.messages,
    });
    console.log('succesful openai.chat.completions.create')
    res.json(chatCompletion);
  } catch (error) {
    console.error("Error in OpenAI request:", error);
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
