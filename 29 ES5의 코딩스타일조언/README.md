29. Coding style tips for ECMAScript 6

This chapter lists a few ideas related to ES6 coding style:

var versus let versus const (details are explained in the chapter on variables):
Prefer const. You can use it for all variables whose values never change.
Otherwise, use let – for variables whose values do change.
Avoid var.
An arrow function is the superior solution whenever a function fits into a single line:
  readFilePromisified(filename)
  .then(text => console.log(text))
For multi-line functions, traditional functions work well, too (with the caveat of this not being lexical):

  readFilePromisified(filename)
  .then(function (text) {
      const obj = JSON.parse(text);
      console.log(JSON.stringify(obj, null, 4));
  });
Single-line functions tend to be throw-away. If a function isn’t then a traditional function has the advantage that you can name it, which is useful for documentation and debugging.

Properties in object literals: As soon as an object literal spans multiple lines, I add a comma after the last entry. Such a trailing comma has been legal since ES5. It makes adding, removing and rearranging entries simpler. As a consequence, method definitions always end with },:
  const obj = {
      foo() {
      },
      bar() {
      },
  };
Modules: don’t mix default exports and named exports. Your module should either specialize on a single thing or export multiple, named, things. Details are explained in the chapter on modules.
Format generators as follows:
  // Generator function declaration
  function* genFunc() { ··· }

  // Generator function expression
  const genFunc = function* () { ··· };

  // Generator method definition in an object literal
  const obj = {
      * generatorMethod() {
          ···
      }
  };

  // Generator method definition in a class definition
  class MyClass {
      * generatorMethod() {
          ···
      }
  }
Details are explained in the chapter on generators.

The chapter on parameter handling has style tips for function signatures:
  // Mark optional parameters via the parameter default value `undefined`
  function foo(optional = undefined) { ··· }

  // Mark required parameters via a function that throws an exception
  function foo(required = throwException()) { ··· }

  // Enforcing a maximum arity (variant 1 of 2)
  function f(x, y, ...empty) { // max arity: 2
      if (empty.length > 0) {
          throw new Error();
      }
  }
  // Enforcing a maximum arity (variant 2 of 2)
  function f(x, y) { // max arity: 2
      if (arguments.length > 2) {
          throw new Error();
      }
  }
In the chapter on callable entities (traditional functions, arrow functions, classes, etc.) there is a section that gives recommendations (when to use which one etc.).
Additionally, the ES5 coding style tips in “Speaking JavaScript” are still relevant for ES6.----