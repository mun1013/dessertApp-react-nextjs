import { connectToDatabase } from '../../lib/db';

async function handler(req, res) {
  if (req.method === 'POST') {
    const {name, email, subject, message} = req.body;

    if (!name || !email || !email.includes('@') || !subject || subject.trim() === '' || !message || message.trim() === '') {
      res.status(400).json({message: 'Invalid Input'});
      return;
    }

    const newFeedback = {
      name, email, subject, message
    }

    let client;
    try {
      client = await connectToDatabase();
    }
    catch (error) {
      res.status(500).json({ message: 'Could not connect to database.' });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection('feedback').insertOne(newFeedback);
      newFeedback.id = result.insertedId;
    }
    catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing message failed! '});
      return;
    }

    client.close();

    res.status(201).json({ message: 'Successfully stored message!', feedback: newFeedback })
  }
};

export default handler;
