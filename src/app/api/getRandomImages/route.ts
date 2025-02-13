import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function GET() {
    try {
        const imagesDir = path.join(process.cwd(), "public", "images", "random_electronics");
        const files = await fs.readdir(imagesDir);
        const images = files
            .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file))
            .map((file) => `/images/random_electronics/${file}`);

        return NextResponse.json({ success: true, images });
    } catch (error) {
        console.error("Error fetching random electronics images:", error);
        return NextResponse.json({ success: false, error: "Failed to load images" }, { status: 500 });
    }
}
