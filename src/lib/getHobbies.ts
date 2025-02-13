import path from "path";
import fs from "fs";
import toml from "toml";

export function getHobbies() {
    const filePath = path.join(process.cwd(), "src", "app", "hobbies", "hobbies.toml");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return toml.parse(fileContent).hobbies;
}
