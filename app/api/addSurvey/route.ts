import Survey, { OptionType } from "@/models/Survey";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const body = await req.json();

  const filledOptions = body.options.filter(
    (i: OptionType) => i.label.length > 0
  );
  const requestBody = {
    question: body.question,
    options: filledOptions,
  };
  const newSurvey = new Survey(requestBody);

  try {
    await dbConnect();
    await newSurvey.save();
    return new NextResponse("Survey has been created", { status: 201 });
  } catch (e) {
    return new NextResponse(`${e}`, { status: 500 });
  }
};
