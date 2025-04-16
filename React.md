# Advanced React Concepts

This guide covers advanced React concepts that developers should understand to build efficient and scalable applications.

## Core Advanced Concepts

### Render Props Pattern

A technique where a component receives a function as a prop that returns a React element, allowing for component logic reuse. The component calls this function instead of implementing its own rendering logic.

```jsx
// Example
<DataProvider render={(data) => <DisplayComponent data={data} />} />
```

**Real-world Usage:**

- Data visualization libraries like react-vis or recharts using render props to customize chart elements
- Router libraries like React Router using render props for route rendering
- Form libraries like Formik exposing form state via render props

### Higher-Order Components (HOCs)

Functions that take a component and return a new enhanced component. HOCs allow for reusing component logic, adding additional props, or modifying behavior.

```jsx
const withAuth = (Component) => {
  return function WithAuth(props) {
    const isAuthenticated = checkAuth();
    return isAuthenticated ? <Component {...props} /> : <LoginPage />;
  };
};
```

**Real-world Usage:**

- Authentication wrappers that redirect unauthenticated users
- Analytics tracking that injects tracking methods into components
- Redux's connect() HOC for connecting components to the store
- Internationalization wrappers that inject translation functions

### Context API

Provides a way to pass data through the component tree without having to pass props manually at each level. Useful for global data like themes, user information, or language preferences.

```jsx
const ThemeContext = React.createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}
```

**Real-world Usage:**

- Theme providers for styling (dark/light mode)
- User authentication context providing current user data
- Multi-language support/internationalization
- Feature flag management across the application

### React.memo

A higher-order component that memoizes the rendered output, preventing unnecessary re-renders when props haven't changed.

```jsx
const MemoizedComponent = React.memo(function MyComponent(props) {
  // Render using props
});
```

**Real-world Usage:**

- Items in large lists where each item's rendering is expensive
- Components in dashboards that don't need to re-render when other parts change
- Sidebar components that rarely change but are part of a complex layout
- UI components like modals or tooltips that shouldn't re-render with parent changes

### useCallback and useMemo Hooks

- **useCallback**: Memoizes functions to prevent unnecessary re-creation between renders
- **useMemo**: Memoizes computed values to prevent recalculation between renders

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

**Real-world Usage:**

- Event handlers passed to child components in performance-critical lists
- Complex data transformations used in renders (sorting, filtering large datasets)
- Expensive calculations like chart data processing or geometry calculations
- API request formation that depends on multiple changing variables

### Custom Hooks

Reusable functions that contain stateful logic, allowing you to extract component logic into reusable functions.

```jsx
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}
```

**Real-world Usage:**

- `useLocalStorage` for persisting state across page reloads
- `useFetch` for data fetching with loading/error states
- `useMediaQuery` for responsive designs
- `useOnClickOutside` for detecting clicks outside modal/popup elements
- `useKeyPress` for keyboard shortcuts

### Error Boundaries

Component that catches JavaScript errors in their child component tree, logs those errors, and displays a fallback UI.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

**Real-world Usage:**

- Form submission components to prevent entire app crashes on validation errors
- Third-party widget integrations that might throw errors
- Data visualization components with complex rendering logic
- Implementation around experimental features

### Portals

Render children into a DOM node that exists outside the DOM hierarchy of the parent component.

```jsx
ReactDOM.createPortal(children, document.getElementById("modal-root"));
```

**Real-world Usage:**

- Modal dialogs rendered at the root level to avoid z-index issues
- Tooltips that need to break out of hidden overflow containers
- Dropdown menus that should appear above other elements
- Notification systems that display at fixed positions

### Suspense and Lazy Loading

Enables loading components on demand and showing fallback content while loading.

```jsx
const LazyComponent = React.lazy(() => import("./LazyComponent"));

function MyComponent() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </React.Suspense>
  );
}
```

**Real-world Usage:**

- Admin dashboards with many heavy components loaded only when needed
- Features behind authentication that only load after login
- Different sections of an e-commerce site (product details, cart, checkout)
- Media-heavy pages where images/videos should be loaded only when needed

### Server Components

A new paradigm allowing components to run directly on the server, reducing bundle size and enabling direct access to server resources.

**Real-world Usage:**

- Database access components that fetch data directly on the server
- CMS content rendering where data can be fetched and rendered server-side
- SEO-critical pages that need server-rendered content
- Sensitive operations that should happen server-side only

## State Management

### Redux and Redux Toolkit

A predictable state container for JavaScript apps with centralized store, actions, and reducers. Redux Toolkit simplifies Redux setup and usage.

```jsx
import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});
```

**Real-world Usage:**

- E-commerce shopping cart management across the application
- Complex multi-step form wizards with preserved state
- Real-time applications with many interconnected state updates
- Applications with complex CRUD operations needing predictable state flow

### Zustand

A small, fast, and scalable state management solution with a simple API.

```jsx
import create from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

**Real-world Usage:**

- Lightweight applications needing shared state without Redux complexity
- Projects where bundle size is critically important
- Progressive web apps that need efficient state management
- Application prototypes needing quick setup with minimal boilerplate

### Recoil

A state management library by Facebook providing shared state atoms and selectors.

```jsx
import { atom, useRecoilState } from "recoil";

const counterState = atom({
  key: "counterState",
  default: 0,
});

function Counter() {
  const [count, setCount] = useRecoilState(counterState);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**Real-world Usage:**

- Applications with complex dependent state relationships
- Dashboards with multiple interdependent filters
- Data-intensive applications with computed values
- Applications requiring time-travel debugging capabilities

### Jotai

An atomic approach to global React state management with a minimal API.

```jsx
import { atom, useAtom } from "jotai";

const countAtom = atom(0);

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

**Real-world Usage:**

- Micro-frontends needing isolated state atoms
- Applications migrating from React Context to more scalable solutions
- UI component libraries with discrete state needs
- Applications with complex form state management

### MobX

Makes state management simple with reactive programming principles.

```jsx
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

class CounterStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.count += 1;
  }
}

const Counter = observer(({ store }) => {
  return <button onClick={() => store.increment()}>{store.count}</button>;
});
```

**Real-world Usage:**

- Applications with complex domain models and many relationships
- Real-time dashboards with frequently updating data
- Form-heavy applications with interdependent fields
- Applications transitioning from OOP paradigms

### XState

State management with explicit finite state machines and statecharts.

```jsx
import { createMachine, interpret } from "xstate";

const toggleMachine = createMachine({
  id: "toggle",
  initial: "inactive",
  states: {
    inactive: { on: { TOGGLE: "active" } },
    active: { on: { TOGGLE: "inactive" } },
  },
});
```

**Real-world Usage:**

- Multi-step checkout processes with complex navigation rules
- User onboarding flows with conditional steps
- Authentication systems with multiple states (unauthenticated, authenticating, authenticated)
- Complex UI elements like date pickers with multiple interaction modes

## Performance Optimization

### React Profiler

A tool in React DevTools for measuring rendering performance of components.

**Real-world Usage:**

- Identifying performance bottlenecks in complex dashboards
- Optimizing e-commerce product listing pages
- Improving render performance of data visualization tools
- Debugging unnecessary re-renders in form components

### Code Splitting

Breaking down bundles to load JavaScript on demand rather than loading everything at once.

```jsx
import { lazy, Suspense } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

**Real-world Usage:**

- Large enterprise applications split by feature module
- Admin dashboards with rarely accessed sections
- Progressive web apps optimizing initial load time
- Applications with heavy third-party dependencies needed only in specific routes

### Virtual Lists (Windowing/Virtualization)

Technique for rendering only visible items in long lists to improve performance.

```jsx
import { FixedSizeList } from "react-window";

function VirtualList({ items }) {
  const Row = ({ index, style }) => <div style={style}>{items[index]}</div>;

  return (
    <FixedSizeList
      height={500}
      width={300}
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  );
}
```

**Real-world Usage:**

- Social media feeds with infinite scrolling
- Log viewers displaying thousands of entries
- Large data tables in admin interfaces
- Chat applications with extensive message history

### Memoization Techniques

Using memoization through React.memo, useMemo, and useCallback to prevent unnecessary calculations and renders.

**Real-world Usage:**

- Data transformation functions in data visualization dashboards
- Cart total calculation in e-commerce applications
- Filter and search functions operating on large datasets
- Animation calculations that depend on specific prop changes

### Bundle Size Optimization

Techniques like tree shaking, code splitting, and using lightweight alternatives to reduce application size.

**Real-world Usage:**

- Mobile-first applications requiring fast initial load
- Progressive Web Apps targeting low-end devices
- Enterprise applications with many features but limited bandwidth
- E-commerce sites where load speed directly impacts conversion rates

## Advanced Hooks

### useImperativeHandle

Customizes the instance value exposed when using `ref`.

```jsx
function FancyInput(props, ref) {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return <input ref={inputRef} />;
}

FancyInput = forwardRef(FancyInput);
```

**Real-world Usage:**

- Custom input components that need to expose focus methods
- Carousel components with imperative methods like next/previous
- Video players with play/pause functions called from parent components
- Custom dialog components with open/close methods

### useLayoutEffect

Similar to useEffect but fires synchronously after DOM mutations and before browser paint.

```jsx
useLayoutEffect(() => {
  // DOM measurement or mutation that should be synchronized with browser paint
}, [dependency]);
```

**Real-world Usage:**

- Measuring DOM element dimensions before rendering dependent elements
- Positioning tooltips or popovers relative to other elements
- Implementing scroll syncing between two elements
- Animations that must complete before the next paint to avoid flicker

### useDebugValue

Used in custom hooks to display a label for custom hooks in React DevTools.

```jsx
function useCustomHook() {
  // ...
  useDebugValue("Custom hook label");
  return value;
}
```

**Real-world Usage:**

- Debugging complex custom hooks during development
- Libraries exposing hooks with meaningful labels for users
- Team projects where custom hooks need clear identification in DevTools
- Educational materials demonstrating hook implementation

### useId

Generates unique IDs for associating form elements with their labels.

```jsx
function LabeledInput() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Name:</label>
      <input id={id} type="text" />
    </>
  );
}
```

**Real-world Usage:**

- Accessibility-focused form components with label associations
- Server-rendered applications requiring consistent IDs
- Components that generate multiple related elements needing unique identifiers
- Libraries creating reusable form components

### useTransition and useDeferredValue

Transition marks state updates as non-urgent, allowing urgent updates to interrupt them.
useDeferredValue creates a deferred version of a value that may "lag behind" the original.

```jsx
const [isPending, startTransition] = useTransition();
const deferredValue = useDeferredValue(value);
```

**Real-world Usage:**

- Search interfaces that show results as you type without UI freezing
- Filtering large data sets while maintaining UI responsiveness
- Data visualization tools that need to recalculate complex charts
- Dynamic forms where field changes trigger complex validations

### useOptimistic (React 19)

Provides a way to optimistically update UI before an async operation completes.

```jsx
// Preview feature in React 19
const [optimisticState, addOptimistic] = useOptimistic(
  currentState,
  (state, optimisticUpdate) => {
    // Return new state by applying optimistic update
    return { ...state, ...optimisticUpdate };
  }
);
```

**Real-world Usage:**

- Social media applications showing likes/comments immediately before server confirmation
- Shopping carts updating quantities optimistically
- Task management apps marking tasks complete without waiting for API response
- Collaborative tools showing user actions before they're processed by the server

## Testing

### React Testing Library

A library for testing React components focusing on testing components as users would interact with them.

```jsx
import { render, screen, fireEvent } from "@testing-library/react";

test("increments counter", () => {
  render(<Counter />);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(screen.getByText("1")).toBeInTheDocument();
});
```

**Real-world Usage:**

- E-commerce checkout flow testing
- User authentication flow validation
- Form submission with validation testing
- Accessibility compliance testing for components

### Jest with React

JavaScript testing framework commonly used with React.

```jsx
test("renders component", () => {
  const { getByText } = render(<MyComponent />);
  expect(getByText("Hello")).toBeInTheDocument();
});
```

**Real-world Usage:**

- Unit testing utility functions used by components
- Testing Redux reducers and action creators
- Validating component rendering with specific props
- Testing component lifecycle behaviors

### Component Mocking

Techniques for mocking components or their dependencies during tests.

```jsx
jest.mock("./SomeComponent", () => {
  return function MockedComponent() {
    return <div data-testid="mocked">Mocked Component</div>;
  };
});
```

**Real-world Usage:**

- Testing components that use third-party services
- Isolating components from complex dependencies like maps or charts
- Testing error handling without triggering actual errors
- Simulating different API response scenarios

### Custom Test Hooks

Creating special hooks for testing purposes or testing custom hooks.

```jsx
function renderHook(hook) {
  let result;
  function TestComponent() {
    result = hook();
    return null;
  }
  render(<TestComponent />);
  return result;
}
```

**Real-world Usage:**

- Testing hooks that interact with browser APIs
- Testing hooks that manage complex state transitions
- Validating custom hooks in isolation before integration
- Testing hooks with various initial states and inputs

## Advanced Patterns

### Compound Components

Components that work together to form a cohesive unit, sharing implicit state.

```jsx
function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {props.children}
    </TabContext.Provider>
  );
}

function Tab({ index, children }) {
  const { activeTab, setActiveTab } = useContext(TabContext);

  return (
    <button
      className={index === activeTab ? "active" : ""}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
}

function TabPanel({ index, children }) {
  const { activeTab } = useContext(TabContext);

  return activeTab === index ? <div>{children}</div> : null;
}

Tabs.Tab = Tab;
Tabs.Panel = TabPanel;
```

**Real-world Usage:**

- Advanced form components (Select with Option children)
- Navigation systems (Tabs with TabPanel children)
- Accordion interfaces with expandable sections
- Customizable data tables with various cell types

### Controlled vs. Uncontrolled Components

Different approaches to managing form inputs:

- **Controlled**: Component state drives the input value
- **Uncontrolled**: DOM handles the state internally

```jsx
// Controlled
function ControlledInput() {
  const [value, setValue] = useState("");
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}

// Uncontrolled
function UncontrolledInput() {
  const inputRef = useRef();
  return <input ref={inputRef} defaultValue="default" />;
}
```

**Real-world Usage:**

- Form libraries supporting both modes for flexibility
- Rich text editors with different integration options
- Third-party component wrappers adapted to application needs
- Components that can work standalone or as part of larger forms

### Component Composition

Creating flexible components by composing smaller, focused components.

```jsx
function Dialog({ children }) {
  return <div className="dialog">{children}</div>;
}

function DialogTitle({ children }) {
  return <h2 className="dialog-title">{children}</h2>;
}

function DialogContent({ children }) {
  return <div className="dialog-content">{children}</div>;
}

// Usage
<Dialog>
  <DialogTitle>Welcome</DialogTitle>
  <DialogContent>This is the content</DialogContent>
</Dialog>;
```

**Real-world Usage:**

- Design systems with consistent yet flexible components
- Dashboard widgets that can be composed in different layouts
- Navigation systems with multiple levels of customization
- Media players with customizable controls and displays

### Prop Drilling Solutions

Techniques to avoid passing props through multiple layers:

- Context API
- State management libraries
- Compound components

**Real-world Usage:**

- Deep component trees in complex dashboards
- Theming systems that need access at multiple levels
- Multi-level navigation components
- Form components with shared validation state

### Dependency Injection Patterns

Techniques for providing dependencies to components:

- Context API for providing services
- Higher-order components for injecting dependencies
- Custom hooks for accessing shared services

**Real-world Usage:**

- Testing environments injecting mock services
- Feature flags controlling component behavior
- Internationalization services provided throughout the app
- Authentication services available to protected components

## React 18+ Features

### Concurrent Rendering

A set of features allowing React to prepare multiple versions of the UI simultaneously in the background.

**Real-world Usage:**

- Social media feeds with continuous updates
- Real-time dashboards with multiple data sources
- Interactive data visualization tools
- Applications with complex animations and transitions

### Automatic Batching

Automatically batches state updates across multiple events, improving performance.

```jsx
// Before React 18 (only batched inside React events)
function handleClick() {
  setCount((c) => c + 1); // Causes a re-render
  setFlag((f) => !f); // Causes a re-render
}

// React 18 (batches these into a single re-render)
function handleClick() {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // Only one render
}
```

**Real-world Usage:**

- Form submissions triggering multiple state updates
- Data fetching that updates several pieces of state
- Event handlers that modify related state values
- Animation systems that update multiple values at once

### Streaming Server Rendering

Allows sending HTML in chunks from the server for faster first contentful paint.

**Real-world Usage:**

- Content-heavy pages where faster initial display improves UX
- News or blog sites with large articles
- E-commerce product pages with complex layouts
- SEO-critical pages that need fast time-to-content

### Transitions API

Marks UI updates as transitions vs. urgent updates, improving user experience.

```jsx
import { startTransition } from "react";

// Urgent update (like typing in an input)
setInputValue(input);

// Mark update as non-urgent transition
startTransition(() => {
  // Less urgent UI update
  setSearchResults(searchQuery);
});
```

**Real-world Usage:**

- Search interfaces that prioritize input responsiveness
- Dashboard filters that trigger heavy data recalculations
- Complex form validations that shouldn't block typing
- Image gallery interactions with background processing

### React Server Components

Components that run and render on the server, helping reduce client bundle size.

**Real-world Usage:**

- CMS-driven websites with mostly static content
- Product pages with server-generated descriptions
- Applications needing to keep sensitive logic on the server
- Dashboard applications with initial data loading on server

## React Ecosystem

### Next.js (SSR, SSG, ISR)

A React framework providing:

- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- API routes, file-based routing, and more

**Real-world Usage:**

- E-commerce sites needing SEO and fast initial loads
- Marketing sites with mostly static content (SSG)
- News sites with frequently updated content (ISR)
- SaaS applications with authenticated and public sections

### Remix

A full stack web framework for React focusing on web standards and progressive enhancement.

**Real-world Usage:**

- Web applications requiring optimal loading performance
- Sites needing progressive enhancement for broader accessibility
- Applications with complex form handling requirements
- Projects prioritizing web standards and minimal client JS

### TypeScript with React

Using TypeScript with React for type safety:

```tsx
interface Props {
  name: string;
  age: number;
  onClick?: () => void;
}

function UserProfile({ name, age, onClick }: Props) {
  return (
    <div onClick={onClick}>
      {name} ({age})
    </div>
  );
}
```

**Real-world Usage:**

- Enterprise applications with large teams
- Open-source libraries providing type safety to consumers
- Complex applications with many props and state interfaces
- Projects requiring robust refactoring capabilities

### Styled Components and CSS-in-JS

Libraries for writing CSS directly in JavaScript/TypeScript:

```jsx
import styled from "styled-components";

const Button = styled.button`
  background: ${(props) => (props.primary ? "blue" : "white")};
  color: ${(props) => (props.primary ? "white" : "blue")};
  padding: 10px 15px;
  border-radius: 4px;
`;

function App() {
  return <Button primary>Click me</Button>;
}
```

**Real-world Usage:**

- Theme-switching applications (dark/light mode)
- White-label products needing runtime style customization
- Component libraries with isolated styling
- Applications requiring dynamic styles based on props or state

### Storybook for Component Development

A tool for developing UI components in isolation:

```jsx
// Button.stories.js
export default {
  title: "Components/Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  children: "Primary Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  children: "Secondary Button",
};
```

**Real-world Usage:**

- Design system documentation and development
- Cross-team component sharing and visualization
- Visual regression testing setups
- Component development in isolation before integration


## Virtual DOM

The Virtual DOM is a lightweight JavaScript representation of the actual DOM. React uses this abstraction to minimize expensive DOM operations and improve performance.

```jsx
// React creates and manages a Virtual DOM representation
// of your components instead of directly manipulating the browser DOM
function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <p>This is rendered in the Virtual DOM first</p>
    </div>
  );
}
```

**How it works:**

1. React creates a Virtual DOM tree when components render
2. When state or props change, React creates a new Virtual DOM tree
3. React compares the new and old Virtual DOM trees (diffing)
4. Only the necessary changes are applied to the real DOM (patching)

**Benefits:**

- Batches DOM updates for better performance
- Abstracts browser inconsistencies
- Enables declarative programming model
- Powers React's cross-platform capabilities

## Reconciliation

Reconciliation is the algorithm React uses to compare two Virtual DOM trees and determine which parts need to be updated.

```jsx
// When state changes, React reconciles the difference
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

**Key concepts:**

- **Diffing algorithm**: O(n) implementation comparing tree elements
- **Key prop**: Helps React identify which items have changed, been added, or removed in lists
- **Component type matching**: React preserves state when component types match

**Best practices:**

- Use stable component identity (avoid inline function components)
- Provide unique, stable keys for list items
- Use PureComponent or React.memo for performance optimization
- Preserve DOM nodes when possible with key attributes

## Fiber Architecture

React Fiber is a complete rewrite of React's core algorithm to enable incremental rendering and improve performance for complex applications.

**Key features:**

- **Incremental rendering**: Split rendering work into chunks
- **Priority levels**: Handle high-priority updates first (like user input)
- **Pausable**: Can pause work to handle more urgent tasks
- **Reusable**: Can reuse previously completed work
- **Abortable**: Can abort work that's no longer needed

**Benefits:**

- Smoother user experience in complex applications
- Better responsiveness for user interactions
- Foundation for Concurrent Mode and Suspense

## Debouncing and Throttling

Techniques to control how many times we execute a function, especially for performance-intensive events.

```jsx
// Debounce example for search input
import { useState, useEffect, useCallback } from "react";

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [results, setResults] = useState([]);

  // Update search term immediately for responsive UI
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Debounce the API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Perform search with debounced value
  useEffect(() => {
    if (debouncedTerm) {
      fetchResults(debouncedTerm).then((data) => {
        setResults(data);
      });
    }
  }, [debouncedTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
      />
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Debouncing vs. Throttling:**

- **Debouncing**: Delays executing a function until after a certain amount of time has passed since it was last invoked
- **Throttling**: Limits how often a function can be called in a given time period

**Custom hooks for debouncing and throttling:**

```jsx
// Custom debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Custom throttle hook
function useThrottle(value, limit) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}
```

## Render Props vs. Hooks

A comparison of two patterns for sharing logic between components.

**Render Props Example:**

```jsx
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(event) {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return render(position);
}

// Usage
<MouseTracker
  render={({ x, y }) => (
    <div>
      <h1>Mouse position:</h1>
      <p>
        X: {x}, Y: {y}
      </p>
    </div>
  )}
/>;
```

**Equivalent Hook:**

```jsx
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(event) {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return position;
}

// Usage
function MouseDisplay() {
  const { x, y } = useMousePosition();

  return (
    <div>
      <h1>Mouse position:</h1>
      <p>
        X: {x}, Y: {y}
      </p>
    </div>
  );
}
```

## Event System in React

React implements a synthetic event system that normalizes events across browsers.

```jsx
function Button() {
  const handleClick = (e) => {
    // 'e' is a synthetic event
    e.preventDefault();
    console.log("Button clicked");

    // Access native event if needed
    const nativeEvent = e.nativeEvent;
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

**Key features:**

- Cross-browser compatibility
- Event pooling (pre-React 17)
- Automatic event delegation
- Support for custom events

## React Strict Mode

A development mode tool that helps identify potential problems.

```jsx
import { StrictMode } from "react";

function App() {
  return (
    <StrictMode>
      <MainComponent />
    </StrictMode>
  );
}
```

**What it checks:**

- Identifying components with unsafe lifecycles
- Warning about legacy string ref API usage
- Detecting unexpected side effects
- Detecting legacy context API
- Double-invoking functions (render, effects) to find issues

## React Under the Hood

### Component Lifecycle

The sequence of phases a component goes through:

1. **Mounting**:

   - `constructor()`
   - `static getDerivedStateFromProps()`
   - `render()`
   - `componentDidMount()`

2. **Updating**:

   - `static getDerivedStateFromProps()`
   - `shouldComponentUpdate()`
   - `render()`
   - `getSnapshotBeforeUpdate()`
   - `componentDidUpdate()`

3. **Unmounting**:

   - `componentWillUnmount()`

4. **Error Handling**:
   - `static getDerivedStateFromError()`
   - `componentDidCatch()`

### Hooks Implementation

Hooks are implemented using a linked list within React's internal data structures:

- Each hook call in a component gets its own "cell" in a list
- The order of hook calls must remain consistent between renders
- React uses this list to preserve state between renders

### Batching Updates

React batches state updates to minimize renders and improve performance:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // These updates are batched in React 18+
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    // Result: count increases by 3

    // Batching even works outside React event handlers in React 18+
    setTimeout(() => {
      setCount((c) => c + 1);
      setCount((c) => c + 1);
      // Still batched in React 18
    }, 1000);
  }

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

## React DevTools

Browser extension for inspecting React component hierarchies and profiling performance.

**Features:**

- Component tree inspection
- Props and state examination
- Component filtering
- Performance profiling
- Highlight updates
- Component timing measurements

## Concurrent Features

React 18 introduced several concurrent features for building responsive user interfaces:

1. **startTransition**: Mark state updates as non-urgent

```jsx
import { startTransition } from "react";

// Urgent update - handled immediately
setInputValue(input);

// Non-urgent update - can be interrupted
startTransition(() => {
  setSearchResults(searchQuery);
});
```

2. **useDeferredValue**: Create a deferred version of a value

```jsx
const deferredQuery = useDeferredValue(query);
```

3. **useTransition**: Track pending state of a transition

```jsx
const [isPending, startTransition] = useTransition();
```

Understanding these core concepts provides a solid foundation for mastering React and building efficient, maintainable applications.


# React 19 Features

React 19 brings several major improvements and new features to the React ecosystem. Here's an overview of the most significant additions:

## Actions (Server Functions)

React 19 introduces Actions, which are server functions that can be called directly from client components (similar to Server Actions in Next.js, but now built into React itself).

```jsx
// ServerComponent.jsx
"use server";

export async function submitForm(formData) {
  const name = formData.get("name");
  const email = formData.get("email");

  // Server-side validation
  if (!name || !email) {
    return { success: false, error: "Name and email are required" };
  }

  // Server-side operations (database access, etc.)
  await saveToDatabase({ name, email });

  return { success: true };
}

// ClientComponent.jsx
("use client");
import { submitForm } from "./ServerComponent";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>{pending ? "Submitting..." : "Submit"}</button>
  );
}

function ContactForm() {
  return (
    <form action={submitForm}>
      <input name="name" required />
      <input name="email" type="email" required />
      <SubmitButton />
    </form>
  );
}
```

## `use` Hook

A new primitive hook for consuming promises, resources, and contexts. It's designed to work with async/await and Suspense.

```jsx
import { use } from "react";

// Using with promises
function ProfilePage({ userId }) {
  const user = use(fetchUser(userId));
  return <h1>{user.name}</h1>;
}

// Using with context (alternative to useContext)
function ThemeText() {
  const theme = use(ThemeContext);
  return <p style={{ color: theme.color }}>Themed text</p>;
}

// With async/await in components
async function CommentSection({ postId }) {
  const comments = await fetchComments(postId);
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
```

## `useOptimistic` Hook

Enables optimistic UI updates before server operations complete.

```jsx
import { useOptimistic } from "react";
import { addComment } from "./actions";

function CommentSection({ comments, postId }) {
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment]
  );

  async function handleSubmit(formData) {
    const content = formData.get("comment");

    // Create optimistic version
    const optimisticComment = {
      id: "temp-id",
      content,
      author: "Current User",
      pending: true,
    };

    // Update UI optimistically
    addOptimisticComment(optimisticComment);

    // Perform actual server action
    await addComment(postId, content);
  }

  return (
    <div>
      <div className="comments-list">
        {optimisticComments.map((comment) => (
          <div key={comment.id} className={comment.pending ? "pending" : ""}>
            <p>{comment.content}</p>
            <span>{comment.author}</span>
          </div>
        ))}
      </div>

      <form action={handleSubmit}>
        <textarea name="comment" placeholder="Add a comment..." />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
```

## Document Metadata

React 19 includes built-in support for managing document metadata (similar to Next.js Head but built into React).

```jsx
import { Html, Head, Body, Title, Meta } from "react";

function App() {
  return (
    <Html lang="en">
      <Head>
        <Title>My React Application</Title>
        <Meta name="description" content="A React 19 application" />
        <Meta property="og:title" content="My React Application" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <Body>
        <main>
          <h1>Welcome to my app</h1>
          <p>This app uses React 19 document metadata features</p>
        </main>
      </Body>
    </Html>
  );
}
```

## Asset Loading

Built-in APIs for managing and preloading assets like stylesheets, fonts, and scripts.

```jsx
import { preload, preloadModule } from "react";

// Preload a resource
preload("/api/data.json", { as: "fetch" });

// Preload a stylesheet
preload("/styles/home.css", { as: "style" });

// Preload a font
preload("/fonts/Inter.woff2", { as: "font", crossOrigin: "anonymous" });

// Preload a JavaScript module
preloadModule("./features/Dashboard.js");

function App() {
  return (
    <div>
      {/* The resources are already loading when needed */}
      <link rel="stylesheet" href="/styles/home.css" />
    </div>
  );
}
```

## React Compiler (formerly React Forget)

A new compiler that automatically memoizes components and values, reducing the need for manual React.memo, useMemo, and useCallback calls.

```jsx
// Before React Compiler
function ProfileCard({ user, onEdit }) {
  // Need manual memoization
  const fullName = useMemo(() => {
    return `${user.firstName} ${user.lastName}`;
  }, [user.firstName, user.lastName]);

  const handleEdit = useCallback(() => {
    onEdit(user.id);
  }, [onEdit, user.id]);

  return (
    <div>
      <h2>{fullName}</h2>
      <Button onClick={handleEdit}>Edit</Button>
    </div>
  );
}

// With React Compiler
function ProfileCard({ user, onEdit }) {
  // Automatically memoized when needed
  const fullName = `${user.firstName} ${user.lastName}`;

  const handleEdit = () => {
    onEdit(user.id);
  };

  return (
    <div>
      <h2>{fullName}</h2>
      <Button onClick={handleEdit}>Edit</Button>
    </div>
  );
}
```

## Enhanced React Server Components

Improved Server Components architecture with better integration between client and server components.

```jsx
// ServerComponent.jsx
export default async function ProductDetails({ productId }) {
  // Data fetching on the server
  const product = await fetchProductDetails(productId);

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="price">${product.price.toFixed(2)}</p>

      {/* Client component for interactivity */}
      <AddToCartButton productId={product.id} />
    </div>
  );
}

// AddToCartButton.jsx
'use client';
import { useState } from 'react';

export default function AddToCartButton({ productId }) {
  const [isAdded, setIsAdded] = useState(false);

  function handleAddToCart() {
    addToCart(productId);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  }

  return (
    <button onClick={handleAddToCart} disabled={isAdded}>
      {isAdded ? 'Added to Cart!' : 'Add to Cart'}
    </button>
  );
}
```

## React Cache API

A built-in caching mechanism for storing and retrieving data.

```jsx
import { cache } from "react";

// Create a cached function
const fetchUserData = cache(async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

// Use in a component
function UserProfile({ userId }) {
  const userData = use(fetchUserData(userId));

  return (
    <div className="profile">
      <h2>{userData.name}</h2>
      <p>{userData.email}</p>
    </div>
  );
}
```

## Web Components Integration

Improved support for working with Web Components in React applications.

```jsx
import { useState } from "react";

// Better handling of custom events and properties
function MyWebComponentWrapper() {
  const [value, setValue] = useState("");

  return (
    <div>
      <custom-slider
        min="0"
        max="100"
        value={value}
        onchange={(e) => setValue(e.target.value)}
      />
      <p>Current value: {value}</p>
    </div>
  );
}

// Using a Web Component in React
import "my-web-components";

function App() {
  return (
    <div>
      <h1>My Application</h1>
      <my-custom-element
        name="React 19"
        options={JSON.stringify({ theme: "dark" })}
      />
    </div>
  );
}
```

## Improved Automatic Batching

React 18 introduced automatic batching of state updates, and React 19 improves this further with more consistent batching behavior.

```jsx
function UserActions() {
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [status, setStatus] = useState("idle");

  function handleAction() {
    // All of these updates trigger just one render in React 19
    setCount((c) => c + 1);
    setNotifications((n) => [...n, "New notification"]);
    setStatus("active");

    // Even updates inside event callbacks and promises are batched
    setTimeout(() => {
      setCount((c) => c + 1);
      setStatus("completed");
    }, 1000);
  }

  return <button onClick={handleAction}>Perform Actions</button>;
}
```

## Enhanced Streaming SSR

Improved Server-Side Rendering with better streaming capabilities.

```jsx
import { renderToPipeableStream } from "react-dom/server";

function handleRequest(req, res) {
  const { pipe } = renderToPipeableStream(<App />, {
    bootstrapScripts: ["/main.js"],
    onShellReady() {
      // Stream the shell as soon as possible
      res.setHeader("Content-Type", "text/html");
      pipe(res);
    },
    onAllReady() {
      // Optional: if you want to wait for all Suspense boundaries
      console.log("All content ready");
    },
  });
}
```

## Full TypeScript Integration

React 19 includes improved TypeScript integration with better type inference and type checking.

```tsx
// More precise typing for hooks and components
function UserProfile<T extends { name: string; email: string }>({
  user,
}: {
  user: T;
}) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// Better type inference for props
type ButtonProps = {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

function Button({
  variant = "primary",
  size = "medium",
  onClick,
  disabled,
  children,
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

These features represent significant improvements to the React ecosystem, making it easier to build performant, maintainable applications with better developer experience.


