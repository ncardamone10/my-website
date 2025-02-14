const fs = require("fs");
const path = require("path");

const BASE_DIR = path.join(__dirname, "../public/images");
const OUTPUT_FILE = path.join(__dirname, "../public/images.json");

// Function to recursively scan images
const getImagesRecursive = (dir, baseUrl) => {
    let results = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            results = results.concat(getImagesRecursive(filePath, `${baseUrl}/${file}`));
        } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
            results.push(`${baseUrl}/${file}`);
        }
    }

    return results;
};

// Ensure BASE_DIR exists
if (!fs.existsSync(BASE_DIR)) {
    console.error("❌ Image directory does not exist:", BASE_DIR);
    process.exit(1);
}

const imageList = getImagesRecursive(BASE_DIR, "/images");

// Write output to images.json
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(imageList, null, 2));
console.log("✅ Successfully generated images.json!");
