import { useState } from "react";

export default function ApplyModal({ university, onClose }) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        gpa: "",
        ielts: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:5000/api/applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    universityId: university.id,
                    name: form.name,
                    email: form.email,
                    gpa: Number(form.gpa),
                    ielts: Number(form.ielts),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Application failed");
            }

            alert("✅ Application submitted successfully!");
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <dialog className="modal modal-open">
            <div className="modal-box max-w-lg relative">

                <button
                    onClick={onClose}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                    ✕
                </button>

                <h3 className="font-bold text-xl mb-4 text-center">
                    Apply to {university.name}
                </h3>

                {/* STEP INDICATOR */}
                <div className="flex justify-center gap-2 mb-6">
                    <div className={`badge ${step === 1 ? "badge-primary" : ""}`}>
                        Personal
                    </div>
                    <div className={`badge ${step === 2 ? "badge-primary" : ""}`}>
                        Academic
                    </div>
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="input input-bordered w-full"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="input input-bordered w-full"
                            value={form.email}
                            onChange={handleChange}
                        />

                        <div className="modal-action">
                            <button
                                className="btn btn-primary"
                                disabled={!form.name || !form.email}
                                onClick={() => setStep(2)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <div className="space-y-4">
                        <input
                            type="number"
                            name="gpa"
                            placeholder="Your GPA"
                            className="input input-bordered w-full"
                            value={form.gpa}
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            name="ielts"
                            placeholder="Your IELTS Score"
                            className="input input-bordered w-full"
                            value={form.ielts}
                            onChange={handleChange}
                        />

                        {error && (
                            <div className="alert alert-error text-sm">
                                {error}
                            </div>
                        )}

                        <div className="modal-action flex justify-between">
                            <button className="btn btn-outline" onClick={() => setStep(1)}>
                                Back
                            </button>

                            <button
                                className={`btn btn-primary ${loading ? "loading" : ""}`}
                                onClick={handleSubmit}
                                disabled={!form.gpa || !form.ielts}
                            >
                                Submit Application
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </dialog>
    );
}
