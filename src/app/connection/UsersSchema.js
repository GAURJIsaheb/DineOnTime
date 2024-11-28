const { default: mongoose } = require("mongoose");
const argon2 = require('argon2');  // Import Argon2

const UsersDatabaseStructure = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  Password: {
    type: String,
    required: true,
    minlength: 8  // Set a minimum length for the password
  },
  City: {
    type: String,
    required: true,
    minlength: 2,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z\s]+$/.test(v);  // Only letters and spaces
      },
      message: props => `${props.value} is not a valid city name!`
    }
  },
  Age: {
    type: Number,
    required: true,
    min: [0, 'Age cannot be negative'],
    max: [120, 'Age seems invalid'],
    validate: {
      validator: function(v) {
        return Number.isInteger(v);
      },
      message: props => `${props.value} is not a valid age!`
    }
  },
  Phone_No: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\+?[1-9]\d{1,14}$/.test(v);  // E.164 format
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
}, { versionKey: false });  // Disable the __v field

// Pre-save middleware to hash the password before saving
UsersDatabaseStructure.pre('save', async function(next) {
  const user = this;

  // Hash the password only if it has been modified or is new
  if (!user.isModified('Password')) return next();

  try {
    // Hash the password using Argon2
    user.Password = await argon2.hash(user.Password);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare input password with hashed password stored in the database
UsersDatabaseStructure.methods.comparePassword = async function(inputPassword) {
  return await argon2.verify(this.Password, inputPassword);
};

export const usersSchemaVariable = mongoose.models.user
  || mongoose.model("user", UsersDatabaseStructure);
