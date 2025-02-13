import fs from "fs";
import path from "path";
import toml from "toml";

export function getEducation() {
    const filePath = path.join(process.cwd(), "src/app/education/education.toml");

    try {
        const fileContents = fs.readFileSync(filePath, "utf8");
        return toml.parse(fileContents).education;
    } catch (error) {
        console.error("Error loading education.toml:", error);
        return { items: [] };
    }
}
