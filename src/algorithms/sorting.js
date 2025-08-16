function clone(a){ return JSON.parse(JSON.stringify(a)); }

export function generateBubbleSortSteps(input){
  const arr = [...input];
  const n = arr.length;
  const steps = [];
  steps.push({ array: clone(arr), label: 'Init' });

  for(let i=0;i<n-1;i++){
    let swapped = false;
    for(let j=0;j<n-i-1;j++){
      steps.push({ array: clone(arr), comparing:[j,j+1], label:`Compare ${j} & ${j+1}` });
      if(arr[j] > arr[j+1]){
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        swapped = true;
        steps.push({ array: clone(arr), swapping:[j,j+1], label:`Swap ${j} & ${j+1}` });
      }
    }
    steps.push({ array: clone(arr), label:`End pass ${i}` });
    if(!swapped) break;
  }
  steps.push({ array: clone(arr), label:'Sorted' });
  return steps;
}

export function generateMergeSortSteps(input){
  const arr = [...input];
  const steps = [];
  steps.push({ array: JSON.parse(JSON.stringify(arr)), label:'Init' });

  function mergeSort(a, l, r){
    if(l >= r) return;
    const m = Math.floor((l + r)/2);
    mergeSort(a, l, m);
    mergeSort(a, m+1, r);
    const tmp = [];
    let i = l, j = m+1;
    while(i<=m && j<=r){
      if(a[i] <= a[j]) tmp.push(a[i++]);
      else tmp.push(a[j++]);
    }
    while(i<=m) tmp.push(a[i++]);
    while(j<=r) tmp.push(a[j++]);
    for(let k=0;k<tmp.length;k++){
      a[l+k] = tmp[k];
    }
    steps.push({ array: JSON.parse(JSON.stringify(a)), label:`Merged ${l}-${r}` });
  }

  mergeSort(arr, 0, arr.length-1);
  steps.push({ array: JSON.parse(JSON.stringify(arr)), label:'Sorted' });
  return steps;
}