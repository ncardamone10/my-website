"use server"; // ✅ Ensure this runs on the server-side

import path from "path";
import fs from "fs";
import toml from "toml";

export async function getExperience() {
    const filePath = path.join(process.cwd(), "src/app/experience/experience.toml");

    try {
        const fileContents = fs.readFileSync(filePath, "utf8");
        const parsedData = toml.parse(fileContents);

        // ✅ Ensure it's a plain object by using JSON parse/stringify
        return JSON.parse(JSON.stringify(parsedData));

    } catch (error) {
        console.error("Error loading experience data:", error);
        return { experience: { items: [] } }; // Return empty object if there's an error
    }
}
