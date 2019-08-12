const uniqueValidator = require("mongoose-unique-validator");
const { Schema, model } = require("mongoose");
const { encrypt } = require("../helpers/bcryptjs");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "can't be blank"],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
      unique: true
    },
    password: {
      type: String,
      min: [6, 'Min length is 6'],
      required: [true, "can't be blank"]
    }
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator, { message: 'is already taken.' });

userSchema.pre("save", function(next) {
  this.password = encrypt(this.password);
  next();
});

module.exports = model("User", userSchema);
