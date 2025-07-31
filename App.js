import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState([5.1, 3.5, 1.4, 0.2]);
  const [result, setResult] = useState("");

  const handlePredict = async () => {
    const res = await fetch("https://bike-demand-predictor.onrender.com//predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ features: input })
    });
    const data = await res.json();
    setResult(data.prediction[0]);
  };

  return (
    <div className="App">
      <h2>Iris Flower Predictor</h2>
      {input.map((val, i) => (
        <input
          key={i}
          type="number"
          value={val}
          onChange={(e) => {
            const newInput = [...input];
            newInput[i] = parseFloat(e.target.value);
            setInput(newInput);
          }}
        />
      ))}
      <button onClick={handlePredict}>Predict</button>
      {result && <h3>Prediction: {result}</h3>}
    </div>
  );
}

export default App;

