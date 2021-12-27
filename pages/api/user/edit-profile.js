import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
  const session = await getSession({req: req});
  if (!session) {
    res.status(401).json({message: 'Not authenticated!'});
    return;
  }

  const userEmail = session.user.email;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection('users');

  const user = await usersCollection.findOne({ email: userEmail });
  
  console.log('user',user)
  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

  if (req.method == 'PATCH') {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const result = await usersCollection.updateOne({_id: user._id}, {$set: {firstName: firstName, lastName: lastName, email: email}});

    client.close();
    res.status(200).json({ message: 'Profile updated!' });
  }

  if (req.method == 'GET') {
    res.status(200).json({ firstName: user.firstName, lastName: user.lastName, email: userEmail });
  }

  return;
};

export default handler;


