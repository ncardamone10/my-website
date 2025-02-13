import { getSkills } from "@/lib/getSkills";
import ShowImagesButton from "./ShowImagesButton";

export default function SkillsPage() {
    const skillsData = getSkills();

    return (
        <section className="py-20 bg-gray-200">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-6 text-center">Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillsData.skills.items.map((skill, index) => (
                        <div key={index} className="bg-white shadow-md rounded p-6">
                            <h3 className="text-2xl font-bold">{skill.title}</h3>
                            <ul className="list-disc ml-6 mt-2 text-gray-700">
                                {skill.skills.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                            {/* Show Images Button (if imageDirectory is provided) */}
                            {skill.imageDirectory && <ShowImagesButton imageDirectory={skill.imageDirectory} />}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
