import React from 'react';

export default function NavBar({ current, setCurrent }) {
  return (
    <header style={{ 
      background: '#1e293b',   // nice dark background
      color: 'white',
      padding: '12px 24px',
      marginBottom: 16,
      borderRadius: '0 0 12px 12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    }}>
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Header Title */}
        <h2 style={{ margin: 0 }}>
          Interactive DSA Visualizer
        </h2>

        {/* Nav Buttons */}
        <nav style={{ display: 'flex', gap: 8 }}>
          <button 
            className={`btn ${current==='sorting' ? 'primary' : ''}`} 
            onClick={() => setCurrent('sorting')}
          >
            Sorting
          </button>
          <button 
            className={`btn ${current==='searching' ? 'primary' : ''}`} 
            onClick={() => setCurrent('searching')}
          >
            Searching
          </button>
          <button 
            className={`btn ${current==='graph' ? 'primary' : ''}`} 
            onClick={() => setCurrent('graph')}
          >
            Graph
          </button>
        </nav>
      </div>
    </header>
  );
}
