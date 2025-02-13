const fs = require("fs");
const path = require("path");
const toml = require("toml");

// Define paths
const tomlPath = path.join(__dirname, "src/app/projects/projects.toml");
const jsonPath = path.join(__dirname, "src/app/projects/projects.json");

try {
  const tomlData = fs.readFileSync(tomlPath, "utf8");
  const jsonData = toml.parse(tomlData);

  // Save parsed TOML data as JSON
  fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), "utf8");
  console.log("✅ Successfully converted projects.toml to projects.json!");
} catch (error) {
  console.error("❌ Error converting projects.toml to JSON:", error);
  process.exit(1);
}
