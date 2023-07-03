import mongoose from "mongoose";
const { Schema } = mongoose;

export type SurveyType = {
  question: string;
  options: OptionType[];
};

export type OptionType = { label: string; votes?: number };

const SurveySchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      label: {
        type: String,
      },
      votes: {
        type: Number,
        default: 0,
      },
    },
  ],
});

export default module.exports =
  mongoose.models.Survey || mongoose.model("Survey", SurveySchema);
