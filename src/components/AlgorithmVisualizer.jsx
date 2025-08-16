import React, { useState } from 'react';
import NavBar from './NavBar.jsx';
import SortingVisualizer from './SortingVisualizer.jsx';
import SearchingVisualizer from './SearchingVisualizer.jsx';
import GraphVisualizer from './GraphVisualizer.jsx';

export default function AlgorithmVisualizer(){
  const [tab, setTab] = useState('sorting');

  return (
    <div>
      <NavBar current={tab} setCurrent={setTab} />
      <div className="card">
        {tab === 'sorting' && <SortingVisualizer />}
        {tab === 'searching' && <SearchingVisualizer />}
        {tab === 'graph' && <GraphVisualizer />}
      </div>
    </div>
  );
}