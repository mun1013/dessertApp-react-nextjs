import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;

  const { firstName, lastName, email, password, confirmPassword } = data;

  console.log('password.trim().length',password.trim().length)
  if (!email || !email.includes('@') || !password || password.trim().length < 7) {
    res.status(422).json({
      message: 'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const existingUser = await db.collection('users').findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    client.close();
    return;
  }

  if (password !== confirmPassword) {
    res.status(422).json({ message: 'The password confirmation does not match.' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);
  const hashedConfirmPassword = await hashPassword(confirmPassword);

  const result = await db.collection('users').insertOne({
    firstName, lastName,
    email: email,
    password: hashedPassword, 
    confirmPassword: hashedConfirmPassword
  });

  res.status(201).json({ message: 'User created!' });
  client.close();
}

export default handler;