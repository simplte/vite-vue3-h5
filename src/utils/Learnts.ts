// extends
// 1：对原始类型的进一步收敛，是比原始类型更精确的类型
export type _t1 = 'bqc' extends string ? true : false;
// 2：字面量类型其实就是继承自原始类型
export class LinbuduLiteralType extends String {
  public value = 'Linbudu';
}
// 3：对于基类和派生类的子类型关系
class Base {
  name!: string;
  he!: string;

  constructor(name: string) {
    this.name = name;
  }
}
class Child extends Base {
  age!: string;
}
type _t2 = Child extends Base ? true : false;
const t2v: _t2 = true;

const cv = new Child('bqc');
console.log(cv);

type _t3 = { name: 'bqc'; he: '11' } extends Base ? true : false;
const t3v: _t3 = true;

type _t4 = { name: 'bqc'; age: '11'; sex: false } extends Base ? true : false;
const t4v: _t4 = true;

type _t5 = { age: '11'; sex: false } extends Base ? true : false;
const t5v: _t5 = false;
/**
 * 以上总结：
 * 只要 判断对象中存在 extends 的所有属性 则为true
 */
type _T6 = {} extends {} ? true : false;
const t6v: _T6 = true;

type _T7 = { age: 1 } extends {} ? true : false;
const t7v: _T7 = true;
type _T8 = string extends {} ? true : false;
const t8v: _T8 = true;

// 分布式条件类型
type Extract<T, U> = T extends U ? T : never;

interface BQC {
  b: string;
  q: string;
  c: string;
}
type B = Extract<keyof BQC, 'q' | 'b'>;
type C = Extract<'d', 'q' | 'b'>; // never
const bv: B = 'b';

// 分布式条件类型要发生的前提条件：

// 首先，你得是联合类型
// 其次，你的联合类型需要是通过泛型参数的形式传入
// 最后，你的泛型参数在条件类型语句中需要是裸类型参数，即没有被 [] 包裹

// 分布式条件类型的应用

// 提取 集合T 中也存在于 集合U 中的类型分支，即 T 与 U 的交集
type ExtractM<T, U> = T extends U ? T : never;
// Exclude，提取 集合T 中不存在于 集合U 中的类型分支，即 T 相对于 U 的差集 T有 U没有
type Exclude<T, U> = T extends U ? never : T;
// 移除集合中的 null 与 undefined
type NonNullable<T> = T extends null | undefined ? never : T;
// 并集
type Concurrence<A, B> = A | B;
// 补集： 满足  B 属于 A  得到 A中有 B没有的部分
type Complement<A, B extends A> = Exclude<A, B>;
