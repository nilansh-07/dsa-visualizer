import React, { useMemo, useState } from 'react';
import Controls from './Controls.jsx';
import usePlayer from '../hooks/usePlayer.js';
import { generateBFSSteps, generateDFSSteps } from '../algorithms/graph.js';

export default function GraphVisualizer(){
  // simple sample graph
  const defaultGraph = useMemo(()=>({
    A:['B','C'], B:['D','E'], C:['F'], D:[], E:['G'], F:[], G:[]
  }),[]);

  const [graph] = useState(defaultGraph);
  const [startNode, setStartNode] = useState('A');
  const [algo,setAlgo] = useState('bfs');
  const [speed,setSpeed] = useState(350);

  const steps = useMemo(()=>{
    if(algo==='bfs') return generateBFSSteps(graph, startNode);
    return generateDFSSteps(graph, startNode);
  }, [graph, startNode, algo]);

  const { idx, setIdx, playing, play, stop, prev, next, reset } = usePlayer(steps, speed);
  const snapshot = steps[idx] || { visited:[], queue:[] };

  const nodes = Object.keys(graph);

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <label className="small">Algo</label>
          <select value={algo} onChange={(e)=>setAlgo(e.target.value)} className="btn">
            <option value="bfs">BFS</option>
            <option value="dfs">DFS</option>
          </select>

          <label className="small">Start</label>
          <select value={startNode} onChange={(e)=>setStartNode(e.target.value)} className="btn">
            {nodes.map(n=> <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <Controls
          onGenerate={()=>setIdx(0)}
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

      <div className="card" style={{padding:20}}>
        <div style={{display:'flex',gap:18,flexWrap:'wrap'}}>
          {nodes.map((n)=>{
            const isVisited = snapshot.visited && snapshot.visited.includes(n);
            const isCurrent = snapshot.current === n;
            const bg = isCurrent ? '#f59e0b' : isVisited ? '#16a34a' : '#fff';
            const color = isCurrent || isVisited ? '#fff' : '#111';
            return (
              <div key={n} style={{width:64,height:64,display:'grid',placeItems:'center',borderRadius:12,boxShadow:'0 6px 18px rgba(16,24,40,0.06)',background:bg,color,fontWeight:700}}>
                {n}
              </div>
            );
          })}
        </div>

        <div className="hud">Visited: [{(snapshot.visited||[]).join(', ')}] · Queue: [{(snapshot.queue||[]).join(', ')}]</div>
      </div>
    </div>
  );
}