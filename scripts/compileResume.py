import subprocess
import os
import shutil

# Define paths
latex_source = r"C:\Users\ncard\OneDrive - University of Ottawa\Personal\Resume\resumeNew.tex"
output_pdf = r"C:\Users\ncard\OneDrive - University of Ottawa\The Bench\Program Code\WebDev\PersonalWebsiteV1\my-website\public\resume\Nick_Cardamone_Resume.pdf"
temp_dir = r"C:\Users\ncard\OneDrive - University of Ottawa\Personal\Resume\temp_compile"

# Ensure temp directory exists
os.makedirs(temp_dir, exist_ok=True)

# Run pdflatex
try:
    result = subprocess.run(
        ["pdflatex", "-interaction=nonstopmode", "-output-directory", temp_dir, latex_source],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )

    # Print standard output and errors
    print("📜 LaTeX Compilation Output:\n", result.stdout)
    print("⚠️ LaTeX Errors:\n", result.stderr)

    # Check if PDF was created
    compiled_pdf = os.path.join(temp_dir, "resumeNew.pdf")
    if os.path.exists(compiled_pdf):
        shutil.move(compiled_pdf, output_pdf)
        print(f"✅ Resume compiled successfully and moved to: {output_pdf}")
    else:
        print("❌ Compilation failed: No PDF generated.")

except Exception as e:
    print(f"❌ Unexpected error: {str(e)}")
