"use client";

import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!captchaValue) {
            alert("Please complete the reCAPTCHA verification.");
            return;
        }

        const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message, token: captchaValue }),
        });

        const data = await response.json();
        if (data.success) {
            alert("Message sent successfully!");
            setName("");
            setEmail("");
            setMessage("");
            setCaptchaValue(null); // Reset captcha
        } else {
            alert("Failed to send message. Please try again.");
        }
    };

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-6 text-center">Contact</h2>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow-md rounded">
                    <div className="mb-4">
                        <label className="block font-semibold">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                               className="w-full p-2 border border-gray-300 rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                               className="w-full p-2 border border-gray-300 rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold">Message</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded" rows={4} required />
                    </div>

                    {/* reCAPTCHA v2 Checkbox */}
                    <div className="mb-4 flex justify-center">
                        <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                            onChange={(token) => setCaptchaValue(token)}
                        />
                    </div>

                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}
