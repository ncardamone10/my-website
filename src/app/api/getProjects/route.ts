import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import toml from "toml";

// ✅ Mark this as a server function
export const dynamic = "force-dynamic"; // Ensure it runs on the server

export async function GET() {
    try {
        const projectsFilePath = path.join(process.cwd(), "src", "app", "projects", "projects.toml");
        const fileContent = await fs.readFile(projectsFilePath, "utf-8");
        const projectsData = toml.parse(fileContent);

        return NextResponse.json({ success: true, projects: projectsData });
    } catch (error) {
        console.error("Error reading projects.toml:", error);
        return NextResponse.json({ success: false, error: "Failed to load projects" }, { status: 500 });
    }
}
