import React from 'react';
import AlgorithmVisualizer from './components/AlgorithmVisualizer.jsx';
import Footer from "./components/Footer.jsx";

export default function App(){
  return (
    <div className="app-shell">
      <AlgorithmVisualizer />
      <Footer /> 
    </div>
  );
}