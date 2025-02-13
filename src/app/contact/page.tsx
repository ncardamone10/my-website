"use client";

import { useState, useEffect } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function ContactPageWrapper() {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
            <ContactPage />
        </GoogleReCaptchaProvider>
    );
}

function ContactPage() {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");

    // Run reCAPTCHA when the component mounts
    useEffect(() => {
        if (executeRecaptcha) {
            executeRecaptcha("contact").then(setToken);
        }
    }, [executeRecaptcha]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            alert("reCAPTCHA verification failed. Please refresh the page.");
            return;
        }

        const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message, token }),
        });

        const data = await response.json();
        if (data.success) {
            alert("Message sent successfully!");
            setName("");
            setEmail("");
            setMessage("");
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

                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}
