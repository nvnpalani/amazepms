const fs = require('fs');
const path = 'd:/AK/backend/server.js';
let content = fs.readFileSync(path, 'utf8');
if (!content.includes('/api/admin/messages')) {
  content = content.replace('const PORT = process.env.PORT || 5000;', // Admin API to fetch all messages
app.get('/api/admin/messages', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ _id: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

const PORT = process.env.PORT || 5000;);
  fs.writeFileSync(path, content);
}
console.log(fs.readFileSync(path, 'utf8'));
