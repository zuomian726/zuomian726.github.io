# TypeScript 语法手册

## 目录

1. [TypeScript 简介](#typescript-简介)
2. [基础类型](#基础类型)
3. [变量声明](#变量声明)
4. [接口](#接口)
5. [类](#类)
6. [函数](#函数)
7. [泛型](#泛型)
8. [枚举](#枚举)
9. [高级类型](#高级类型)
10. [装饰器](#装饰器)
11. [最佳实践](#最佳实践)
12. [常见问题解答](#常见问题解答)

## TypeScript 简介

### 什么是 TypeScript

TypeScript 是 JavaScript 的超集，它添加了可选的静态类型和基于类的面向对象编程。

### TypeScript 的优势

- **类型安全**：在编译时捕获错误
- **更好的IDE支持**：智能提示和重构功能
- **面向对象特性**：支持类、接口、模块等
- **ES6+特性**：支持最新的 JavaScript 特性
- **大型项目友好**：更容易维护和重构

## 基础类型

### 布尔值

```typescript
let isDone: boolean = false;
```

### 数字

```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

### 字符串

```typescript
let color: string = "blue";
color = 'red';

// 模板字符串
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.
I'll be ${age + 1} years old next month.`;
```

### 数组

```typescript
let list: number[] = [1, 2, 3];
// 或使用泛型
let list: Array<number> = [1, 2, 3];
```

### 元组

```typescript
let x: [string, number];
x = ["hello", 10]; // OK
x = [10, "hello"]; // Error
```

### 枚举

```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

### Any

```typescript
let notSure: any = 4;
notSure = "maybe a string";
notSure = false;
```

### Void

```typescript
function warnUser(): void {
    console.log("This is my warning message");
}
```

### Null 和 Undefined

```typescript
let u: undefined = undefined;
let n: null = null;
```

### Never

```typescript
function error(message: string): never {
    throw new Error(message);
}
```

## 变量声明

### var 声明

```typescript
var a = 10;
```

### let 声明

```typescript
let hello = "Hello!";
```

### const 声明

```typescript
const numLivesForCat = 9;
```

### 解构

```typescript
let [first, second] = [1, 2];
let {a, b} = {a: "baz", b: 101};
```

## 接口

### 基本接口

```typescript
interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}
```

### 可选属性

```typescript
interface SquareConfig {
    color?: string;
    width?: number;
}
```

### 只读属性

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}
```

## 类

### 基本示例

```typescript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

### 继承

```typescript
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}
```

### 修饰符

```typescript
class Animal {
    private name: string;
    protected age: number;
    public color: string;
}
```

## 函数

### 函数类型

```typescript
function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y; };
```

### 可选参数和默认参数

```typescript
function buildName(firstName: string, lastName?: string) {
    // ...
}

function buildName(firstName: string, lastName = "Smith") {
    // ...
}
```

### 剩余参数

```typescript
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
```

## 泛型

### 基本示例

```typescript
function identity<T>(arg: T): T {
    return arg;
}
```

### 泛型接口

```typescript
interface GenericIdentityFn<T> {
    (arg: T): T;
}
```

### 泛型类

```typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
```

## 装饰器

### 类装饰器

```typescript
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

## 最佳实践

### 类型断言

```typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
// 或
let strLength: number = (someValue as string).length;
```

### 类型守卫

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}
```

### 类型别名

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
```

## 常见问题解答

### TypeScript 和 JavaScript 的区别是什么？

TypeScript 是 JavaScript 的超集，主要区别在于：
- TypeScript 支持静态类型
- TypeScript 支持面向对象编程的特性
- TypeScript 需要编译成 JavaScript

### 如何在项目中引入 TypeScript？

1. 安装 TypeScript：
```bash
npm install -g typescript
```

2. 初始化 TypeScript 配置：
```bash
tsc --init
```

3. 编译 TypeScript 文件：
```bash
tsc filename.ts
```

### 什么时候使用接口（Interface）和类型别名（Type Alias）？

- 接口：当你需要定义对象的结构，特别是在面向对象编程中
- 类型别名：当你需要为类型创建别名，或定义联合类型、交叉类型等