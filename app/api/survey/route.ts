import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import Survey, { OptionType } from "@/models/Survey";

export const GET = async () => {
  try {
    await dbConnect();
    const surveys = await Survey.find();
    return new NextResponse(JSON.stringify(surveys), { status: 200 });
  } catch (e) {
    return new NextResponse("Database error", { status: 500 });
  }
};

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
