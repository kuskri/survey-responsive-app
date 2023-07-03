import mongoose from "mongoose";
const { Schema } = mongoose;

const SurveyOption = new Schema({
  label: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

export default module.exports =
  mongoose.models.Option || mongoose.model("Option", SurveyOption);
