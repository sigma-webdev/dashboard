import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import { Task } from "@/app/model/Task";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch tasks", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const task = await Task.create(body);
    return NextResponse.json({ task }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to create task", error: error.message },
      { status: 500 }
    );
  }
}
