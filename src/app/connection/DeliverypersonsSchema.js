const { default: mongoose } = require("mongoose");
const argon2 = require("argon2"); // Import Argon2

const DeliveryPersonsDBstructure=new mongoose.Schema({
    Name:String,
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
      },
      Password: {
        type: String,
        required: true,
        minlength: 8  // Set a minimum length for the password
      },

      Address:String

}, { versionKey: false });  // Disable the __v field);


// Pre-save middleware to hash the password before saving
DeliveryPersonsDBstructure.pre('save', async function(next) {
    const user = this;
  
    // Hash the password only if it has been modified or is new
    if (!user.isModified('Password')) return next();
  
    try {
      // Hash the password with Argon2
      user.Password = await argon2.hash(user.Password);
      next();
    } catch (error) {
      next(error);
    }
  });
  
  // Compare input password with hashed password stored in the database
  DeliveryPersonsDBstructure.methods.comparePassword = async function(inputPassword) {
    return await argon2.verify(this.Password, inputPassword);
  };

export const DeliveryPersonSchema_var=mongoose.models.deliverypeople || mongoose.model('deliverypeople',DeliveryPersonsDBstructure);