import React, { useEffect, useMemo, useState } from 'react';
import Controls from './Controls.jsx';
import usePlayer from '../hooks/usePlayer.js';
import { generateBubbleSortSteps, generateMergeSortSteps } from '../algorithms/sorting.js';


export default function SortingVisualizer(){
  const [size, setSize] = useState(20);
  const [array, setArray] = useState(()=> Array.from({length:size}, ()=>Math.floor(Math.random()*90)+5));
  const [algo, setAlgo] = useState('bubble');
  const [speed, setSpeed] = useState(220);

  useEffect(()=>{ setArray(Array.from({length:size}, ()=>Math.floor(Math.random()*90)+5)); }, [size]);

  const steps = useMemo(()=>{
    if(algo==='bubble') return generateBubbleSortSteps(array);
    return generateMergeSortSteps(array);
  }, [array, algo]);

  const { idx, setIdx, playing, play, stop, prev, next, reset } = usePlayer(steps, speed);

  // current snapshot
  const snapshot = steps[idx] || { array };

  function randomize(){ stop(); setArray(Array.from({length:size}, ()=>Math.floor(Math.random()*90)+5)); }
  function handleStart(){ /* generate steps already handled by useMemo */ setIdx(0); }
  function handleReset(){ reset(); }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <label className="small">Algo</label>
          <select value={algo} onChange={(e)=>setAlgo(e.target.value)} className="btn">
            <option value="bubble">Bubble Sort</option>
            <option value="merge">Merge Sort</option>
          </select>

          <label className="small">Size</label>
          <input className="btn" type="range" min="6" max="36" value={size} onChange={(e)=>setSize(Number(e.target.value))} />
          <div className="small">{size}</div>

        </div>

        <Controls
          onGenerate={randomize}
          onStart={handleStart}
          onPrev={prev}
          onNext={next}
          onReset={handleReset}
          playing={playing}
          onPlay={play}
          onPause={stop}
          speed={speed}
          setSpeed={setSpeed}
        />
      </div>

      <div className="array-row card">
        {(snapshot.array || array).map((v,i)=>{
          const isComparing = snapshot.comparing && snapshot.comparing.includes(i);
          const isSwapping = snapshot.swapping && snapshot.swapping.includes(i);
          const height = Math.max(8, Math.round((v/100)*220));
          const bg = isSwapping? '#7c3aed' : isComparing? '#f59e0b' : '#0b5fff';
          return (
            <div key={i} className="array-bar" style={{height:`${height}px`,background:bg}} title={`index ${i} = ${v}`}>
              <div style={{fontSize:11, padding:4}}>{v}</div>
            </div>
          );
        })}
      </div>

      <div className="hud">Step {idx} · {snapshot.label || ''}</div>
    </div>
  );
}