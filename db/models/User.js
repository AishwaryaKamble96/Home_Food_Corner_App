import mongoose from "mongoose";
require("mongoose-type-email"); // installed mongoose-type-email
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  contactno: { type: String },

  ///email_id: { type: String }, // used correctTld for TLD validation
  email: { type: mongoose.SchemaTypes.Email, correctTld: true }, // used correctTld for TLD validation
  location: { type: String },
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
// username: { type: String, required: true },
//   contactno: { type: String, required: true },

//   ///email_id: { type: String }, // used correctTld for TLD validation
//   email_id: { type: mongoose.SchemaTypes.Email, correctTld: true }, // used correctTld for TLD validation
//   location: { type: String, required: true },
