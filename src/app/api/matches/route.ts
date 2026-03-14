import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";

export async function GET() {
  try {
    const db = await connectDB();
    const likesCollection = db.collection("likes");

    const docs = await likesCollection.find({}).sort({ createdAt: -1 }).toArray();

    const matches = docs.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
    }));

    return NextResponse.json(matches);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

