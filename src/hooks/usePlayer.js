import { useEffect, useRef, useState } from 'react';

// steps: array (any), speedMs: number
export default function usePlayer(steps, speedMs){
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  const stop = ()=>{
    setPlaying(false);
    if(timerRef.current){
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const play = ()=>{
    if(playing) return;
    setPlaying(true);
    timerRef.current = setInterval(()=>{
      setIdx((cur)=>{
        if(cur >= Math.max(steps.length - 1, 0)){
          stop();
          return cur;
        }
        return cur + 1;
      });
    }, Math.max(50, speedMs));
  };

  const prev = ()=> setIdx((p)=> Math.max(0, p - 1));
  const next = ()=> setIdx((p)=> Math.min(steps.length - 1, p + 1));
  const reset = ()=>{ stop(); setIdx(0); };

  useEffect(()=>{
    if(playing){
      // restart timer with updated speed
      if(timerRef.current){ clearInterval(timerRef.current); timerRef.current = null; }
      timerRef.current = setInterval(()=>{
        setIdx((cur)=>{
          if(cur >= Math.max(steps.length - 1, 0)){
            stop();
            return cur;
          }
          return cur + 1;
        });
      }, Math.max(50, speedMs));
    }
    return ()=>{ if(timerRef.current){ clearInterval(timerRef.current); timerRef.current=null; } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, speedMs, steps.length]);

  useEffect(()=>{
    // if steps reduce and idx > last, clamp
    if(idx > Math.max(steps.length - 1, 0)) setIdx(Math.max(steps.length - 1, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length]);

  return { idx, setIdx, playing, play, stop, prev, next, reset };
}