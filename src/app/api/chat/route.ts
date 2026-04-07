import { NextRequest, NextResponse } from "next/server";
import { MessageSchema } from "@/schemas/message.schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = MessageSchema.parse(body);
    return NextResponse.json(
      { success: true, data: validated },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
