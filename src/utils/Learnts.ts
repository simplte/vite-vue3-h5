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
