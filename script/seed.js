'use strict';

const {
  db,
  models: { User, Product, Order, Order_Products },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'test1',
      password: '123',
      email: 'user1@heroku.com',
      userType: 'User',
    }),
    User.create({
      username: 'test2',
      password: '123',
      email: 'user2@heroku.com',
      userType: 'Admin',
    }),
  ]);

  const product = await Promise.all([
    //price is in cents to avoid calculation issues, the frontend will divide by 100 to display the correct value
    Product.create({
      name: 'Tunic',
      description:
        'Explore a land filled with lost legends, ancient powers, and ferocious monsters in TUNIC, an isometric action game about a small fox on a big adventure.',
      platform: 'PC, PlayStation 5, PlayStation 4, Xbox One, Xbox Series S/X',
      genre: 'Adventure, Action',
      price: 2999,
      image:
        'https://media.rawg.io/media/games/2c1/2c1984e128ac48b89953ed4de4904a3b.jpg',
      esrb: 'Everyone',
      rating: 85,
      multiplayer: 'No',
    }),
    Product.create({
      name: 'Inscryption',
      description:
        'Inscryption is an inky black card-based odyssey that blends the deckbuilding roguelike, escape-room style puzzles, and psychological horror into a blood-laced smoothie. Darker still are the secrets inscrybed upon the cards...',
      platform: 'PC, PlayStation 5, PlayStation 4, Xbox Series S/X, macOS',
      genre: 'Adventure, Indie, Strategy',
      price: 1999,
      image:
        'https://media.rawg.io/media/games/99e/99e937e4cc518d641317116c9d8d9046.jpg',
      rating: 85,
      multiplayer: 'No',
    }),
    Product.create({
      name: 'Unpacking',
      description:
        'Unpacking is a zen puzzle game about the familiar experience of pulling possessions out of boxes and fitting them into a new home. Part block-fitting puzzle, part home decoration, you are invited to create a satisfying living space while learning clues about the life you’re unpacking.',
      platform: 'Xbox One, Xbox Series S/X, Nintendo Switch, macOS',
      genre: 'Indie, Puzzle',
      price: 1999,
      image:
        'https://media.rawg.io/media/games/c11/c1118fbcfd846c631ecb7646f8efc780.jpg',
      rating: 84,
      multiplayer: 'No',
    }),
    Product.create({
      name: 'Hitman 3',
      description:
        'Death Awaits. Agent 47 returns in HITMAN 3, the dramatic conclusion to the World of Assassination trilogy.',
      platform: 'PC, PlayStation 5, PlayStation 4, Xbox One, Xbox Series S/X',
      genre: 'Adventure, Indie, Strategy',
      price: 5999,
      image:
        'https://media.rawg.io/media/games/126/126fbd5ceacddc6ad16fc96e50b1265b.jpg',
      rating: 87,
      multiplayer: 'No',
    }),
    Product.create({
      name: 'Kena: Bridge of Spirits',
      description:
        'A story-driven, action adventure combining exploration with fast-paced combat. As Kena, players find and grow a team of charming spirit companions called the Rot, enhancing their abilities and creating new ways to manipulate the environment.',
      platform: 'PC, PlayStation 5, PlayStation 4',
      genre: 'Adventure, Exploration, Action-Adventure, Adventure',
      price: 3999,
      esrb: 'Everyone 10+',
      image:
        'https://media.rawg.io/media/games/f39/f3971e0dfde68f234c56ae789433b219.jpg',
      rating: 81,
      multiplayer: 'No',
    }),
    Product.create({
      name: 'Subnautica: Below Zero',
      description:
        'Dive into a freezing underwater adventure on an alien planet. Below Zero is set two years after the original Subnautica. Return to Planet 4546B to uncover the truth behind a deadly cover-up. Survive by building habitats, crafting tools, & diving deeper into the world of Subnautica.',
      platform: 'PC, PlayStation 5, PlayStation 4, Xbox One, Xbox Series S/X',
      genre: 'Adventure, Indie',
      price: 2999,
      esrb: 'Everyone 10+',
      image:
        'https://media.rawg.io/media/games/437/4377bf00ded8a2ba781aa74d8bff9220.jpg',
      rating: 82,
      multiplayer: 'No',
    }),
    Product.create({
      name: 'NieR Replicant v1.22474487139...',
      description: `The upgraded prequel of NieR:Automata. A kind young man sets out with Grimoire Weiss, a strange talking book, to search for the "Sealed verses" in order to save his sister Yonah, who fell terminally ill to the Black Scrawl.`,
      platform: 'PC, PlayStation 4, Xbox One',
      genre: 'Adventure, Action',
      price: 5999,
      esrb: 'Mature',
      image:
        'https://media.rawg.io/media/games/3ac/3ac2b5356ad764a87092d15cdcbee809.jpg',
      rating: 85,
      multiplayer: 'No',
    }),
    Product.create({
      name: 'Black Book',
      description:
        '“Black Book” is a dark RPG Adventure, based on Slavic myths, in which you play as a young sorceress. Fight evil forces in card-based battles and explore the world, where humans live alongside mythological creatures.',
      platform:
        'PC, PlayStation 5, PlayStation 4, Xbox One, Xbox Series S/X, Nintendo Switch',
      genre: 'Indie, Strategy',
      price: 2499,
      esrb: 'Everyone 10+',
      image:
        'https://media.rawg.io/media/games/1d6/1d6f294a27ff1b90d4a4a79d42d3f7b2.jpg',
      rating: 78,
      multiplayer: 'No',
    }),
    Product.create({
      name: 'Biomutant',
      description:
        'BIOMUTANT® is an open-world, post-apocalyptic Kung-Fu fable RPG, with a unique martial arts styled combat system allowing you to mix melee, shooting and mutant ability action.',
      platform: 'PC, PlayStation 4, Xbox One',
      genre: 'Action, RPG',
      price: 5999,
      esrb: 'Teen',
      image:
        'https://media.rawg.io/media/games/363/363830e5f6459ca71eb43bea8c32f688.jpg',
      rating: 66,
      multiplayer: 'No',
    }),
    Product.create({
      name: 'Battlefield 2042',
      description:
        'Battlefield™ 2042 is a first-person shooter that marks the return to the iconic all-out warfare of the franchise.',
      platform: 'PC, PlayStation 5, PlayStation 4, Xbox Series S/X',
      genre: 'Shooter, Adventure',
      price: 5999,
      esrb: 'Mature 17+',
      image:
        'https://media.rawg.io/media/games/af2/af2b640fa820e8a8135948a4cd399539.jpg',
      rating: 68,
      multiplayer: 'Yes',
    }),
    Product.create({
      name: 'Disco Elysium: Final Cut',
      description:
        'Disco Elysium - The Final Cut is a groundbreaking role playing game. You’re a detective with a unique skill system at your disposal and a whole city to carve your path across. Interrogate unforgettable characters, crack murders or take bribes. Become a hero or an absolute disaster of a human being.',
      platform:
        'PC, PlayStation 5, PlayStation 4, Xbox Series S/X, Nintendo Switch',
      genre: 'RPG',
      price: 3999,
      esrb: 'Mature 17+',
      image:
        'https://media.rawg.io/media/games/0af/0afe9e8ace196123d8c7cf22172cec63.jpg',
      rating: 90,
      multiplayer: 'No',
    }),
    Product.create({
      name: 'Scarlet Nexus',
      description:
        'Choose between Yuito and Kasane, elite psionics each armed with a talent in psychokinesis and their own reason to fight. Complete both of their stories to unlock all the mysteries of a Brain Punk future caught between technology and psychic abilities.',
      platform: 'PC, PlayStation 5, PlayStation 4, Xbox Series S/X',
      genre: 'Adventure, Action, RPG',
      price: 5999,
      esrb: 'Teen',
      image:
        'https://media.rawg.io/media/games/27c/27cb94ed1763fec383fb99151580095a.jpg',
      rating: 85,
      multiplayer: 'No',
    }),
    Product.create({
      name: 'Breathedge',
      description:
        'Survive in outer space! Together with your immortal chicken, discover the truth behind your sudden spaceship crash. Craft tools, pilot vehicles, and even control space stations to survive and explore the wreckage.',
      platform: 'PC, PlayStation 4, Xbox One',
      esrb: 'Teen',
      genre: 'Adventure, Indie',
      price: 2499,
      image:
        'https://media.rawg.io/media/games/ef8/ef853efdaf6778ca731eec21d1d7d0d7.jpg',
      rating: 65,
      multiplayer: 'No',
    }),
    Product.create({
      name: 'Life is Strange: True Colors',
      description:
        "Alex Chen hides her 'curse': the psychic power of Empathy, the ability to absorb the emotions of others. When her brother dies in a so-called accident, Alex must embrace her power to find the truth.        ",
      platform: 'PC, PlayStation 5, PlayStation 4, Xbox One, Xbox Series S/X',
      esrb: 'Teen',
      genre: 'Action, Adventure, Indie, Strategy',
      price: 5999,
      image:
        'https://media.rawg.io/media/games/278/2784fe67065c5095411f0d4c85205143.jpg',
      rating: 81,
      multiplayer: 'No',
    }),
    Product.create({
      name: 'Tales of Arise',
      description:
        '300 years of tyranny. A mysterious mask. Lost pain and memories. Wield the Blazing Sword and join a mysterious, untouchable girl to fight your oppressors. Experience a tale of liberation, featuring characters with next-gen graphical expressiveness!',
      platform: 'PC, PlayStation 5, PlayStation 4, Xbox One, Xbox Series S/X',
      esrb: 'Teen',
      genre: 'Action, RPG',
      price: 5999,
      image:
        'https://media.rawg.io/media/games/5a9/5a9e785af72ae88026380f7987f23d90.jpg',
      rating: 85,
      multiplayer: 'No',
    }),
    Product.create({
      name: 'Totally Accurate Battle Simulator',
      description:
        'Be the leader of wobblers from ancient lands, spooky places, and fantasy worlds. Watch them fight in simulations made with the wobbliest physics system ever created, make your own wobblers in the unit creator and send your army off to fight your friends in multiplayer.',
      platform: 'PC, Xbox One',
      esrb: 'Teen',
      genre: 'Indie, Strategy',
      price: 1999,
      image:
        'https://media.rawg.io/media/screenshots/82a/82a9e2b7caf052d0f140b70e350cf184.jpg',
      rating: 85,
      multiplayer: 'No',
    }),
    Product.create({
      name: 'Narita Boy',
      description:
        'Become symphonic in Narita Boy! A radical action-adventure as a legendary pixel hero trapped as a mere echo within the Digital Kingdom. Discover the mysteries behind the Techno-sword, lock swords with the corrupt and tainted Stallions. Save the world!',
      platform: 'PC, PlayStation 4, Xbox One, Nintendo Switch',
      genre: 'Action, Adventure, Indie',
      esrb: 'Not rated',
      price: 2499,
      image:
        'https://media.rawg.io/media/games/ba3/ba3dbf9a5a71913582052d7e12775aea.jpg',
      rating: 75,
      multiplayer: 'No',
    }),
    Product.create({
      name: 'Yakuza 3 Remastered',
      description: `Kazuma Kiryu has earned his retirement on the sandy beaches of Okinawa. But when a deadly power struggle arrives on his doorstep, he'll have to walk the streets of Kamurocho to escape his past for good. Complete The Dragon of Dojima's journey.`,
      platform: 'PC, PlayStation 4, Xbox One',
      esrb: 'Mature 17+',
      genre: 'Action, Adventure',
      price: 1999,
      image:
        'https://media.rawg.io/media/games/372/372ad5555afd1c58e39914600a412b84.jpg',
      rating: 77,
      multiplayer: 'No',
    }),
    Product.create({
      name: 'The Stanley Parable: Ultra Deluxe',
      description:
        'The Stanley Parable is a first person exploration game. You will play as Stanley, and you will not play as Stanley. You will follow a story, you will not follow a story. You will have a choice, you will have no choice. The game will end, the game will never end.',
      platform: 'PC, PlayStation 5, PlayStation 4, Xbox One, Xbox Series S/X',
      esrb: 'Not rated',
      genre: 'Adventure, Indie',
      price: 1499,
      image:
        'https://media.rawg.io/media/games/c4e/c4e3ad247e93d3a5dc40aa215a778a9c.jpg',
      rating: 90,
      multiplayer: 'No',
    }),
    Product.create({
      name: 'Curse of the Dead Gods',
      description:
        'You seek untold riches, eternal life, divine powers - it leads to this accursed temple, a seemingly-infinite labyrinth of bottomless pits, deadly traps, and monsters.',
      platform: 'PC, PlayStation 4, Xbox One, Nintendo Switch',
      esrb: 'Not rated',
      genre: 'Adventure, Action, RPG',
      price: 1999,
      image:
        'https://media.rawg.io/media/games/c8c/c8c156591d6e88bb685177c1c44c945a.jpg',
      rating: 81,
      multiplayer: 'No',
    }),

    // -------New game------
    Product.create({
      name: 'Hogwarts Legacy',
      description:
        'Experience Hogwarts in the 1800s. Your character is a student who holds the key to an ancient secret that threatens to tear the wizarding world apart. You have received a late acceptance to the Hogwarts School of Witchcraft and Wizardry and soon discover that you are no ordinary student.',
      platform: 'PC, PlayStation 5 Xbox One, Nintendo Switch',
      esrb: 'Not rated',
      genre: 'Adventure, Action, RPG',
      price: 6999,
      image: 'https://images8.alphacoders.com/130/1303125.jpg',
      rating: 83,
      multiplayer: 'No',
    }),
  ]);

  const order = await Order.create({ status: 'open' });

  const user = await User.findByPk(1);
  await order.setUser(user);
  const product1 = await Product.findByPk(1);
  const product2 = await Product.findByPk(2);
  await order.addProduct(product1);
  await order.addProduct(product2);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      test1: users[0],
      test2: users[1],
    },
    products: {
      product1: product[0],
      product2: product[1],
      product3: product[2],
      product4: product[3],
      product5: product[4],
      product6: product[5],
      product7: product[6],
      product8: product[7],
      product9: product[8],
      product10: product[9],
      product11: product[10],
      product12: product[11],
      product13: product[12],
      product14: product[13],
      product15: product[14],
      product16: product[15],
      product17: product[16],
      product18: product[17],
      product19: product[18],
      product20: product[19],
      product21: product[20],
    },
    order1: order[0],
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
