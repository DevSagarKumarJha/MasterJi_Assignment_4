# Function in JS

**Syntax:**
function functionName(parameter){
    // statements
}

**Example:** Add two numbers using function

```js
function add(num1, num2){
    // statements
    return num1 + num2;
}
```

Note: above is just a  `function definition` (also called a `function declaration`, or `function statement`).

We need to call function to make it work properly.

**Function calling:**

1. If there is printable statement inside the function

    ```js
    functionName(arrOfArguments);
    ```

2. function is returning some value

    ``` js
    // either store it
    let storage = functionName(arrOfArguments)
    ```

    Or

    ``` js
    // either store it
    console.log(functionName(arrOfArguments))
    ```
