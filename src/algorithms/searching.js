export function generateBinarySearchSteps(arrInput, target){
  const arr = [...arrInput];
  const steps = [];
  let left = 0, right = arr.length - 1;
  steps.push({ array: [...arr], left, right, mid:-1, target, status:'init' });
  while(left <= right){
    const mid = Math.floor((left + right)/2);
    const val = arr[mid];
    steps.push({ array:[...arr], left, right, mid, target, status:'compare' });
    if(val === target){
      steps.push({ array:[...arr], left, right, mid, target, status:'found', foundIndex:mid });
      return steps;
    } else if(val < target){
      left = mid + 1;
      steps.push({ array:[...arr], left, right, mid, target, status:'moveRight' });
    } else {
      right = mid - 1;
      steps.push({ array:[...arr], left, right, mid, target, status:'moveLeft' });
    }
  }
  steps.push({ array:[...arr], left, right, mid:-1, target, status:'notfound' });
  return steps;
}

export function generateLinearSearchSteps(arr,target){
  const steps = [];
  for(let i=0;i<arr.length;i++){
    steps.push({ array:[...arr], probe:i, target, status:'probe' });
    if(arr[i]===target){
      steps.push({ array:[...arr], probe:i, target, status:'found' });
      return steps;
    }
  }
  steps.push({ array:[...arr], probe:-1, target, status:'notfound' });
  return steps;
}