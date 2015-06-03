Why does this fail?
===================

In this repository you find 3 identical tests.

 - Each test is run with mocha.
 - Each test created a new jsdom environment, which it leaks to the global scope (needed by React)
 - Each test destroys the globally leaked jsdom window when it's done

 The first test runs fine.

 The second test fails with `DOMException: Wrong document`, an error from Jsdom caused by something trying to append a DOM-node from a different document.

 The third test fails with `Error: Invariant Violation: findComponentRoot(..., .1): Unable to find element. This probably means the DOM was unexpectedly mutated (e.g., by the browser), usually due to forgetting a <tbody> when using tables, nesting tags like <form>, <p>, or <a>, or using non-SVG elements in an <svg> parent. Try inspecting the child nodes of the element with React ID ''.`

If you delete the line that says `When this HTML innerText is here, the tests fail` from the first failing test, it passes and the errors are happening at the next test. Similar if you comment out the `instance.setState()`-call.

**WHY IS THIS HAPPENING?**

## Test output

```
$ mocha


  DOM Leak 1
    ✓ should be defined

  DOM Leak 2
    1) should be defined

  DOM Leak 3
Warning: ReactMount: Root element has been removed from its original container. New container:
Warning: ReactMount: Root element has been removed from its original container. New container:
Warning: ReactMount: Root element has been removed from its original container. New container:
    2) should be defined


  1 passing (644ms)
  2 failing

  1) DOM Leak 2 should be defined:
     DOMException: Wrong document
      at Context.<anonymous> (test/test-2.js:36:14)

  2) DOM Leak 3 should be defined:
     Error: Invariant Violation: findComponentRoot(..., .1): Unable to find element. This probably means the DOM was unexpectedly mutated (e.g., by the browser), usually due to forgetting a <tbody> when using tables, nesting tags like <form>, <p>, or <a>, or using non-SVG elements in an <svg> parent. Try inspecting the child nodes of the element with React ID ``.
      at Context.<anonymous> (test/test-3.js:36:14)
```
