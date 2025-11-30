# 🎨 Tailwind CSS Cheatsheet

[<img src="../icons/tailwindcss.svg" width="250"/>](https://younes-alhyan.github.io/tutorials-hub/index.html?tutorial=tailwindcss)

**Learn Tailwind CSS essentials for styling, layouts, typography, and effects efficiently.** 🚀

## 📌 Table of Contents

1. [📏 Dimensions](#📏-dimensions)
2. [📍 Position](#📍-position)
3. [🖥️ Display](#🖥️-display)
4. [📐 Flexbox](#📐-flexbox)
5. [🗂️ Grid](#🗂️-grid)
6. [📦 Margin & Padding](#📦-margin--padding)
7. [🎨 Color & Background](#🎨-color--background-color)
8. [🛡️ Borders](#🛡️-borders)
9. [🔤 Fonts & Typography](#🔤-fonts--typography)
10. [🔄 Transform](#🔄-transform)
11. [⏱️ Transition](#⏱️-transition)
12. [🎞️ Animation](#🎞️-animation)
13. [✨ Effects, Filters & Shadows](#✨-effects-filters-opacity-shadows--backdrop)
14. [🖱️ Cursor](#🖱️-cursor)
15. [⚡ Outline & Focus Rings](#⚡-outline--focus-rings)
16. [📐 Aspect Ratio](#📐-aspect-ratio)
17. [📱 Responsive Design](#📱-responsive-design)
18. [📌 Keywords & Custom Values](#📌-keywords--custom-values)

## 📏 Dimensions

**CSS :**

```css
div {
  width: 1rem;
  height: 1rem;
  min-width: 1rem;
  max-width: 1rem;
  min-height: 1rem;
  max-height: 1rem;
}
```

**Tailwind :**

```html
<div class="w-4 h-4 min-w-4 max-w-4 min-h-4 max-h-4"></div>
```

## 📍 Position

**CSS :**

```css
div {
  position: relative;
}
```

**Tailwind :**

```html
<div class="relative"></div>
```

### Offsets

**CSS :**

```css
div {
  top: 1rem;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
}
```

**Tailwind :**

```html
<div class="top-1 right-1 bottom-1 left-1"></div>
```

### Z-index

**CSS :**

```css
div {
  z-index: 10;
}
```

**Tailwind :**

```html
<div class="z-10"></div>
```

## 🖥️ Display

**CSS :**

```css
div {
  display: flex;
}
```

**Tailwind :**

```html
<div class="flex"></div>
```

## 📐 Flexbox

**CSS :**

```css
div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 100px;
}
```

**Tailwind :**

```html
<div
  class="flex flex-row justify-center items-center flex-wrap grow shrink basis-24"
></div>
```

## 🗂️ Grid

**CSS :**

```css
div {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
  place-items: center;
}
```

**Tailwind :**

```html
<div class="grid grid-cols-3 grid-rows-2 gap-4 place-items-center"></div>
```

## 📦 Margin & Padding

### Margin

**CSS :**

```css
div {
  margin: 1rem;
  margin-top: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin: 0 1rem;
  margin: 1rem 0;
}
```

**Tailwind :**

```html
<div class="m-4 mt-4 mr-4 mb-4 ml-4 mx-4 my-4"></div>
```

### Padding

**CSS :**

```css
div {
  padding: 1rem;
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding: 0 1rem;
  padding: 1rem 0;
}
```

**Tailwind :**

```html
<div class="p-4 pt-4 pr-4 pb-4 pl-4 px-4 py-4"></div>
```

## 🎨 Color & Background Color

**CSS :**

```css
div {
  color: white;
  background-color: black;
}
```

**Tailwind :**

```html
<div class="text-white-500 bg-black-600"></div>
```

**Notes:**
`500` and `600` indicate color **shade/intensity**.

### Gradient Color

**CSS :**

```css
div {
  background: linear-gradient(to right, red, yellow, green);
}
```

**Tailwind :**

```html
<div class="bg-gradient-to-r from-red-500 via-yellow to-green-600 p-6"></div>
```

## 🛡️ Borders

**CSS :**

```css
div {
  border: 1rem;
  border-style: solid;
  border-color: black;
  border-radius: 0.5rem;
}
```

**Tailwind :**

```html
<div class="border-4 border-black rounded-md"></div>
```

**Notes:**
Control corners with `rounded-{direction}-{size}`.

## 🔤 Fonts & Typography

### Basic Typography

**CSS :**

```css
div {
  font-family: sans-serif;
  font-size: 1rem;
  font-weight: bold;
  font-style: italic;
  text-align: center;
}
```

**Tailwind :**

```html
<div class="font-sans text-base font-bold italic text-center"></div>
```

### Text Utilities

- Line height: `leading-{size}`
- Letter spacing: `tracking-{size}`
- Text transform: `uppercase`, `lowercase`, `capitalize`
- Decoration: `underline`, `line-through`, `no-underline`
- Overflow: `truncate`
- Whitespace: `whitespace-nowrap`, `whitespace-normal`
- Word break: `break-words`, `break-all`

**CSS Example:**

```css
div {
  line-height: 1.5;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: underline;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-word;
}
```

**Tailwind Example:**

```html
<div class="leading-6 tracking-wider uppercase underline truncate"></div>
```

### Custom/Imported Fonts

1. Import font:

```css
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
```

2. Extend `tailwind.config.js`:

```js
fontFamily: {
  myFont: ["myFont", "sans-serif"],
}
```

3. Use class:

```html
<div class="font-myFont text-lg"></div>
```

## 🔄 Transform

**CSS :**

```css
div {
  transform: rotate(45deg) scale(1.5) translateX(20px) translateY(10px);
}
```

**Tailwind :**

```html
<div class="rotate-45 scale-150 translate-x-5 translate-y-2.5"></div>
```

## ⏱️ Transition

**CSS :**

```css
div {
  transition: all 0.3s ease-in-out;
}
```

**Tailwind :**

```html
<div class="transition-all duration-300 ease-in-out"></div>
```

## 🎞️ Animation

### Predefined Animations

**Tailwind Classes:** `animate-none`, `animate-spin`, `animate-ping`, `animate-pulse`, `animate-bounce`

**Example:**

```html
<div class="animate-spin duration-1000 ease-linear"></div>
```

- Duration: `duration-1000`
- Timing: `ease-linear`
- Infinite: built-in with most classes

### Custom Animation

**Step 1: Define keyframes**

```js
keyframes: {
  my-spin: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
},
animation: {
  'my-spin': 'my-spin 2s linear infinite',
}
```

**Step 2: Use**

```html
<div class="animate-my-spin"></div>
```

## ✨ Effects, Filters, Opacity, Shadows & Backdrop

**CSS :**

```css
div {
  opacity: 0.5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  filter: blur(2px) brightness(0.8);
  backdrop-filter: blur(4px);
}
```

**Tailwind :**

```html
<div class="opacity-50 shadow-md blur-sm brightness-80 backdrop-blur-md"></div>
```

## 🖱️ Cursor

```css
div {
  cursor: pointer;
}
```

```html
<div class="cursor-pointer"></div>
```

## ⚡ Outline & Focus Rings

```css
div {
  outline: 2px solid blue;
  outline-offset: 2px;
}
```

```html
<div class="outline outline-2 outline-blue-500 outline-offset-2"></div>
```

## 📐 Aspect Ratio

```css
div {
  aspect-ratio: 16 / 9;
}
```

```html
<div class="aspect-video"></div>
```

## 📱 Responsive Design

Tailwind makes building responsive layouts easy using **predefined breakpoints**. These breakpoints are **mobile-first**, meaning the default styles apply to all screens, and the prefixed classes apply **from the breakpoint and up**.

### Predefined Breakpoints

| Prefix | Min-Width | Description    |
| ------ | --------- | -------------- |
| `sm:`  | 640px     | Small screens  |
| `md:`  | 768px     | Medium screens |
| `lg:`  | 1024px    | Large screens  |
| `xl:`  | 1280px    | Extra large    |
| `2xl:` | 1536px    | 2x Extra large |

### How It Works

- **Mobile-first logic:**
  Default classes apply to all screens (usually mobile).
  Breakpoint prefixes like `sm:`, `md:`, etc., override the default **starting from that screen size**.

**Example:**

```html
<div class="bg-red-500 sm:bg-green-500 md:bg-blue-500 lg:bg-yellow-500">
  Responsive Box
</div>
```

**Equivalent CSS:**

```css
div {
  background-color: red; /* default */
}

@media (min-width: 640px) {
  /* sm */
  div {
    background-color: green;
  }
}

@media (min-width: 768px) {
  /* md */
  div {
    background-color: blue;
  }
}

@media (min-width: 1024px) {
  /* lg */
  div {
    background-color: yellow;
  }
}
```

## 📌 Keywords & Custom Values

### Colors

- Syntax: `{property}-{color}-{shade}`
- Shade ranges: `50 → 900` (intensity of the color)

### Directions

| Keyword | Direction    |
| ------- | ------------ |
| t       | Top          |
| b       | Bottom       |
| l       | Left         |
| r       | Right        |
| tl      | Top-Left     |
| tr      | Top-Right    |
| bl      | Bottom-Left  |
| br      | Bottom-Right |
| x       | Horizontal   |
| y       | Vertical     |

### Sizes

- **Scale:** `1 → 0.25rem`
- **Predefined keywords:** `xs`, `sm`, `md/base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`

### Duration

- `duration-75`, `duration-150`, `duration-300`, `duration-500`, `duration-700`, `duration-1000`

### Timing Function

- `ease-linear`, `ease-in`, `ease-out`, `ease-in-out`

### Custom Values

```html
<div class="w-[350px] bg-[#ff0080] p-[2.5rem]"></div>
```
