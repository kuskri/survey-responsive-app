import Survey from "@/models/Survey";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (request: any) => {
  try {
    await dbConnect();
    const surveys = await Survey.find();
    return new NextResponse(JSON.stringify(surveys), { status: 200 });
  } catch (e) {
    return new NextResponse("Database error", { status: 500 });
  }
};
