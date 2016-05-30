----
## 2. FAQ: ECMAScript 6

이 챕터에서는 ECMAScript 6에 관해 자주 묻는 질문에 대한 답변을 한다.
> This chapter answers a few frequently asked questions about ECMAScript 6.

#### 2.1 ES6는 현재 사용 가능한가요? 
> How can I use ES6 today?

ES6 스펙의 대부분은 현대의 엔진들이 이미 지원하고 있고 Kangax’ ES6 compatibility table 에서 지원 여부를 확인할 수 있습니다. 
> Most of ES6 is already supported in current engines, consult Kangax’ ES6 compatibility table to find out what is supported where.

또다른 선택지에 대해서는, (예: ES6 커맨드 라인과 바벨을 이용한 ES6에서 ES5로 변환) “Deploying ECMAScript 6” in “Setting up ES6”. 을 찾아보세요.
> For other options (e.g. interactive ES6 command lines and transpiling ES6 to ES5 via Babel), consult Chap. “Deploying ECMAScript 6” in “Setting up ES6”.

#### 2.2 ECMAScript 6는 이제 ECMAScript 2015로 불려야 하는 것 아닌가요?
> 2.2 Isn’t ECMAScript 6 now called ECMAScript 2015?

그렇다고 할 수도 있고, 아니라고 할 수도 있습니다. ECMAScript 2015가 공식적인 이름이지만, 모두가 알고 있고 사용하는 이름은 ES6 입니다. 이 책에서 ES6를 사용하는 것은 바로 그러한 이유입니다.
> Yes and no. The official name is ECMAScript 2015, but ES6 is the name that everyone knows and uses. That’s why I decided to use the latter for this book.

ES6 이후에는, 새로운 절차와 매해 출시 되는 주기를 통해 ECMAScript 에디션이 제작 됩니다. 이것은 새로운 네이밍을 수립하기에 좋은 기회로 볼 수 있습니다. 그러므로 저는 ES6 그 다음 에디션을 위해 "ECMAScript 2016" 이라는 이름을 사용 할 것 입니다.
> After ES6, ECMAScript editions are created via a new process and a yearly release cycle. That seems like a good opportunity to switch to the new naming scheme. Therefore, I’ll use the name “ECMAScript 2016” for the edition after ES6.

#### ECMAScript 5 코드를 ECMAScript 6으로 어떻게 통합하나요?
> 2.3 How do I migrate my ECMAScript 5 code to ECMAScript 6?

특별히 해야 할 건 없습니다. ECMAScript 6는 ECMAScript 5의 상위 집합이기 때문이죠. 그래서 ES5로 작성된 모든 코드는 자동적으로 ES6 코드이기도 합니다. 이것은 새로운 버전을 채택함에 있어서 굉장히 유용합니다. 어떻게 ES6가 이전 버전과 완벽히 호환이 유지되는지는 “One JavaScript” 챕터에서 설명하고 있습니다.
> There is nothing to do: ECMAScript 6 is a superset of ECMAScript 5. Therefore, all of your ES5 code is automatically ES6 code. That helps tremendously with incrementally adopting this new version. How exactly ES6 stays completely backwards compatible is explained in the chapter on “One JavaScript”.

#### ECMAScript 5를 배우는게 여전히 유효한가요?
> 2.4 Does it still make sense to learn ECMAScript 5?

ES6는 시간이 갈수록 모든 곳에서 더욱 지원이 잘 될 것입니다. 그 말이 ECMAScript 5를 더 이상 배우지 말아야 한다는 의미일까요? 그렇지 않다는 것에 다음과 같은 몇가지 이유가 있습니다.
> ES6 is increasingly well supported everywhere. Does that mean that you shouldn’t learn ECMAScript 5, anymore? It doesn’t, for several reasons:

ECMAScript 6는 ECMAScript 5 의 상위 집합 - 새로운 자바스크립트 버전은 절대로 기존 코드를 망가뜨리지 않습니다. 그러한 이유 때문에,  여러분이 ECMAScript 5에 관해 헛되이 학습한 것은 없습니다.
> ECMAScript 6 is a superset of ECMAScript 5 – new JavaScript versions must never break existing code. Thus, nothing you learn about ECMAScript 5 is learned in vain.

ECMAScript 5의 특징들을 대체하는 ECMAScript 6의 특징들이 몇가지있지만, 그러한 기술들의 기반으로써 여전히 사용됩니다. 이러한 기저를 이해하는 것은 중요합니다. 두 가지 예를 들자면 : class는 내부적으로 생성자로 변환되고 메서드는 여전히 함수입니다. (언제나 그래왔듯이).
> There are several ECMAScript 6 features that kind of replace ECMAScript 5 features, but still use them as their foundations. It is important to understand those foundations. Two examples: classes are internally translated to constructors and methods are still functions (as they have always been).

ECMAScript 6이 ECMAScript 5로 컴파일 되는 것 뿐만 아니라 컴파일 절차의 산출물을 이해하는 것도 유용합니다. 그리고 한동안은 ES5로 컴파일을 해야만 할 겁니다.(아마도 수년간) 모든 적절한 브라우저에서 ES6가 이용가능한 수준이 될 때까지 말이죠. 레거시 코드를 이해할수 있게 되는 것은 중요합니다.
> As long as ECMAScript 6 is compiled to ECMAScript 5, it is useful to understand the output of the compilation process. And you’ll have to compile to ES5 for a while (probably years), until you can rely on ES6 being available in all relevant browsers.
It’s important to be able to understand legacy code.

#### ES6는 비대한가요? 
2.5 Is ES6 bloated?

ES6가 비대해지기만 하고 쓸모 없는 편의 문법(이미 존재하는 무언가를 위한 더욱 편리한 문법)을 제공한다는 불만이 있다. 
> One occasionally comes across accusations of ES6 being bloated and introducing too much useless syntactic sugar (more convenient syntax for something that already exists).

그러나, 여러모로, 자바스크립트는 이제 막 파이썬이나 루비 같은 언어에 발 맞추어 가고 있을 뿐이다. 두 언어는 더 많은 기능을 가지고 있고 더욱 풍부한 표준 라이브러리를 포함하고 있다. 
> However, in many ways, JavaScript is just now catching up with languages such as Python and Ruby. Both still have more features and come with a much richer standard library.

누군가 ES6에 관해 너무 비대하다고 불평한다면, 저는 그들에게 한동안 ES6를 써보는 걸 제안합니다. 그 누구도 새로운 기능을 사용해야한다고 강제 하지는 않습니다. 작은 부분에서부터 시작한 다음에 더 새로운 기능도 써보며 성장 할 수록 ES6에 좀 더 편안함을 느낄겁니다. 지금까지 ES6를 현업에 사용하는 사람들에게 제가 받은 피드백은 너무나도 긍정적입니다.
> If someone complains about ES6 being too big, I suggest that they try it out for a while. Nobody forces you to use any of the new features. You can start small (consult Chap. “First steps with ECMAScript 6” for suggestions) and then use more new features, as you grow more comfortable with ES6. So far, the feedback I get from people who have actually programmed with ES6 (as opposed to read about it) is overwhelmingly positive.

더욱이, 겉보기에 편의 문법으로 보이는 것들은(클래스와 모듈 같은 것) 언어에 매우 필요한 표준화를 불러왔고 미래의 특징들을 위한 기반으로써 제공합니다.
> Furthermore, things that superficially look like syntactic sugar (such as classes and modules) bring much-needed standardization to the language and serve as foundations for future features.

마지막으로, 몇몇 특징들은 일반적인 프로그래머를 위한 것이 아니라 라이브러리 작성자들을 위해 만들어졌습니다. (예: 제너레이터, 이터레이터, 프록시) "일반적인 프로그래머"들은 적어도 표면적인 부분만 알아도 됩니다. 
> Lastly, several features were not created for normal programmers, but for library authors (e.g. generators, iterators, proxies). “Normal programmers” only need to know them superficially if at all.

#### ES6의 스펙은 매우 거대하지 않나요?
> 2.6 Isn’t the ES6 specification very big?

> The ECMAScript specification has indeed grown tremendously: The ECMAScript 5.1 PDF had 245 pages, the ES6 PDF has 593 pages. But, for comparison, the Java 8 language specification has 724 pages (excluding an index). Furthermore, the ES6 specification contains details that many other language specifications omit as implementation-defined. It also specifies how its standard library works1.

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
