export function generateBFSSteps(graph, start){
  const adj = new Map(Object.entries(graph));
  const visited = new Set();
  const queue = [start];
  const steps = [];
  steps.push({ visited:[], queue:[...queue], current:null, label:`Init ${start}` });

  while(queue.length){
    const u = queue.shift();
    if(visited.has(u)) continue;
    visited.add(u);
    steps.push({ visited:Array.from(visited), queue:[...queue], current:u, label:`Visit ${u}` });
    const neighbors = adj.get(u) || [];
    for(const v of neighbors){
      if(!visited.has(v) && !queue.includes(v)){
        queue.push(v);
        steps.push({ visited:Array.from(visited), queue:[...queue], current:u, label:`Enqueue ${v}` });
      }
    }
  }
  steps.push({ visited:Array.from(visited), queue:[], current:null, label:'Done' });
  return steps;
}

export function generateDFSSteps(graph, start){
  const adj = new Map(Object.entries(graph));
  const visited = new Set();
  const steps = [];
  function dfs(u){
    if(visited.has(u)) return;
    visited.add(u);
    steps.push({ visited:Array.from(visited), current:u, label:`Visit ${u}` });
    const neighbors = adj.get(u) || [];
    for(const v of neighbors){
      if(!visited.has(v)) dfs(v);
    }
  }
  dfs(start);
  steps.push({ visited:Array.from(visited), current:null, label:'Done' });
  return steps;
}