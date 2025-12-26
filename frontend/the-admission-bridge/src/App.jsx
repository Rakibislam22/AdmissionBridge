import { useEffect, useRef, useState } from 'react';
import Hero from './Components/Hero';
import UniversityCard from './Components/UniversityCard';
import CompareModal from './Components/CompareModal';
import ApplyModal from './Components/ApplyModal';

function App() {
  const [country, setCountry] = useState("");
  const [degree, setDegree] = useState("");
  const [feeRange, setFeeRange] = useState([5000, 50000]);
  const [gpa, setGpa] = useState("");
  const [ielts, setIelts] = useState("");
  const [universities, setUniversities] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [showApply, setShowApply] = useState(false);
  const [selectedUni, setSelectedUni] = useState(null);
  const countryOptionRef = useRef([]);
  const degreeOptionRef = useRef([]);


  useEffect(() => {
    const params = new URLSearchParams({
      country,
      degree,
      minFee: feeRange[0],
      maxFee: feeRange[1],
    });

    fetch(`https://admission-task.vercel.app/api/universities?${params.toString()}`)
      .then(res => res.json())
      .then(data => setUniversities(data))
      .catch(console.error);
  }, [country, degree, feeRange]);

  useEffect(() => {
    if (
      universities.length > 0 &&
      countryOptionRef.current.length === 0
    ) {
      countryOptionRef.current = [
        ...new Set(universities.map(uni => uni.country)),
      ];

      degreeOptionRef.current = [
        ...new Set(universities.map(uni => uni.degree_level)),
      ];
    }
  }, [universities]);

  const toggleCompare = (uni) => {
    setCompareList(prev =>
      prev.find(u => u.id === uni.id)
        ? prev.filter(u => u.id !== uni.id)
        : prev.length < 3 ? [...prev, uni] : prev
    );
  };

  const handleApply = (uni) => {
    setSelectedUni(uni);
    setShowApply(true);
  };

  const INITIAL_FEE_RANGE = [5000, 50000];
  const isFilterDirty =
    feeRange[0] !== INITIAL_FEE_RANGE[0] ||
    feeRange[1] !== INITIAL_FEE_RANGE[1] ||
    gpa !== "" ||
    ielts !== "";

  const clearAllFilters = () => {
    setCountry("");
    setDegree("");
    setFeeRange(INITIAL_FEE_RANGE);
    setGpa("");
    setIelts("");
    setCompareList([]);
  };

  return (
    <div>
      <Hero
        country={country}
        setCountry={setCountry}
        degree={degree}
        setDegree={setDegree}
        countryOption={countryOptionRef.current}
        degreeOption={degreeOptionRef.current}
      />

      <div className="max-w-6xl mx-auto mt-10 flex max-md:flex-wrap gap-4 px-3">

        {/* Fee sliders */}
        <div className="flex gap-4">
          <div>
            <label>Min Fees</label>
            <div className="flex items-center gap-2">
              <span>{feeRange[0]}</span>
              <input
                type="range"
                min={0}
                max={feeRange[1] - 1000}
                value={feeRange[0]}
                onChange={(e) =>
                  setFeeRange([Number(e.target.value), feeRange[1]])
                }
              />
            </div>
          </div>

          <div>
            <label>Max Fees</label>
            <div className="flex items-center gap-2">
              <span>{feeRange[1]}</span>
              <input
                type="range"
                min={feeRange[0] + 1000}
                max={100000}
                value={feeRange[1]}
                onChange={(e) =>
                  setFeeRange([feeRange[0], Number(e.target.value)])
                }
              />
            </div>
          </div>
        </div>

        {/* GPA */}
        <input type="number" placeholder="Your GPA" value={gpa} onChange={(e) => setGpa(e.target.value)} className="p-3 border border-blue-200 rounded-xl w-full focus:outline-none focus:ring-2 ring-blue-300" />

        {/* IELTS */}
        <input type="number" placeholder="Your IELTS" value={ielts} onChange={(e) => setIelts(e.target.value)} className="p-3 border border-blue-200 rounded-xl w-full focus:outline-none focus:ring-2 ring-blue-300" />

        {/* Clear Button */}
        {isFilterDirty && (
          <button
            onClick={clearAllFilters}
            className="h-10 w-10 flex items-center justify-center rounded-full text-red-600 hover:bg-red-200"
          >
            ✕
          </button>
        )}
      </div>


      {/* University Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-3">
        {

          universities.length == 0 ? <p className="text-center col-span-3 text-red-400 py-10">
            No university found, adjust you search.
          </p> :
            universities.map((uni) => (
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

      {compareList.length >= 2 && (
        <button
          className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-xl shadow-lg"
          onClick={() => setShowCompare(true)}
        >
          Compare Now
        </button>
      )}

      {showCompare && (
        <CompareModal
          list={compareList}
          onClose={() => setShowCompare(false)}
        ></CompareModal>
      )}

      {showApply && selectedUni && (
        <ApplyModal
          university={selectedUni}
          onClose={() => setShowApply(false)}
        ></ApplyModal>
      )}


      <p className='pt-15 pb-5 text-center text-blue-400'>Made with ❤️ By <a className='hover:underline' target='_blank' href="https://github.com/Rakibislam22">Md Rakib Ali</a> &copy; {new Date().getFullYear()}</p>

    </div>
  );
}

export default App;
