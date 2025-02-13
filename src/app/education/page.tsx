import Link from "next/link";
import { getEducation } from "@/lib/getEducation";

export default function EducationPage() {
    const education = getEducation();

    return (
        <section className="py-20 bg-gray-200">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-6 text-center">Education</h2>

                <div className="space-y-6">
                    {education.items.map((edu, index) => (
                        <div key={index} className="bg-white shadow-md rounded p-6">
                            <h3 className="text-2xl font-bold">{edu.title}</h3>
                            <p className="text-gray-700">{edu.institution}, {edu.location} ({edu.date})</p>

                            {edu.thesisTitle && (
                                <p className="mt-2 text-gray-600"><strong>Thesis:</strong> {edu.thesisTitle}</p>
                            )}

                            {edu.honors && (
                                <p className="mt-2 text-gray-600"><strong>Academic Standing:</strong> {edu.honors}</p>
                            )}

                            {edu.specialization && (
                                <p className="mt-2 text-gray-600"><strong>Specialization:</strong> {edu.specialization}</p>
                            )}

                            <p className="mt-2 text-gray-600"><strong>Courses:</strong> {edu.courses.join(", ")}</p>
                        </div>
                    ))}
                </div>

                {/* Buttons to Thesis and Publications Pages */}
                <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
                    {/* Thesis Button */}
                    <Link href="/education/thesis">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition transform hover:scale-105">
                            📖 View Thesis
                        </button>
                    </Link>

                    {/* Publications Button */}
                    <Link href="/education/thesis/publications">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition transform hover:scale-105">
                            📚 View Publications
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
