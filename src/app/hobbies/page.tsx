import { getHobbies } from "@/lib/getHobbies";
import ShowImagesButton from "./ShowImagesButton";

export default function HobbiesPage() {
    const hobbies = getHobbies();

    return (
        <section className="py-20 bg-gray-200">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-6 text-center">Hobbies and Interests</h2>

                {/* ✅ Set grid to 2 columns (adjusts to 1 column on smaller screens) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {hobbies.items.map((hobby, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-2xl font-bold">{hobby.title}</h3>
                            <p className="text-gray-700 mt-2">{hobby.description}</p>

                            {/* ✅ Added more space between text and button */}
                            {hobby.imageDirectory && (
                                <div className="mt-4">
                                    <ShowImagesButton imageDirectory={hobby.imageDirectory} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
