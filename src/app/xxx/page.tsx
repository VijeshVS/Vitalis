"use client"

import { useState } from 'react';

function App() {
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState('');
  const [doctors, setDoctors] = useState('');
  const [specialty, setSpecialty] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptoms, age, doctors }),
    });

    const data = await response.json();
    setSpecialty(data.specialty);
  };

  return (
    <div>
      <h1>Doctor Recommendation</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="symptoms">Symptoms:</label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(event) => setSymptoms(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="doctors">Doctors:</label>
          <input
            type="text"
            id="doctors"
            value={doctors}
            onChange={(event) => setDoctors(event.target.value)}
          />
        </div>
        <button type="submit">Recommend</button>
      </form>
      {specialty && <p>Recommended Specialty: {specialty}</p>}
    </div>
  );
}

export default App;
