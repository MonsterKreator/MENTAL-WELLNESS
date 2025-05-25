const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect('your-mongodb-connection-string', { useNewUrlParser: true, useUnifiedTopology: true });

const chatSchema = new mongoose.Schema({
  message: String,
  sender: String,
});

const Chat = mongoose.model('Chat', chatSchema);

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  const chat = new Chat({ message, sender: 'user' });
  await chat.save();
  res.json({ reply: 'This is a response from the bot.' });
});

app.get('/api/chat', async (req, res) => {
  const chats = await Chat.find();
  res.json(chats);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});