import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const dir = searchParams.get("dir");

    if (!dir) {
        return NextResponse.json({ success: false, error: "Missing directory parameter" }, { status: 400 });
    }

    const directoryPath = path.join(process.cwd(), "public", dir.replace(/^\/+/, ""));

    try {
        const files = fs.readdirSync(directoryPath);
        const images = files
            .filter((file) => file.match(/\.(jpg|jpeg|png|gif)$/))
            .map((file) => `/${dir.replace(/^\/+/, "")}/${file}`);

        return NextResponse.json({ success: true, images });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Directory not found" }, { status: 404 });
    }
}
