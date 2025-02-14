import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises"; // ✅ Use async file system
import toml from "toml";

export async function GET() {
    const filePath = path.join(process.cwd(), "src/app/experience/experience.toml");

    try {
        const fileContents = await fs.readFile(filePath, "utf8");
        const parsedData = toml.parse(fileContents);

        return NextResponse.json(parsedData);
    } catch (error) {
        console.error("Error loading experience data:", error);
        return NextResponse.json({ experience: { items: [] } }, { status: 500 });
    }
}
