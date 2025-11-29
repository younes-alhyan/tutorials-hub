# ⚛️ React Tutorial

[<img src="../icons/react.svg" width="250"/>](https://react.dev)

**Learn React essentials for building modern, component-based UIs.** 🚀

## 📌 Table of Contents

1. [🏁 Getting Started](#🏁-getting-started)
2. [🔤 JSX](#🔤-jsx)
3. [🧩 Components](#🧩-components)
4. [🎣 React Hooks](#🎣-react-hooks)
5. [⚡ Performance Optimization](#⚡-performance-optimization)
6. [🎛️ Controlled vs Uncontrolled Components](#🎛️-controlled-vs-uncontrolled-components)
7. [🔀 Component Composition Patterns](#🔀-component-composition-patterns)
8. [🛠️ Utility React Features](#🛠️-utility-react-features)
9. [📝 Forms & Events](#📝-forms--events)

## 🏁 Getting Started

React apps can be created with:

- **Create React App (CRA)** – older, full setup.
- **Vite** – modern, fast, lightweight.

Install React with Vite:

```bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
```

## 🔤 JSX

JSX lets you **write HTML-like code inside JavaScript**.
It allows embedding JavaScript expressions with `{}`.

```jsx
const userName = "Alice";
const element = <h1>Hello, {userName}!</h1>;
```

## 🧩 Components

Components are **functions returning UI (JSX)**.

- Accept **props** (parameters passed as attributes).
- Have a **lifecycle**: Mount → Update → Unmount.
- Naming: Always **PascalCase**.

```jsx
function Welcome({ user }) {
  return <h2>Hello {user}</h2>;
}

export default Welcome;

// Usage
<Welcome user="Bob" />;
```

### Rendering Lists with `.map()`

Use `.map()` to render multiple items from an array:

```jsx
const items = ["Apple", "Banana", "Cherry"];

function List() {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```

**Key points:**

- **`key` attribute**: required for React to track list items efficiently. Must be **unique** among siblings.
- Avoid using indexes as keys if the list can change order, as it may cause unexpected re-renders.

## 🎣 React Hooks

Hooks let you use **state, lifecycle, and context** in functional components.

### 🔹 State Management (`useState`)

**Concept**: `useState` gives you a **state variable** + a **function to update it**.
Updating the state re-renders the component.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

- Works with **primitives, arrays, objects**.
- For arrays/objects → always create a new copy with spread `[...]` or `{...}` before updating.

**Example Updating Arrays**:

```jsx
const [numbers, setNumbers] = useState([1, 2, 3]);

// Add an item
setNumbers([...numbers, 4]);

// Remove an item
setNumbers(numbers.filter((n) => n !== 2));

// Update an item (e.g., double the first number)
setNumbers(numbers.map((n, i) => (i === 0 ? n * 2 : n)));
```

**Example Updating Objects**:

```jsx
const [user, setUser] = useState({ name: "Alice", age: 25 });

// Update a property
setUser({ ...user, age: 26 });

// Add a new property
setUser({ ...user, city: "Paris" });
```

### 🔹 Side Effects (`useEffect`)

**Concept**: Runs code after render and controls when it should run.

- **General timeline:**

  - Mount → Effect runs
  - Update → Cleanup runs + Effect runs
  - Unmount → Cleanup runs

**Example:**

```jsx
import { useEffect, useState } from "react";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1), 1000);
    return () => clearInterval(id); // cleanup
  }, []);

  return <p>Timer: {count}</p>;
}
```

- No deps `[]` → runs on **every render**.
- Empty deps `[]` → runs **once on mount**.
- `[var]` → runs when **`var` changes**.

### 🔹 Refs (`useRef`)

**Concept**: Persistent variable across renders, does **not trigger re-render**.

```jsx
import { useRef, useEffect } from "react";

function InputFocus() {
  const inputRef = useRef(null);

  useEffect(() => inputRef.current.focus(), []);

  return <input ref={inputRef} placeholder="I’m focused!" />;
}
```

### 🔹 Reducer (`useReducer`)

**Concept**: Manages complex state with a **reducer function** + `dispatch`.

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  );
}
```

### 🔹 Context API (`useContext`)

**Concept** : Context lets you create a **shared state** that can be accessed by any component without passing props manually through each level **(prop drilling)**. However, if many components consume the same context, updating it can trigger re-renders in all of them, which may be slower than using `useState` locally.

**Use case**: Best for **shared/global** state like theme, user info, or language settings.

**How to use**:

1. **Create a context**

```js
const ThemeContext = React.createContext();
```

2. **Provide a value**

```jsx
<ThemeContext.Provider value={darkMode}>
  <App />
</ThemeContext.Provider>
```

3. **Consume with `useContext`**

```js
const theme = useContext(ThemeContext);
```

## ⚡ Performance Optimization

### `React.memo`

Prevents **child re-render** if props haven’t changed. Useful for functional components that receive the same props frequently.

```jsx
const Child = React.memo(({ value }) => {
  console.log("Child rendered");
  return <p>Value: {value}</p>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div>
      <Child value={count} />
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type..."
      />
    </div>
  );
}
// Here, Child only re-renders when `count` changes, not when `text` changes.
```

### `useMemo`

Memoizes **expensive calculations** to avoid re-executing them unnecessarily.
`

```jsx
function heavyCalculation(num) {
  console.log("Calculating...");
  let result = 0;
  for (let i = 0; i < 1e7; i++) {
    result += num;
  }
  return result;
}

function App() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  const memoizedResult = useMemo(() => heavyCalculation(count), [count]);

  return (
    <div>
      <p>Result: {memoizedResult}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type..."
      />
    </div>
  );
}

// heavyCalculation only runs when `count` changes, not when `text` changes.
```

### `useCallback`

Memoizes **functions** to prevent unnecessary child re-renders.

```jsx
import { useState, useCallback } from "react";

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Increment</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const increment = useCallback(() => setCount((c) => c + 1), []);

  return (
    <div>
      <p>Count: {count}</p>
      <Child onClick={increment} />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type..."
      />
    </div>
  );
}

// Child re-renders only when `increment` function reference changes.
// Typing in the input does not trigger a re-render of Child.
```

## 🎛️ Controlled vs Uncontrolled Components

- **Controlled** → state manages input.
- **Uncontrolled** → use `ref` for input value.

```jsx
// Controlled
<input value={value} onChange={e => setValue(e.target.value)} />

// Uncontrolled
<input ref={inputRef} />
```

## 🔀 Component Composition Patterns

**Concept**: Combine components in flexible ways instead of inheritance.

- **Children as Props**

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}
<Card>
  <h1>Title</h1>
  <p>Desc</p>
</Card>;
```

- **Render Props**

```jsx
function MouseTracker({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
      {render(pos)}
    </div>
  );
}
<MouseTracker
  render={({ x, y }) => (
    <p>
      {x},{y}
    </p>
  )}
/>;
```

- **Higher-Order Components (HOC)**

```jsx
function withLogger(Component) {
  return function Wrapped(props) {
    console.log("Rendering", Component.name);
    return <Component {...props} />;
  };
}
```

## 🛠️ Utility React Features

- **Forwarding Refs**

```jsx
const CustomInput = React.forwardRef((props, ref) => (
  <input {...props} ref={ref} />
));
```

- **Portals**

```jsx
ReactDOM.createPortal(<div>Modal</div>, document.getElementById("modal-root"));
```

- **Profiler**

```jsx
<React.Profiler
  id="App"
  onRender={(id, phase, actual, base) => console.log(phase)}
>
  <App />
</React.Profiler>
```

- **Lazy Loading**

```jsx
const LazyComp = React.lazy(() => import("./BigComp"));
<Suspense fallback={<p>Loading...</p>}>
  <LazyComp />
</Suspense>;
```

## 📝 Forms & Events

- React normalizes events.
- Controlled components manage form values with state.

```jsx
function Form() {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}
```
