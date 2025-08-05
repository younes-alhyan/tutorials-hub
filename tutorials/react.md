# ⚛️ React Tutorial

[<img src="../icons/react.svg" width="250"/>](https://react.dev)

**Learn React essentials for building modern, component-based UIs.** 🚀

## 📌 Table of Contents

1. [🏁 Getting Started](#-getting-started)
2. [🔤 JSX](#-jsx)
3. [🧩 Components](#-components)
4. [🎣 React Hooks](#-react-hooks)
5. [⚡ Performance Optimization](#-performance-optimization)
6. [🎛️ Controlled vs Uncontrolled Components](#-controlled-vs-uncontrolled-components)
7. [🔀 Component Composition Patterns](#-component-composition-patterns)
8. [🛠️ Utility React Features](#-utility-react-features)
9. [📝 Forms & Events](#-forms--events)

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

### 🔹 Context (`useContext`)

**Concept**: Avoid **prop drilling** by sharing state globally.

```jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);
  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Button() {
  const { dark, setDark } = useContext(ThemeContext);
  return (
    <button onClick={() => setDark(!dark)}>
      {dark ? "Dark" : "Light"} Mode
    </button>
  );
}
```

### 🔹 Callback (`useCallback`)

**Concept**: Memoizes a function so it **doesn’t get recreated on every render**.
Useful when passing functions as props to children with `React.memo`.

```jsx
import { useState, useCallback } from "react";

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Increment</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount((c) => c + 1), []);

  return (
    <div>
      <p>Count: {count}</p>
      <Child onClick={increment} />
    </div>
  );
}
```

## ⚡ Performance Optimization

### `React.memo`

Prevents **child re-render** if props haven’t changed.

### `useMemo`

Memoizes **expensive calculations**.

```jsx
const result = useMemo(() => heavyCalculation(num), [num]);
```

### `useCallback`

Memoizes **functions**. Prevents unnecessary child re-renders.

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
