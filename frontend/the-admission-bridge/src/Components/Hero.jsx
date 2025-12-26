import { motion } from "framer-motion";

export default function Hero({ country, setCountry, degree, setDegree, countryOption, degreeOption }) {
    return (
        <section className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 text-center text-white">
                {/* Headline – SLIDES UP */}
                <motion.h1
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
                >
                    Find Your Perfect <span className="text-cyan-200">University</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12"
                >
                    Compare universities worldwide based on your academic profile and budget.
                </motion.p>

                {/* Search Bar – FADES IN */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35, duration: 0.6 }}
                    className="mx-auto max-w-3xl backdrop-blur-xl bg-white/15 border border-white/20 rounded-2xl p-6 shadow-2xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                            className="w-full p-3 rounded-xl bg-white text-gray-900 font-medium outline-none focus:ring-2 focus:ring-cyan-400"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option value="">Select Country</option>
                            <option value="">All</option>
                            {
                                countryOption.map(op => <option value={op}>{op}</option>)
                            }

                        </select>

                        <select
                            className="w-full p-3 rounded-xl bg-white text-gray-900 font-medium outline-none focus:ring-2 focus:ring-cyan-400"
                            value={degree}
                            onChange={(e) => setDegree(e.target.value)}
                        >
                            <option value="">Degree Level</option>
                            <option value="">All</option>
                            {
                                degreeOption.map(op => <option value={op}>{op}</option>)
                            }
                            
                        </select>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
