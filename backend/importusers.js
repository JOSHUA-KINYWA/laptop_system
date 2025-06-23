const mongoose = require('mongoose');
const User = require('./models/User');
const fs = require('fs');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function importUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDB');

    let users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));

    // Hash each user's password before inserting
    for (let user of users) {
      if (user.password) {
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }

    await User.deleteMany(); // Clear old users

    await User.insertMany(users);

    console.log('Users imported successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error importing users:', err);
    process.exit(1);
  }
}

importUsers();
