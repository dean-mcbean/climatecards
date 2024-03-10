
export function getRandomItem<T>( {list, numItems}: {list: Array<T>, numItems: number}) {
  let copy = [...list];
  let result = [];
  for (let i = 0; i < numItems; i++) {
    if (copy.length === 0) {
      break;
    }
    const randomIndex = Math.floor(Math.random() * copy.length);
    const item = copy[randomIndex];
    result.push(item);
    copy.splice(randomIndex, 1); // Remove the item from the copy
  }
  return result;
}


export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}