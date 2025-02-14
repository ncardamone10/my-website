import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IMAGE_LIST_PATH = path.join(process.cwd(), "public/images.json");

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const dir = searchParams.get("dir");

    if (!dir) {
        return NextResponse.json({ success: false, error: "Missing directory parameter" }, { status: 400 });
    }

    if (!fs.existsSync(IMAGE_LIST_PATH)) {
        console.error("🚨 images.json not found! Make sure to run generateImageList.js");
        return NextResponse.json({ success: false, error: "Image list not available" }, { status: 500 });
    }

    try {
        const imageList: string[] = JSON.parse(fs.readFileSync(IMAGE_LIST_PATH, "utf-8"));

        // Normalize directory format for filtering
        const formattedDir = `/images/${dir.replace(/^\/+/, "").replace(/\/$/, "")}`; // Remove leading/trailing slashes
        console.log(`Filtering images for: ${formattedDir}`);

        // Ensure filtering works
        const filteredImages = imageList.filter((image) => image.startsWith(formattedDir + "/"));

        if (filteredImages.length === 0) {
            console.warn(`🚨 No images found for ${formattedDir}`);
            return NextResponse.json({ success: false, error: `No images found for ${formattedDir}` });
        }

        return NextResponse.json({ success: true, images: filteredImages });
    } catch (error) {
        console.error("🚨 Error reading images.json:", error);
        return NextResponse.json({ success: false, error: "Failed to load image list" }, { status: 500 });
    }
}
