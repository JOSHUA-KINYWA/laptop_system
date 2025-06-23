const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

mongoose.connect('mongodb://localhost:27017/smartlaptopdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function hashPasswords() {
  const users = await User.find();
  for (const user of users) {
    // Only hash if not already hashed (bcrypt hashes start with $2)
    if (!user.password.startsWith('$2')) {
      user.password = await bcrypt.hash(user.password, 12);
      await user.save();
      console.log(`Updated password for user ${user.email}`);
    } else {
      console.log(`Password for user ${user.email} already hashed`);
    }
  }
  console.log('All passwords checked.');
  mongoose.disconnect();
}

hashPasswords().catch(err => {
  console.error(err);
  mongoose.disconnect();
});