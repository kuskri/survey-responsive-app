const mongoose = require("mongoose");
require("dotenv").config();

dbConnect().catch((err) => console.log(err));

export default async function dbConnect() {
  const dbUri = process.env.MONGO_URI || "";
  await mongoose.connect(dbUri);
}
