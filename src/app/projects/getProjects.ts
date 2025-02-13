import fs from "fs";
import path from "path";
import toml from "toml";

export function getProjects() {
    try {
        const filePath = path.resolve(process.cwd(), "src/app/projects/projects.toml");
        const fileContents = fs.readFileSync(filePath, "utf8");
        return toml.parse(fileContents);
    } catch (error) {
        console.error("❌ Error reading projects.toml:", error);
        return { projects: { items: [] } };
    }
}
