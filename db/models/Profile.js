import mongoose from "mongoose";
const { Schema } = mongoose;
require("mongoose-type-email");

const profileSchema = new Schema({
  username: { type: String, required: true },
  contactno: {},
  email_id: { type: mongoose.SchemaTypes.Email, correctTld: true },
});
