#21. Iterables and iterators

##21.1 Overview
ES6에서는 iteration이라는 데이터를 탐색하는 새로운 매커니즘이 도입되었다.
이터레이션에 대한 핵심 개념 두 가지는 다음과 같다 :
- 이터러블은 그것의 엘리먼트들을 공개적으로 접근 가능하게끔 하고자 하는 데이터 구조이다(?). [Symbol.iterator] 라는 키를 가진 메서드를 도입함으로써 이를 구현한다. 이 메서드는 이터레이터 공장이다.
> - An iterable is a data structure that wants to make its elements accessible to the public. It does so by implementing a method whose key is Symbol.iterator. That method is a factory for iterators.

- 이터레이터는 데이터구조의 엘리먼트를 탐색하기 위한 포인터이다(데이터베이스의 커서와 유사하다).

타입스크립트 인터페이스 표기법의 표현에 따르면, 이터레이터의 역할은 다음과 같다:
```js
interface Iterable {
    [Symbol.iterator]() : Iterator;
}
interface Iterator {
    next() : IteratorResult;
}
interface IteratorResult {
    value: any;
    done: boolean;
}
```


###21.1.1 Iterable values
다음 데이터값들은 이터러블하다.
Arrays
Strings
Maps
Sets
DOM data structures (작업 진행중)

일반 객체는 이터러블이 아니다.


###21.1.2 이터레이션 지원 구성하기
이터레이션을 통해 데이터에 접근하기 위한 구성 방법은 다음과 같다 :

Destructuring via an Array pattern:
```js
const [a,b] = new Set(['a', 'b', 'c']);
```

for-of loop:
```js
for (const x of ['a', 'b', 'c']) {
    console.log(x);
}
```

Array.from():
```js
const arr = Array.from(new Set(['a', 'b', 'c']));
```

Spread operator (...):
```js
const arr = [...new Set(['a', 'b', 'c'])];
```

Constructors of Maps and Sets:
```js
const map = new Map([[false, 'no'], [true, 'yes']]);
const set = new Set(['a', 'b', 'c']);
```

Promise.all(), Promise.race():
```js
Promise.all(iterableOverPromises).then(···);
Promise.race(iterableOverPromises).then(···);
```

yield*:
```js
  yield* anIterable;
```



##21.2 Iterability (반복가능성)
반복가능성의 개념은 다음과 같다.

- 데이터 소비자 : 자바스크립트는 데이터를 소비하는 언어구성을 가지고 있다.  예를 들어 for-of는 값과 펼침연산자를 순회하며 각 값을 배열에 삽입하거나 함수를 호출한다.
- 데이터 소스 : 데이터 소비자는 다양한 소스들로부터 그들의 값을 얻어올 수 있다. 예를 들어 당신은 배열의 엘리먼트들이나, Map의 key-value 쌍, 문자열의 각 글자들을 이터레이트하길 원할 수 있다.

모든 데이터 소비자에 대해 모든 소스를 지원하는 것은 타당하지 않다. 그렇게 할 경우 새로운 소스를 생성해야 할 가능성이 있어 더욱 그렇다(라이브러리를 활용할 경우처럼). 따라서 ES6는 이터러블 인터페이스를 도입하였다. 데이터 소비자들은 이를 사용하고, 데이터 소스가 그것을 수행하는 것이다.

![](iteration----consumers_sources.jpg)

자바스크립트에는 인터페이스가 없기 때문에, 이터러블은 컨벤션 그 이상의 가치를 지닌다.

소스 : (소위 iterator를 반환하는) [Symbol.iterator] 키를 가지고 있는 값은 이터러블한 것으로 간주된다. iterator는 next()메서드를 통해 값을 반환하는 객체이다. 즉, iterator는 해당 객체 내부의 이터러블한 요소들을 한 번 호출할 때마다 하나씩 순회한다.

소비 : 데이터 소비자는 그들이 소비하고자 하는 값을 얻기 위해 이터레이터를 이용한다.
배열에서 소비가 어떤 식으로 이뤄지는지를 살펴보자. 우선 [Symbol.iterator]키를 가진 메서드를 이용해 이터레이터를 생성하자.
```js
const arr = ['a', 'b', 'c'];
const iter = arr[Symbol.iterator]();
```

다음으로 배열 내부의 아이템들을 얻기 위해 이터레이터의 next()메서드를 반복적으로 호출하자.
```js
iter.next()  // { value: 'a', done: false }
iter.next()  // { value: 'b', done: false }
iter.next()  // { value: 'c', done: false }
iter.next()  // { value: undefined, done: true }
```

위와 같이 next()는 객체 내부의 각각의 아이템들에 대해 'value' 프로퍼티에 해당 아이템의 값이 할당된 객체를 반환한다. 'done' 프로퍼티는 아이템들의 끝지점에 도달하면 true를, 그렇지 않은 경우 false를 나타내는 불린값이다.

이터러블과 이터레이터는 이터레이션을 위한 '프로토콜'(인터페이스 및 규칙)의 일부이다. 프로토콜의 핵심 성격 중 하나는, 바로 순차적이라는 것이다. 이터레이터는 값들을 한 번에 하나씩 반환한다. 즉, 선형구조로 이루어져있지 않은 데이터구조라 하더라도 일단 이터러블하기만 하면, 이터레이션을 거치면 선형구조로 전환됨을 의미한다.


##21.3 Iterable data sources
본 절에서는 다양한 종류의 이터러블한 데이터에 대해 이터레이트하기 위해 `for-of loop`를 이용하겠다.


##21.3.1 Arrays
배열 및 형지정 배열은 그 요소들에 대해 이터러블하다.
```js
for (const x of ['a', 'b']) {
    console.log(x);
}
// Output:
// 'a'
// 'b'
```

###21.3.2 Strings
문자열은 이터러블하다. 단, Unicode는 코드포인트에 대해서만 이터레이트한다.
```js
for (const x of 'a\uD83D\uDC0A') {
    console.log(x);
}
// Output:
// 'a'
// '\uD83D\uDC0A' (crocodile emoji)
```
기본 데이터타입의 값 역시 이터러블이 될 수 있음을 확인했다. 즉, 값이 이터러블하기 위해 반드시 객체여야 하는 것은 아니다. (문자열의 경우) 이터레이터 메서드([Symbol.iterator])가 호출되기 직전에 값들이 객체로 자동 전환되기 때문이다.


###21.3.3 Maps
맵은 내부의 엔트리들에 대해 이터러블하다. 각 엔트리는 [key, value]의 두 요소를 지닌 배열로 구성되어 있다. 엔트리들은 언제나 맵에 추가된 순서에 따라 이터레이트된다.
```js
const map = new Map().set('a', 1).set('b', 2);
for (const pair of map) {
    console.log(pair);
}
// Output:
// ['a', 1]
// ['b', 2]
```

> 주의 : 위크맵은 이터러블하지 않다.

###21.3.4 Sets
셋은 내부 요소들에 대해 이터러블하다. 셋의 요소들은 셋에 추가된 순서에 따라 이터레이트된다.
```js
const set = new Set().add('a').add('b');
for (const x of set) {
    console.log(x);
}
// Output:
// 'a'
// 'b'
```

> 주의 : 위크셋은 이터러블하지 않다.

###21.3.5 arguments
특별한 변수인 arguments는 (비록 ES6의 rest parameter 덕분에 더이상 쓸모없게 되었긴 하지만) 이터러블하다.
```js
function printArgs() {
    for (const x of arguments) {
        console.log(x);
    }
}
printArgs('a', 'b');

// Output:
// 'a'
// 'b'
```


###21.3.6 DOM 자료구조
대부분의 DOM 자료구조는 언젠가는 결국 이터러블하게 될 것이다.
```js
for (const node of document.querySelectorAll('div')) {
    ···
}
```
이러한 기능에 대한 도입 작업이 진행중이다. 그러나 이 작업은 Symbol.iterator 심볼이 이미 존재하는 프로퍼티 키와 충돌할 수 없기 때문에, 직접 구현하는 것도 상대적으로 쉬운 편이다.

###21.3.7 Iterable computed data
모든 이터러블한 컨텐츠가 이미 갖춰져 있는 자료구조에서 비롯되어야 하는 것은 아니며, 연산에 의해 반환된 데이터 역시 이터러블하다. 예를 들어 ES6의 자료구조인 Array, Typed Array, Map, Set은 모두 이터러블 객체를 반환하는 세 개의 메서드를 보유하고 있다.
- entries() : [key, value] 배열로 구성된 요소들의 이터러블 객체를 반환한다. 배열의 경우 반환되는 객체의 각 키와 값은 Set의 요소들과 동일하다.
- keys() : entries의 키들로 이루어진 이터러블 객체를 반환한다.
- values() : entries의 값들로 이루어진 이터러블 객체를 반환한다.

예제를 통해 살펴보자. entries()는 배열 요소와 그들의 인덱스를 얻을 수 있는 훌륭한 방법을 제공한다.
```js
const arr = ['a', 'b', 'c'];
for (const pair of arr.entries()) {
    console.log(pair);
}
// Output:
// [0, 'a']
// [1, 'b']
// [2, 'c']
```

###21.3.8 평범한 객체는 이터러블하지 않다.
객체 리터럴에 의해 생성된 일반적인 객체는 이터러블하지 않다.
```js
for (const x of {}) { // TypeError
    console.log(x);
}
```

어째서 객체는 프로퍼티들에 대해 기본적으로 이터러블하지 않을까? 그 이유는 다음과 같다. 자바스크립트에서 이터레이트할 수 있는 경우는 다음 두 가지 수준으로 나뉘어진다.
프로그램 수준 : 프로퍼티에 대해 이터레이트한다는 말은 곧 프로그램 구조의 조사를 의미한다.
자료 수준 : 자료구조에 대해 이터레이트한다는 말은 곧 프로그램의 관리하에 있는 자료의 조사를 의미한다.
프로퍼티들에 대해 기본적으로 이터레이트할 수 있게 한다는 것은 즉 위 두 가지 수준을 섞는 것을 의미하고, 이는 다음과 같은 두 가지 불이익을 야기할 수 있다.
(Making iteration over properties the default would mean mixing those levels, which would have two disadvantages:)

You can’t iterate over the properties of data structures.
Once you iterate over the properties of an object, turning that object into a data structure would break your code.
If engines were to implement iterability via a method Object.prototype[Symbol.iterator]() then there would be an additional caveat: Objects created via Object.create(null) wouldn’t be iterable, because Object.prototype is not in their prototype chain.

It is important to remember that iterating over the properties of an object is mainly interesting if you use objects as Maps1. But we only do that in ES5 because we have no better alternative. In ECMAScript 6, we have the built-in data structure Map.

####21.3.8.1 How to iterate over properties
The proper (and safe) way to iterate over properties is via a tool function. For example, via objectEntries(), whose implementation is shown later (future ECMAScript versions may have something similar built in):

const obj = { first: 'Jane', last: 'Doe' };

for (const [key,value] of objectEntries(obj)) {
    console.log(`${key}: ${value}`);
}

// Output:
// first: Jane
// last: Doe

##21.4 Iterating language constructs
The following ES6 language constructs make use of the iteration protocol:

Destructuring via an Array pattern
for-of loop
Array.from()
Spread operator (...)
Constructors of Maps and Sets
Promise.all(), Promise.race()
yield*
The next sections describe each one of them in detail.

###21.4.1 Destructuring via an Array pattern
Destructuring via Array patterns works for any iterable:

const set = new Set().add('a').add('b').add('c');

const [x,y] = set;
    // x='a'; y='b'

const [first, ...rest] = set;
    // first='a'; rest=['b','c'];
###21.4.2 The for-of loop
for-of is a new loop in ECMAScript 6. It’s basic form looks like this:

for (const x of iterable) {
    ···
}
For more information, consult Chap. “The for-of loop”.

Note that the iterability of iterable is required, otherwise for-of can’t loop over a value. That means that non-iterable values must be converted to something iterable. For example, via Array.from().

###21.4.3 Array.from()
Array.from() converts iterable and Array-like values to Arrays. It is also available for typed Arrays.

> Array.from(new Map().set(false, 'no').set(true, 'yes'))
[[false,'no'], [true,'yes']]
> Array.from({ length: 2, 0: 'hello', 1: 'world' })
['hello', 'world']
For more information on Array.from(), consult the chapter on Arrays.

###21.4.4 The spread operator (...)
The spread operator inserts the values of an iterable into an Array:

> const arr = ['b', 'c'];
> ['a', ...arr, 'd']
['a', 'b', 'c', 'd']
That means that it provides you with a compact way to convert any iterable to an Array:

const arr = [...iterable];
The spread operator also turns an iterable into the arguments of a function, method or constructor call:

> Math.max(...[-1, 8, 3])
8

###21.4.5 Maps and Sets
The constructor of a Map turns an iterable over [key, value] pairs into a Map:

> const map = new Map([['uno', 'one'], ['dos', 'two']]);
> map.get('uno')
'one'
> map.get('dos')
'two'
The constructor of a Set turns an iterable over elements into a Set:

> const set = new Set(['red', 'green', 'blue']);
> set.has('red')
true
> set.has('yellow')
false
The constructors of WeakMap and WeakSet work similarly. Furthermore, Maps and Sets are iterable themselves (WeakMaps and WeakSets aren’t), which means that you can use their constructors to clone them.

###21.4.6 Promises
Promise.all() and Promise.race() accept iterables over Promises:

Promise.all(iterableOverPromises).then(···);
Promise.race(iterableOverPromises).then(···);

###21.4.7 yield*
yield* is an operator that is only available inside generators. It yields all items iterated over by an iterable.

function* yieldAllValuesOf(iterable) {
    yield* iterable;
}
The most important use case for yield* is to recursively call a generator (which produces something iterable).

##21.5 Implementing iterables
In this section, I explain in detail how to implement iterables. Note that ES6 generators are usually much more convenient for this task than doing so “manually”.

The iteration protocol looks as follows.

![](iteration----iteration_protocol.jpg)

An object becomes iterable (“implements” the interface Iterable) if it has a method (own or inherited) whose key is Symbol.iterator. That method must return an iterator, an object that iterates over the items “inside” the iterable via its method next().

In TypeScript notation, the interfaces for iterables and iterators look as follows2.

interface Iterable {
    [Symbol.iterator]() : Iterator;
}
interface Iterator {
    next() : IteratorResult;
    return?(value? : any) : IteratorResult;
}
interface IteratorResult {
    value: any;
    done: boolean;
}
return() is an optional method that we’ll get to later3. Let’s first implement a dummy iterable to get a feeling for how iteration works.

const iterable = {
    [Symbol.iterator]() {
        let step = 0;
        const iterator = {
            next() {
                if (step <= 2) {
                    step++;
                }
                switch (step) {
                    case 1:
                        return { value: 'hello', done: false };
                    case 2:
                        return { value: 'world', done: false };
                    default:
                        return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
};
Let’s check that iterable is, in fact, iterable:

for (const x of iterable) {
    console.log(x);
}
// Output:
// hello
// world
The code executes three steps, with the counter step ensuring that everything happens in the right order. First, we return the value 'hello', then the value 'world' and then we indicate that the end of the iteration has been reached. Each item is wrapped in an object with the properties:

value which holds the actual item and
done which is a boolean flag that indicates whether the end has been reached, yet.
You can omit done if it is false and value if it is undefined. That is, the switch statement could be written as follows.

switch (step) {
    case 1:
        return { value: 'hello' };
    case 2:
        return { value: 'world' };
    default:
        return { done: true };
}
As is explained in the the chapter on generators, there are cases where you want even the last item with done: true to have a value. Otherwise, next() could be simpler and return items directly (without wrapping them in objects). The end of iteration would then be indicated via a special value (e.g., a symbol).

Let’s look at one more implementation of an iterable. The function iterateOver() returns an iterable over the arguments that are passed to it:

function iterateOver(...args) {
    let index = 0;
    const iterable = {
        [Symbol.iterator]() {
            const iterator = {
                next() {
                    if (index < args.length) {
                        return { value: args[index++] };
                    } else {
                        return { done: true };
                    }
                }
            };
            return iterator;
        }
    }
    return iterable;
}

// Using `iterateOver()`:
for (const x of iterateOver('fee', 'fi', 'fo', 'fum')) {
    console.log(x);
}

// Output:
// fee
// fi
// fo
// fum

###21.5.1 Iterators that are iterable
The previous function can be simplified if the iterable and the iterator are the same object:

function iterateOver(...args) {
    let index = 0;
    const iterable = {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (index < args.length) {
                return { value: args[index++] };
            } else {
                return { done: true };
            }
        },
    };
    return iterable;
}
Even if the original iterable and the iterator are not the same object, it is still occasionally useful if an iterator has the following method (which also makes it an iterable):

[Symbol.iterator]() {
    return this;
}
All built-in ES6 iterators follow this pattern (via a common prototype, see the chapter on generators). For example, the default iterator for Arrays:

> const arr = [];
> const iterator = arr[Symbol.iterator]();
> iterator[Symbol.iterator]() === iterator
true
Why is it useful if an iterator is also an iterable? for-of only works for iterables, not for iterators. Because Array iterators are iterable, you can continue an iteration in another loop:

const arr = ['a', 'b'];
const iterator = arr[Symbol.iterator]();

for (const x of iterator) {
    console.log(x); // a
    break;
}

// Continue with same iterator:
for (const x of iterator) {
    console.log(x); // b
}
One use case for continuing an iteration is that you can remove initial items (e.g. a header) before processing the actual content via for-of.

###21.5.2 Optional iterator methods: return() and throw()
Two iterator methods are optional:

return() gives an iterator the opportunity to clean up if an iteration ends prematurely.
throw() is about forwarding a method call to a generator that is iterated over via yield*. It is explained in the chapter on generators.

####21.5.2.1 Closing iterators via return()
As mentioned before, the optional iterator method return() is about letting an iterator clean up if it wasn’t iterated over until the end. It closes an iterator. In for-of loops, premature (or abrupt, in spec language) termination can be caused by:

break
continue (if you continue an outer loop, continue acts like a break)
throw
return
In each of these cases, for-of lets the iterator know that the loop won’t finish. Let’s look at an example, a function readLinesSync that returns an iterable of text lines in a file and would like to close that file no matter what happens:

function readLinesSync(fileName) {
    const file = ···;
    return {
        ···
        next() {
            if (file.isAtEndOfFile()) {
                file.close();
                return { done: true };
            }
            ···
        },
        return() {
            file.close();
            return { done: true };
        },
    };
}
Due to return(), the file will be properly closed in the following loop:

// Only print first line
for (const line of readLinesSync(fileName)) {
    console.log(x);
    break;
}
The return() method must return an object. That is due to how generators handle the return statement and will be explained in the chapter on generators.

The following constructs close iterators that aren’t completely “drained”:

for-of
yield*
Destructuring
Array.from()
Map(), Set(), WeakMap(), WeakSet()
Promise.all(), Promise.race()
A later section has more information on closing iterators.

##21.6 More examples of iterables
In this section, we look at a few more examples of iterables. Most of these iterables are easier to implement via generators. The chapter on generators shows how.

##21.6.1 Tool functions that return iterables
Tool functions and methods that return iterables are just as important as iterable data structures. The following is a tool function for iterating over the own properties of an object.

function objectEntries(obj) {
    let index = 0;

    // In ES6, you can use strings or symbols as property keys,
    // Reflect.ownKeys() retrieves both
    const propKeys = Reflect.ownKeys(obj);

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (index < propKeys.length) {
                const key = propKeys[index];
                index++;
                return { value: [key, obj[key]] };
            } else {
                return { done: true };
            }
        }
    };
}

const obj = { first: 'Jane', last: 'Doe' };
for (const [key,value] of objectEntries(obj)) {
    console.log(`${key}: ${value}`);
}

// Output:
// first: Jane
// last: Doe
Another option is to use an iterator instead of an index to traverse the Array with the property keys:

function objectEntries(obj) {
    let iter = Reflect.ownKeys(obj)[Symbol.iterator]();

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            let { done, value: key } = iter.next();
            if (done) {
                return { done: true };
            }
            return { value: [key, obj[key]] };
        }
    };
}

###21.6.2 Combinators for iterables
Combinators4 are functions that combine existing iterables to create new ones.

####21.6.2.1 take(n, iterable)
Let’s start with the combinator function take(n, iterable), which returns an iterable over the first n items of iterable.

function take(n, iterable) {
    const iter = iterable[Symbol.iterator]();
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (n > 0) {
                n--;
                return iter.next();
            } else {
                return { done: true };
            }
        }
    };
}
const arr = ['a', 'b', 'c', 'd'];
for (const x of take(2, arr)) {
    console.log(x);
}
// Output:
// a
// b
This version of take() doesn’t close the iterator iter. How to do that is shown later, after I explain what closing an iterator actually means.

####21.6.2.2 zip(...iterables)
zip turns n iterables into an iterable of n-tuples (encoded as Arrays of length n).

function zip(...iterables) {
    const iterators = iterables.map(i => i[Symbol.iterator]());
    let done = false;
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (!done) {
                const items = iterators.map(i => i.next());
                done = items.some(item => item.done);
                if (!done) {
                    return { value: items.map(i => i.value) };
                }
                // Done for the first time: close all iterators
                for (const iterator of iterators) {
                    if (typeof iterator.return === 'function') {
                        iterator.return();
                    }
                }
            }
            // We are done
            return { done: true };
        }
    }
}
As you can see, the shortest iterable determines the length of the result:

const zipped = zip(['a', 'b', 'c'], ['d', 'e', 'f', 'g']);
for (const x of zipped) {
    console.log(x);
}
// Output:
// ['a', 'd']
// ['b', 'e']
// ['c', 'f']


###21.6.3 Infinite iterables
Some iterable may never be done.

function naturalNumbers() {
    let n = 0;
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            return { value: n++ };
        }
    }
}
With an infinite iterable, you must not iterate over “all” of it. For example, by breaking from a for-of loop:

for (const x of naturalNumbers()) {
    if (x > 2) break;
    console.log(x);
}
Or by only accessing the beginning of an infinite iterable:

const [a, b, c] = naturalNumbers();
    // a=0; b=1; c=2;
Or by using a combinator. take() is one possibility:

for (const x of take(3, naturalNumbers())) {
    console.log(x);
}
// Output:
// 0
// 1
// 2
The “length” of the iterable returned by zip() is determined by its shortest input iterable. That means that zip() and naturalNumbers() provide you with the means to number iterables of arbitrary (finite) length:

const zipped = zip(['a', 'b', 'c'], naturalNumbers());
for (const x of zipped) {
    console.log(x);
}
// Output:
// ['a', 0]
// ['b', 1]
// ['c', 2]


##21.7 FAQ: iterables and iterators
###21.7.1 Isn’t the iteration protocol slow?
You may be worried about the iteration protocol being slow, because a new object is created for each invocation of next(). However, memory management for small objects is fast in modern engines and in the long run, engines can optimize iteration so that no intermediate objects need to be allocated. A thread on es-discuss has more information.

###21.7.2 Can I reuse the same object several times?
In principle, nothing prevents an iterator from reusing the same iteration result object several times – I’d expect most things to work well. However, there will be problems if a client caches iteration results:

const iterationResults = [];
const iterator = iterable[Symbol.iterator]();
let iterationResult;
while (!(iterationResult = iterator.next()).done) {
    iterationResults.push(iterationResult);
}
If an iterator reuses its iteration result object, iterationResults will, in general, contain the same object multiple times.

###21.7.3 Why doesn’t ECMAScript 6 have iterable combinators?
You may be wondering why ECMAScript 6 does not have iterable combinators, tools for working with iterables or for creating iterables. That is because the plans are to proceed in two steps:

Step 1: standardize an iteration protocol.
Step 2: wait for libraries based on that protocol.
Eventually, one such library or pieces from several libraries will be added to the JavaScript standard library.

If you want to get an impression of what such a library could look like, take a look at the standard Python module itertools.

###21.7.4 Aren’t iterables difficult to implement?
Yes, iterables are difficult to implement – if you implement them manually. The next chapter will introduce generators that help with this task (among other things).

##21.8 The ECMAScript 6 iteration protocol in depth
The iteration protocol comprises the following interfaces (I have omitted throw() from Iterator, which is only supported by yield* and optional there):

interface Iterable {
    [Symbol.iterator]() : Iterator;
}
interface Iterator {
    next() : IteratorResult;
    return?(value? : any) : IteratorResult;
}
interface IteratorResult {
    value : any;
    done : boolean;
}
The spec has a section on the iteration protocol.

###21.8.1 Iteration
Rules for next():

As long as the iterator still has values x to produce, next() returns objects { value: x, done: false }.
After the last value was iterated over, next() should always return an object whose property done is true.

####21.8.1.1 The IteratorResult
The property done of an iterator result doesn’t have to be true or false, truthy or falsy is enough. All built-in language mechanisms let you omit done: false.

####21.8.1.2 Iterables that return fresh iterators versus those that always return the same iterator
Some iterables produce a new iterator each time they are asked for one. For example, Arrays:

function getIterator(iterable) {
    return iterable[Symbol.iterator]();
}

const iterable = ['a', 'b'];
console.log(getIterator(iterable) === getIterator(iterable)); // false
Other iterables return the same iterator each time. For example, generator objects:

function* elements() {
    yield 'a';
    yield 'b';
}
const iterable = elements();
console.log(getIterator(iterable) === getIterator(iterable)); // true
Whether an iterable produces a fresh iterators or not matter when you iterate over the same iterable multiple times. For example, via the following function:

function iterateTwice(iterable) {
    for (const x of iterable) {
        console.log(x);
    }
    for (const x of iterable) {
        console.log(x);
    }
}
With fresh iterators, you can iterate over the same iterable multiple times:

iterateTwice(['a', 'b']);
// Output:
// a
// b
// a
// b
If the same iterator is returned each time, you can’t:

iterateTwice(elements());
// Output:
// a
// b
Note that each iterator in the standard library is also an iterable. Its method [Symbol.iterator]() return this, meaning that it always returns the same iterator (itself).

###21.8.2 Closing iterators
The iteration protocol distinguishes two ways of finishing an iterator:

Exhaustion: the regular way of finishing an iterator is by retrieving all of its values. That is, one calls next() until it returns an object whose property done is true.
Closing: by calling return(), you tell the iterator that you don’t intend to call next(), anymore.
Rules for calling return():

return() is an optional method, not all iterators have it. Iterators that do have it are called closable.
return() should only be called if an iterator hasn’t be exhausted. For example, for-of calls return() whenever it is left “abruptly” (before it is finished). The following operations cause abrupt exits: break, continue (with a label of an outer block), return, throw.
Rules for implementing return():

The method call return(x) should normally produce the object { done: true, value: x }, but language mechanisms only throw an error (source in spec) if the result isn’t an object.
After return() was called, the objects returned by next() should be done, too.
The following code illustrates that the for-of loop calls return() if it is aborted before it receives a done iterator result. That is, return() is even called if you abort after receiving the last value. This is subtle and you have to be careful to get it right when you iterate manually or implement iterators.

function createIterable() {
    let done = false;
    const iterable = {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (!done) {
                done = true;
                return { done: false, value: 'a' };
            } else {
                return { done: true, value: undefined };
            }
        },
        return() {
            console.log('return() was called!');
        },
    };
    return iterable;
}
for (const x of createIterable()) {
    console.log(x);
    // There is only one value in the iterable and
    // we abort the loop after receiving it
    break;
}
// Output:
// a
// return() was called!

####21.8.2.1 Closable iterators
An iterator is closable if it has a method return(). Not all iterators are closable. For example, Array iterators are not:

> let iterable = ['a', 'b', 'c'];
> const iterator = iterable[Symbol.iterator]();
> 'return' in iterator
false
Generator objects are closable by default. For example, the ones returned by the following generator function:

function* elements() {
    yield 'a';
    yield 'b';
    yield 'c';
}
If you invoke return() on the result of elements(), iteration is finished:

> const iterator = elements();
> iterator.next()
{ value: 'a', done: false }
> iterator.return()
{ value: undefined, done: true }
> iterator.next()
{ value: undefined, done: true }
If an iterator is not closable, you can continue iterating over it after an abrupt exit (such as the one in line A) from a for-of loop:

function twoLoops(iterator) {
    for (const x of iterator) {
        console.log(x);
        break; // (A)
    }
    for (const x of iterator) {
        console.log(x);
    }
}
function getIterator(iterable) {
    return iterable[Symbol.iterator]();
}

twoLoops(getIterator(['a', 'b', 'c']));
// Output:
// a
// b
// c
Conversely, elements() returns a closable iterator and the second loop inside twoLoops() doesn’t have anything to iterate over:

twoLoops(elements());
// Output:
// a


####21.8.2.2 Preventing iterators from being closed
The following class is a generic solution for preventing iterators from being closed. It does so by wrapping the iterator and forwarding all method calls except return().

class PreventReturn {
    constructor(iterator) {
        this.iterator = iterator;
    }
    /** Must also be iterable, so that for-of works */
    [Symbol.iterator]() {
        return this;
    }
    next() {
        return this.iterator.next();
    }
    return(value = undefined) {
        return { done: false, value };
    }
    // Not relevant for iterators: `throw()`
}
If we use PreventReturn, the result of the generator elements() won’t be closed after the abrupt exit in the first loop of twoLoops().

function* elements() {
    yield 'a';
    yield 'b';
    yield 'c';
}
function twoLoops(iterator) {
    for (const x of iterator) {
        console.log(x);
        break; // abrupt exit
    }
    for (const x of iterator) {
        console.log(x);
    }
}
twoLoops(elements());
// Output:
// a

twoLoops(new PreventReturn(elements()));
// Output:
// a
// b
// c
There is another way of making generators unclosable: All generator objects produced by the generator function elements() have the prototype object elements.prototype. Via elements.prototype, you can hide the default implementation of return() (which resides in a prototype of elements.prototype) as follows:

// Make generator object unclosable
// Warning: may not work in transpilers
elements.prototype.return = undefined;

twoLoops(elements());
// Output:
// a
// b
// c


####21.8.2.3 Handling clean-up in generators via try-finally
Some generators need to clean up (release allocated resources, close open files, etc.) after iteration over them is finished. Naively, this is how we’d implement it:

function* genFunc() {
    yield 'a';
    yield 'b';

    console.log('Performing cleanup');
}
In a normal for-of loop, everything is fine:

for (const x of genFunc()) {
    console.log(x);
}
// Output:
// a
// b
// Performing cleanup
However, if you exit the loop after the first yield, execution seemingly pauses there forever and never reaches the cleanup step:

for (const x of genFunc()) {
    console.log(x);
    break;
}
// Output:
// a
What actually happens is that, whenever one leaves a for-of loop early, for-of sends a return() to the current iterator. That means that the cleanup step isn’t reached because the generator function returns beforehand.

Thankfully, this is easily fixed, by performing the cleanup in a finally clause:

function* genFunc() {
    try {
        yield 'a';
        yield 'b';
    } finally {
        console.log('Performing cleanup');
    }
}
Now everything works as desired:

for (const x of genFunc()) {
    console.log(x);
    break;
}
// Output:
// a
// Performing cleanup
The general pattern for using resources that need to be closed or cleaned up in some manner is therefore:

function* funcThatUsesResource() {
    const resource = allocateResource();
    try {
        ···
    } finally {
        resource.deallocate();
    }
}


####21.8.2.4 Handling clean-up in manually implemented iterators
const iterable = {
    [Symbol.iterator]() {
        function hasNextValue() { ··· }
        function getNextValue() { ··· }
        function cleanUp() { ··· }
        let returnedDoneResult = false;
        return {
            next() {
                if (hasNextValue()) {
                    const value = getNextValue();
                    return { done: false, value: value };
                } else {
                    if (!returnedDoneResult) {
                        // Client receives first `done` iterator result
                        // => won’t call `return()`
                        cleanUp();
                        returnedDoneResult = true;
                    }
                    return { done: true, value: undefined };
                }
            },
            return() {
                cleanUp();
            }
        };
    }
}
Note that you must call cleanUp() when you are going to return a done iterator result for the first time. You must not do it earlier, because then return() may still be called. This can be tricky to get right.

####21.8.2.5 Closing iterators you use
If you use iterators, you should close them properly. In generators, you can let for-of do all the work for you:

/**
 * Converts a (potentially infinite) sequence of
 * iterated values into a sequence of length `n`
 */
function* take(n, iterable) {
    for (const x of iterable) {
        if (n <= 0) {
            break; // closes iterable
        }
        n--;
        yield x;
    }
}
If you manage things manually, more work is required:

function* take(n, iterable) {
    const iterator = iterable[Symbol.iterator]();
    while (true) {
        const {value, done} = iterator.next();
        if (done) break; // exhausted
        if (n <= 0) {
            // Abrupt exit
            maybeCloseIterator(iterator);
            break;
        }
        yield value;
        n--;
    }
}
function maybeCloseIterator(iterator) {
    if (typeof iterator.return === 'function') {
        iterator.return();
    }
}
Even more work is necessary if you don’t use generators:

function take(n, iterable) {
    const iter = iterable[Symbol.iterator]();
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (n > 0) {
                n--;
                return iter.next();
            } else {
                maybeCloseIterator(iter);
                return { done: true };
            }
        },
        return() {
            n = 0;
            maybeCloseIterator(iter);
        }
    };
}

###21.8.3 Checklist
Documenting an iterable: provide the following information.
Does it return fresh iterators or the same iterator each time?
Are its iterators closable?
Implementing an iterator:
Clean-up activity must happen if either an iterator is exhausted or if return() is called.
In generators, try-finally lets you handle both in a single location.
After an iterator was closed via return(), it should not produce any more iterator results via next().
Using an iterator manually (versus via for-of etc.):
Don’t forget to close the iterator via return, if – and only if – you don’t exhaust it. Getting this right can be tricky.
Continuing to iterate over an iterator after an abrupt exit: The iterator must either be unclosable or made unclosable (e.g. via a tool class).







Footnotes:
--------------------------------
1. [Speaking JS] “Pitfalls: Using an Object as a Map”↩
2. Based on “Closing iterators”, slides by David Herman.↩
3. throw() is also an optional method, but is practically never used for iterators and therefore explained in the chapter on generators)↩
4. “Combinator” (in HaskellWiki) describes what combinators are.↩
