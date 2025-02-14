from PIL import Image
import os

# Define the directory containing images
#image_dir = r"C:\Users\ncard\OneDrive - University of Ottawa\The Bench\Program Code\WebDev\PersonalWebsiteV1\my-website\public\images\cad"
image_dir = r"C:\Users\ncard\OneDrive - University of Ottawa\The Bench\Program Code\WebDev\PersonalWebsiteV1\my-website\public\images\photography"
# Ensure the directory exists
if not os.path.exists(image_dir):
    print(f"Error: Directory '{image_dir}' not found.")
    exit()

# Iterate through all files in the directory
for filename in os.listdir(image_dir):
    file_path = os.path.join(image_dir, filename)
    
    # Convert PNG to JPG
    if filename.lower().endswith(".png"):
        with Image.open(file_path) as img:
            img = img.convert("RGB")  # Convert to RGB (JPEG doesn't support transparency)
            
            # Define the new JPG filename
            jpg_filename = os.path.splitext(filename)[0] + ".jpg"
            jpg_path = os.path.join(image_dir, jpg_filename)
            
            # Save as JPG with high quality
            img.save(jpg_path, "JPEG", quality=95)
            print(f"Converted: {filename} -> {jpg_filename}")

        # Delete the original PNG file
        os.remove(file_path)
        print(f"Deleted original: {filename}")

    # Rename .JPG to .jpg
    elif filename.endswith(".JPG"):
        new_filename = filename[:-4] + ".jpg"  # Change extension to lowercase
        new_path = os.path.join(image_dir, new_filename)

        # Rename file
        os.rename(file_path, new_path)
        print(f"Renamed: {filename} -> {new_filename}")

print("✅ Conversion and renaming complete!")
