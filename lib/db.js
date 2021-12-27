import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const databaseName = 'froggie-dessert';
  const connectionURL = 'mongodb://127.0.0.1:27017/' + databaseName;
  
  const client = await MongoClient.connect(connectionURL);
  // const db = client.db();

  // const menuCollection = db.collection('menu-selections'); 
  
  // // https://docs.mongodb.com/manual/reference/operator/update/setOnInsert/
  // const insertMenu = await menuCollection.insertMany([
  //   {
  //     _id: 1,
  //     title: 'cakes',
  //     image: '/images/menu-selection/cakes.jpg',
  //   },
  //   {
  //     _id: 2,
  //     title: 'cookies',
  //     image: '/images/menu-selection/cookies.jpg',
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert menu-selections!')
  //   }
  //   console.log(result);
  // });

  // console.log('insertMenu', insertMenu);

  // const cakesCollection = db.collection('cakes');

  // const insertCakes = await cakesCollection.insertMany([
  //   {
  //     id: 1,
  //     title: 'Blueberry Cheese Cake',
  //     image: '/images/menu-cakes/blueberry-cheese-cake.jpg',
  //     description: 'This blueberry cheese cake starts with a buttery graham cracker crust, a creamy cheese in the center, studded with blueberries inside and topped with extra blueberries. Lastly, smothered in an incredible homemade blueberry sauce on the top. If you are a blueberry lover, this is definitely worth the try!',
  //     price: 14.00
  //   },
  //   {
  //     id: 2,
  //     title: 'Cheese Cake',
  //     image: '/images/menu-cakes/cheesecake.jpg',
  //     description: 'Literally the best cheese cake ever! The only recipe you will ever need is a pure high quality creamy and fluffy cream cheese. It starts with a graham cracker crust, you can feel the dense, rich and light buttery at the same time. You will definitely be begging for a second piece!',
  //     price: 12.00
  //   },
  //   {
  //     id: 3,
  //     title: 'Chocolate Cheese Cake',
  //     image: '/images/menu-cakes/chocolate-cheese-cake.jpg',
  //     description: 'Chocolate cheeese cake is a rich, creamy and chocolatey with some bittersweet taste. Premium dark chocolate, milk chocolate, cocoa and cream cheese are well combined and it is also delighted with an Orea cookies crust filled in. Trust me, it will satisfy your most intense craving!',
  //     price: 13.00
  //   },
  //   {
  //     id: 4,
  //     title: 'Corn Cheese Cake',
  //     image: '/images/menu-cakes/corn-cheese-cake.jpg',
  //     description: 'This corn cheese cake starts with a buttery graham cracker crust, sweet milk corn mixed with creamy cream cheese as filling. Finally, topped with a candy corn glaze and popcorns. Calling all corn lovers. Here is a sweet milk corn cheesecake that will be the highlight of your day.',
  //     price: 12.00
  //   },
  //   {
  //     id: 5,
  //     title: 'Oreo Cheese Cake',
  //     image: '/images/menu-cakes/oreo-cheese-cake.jpg',
  //     description: 'This oreo cheese cake starts with a buttery Oreo cookie crust and it made with whole Oreos. Next, a finger-licking cheesecake filling made with cream cheese, thickened cream and a touch of sour cream. Finally, topped with a boatload of chopped Oreos and mini Oreo cookies. Oreo lovers must give a try!',
  //     price: 12.00
  //   }
  // ]);
  // console.log('insertCakes',insertCakes);

  // const cookiesCollection = db.collection('cookies');
  // const insertCookies = await cookiesCollection.insertMany([
  //   {
  //     id: 6,
  //     title: 'Butter Cookies',
  //     image: '/images/menu-cookies/butter-cookies.jpg',
  //     description: 'Light, crispy and delicate. Our butter cookies are made with premium butter and fine sugar. It is soft inside and almost melting in mouth, with a bit of crispy texture on the outside, rich and buttery with wonderful crips edges!',
  //     price: 13.00
  //   },
  //   {
  //     id: 7,
  //     title: 'Chocolate Chip Cookies',
  //     image: '/images/menu-cookies/chocolate-chip-cookies.jpg',
  //     description: 'These soft and chewy chocolate chip cookies are just butter cookies with chocolate chips, it is made of premium butter, more brown sugar and extra egg yolks to guarantee the chewiest cookies texture. More chocolate chunks promise chocolate in every single bite!',
  //     price: 14.00
  //   },
  //   {
  //     id: 8,
  //     title: 'Double Chocolate Cookies',
  //     image: '/images/menu-cookies/double-chocolate-cookies.jpg',
  //     description: 'Double chocolate chip cookies are made of dark chocolate dough and oozing with chocolate chips, so you get double dose of chocolate! It is just like when a butter cookie meets a brownie and it yields a sweet and a little salty in combo. Give it a bite and exploding with chocolate!',
  //     price: 16.00
  //   }
  // ]);

  // console.log('insertCookies',insertCookies);

  return client;
};

export async function getItems(collection) {
  const client = await connectToDatabase();
  
  const db = client.db();

  const items = db.collection(collection);

  const menus = await items.find().toArray();

  client.close();

  return menus;
};

export async function getItemsIds(collection) {
  const client = await connectToDatabase();
  
  const db = client.db();
  
  const items = db.collection(collection);
  
  const ids = await items.find({}).project({id: 1}).toArray();

  client.close();

  return ids;
};

export async function getSelectedItem(id, collection) {
  const client = await connectToDatabase();
  
  const db = client.db();
  
  const items = db.collection(collection);
  
  const menus = await items.find().toArray();
  
  client.close();
  
  const selectedMenu = menus.filter(detail => detail.id == id.toString());

  return selectedMenu;
};

export async function getOrdersIds(collection) {
  const client = await connectToDatabase();
  
  const db = client.db();
  
  const items = db.collection(collection);
  
  const ids = await items.find({}).project({_id: 1}).toArray();

  client.close();

  return ids;
};

export async function getSelectedOrder(id, collection) {
  const client = await connectToDatabase();
  
  const db = client.db();
  
  const items = db.collection(collection);
  
  const orders = await items.find().toArray();
  
  client.close();
  
  const selectedOrder = orders.filter(detail => detail._id == id.toString());

  return selectedOrder;
};
