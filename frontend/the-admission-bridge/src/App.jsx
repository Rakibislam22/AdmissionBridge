import { useEffect, useState } from 'react';
import Hero from './Components/Hero';
import UniversityCard from './Components/UniversityCard';

function App() {
  const [country, setCountry] = useState("");
  const [degree, setDegree] = useState("");
  const [feeRange, setFeeRange] = useState([5000, 50000]);
  const [gpa, setGpa] = useState("");
  const [ielts, setIelts] = useState("");
  const [universities, setUniversities] = useState([]);
  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams({
      country,
      degree,
      minFee: feeRange[0],
      maxFee: feeRange[1],
    });

    fetch(`http://localhost:5000/api/universities?${params.toString()}`)
      .then(res => res.json())
      .then(data => setUniversities(data))
      .catch(console.error);
  }, [country, degree, feeRange]);

  const toggleCompare = (uni) => {
    setCompareList(prev =>
      prev.find(u => u.id === uni.id)
        ? prev.filter(u => u.id !== uni.id)
        : prev.length < 3 ? [...prev, uni] : prev
    );
  };

  const handleApply = (uni) => {
    console.log("Apply clicked:", uni);
  };

  return (
    <div>
      <Hero
        country={country}
        setCountry={setCountry}
        degree={degree}
        setDegree={setDegree}
      />

      {/* GPA / IELTS */}
      <div className="max-w-4xl mx-auto mt-10 flex gap-4 px-3">
        <input
          type="number"
          placeholder="Your GPA"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
          className="p-3 border border-blue-100 rounded-xl w-full focus:outline-none focus:ring-2 ring-blue-300"
        />
        <input
          type="number"
          placeholder="Your IELTS"
          value={ielts}
          onChange={(e) => setIelts(e.target.value)}
          className="p-3 border border-blue-100 rounded-xl w-full focus:outline-none focus:ring-2 ring-blue-300"
        />
      </div>

      {/* University Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-3">
        {universities.map((uni) => (
          <UniversityCard
            key={uni.id}
            university={uni}
            userGpa={gpa}
            userIelts={ielts}
            isSelected={compareList.some(u => u.id === uni.id)}
            onToggleCompare={toggleCompare}
            onApply={handleApply}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
