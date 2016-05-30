----
2. FAQ: ECMAScript 6

This chapter answers a few frequently asked questions about ECMAScript 6.

2.1 How can I use ES6 today?
Most of ES6 is already supported in current engines, consult Kangax’ ES6 compatibility table to find out what is supported where.

For other options (e.g. interactive ES6 command lines and transpiling ES6 to ES5 via Babel), consult Chap. “Deploying ECMAScript 6” in “Setting up ES6”.

2.2 Isn’t ECMAScript 6 now called ECMAScript 2015?
Yes and no. The official name is ECMAScript 2015, but ES6 is the name that everyone knows and uses. That’s why I decided to use the latter for this book.

After ES6, ECMAScript editions are created via a new process and a yearly release cycle. That seems like a good opportunity to switch to the new naming scheme. Therefore, I’ll use the name “ECMAScript 2016” for the edition after ES6.

2.3 How do I migrate my ECMAScript 5 code to ECMAScript 6?
There is nothing to do: ECMAScript 6 is a superset of ECMAScript 5. Therefore, all of your ES5 code is automatically ES6 code. That helps tremendously with incrementally adopting this new version. How exactly ES6 stays completely backwards compatible is explained in the chapter on “One JavaScript”.

2.4 Does it still make sense to learn ECMAScript 5?
ES6 is increasingly well supported everywhere. Does that mean that you shouldn’t learn ECMAScript 5, anymore? It doesn’t, for several reasons:

ECMAScript 6 is a superset of ECMAScript 5 – new JavaScript versions must never break existing code. Thus, nothing you learn about ECMAScript 5 is learned in vain.
There are several ECMAScript 6 features that kind of replace ECMAScript 5 features, but still use them as their foundations. It is important to understand those foundations. Two examples: classes are internally translated to constructors and methods are still functions (as they have always been).
As long as ECMAScript 6 is compiled to ECMAScript 5, it is useful to understand the output of the compilation process. And you’ll have to compile to ES5 for a while (probably years), until you can rely on ES6 being available in all relevant browsers.
It’s important to be able to understand legacy code.
2.5 Is ES6 bloated?
One occasionally comes across accusations of ES6 being bloated and introducing too much useless syntactic sugar (more convenient syntax for something that already exists).

However, in many ways, JavaScript is just now catching up with languages such as Python and Ruby. Both still have more features and come with a much richer standard library.

If someone complains about ES6 being too big, I suggest that they try it out for a while. Nobody forces you to use any of the new features. You can start small (consult Chap. “First steps with ECMAScript 6” for suggestions) and then use more new features, as you grow more comfortable with ES6. So far, the feedback I get from people who have actually programmed with ES6 (as opposed to read about it) is overwhelmingly positive.

Furthermore, things that superficially look like syntactic sugar (such as classes and modules) bring much-needed standardization to the language and serve as foundations for future features.

Lastly, several features were not created for normal programmers, but for library authors (e.g. generators, iterators, proxies). “Normal programmers” only need to know them superficially if at all.

2.6 Isn’t the ES6 specification very big?
The ECMAScript specification has indeed grown tremendously: The ECMAScript 5.1 PDF had 245 pages, the ES6 PDF has 593 pages. But, for comparison, the Java 8 language specification has 724 pages (excluding an index). Furthermore, the ES6 specification contains details that many other language specifications omit as implementation-defined. It also specifies how its standard library works1.

2.7 Does ES6 have array comprehensions?
Originally, ES6 was to have Array and generator comprehensions (similarly to Haskell and Python). But they were not added, because TC39 wanted to explore two avenues:

It may be possible to create comprehensions that work for arbitrary datatypes (think Microsoft’s LINQ).
It may also be possible that methods for iterators are a better way to achieve what comprehensions do.
2.8 Is ES6 statically typed?
Static typing is not part of ES6. However, the following two technologies add static typing to JavaScript. Similar features may eventually be standardized.

Microsoft TypeScript: is basically ES6 plus optional type annotations. At the moment, it is compiled to ES5 and throws away the type information while doing so. Optionally, it can also make that information available at runtime, for type introspection and for runtime type checks.
Facebook Flow: is a type checker for ECMAScript 6 that is based on flow analysis. As such, it only adds optional type annotations to the language and infers and checks types. It does not help with compiling ES6 to ES5.
Two benefits of static typing are:

It allows you to detect a certain category of errors earlier, because the code is analyzed statically (during development, without running code). As such, static typing is complementary to testing and catches different errors.
It helps IDEs with auto-completion.
Both TypeScript and Flow are using the same notation. Type annotations are optional, which makes this approach relatively lightweight. Even without annotations, types can often be inferred. Therefore, this kind of type checking is even useful for completely unannotated code, as a consistency check.

2.9 Where can I find more ES6 resources?
These are two lists with ES6 resources:

“ECMAScript 6 Tools” by Addy Osmani.
“ECMAScript 6 Learning!” by Eric Douglas.
