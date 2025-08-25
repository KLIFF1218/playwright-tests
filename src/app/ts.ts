interface Pair<T, U> {
  first: T;
  second: U;
}

const obj = { first: 'we are', second: 13};
const obj2 = { first: 5, second: 234 };
const pair: Pair<string, number> = obj;
console.log(pair)