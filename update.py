import os
path = 'd:/AK/backend/server.js'
with open(path, 'r') as f:
    content = f.read()

if '/api/admin/messages' not in content:
    target = 'const PORT = process.env.PORT || 5000;'
    replacement = '''// Admin API to fetch all messages
app.get('/api/admin/messages', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ _id: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

const PORT = process.env.PORT || 5000;'''
    content = content.replace(target, replacement)
    with open(path, 'w') as f:
        f.write(content)
