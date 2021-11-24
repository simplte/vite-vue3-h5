// 获取元祖的长度
export type Length<T extends readonly any[]> = T['length'];
type YZ = [string, number, number];

const count: Length<YZ> = 3;

// 实现exclude
export type MineExclude<T, U> = T extends U ? never : T;
interface Person {
  name: string;
  age: number;
  gender: string;
}
interface Women {
  name: string;
}
type Men = MineExclude<keyof Person, 'name'>;
const menVal: Men = 'age';
console.log(menVal);

// 实现includes
type Includes<T extends any[], U> = T extends [infer K, ...infer Rest]
  ? [K, U] extends [U, K]
    ? true // extends can't compare readonly property and normal
    : Includes<Rest, U>
  : false;

type c = 'a' | 10 extends 'a' | 'b' | 'c' ? true : false;
