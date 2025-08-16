import React, { useMemo, useState } from 'react';
import Controls from './Controls.jsx';
import usePlayer from '../hooks/usePlayer.js';
import { generateBinarySearchSteps, generateLinearSearchSteps } from '../algorithms/searching.js';

export default function SearchingVisualizer(){
  const [size, setSize] = useState(25);
  const [array, setArray] = useState(()=> Array.from({length:size}, ()=>Math.floor(Math.random()*90)+10).sort((a,b)=>a-b));
  const [target, setTarget] = useState(array[Math.floor(Math.random()*array.length)]);
  const [algo, setAlgo] = useState('binary');
  const [speed,setSpeed]=useState(300);

  function randomize(){
    const arr = Array.from({length:size}, ()=>Math.floor(Math.random()*90)+10).sort((a,b)=>a-b);
    setArray(arr); setTarget(arr[Math.floor(Math.random()*arr.length)]);
  }

  const steps = useMemo(()=>{
    if(algo==='binary') return generateBinarySearchSteps(array, target);
    return generateLinearSearchSteps(array, target);
  }, [array, target, algo]);

  const { idx, setIdx, playing, play, stop, prev, next, reset } = usePlayer(steps, speed);
  const snapshot = steps[idx] || { array };

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <label className="small">Algo</label>
          <select value={algo} onChange={(e)=>setAlgo(e.target.value)} className="btn">
            <option value="binary">Binary Search</option>
            <option value="linear">Linear Search</option>
          </select>

          <label className="small">Size</label>
          <input className="btn" type="range" min="6" max="80" value={size} onChange={(e)=>{ setSize(Number(e.target.value)); const arr = Array.from({length:Number(e.target.value)}, ()=>Math.floor(Math.random()*90)+10).sort((a,b)=>a-b); setArray(arr); setTarget(arr[Math.floor(Math.random()*arr.length)]); }} style={{ width: "70px" }}/>
          <div className="small">{size}</div>

          <label className="small">Target</label>
          <input className="btn" type="number" value={target} onChange={(e)=>setTarget(Number(e.target.value))} style={{ width: "60px" }} />
        </div>

        <Controls
          onGenerate={randomize}
          onStart={()=>setIdx(0)}
          onPrev={prev}
          onNext={next}
          onReset={reset}
          playing={playing}
          onPlay={play}
          onPause={stop}
          speed={speed}
          setSpeed={setSpeed}
        />
      </div>

      <div className="card" style={{padding:12}}>
        <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
          {(snapshot.array || array).map((v,i)=>{
            const isMid = snapshot.mid === i;
            const isLeft = snapshot.left === i;
            const isRight = snapshot.right === i;
            const found = snapshot.foundIndex === i;
            const bg = found? '#16a34a' : isMid? '#f59e0b' : isLeft || isRight? '#0b5fff' : '#eef2ff';
            const color = found || isMid || isLeft || isRight? '#fff':'#111';
            return (
              <div key={i} style={{width:44,height:40,display:'grid',placeItems:'center',borderRadius:8,background:bg,color, fontWeight:700}}>{v}</div>
            );
          })}
        </div>
      </div>

      <div className="hud">Step {idx} · {snapshot.status || snapshot.label || ''}</div>
    </div>
  );
}