import mongoose from 'mongoose';
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/connect";
import Town from '@/lib/models/town.model';
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const db = await connectToDatabase();
    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    // Filters (optional parameters)
    //ToDo: Update filters
    //const status = searchParams.get("status") || "";
    //const difficulty = searchParams.get("difficulty");
    //const questType = searchParams.get("questType");
    //const partyMembers = searchParams.get("partyMembers");

    if (id) {
      // Validate ID format
      if (!ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid town ID" }, { status: 400 });
      }

      // Fetch a specific Town by ID
      const town = await Town.findById(id);
      if (!town) {
        return NextResponse.json({ message: "Town not found" }, { status: 404 });
      }

      return NextResponse.json(town, { status: 200 });
    } else {
      // Build dynamic filters
      const filters: Record<string, any> = {};

      //ToDo: Update filters
      //// Search by Town name
      //if (search) {
      //  filters.name = { $regex: search, $options: "i" }; // Case-insensitive search
      //}

      //// Filter by status
      //if (status) {
      //  filters.status = { $in: status.split(",") };  // Split the comma-separated string into an array
      //}

      //// Filter by party members (case-insensitive match)
      //if (partyMembers) {
      //  filters.partyMembers = { $regex: partyMembers, $options: "i" };
      //}

      // Get total count of towns matching the filters
      const totalTowns = await Town.countDocuments(filters);

      const towns = await Town.find(filters)
        .skip((page - 1) * limit) // Skip results for pagination
        .limit(limit) // Limit results for pagination
        .sort({ createdAt: -1 }); // Optional: sort by creation date, most recent first

      // Return paginated results with metadata
      return NextResponse.json(
        {
          success: true,
          towns,
          totalTowns,
          totalPages: Math.ceil(totalTowns / limit),
          currentPage: page,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newTown = new Town(body);
    await newTown.save();

    return NextResponse.json(newTown, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid town ID" }, { status: 400 });
    }

    const updatedData = await req.json();
    
    // Convert id to ObjectId
    const objectId = new ObjectId(id);
    const updatedTown = await Town.findByIdAndUpdate(objectId, updatedData, { new: true });

    if (!updatedTown) {
      return NextResponse.json({ message: "Town not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTown, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid town ID" }, { status: 400 });
    }

    const deletedTown = await Town.findByIdAndDelete(id);
    if (!deletedTown) {
      return NextResponse.json({ message: "Town not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Town deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}