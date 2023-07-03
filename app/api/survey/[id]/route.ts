import Survey, { OptionType } from "@/models/Survey";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (
  request: any,
  { params }: { params: { id: string } }
) => {
  try {
    await dbConnect();
    const survey = await Survey.findById(params.id);
    return new NextResponse(JSON.stringify(survey), { status: 200 });
  } catch (e) {
    return new NextResponse("Database error", { status: 500 });
  }
};

export const PUT = async (req: any, { params }: { params: { id: string } }) => {
  const body = await req.json();

  try {
    await dbConnect();
    Survey.updateOne(
      { _id: params.id, "options._id": `${body}` },
      { $inc: { "options.$.votes": 1 } }
    ).exec();

    return new NextResponse("Success", { status: 200 });
  } catch (e) {
    return new NextResponse(`${e}`, { status: 500 });
  }
};
