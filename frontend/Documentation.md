# Project Documentation

- [Project Documentation](#project-documentation)
  - [Introduction](#introduction)
  - [React basics](#react-basics)
    - [Components](#components)
      - [Function Components](#function-components)
      - [Const Components](#const-components)
      - [Component Properties](#component-properties)
      - [How to use](#how-to-use)
    - [State](#state)
      - [useState](#usestate)
  - [Project Structure](#project-structure)
    - [*App* Directory](#app-directory)
      - [*app/root.jsx*](#approotjsx)
      - [*app/layout.style.js*](#applayoutstylejs)
      - [*app/entry.jsx*](#appentryjsx)
      - [*app/components*](#appcomponents)
      - [*app/routes*](#approutes)
    - [*Assets* Directory](#assets-directory)
    - [*Styles* Directory](#styles-directory)

## Introduction

This document provides an overview of the project structure and the purpose of each file and directory in the React-Remix Vite project. This will help new developers understand the codebase and contribute effectively.

## Installation

1. Local installation (Docker) of Node.js -> https://nodejs.org/en
2. run "npm install" in terminal for installing dependencies

## Running the Project

1. Run "npm run dev" in terminal
2. Use localhost adress in browser to access

## Running project tests

1. Run "npm test" in terminal

### Components

`Components` are the building blocks of a React app.

#### Function Components

A function component is a simple javaScript function that returns a React element.

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}</h1>;
}

export default Greeting;

```

#### Const Components

A const component is a function component that is assigned to a constant variable using arrow functions. We are using const components to maintain a consistency in the codebase.

```jsx
const BuildPrompt = () => {
    return (
        <div>
            <p>BuildPrompt</p>
        </div>
    );
}

export default BuildPrompt;
```

#### Component Properties

Properties (props) are used to pass data from parent to child components.

```jsx
const BuildPrompt = ({ someProp }) => {
    return (
        <div>
            <p>BuildPrompt</p>
        </div>
    );
}
```

#### How to use

How do I use a defined Component?

Const Components:

```jsx
import WritePrompt from "..."

const BuildPrompt = () => {
    return (
        <div>
            <WritePrompt/>
        </div>
    );
}

export default BuildPrompt;
```

Const Components with props:

```jsx
import WritePrompt from "..."

const BuildPrompt = () => {

   const name = "area"

   return (
      <div>
         <WritePrompt name={name}/>
      </div>
   );
}

export default BuildPrompt;
```

---

### State

#### useState

State is used to manage data within a component.

```jsx
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Counter;
```

## Project Structure

The project follows a typical React-Remix Vite setup, organized as follows:

```md
frontend
│
│─── .eslintrc.cjs
│─── .gitignore  
│─── package-lock.json
│─── package.json
│─── vite.config.js
│
└─── app
│    │
│    │─── root.jsx
│    │─── layout.style.js
│    │─── entry.client.jsx
│    │─── entry.server.jsx
│    │
│    └─── routes
│    │    │
│    │    └─── pages.jsx
│    │
│    └─── components
│         │
│         │─── components.jsx
│         │─── index.js
│
└─── assets
│    │
│    │─── images.png
│    │
│    └─── components
│         │   icons.jsx
│
└─── styles
│    │
│    │─── fonts.js
│    │─── theme.js

```

---

### *App* Directory

The `App` Directory contains the source code of the application.

#### *app/root.jsx*

The root.jsx contains a function **Layout**. The Layout function wraps the entire application and defines global configurations e.g. our menu sidebar.
The *children* parameter contains the page next to the sidebar.

#### *app/layout.style.js*

This stylesheet specifies the style attributes for the Layout function found in root.jsx.

#### *app/entry.jsx*

The two files *entry.client.jsx* and *entry.server.jsx* are responsible for initializing the React App and handling server-side rendering and some requests.

---

#### *app/components*

This directory contains reusable UI components, such as a MenuSidebar component, which are assembled into higher-level components. Additionally, the `components` directory includes an index.js file that exports all useful components for easy import by top-level components.

---

#### *app/routes*

The `routes` directory contains components and logic for different pages or views in the application. Each file in this directory typically represents a different route or page that the user can navigate to.
The `_index.jsx` file usually is the home page but in our case we have a direct navigation to the `buildPrompt.jsx` file/page.

---

### *Assets* Directory

The `assets` Directory contains images and icons as components (.jsx).

---

### *Styles* Directory

The styles directory contains files that define constants such as font styles and color codes.

Example use of fonts.js and theme.js:

```jsx
import FONTS from ".../styles/fonts";
import COLORS from ".../styles/theme";

const styles = {
    navHeader: {
        ...FONTS.displaySmall,
        color: COLORS.blue
    }
};

export default styles ;
```
