import { connectToDatabase } from '../../lib/db';

async function handler(req, res) {
  if (req.method === 'POST') {
    const {name, phone, street, postalCode, city, status, totalAmount, date, orders} = req.body;

    if (!name || !phone || phone.trim() === '' || !street || street.trim() === '' || !postalCode || postalCode.trim() === '' || !city || city.trim() === '') {
      res.status(400).json({message: 'Invalid Input'});
      return;
    }

    if (orders.length == 0) {
      res.status(400).json({message: 'No orders!'});
      return;
    }

    const newOrder = {
      name, phone, street, postalCode, city, status, totalAmount, date, orders
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
      const count = await db.collection('orders').countDocuments();
      console.log('count',count);
      const order = {...newOrder, orderId: count + 1};
      const result = await db.collection('orders').insertOne(order);
      newOrder.id = result.insertedId;
    }
    catch (error) {
      client.close();
      res.status(500).json({ message: 'order failed! '});
      return;
    }

    client.close();
    console.log('newOrder',newOrder)
    res.status(201).json({ message: 'Successfully order!', order: newOrder })
  }
};

export default handler;
