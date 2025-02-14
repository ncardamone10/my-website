import type { Metadata } from "next";
import Link from "next/link";
import { FaGithub, FaFileDownload } from "react-icons/fa"; // Import GitHub & Download icons
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"; // ✅ Import Vercel Analytics

export const metadata: Metadata = {
  title: "Nick Cardamone's Portfolio",
  description: "A personal portfolio showcasing engineering projects and experience.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 font-sans">
        <header className="bg-blue-600 text-white py-6">
          <div className="container mx-auto px-4 flex justify-between items-center">
            
            {/* Left Section: Name + Links */}
            <div className="flex items-center space-x-6">
              <h1 className="text-3xl font-bold">Nick Cardamone</h1>

              {/* GitHub Link with Logo */}
              <Link 
                href="https://github.com/ncardamone10" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition"
              >
                <FaGithub size={32} />
              </Link>

              {/* Download Resume Button */}
              <Link 
                href="/resume/Nick_Cardamone_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 space-x-2"
              >
                <FaFileDownload size={20} />
                <span>Resume</span>
              </Link>
            </div>

            {/* Right Section: Navigation */}
            <nav>
              <ul className="flex space-x-4">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/about" className="hover:underline">About Me</Link></li>
                <li><Link href="/experience" className="hover:underline">Experience</Link></li>
                <li><Link href="/projects" className="hover:underline">Projects</Link></li>
                <li><Link href="/education" className="hover:underline">Education</Link></li>
                <li><Link href="/education/thesis" className="hover:underline">Thesis</Link></li>
                <li><Link href="/skills" className="hover:underline">Skills</Link></li>
                <li><Link href="/hobbies" className="hover:underline">Hobbies</Link></li>
                <li><Link href="/contact" className="hover:underline">Contact</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* ✅ Main Content */}
        {children} 

        {/* ✅ Add Vercel Analytics Here */}
        <Analytics />
      </body>
    </html>
  );
}
