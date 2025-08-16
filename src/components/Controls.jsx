import React from "react";

export default function Controls({
  onGenerate,
  // onStart,
  onPrev,
  onNext,
  onReset,
  playing,
  onPlay,
  onPause,
  speed,
  setSpeed,
}) {
  return (
    <div className="controls" style={{ marginBottom: 12 }}>
      <button className="btn" onClick={onGenerate}>
        🎲 Randomize
      </button>
      {/* <button className="btn primary" onClick={onStart}>
        🛠️ Generate Steps
      </button> */}
      <button className="btn" onClick={onPrev} aria-label="prev">
        ⬅️ Prev
      </button>

      <button className="btn" onClick={onPlay} disabled={playing}>
        ▶️ Start
      </button>
      <button className="btn" onClick={onPause} disabled={!playing}>
        ⏸️ Pause
      </button>

      <button className="btn" onClick={onNext} aria-label="next">
        ➡️ Next
      </button>
      <button className="btn" onClick={onReset}>
        🔄 Reset
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginLeft: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label className="small">Speed</label>
          <div className="small">{speed}ms</div>
          <input
            className="range"
            type="range"
            min="50"
            max="1200"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))} style={{ width: "70px" }}
          />
        </div>
        
      </div>
    </div>
  );
}
