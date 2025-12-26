import { motion } from "framer-motion";

export default function UniversityCard({
    university,
    userGpa,
    userIelts,
    isSelected,
    onToggleCompare,
    onApply,
}) {
    const notEligible =
        userGpa &&
        userIelts &&
        (Number(userGpa) < university.min_gpa ||
            Number(userIelts) < university.min_ielts);

    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="relative bg-white rounded-2xl shadow-lg border border-blue-100 p-4 flex flex-col justify-between"
        >
            {/* Eligibility Badge */}
            {notEligible && (
                <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600">
                    Not Eligible
                </span>
            )}

            {/* Header */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {university.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 py-3">
                    <span className="p-2 border border-blue-100 rounded-3xl">{university.country}</span> • <span className="p-2 border border-blue-100 rounded-3xl">{university.degree_level}</span>
                </p>

                {/* Info */}
                <div className="space-y-2 text-sm text-gray-700">
                    <p>
                        <span className="bg-blue-100 p-2 rounded-3xl"><strong>Tuition Fee:</strong> ${university.tuition_fee}</span>
                    </p>
                    <div className="flex justify-between items-center pt-3">
                        <p className="p-2 border border-blue-100 rounded-3xl">
                            <strong>Min GPA:</strong> {university.min_gpa}
                        </p>
                        <p className="p-2 border border-blue-100 rounded-3xl">
                            <strong>Min IELTS:</strong> {university.min_ielts}
                        </p>
                    </div>

                </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleCompare(university)}
                        className="accent-blue-600"
                    />
                    Compare
                </label>

                <button
                    onClick={() => onApply(university)}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                    disabled={notEligible}
                >
                    Apply Now
                </button>
            </div>
        </motion.div>
    );
}
