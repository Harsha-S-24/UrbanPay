const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/UrbanPay', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please Enter a User Name'],
    unique: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please Enter a password'],
    minLength: 6,
  },
  firstName: {
    type: String,
    required: [true, 'Please Enter a first name'],
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  }
});

// Methods for password hashing and validation
userSchema.methods.createHash = async function (plainTextPassword) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword, salt);
};

userSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
