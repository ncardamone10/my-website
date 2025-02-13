import path from "path";
import fs from "fs";
import toml from "toml";

export function getSkills() {
    const filePath = path.join(process.cwd(), "src/app/skills/skills.toml");
    const fileContents = fs.readFileSync(filePath, "utf-8");
    return toml.parse(fileContents);
}
