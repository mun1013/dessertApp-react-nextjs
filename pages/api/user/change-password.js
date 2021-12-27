import { getSession } from 'next-auth/client';
import { verifyPassword, hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({req: req});

  if (!session) {
    res.status(401).json({message: 'Not authenticated!'});
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.enteredOldPassword;
  const newPassword = req.body.enteredNewPassword;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection('users');

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const isValidPassword = await verifyPassword(oldPassword, currentPassword);

  if (!isValidPassword) {
    res.status(403).json({ message: 'Invalid Password.' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);
  console.log('newPass',newPassword, oldPassword, hashedPassword);
  
  const result = await usersCollection.updateOne({email: userEmail}, {$set: {password: hashedPassword}});
  client.close();
  res.status(200).json({ message: 'Password updated!' });
}

export default handler;