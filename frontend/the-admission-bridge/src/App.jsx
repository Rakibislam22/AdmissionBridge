import { useEffect, useState } from 'react';
import Hero from './Components/Hero';

function App() {
  const [country, setCountry] = useState("");
  const [degree, setDegree] = useState("");
  const [feeRange, setFeeRange] = useState([5000, 50000]);
  const [gpa, setGpa] = useState("");
  const [ielts, setIelts] = useState("");
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams({
      country,
      degree,
      minFee: feeRange[0],
      maxFee: feeRange[1],
    });

    console.log(params);    
    fetch(`http://localhost:5000/api/universities?${params.toString()}`)
      .then(res => res.json())
      .then(data => setUniversities(data))
      .catch(err => console.error(err));
  }, [country, degree, feeRange]);

  return (
    <div>
      <Hero
        country={country}
        setCountry={setCountry}
        degree={degree}
        setDegree={setDegree}
      />
    </div>
  );
}

export default App;
