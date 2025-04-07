
# Advanced React Concepts

This guide covers advanced React concepts that developers should understand to build efficient and scalable applications.

## Core Advanced Concepts

### Render Props Pattern
A technique where a component receives a function as a prop that returns a React element, allowing for component logic reuse. The component calls this function instead of implementing its own rendering logic.

```jsx
// Example
<DataProvider render={data => (
  <DisplayComponent data={data} />
)} />
```

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

### Context API
Provides a way to pass data through the component tree without having to pass props manually at each level. Useful for global data like themes, user information, or language preferences.

```jsx
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}
```

### React.memo
A higher-order component that memoizes the rendered output, preventing unnecessary re-renders when props haven't changed.

```jsx
const MemoizedComponent = React.memo(function MyComponent(props) {
  // Render using props
});
```

### useCallback and useMemo Hooks
- **useCallback**: Memoizes functions to prevent unnecessary re-creation between renders
- **useMemo**: Memoizes computed values to prevent recalculation between renders

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### Custom Hooks
Reusable functions that contain stateful logic, allowing you to extract component logic into reusable functions.

```jsx
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener('resize', updateSize);
    updateSize();
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  return size;
}
```

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

### Portals
Render children into a DOM node that exists outside the DOM hierarchy of the parent component.

```jsx
ReactDOM.createPortal(
  children,
  document.getElementById('modal-root')
);
```

### Suspense and Lazy Loading
Enables loading components on demand and showing fallback content while loading.

```jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function MyComponent() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </React.Suspense>
  );
}
```

### Server Components
A new paradigm allowing components to run directly on the server, reducing bundle size and enabling direct access to server resources.

## State Management

### Redux and Redux Toolkit
A predictable state container for JavaScript apps with centralized store, actions, and reducers. Redux Toolkit simplifies Redux setup and usage.

```jsx
import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      state.value += 1;
    }
  }
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});
```

### Zustand
A small, fast, and scalable state management solution with a simple API.

```jsx
import create from 'zustand';

const useStore = create(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
}));
```

### Recoil
A state management library by Facebook providing shared state atoms and selectors.

```jsx
import { atom, useRecoilState } from 'recoil';

const counterState = atom({
  key: 'counterState',
  default: 0,
});

function Counter() {
  const [count, setCount] = useRecoilState(counterState);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Jotai
An atomic approach to global React state management with a minimal API.

```jsx
import { atom, useAtom } from 'jotai';

const countAtom = atom(0);

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

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

### XState
State management with explicit finite state machines and statecharts.

```jsx
import { createMachine, interpret } from 'xstate';

const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } }
  }
});
```

## Performance Optimization

### React Profiler
A tool in React DevTools for measuring rendering performance of components.

### Code Splitting
Breaking down bundles to load JavaScript on demand rather than loading everything at once.

```jsx
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### Virtual Lists (Windowing/Virtualization)
Technique for rendering only visible items in long lists to improve performance.

```jsx
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>{items[index]}</div>
  );

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

### Memoization Techniques
Using memoization through React.memo, useMemo, and useCallback to prevent unnecessary calculations and renders.

### Bundle Size Optimization
Techniques like tree shaking, code splitting, and using lightweight alternatives to reduce application size.

## Advanced Hooks

### useImperativeHandle
Customizes the instance value exposed when using `ref`.

```jsx
function FancyInput(props, ref) {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  
  return <input ref={inputRef} />;
}

FancyInput = forwardRef(FancyInput);
```

### useLayoutEffect
Similar to useEffect but fires synchronously after DOM mutations and before browser paint.

```jsx
useLayoutEffect(() => {
  // DOM measurement or mutation that should be synchronized with browser paint
}, [dependency]);
```

### useDebugValue
Used in custom hooks to display a label for custom hooks in React DevTools.

```jsx
function useCustomHook() {
  // ...
  useDebugValue('Custom hook label');
  return value;
}
```

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

### useTransition and useDeferredValue
Transition marks state updates as non-urgent, allowing urgent updates to interrupt them.
useDeferredValue creates a deferred version of a value that may "lag behind" the original.

```jsx
const [isPending, startTransition] = useTransition();
const deferredValue = useDeferredValue(value);
```

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

## Testing

### React Testing Library
A library for testing React components focusing on testing components as users would interact with them.

```jsx
import { render, screen, fireEvent } from '@testing-library/react';

test('increments counter', () => {
  render(<Counter />);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

### Jest with React
JavaScript testing framework commonly used with React.

```jsx
test('renders component', () => {
  const { getByText } = render(<MyComponent />);
  expect(getByText('Hello')).toBeInTheDocument();
});
```

### Component Mocking
Techniques for mocking components or their dependencies during tests.

```jsx
jest.mock('./SomeComponent', () => {
  return function MockedComponent() {
    return <div data-testid="mocked">Mocked Component</div>;
  };
});
```

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
      className={index === activeTab ? 'active' : ''}
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

### Controlled vs. Uncontrolled Components
Different approaches to managing form inputs:
- **Controlled**: Component state drives the input value
- **Uncontrolled**: DOM handles the state internally

```jsx
// Controlled
function ControlledInput() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}

// Uncontrolled
function UncontrolledInput() {
  const inputRef = useRef();
  return <input ref={inputRef} defaultValue="default" />;
}
```

### Component Composition
Creating flexible components by composing smaller, focused components.

```jsx
function Dialog({ children }) {
  return (
    <div className="dialog">
      {children}
    </div>
  );
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
</Dialog>
```

### Prop Drilling Solutions
Techniques to avoid passing props through multiple layers:
- Context API
- State management libraries
- Compound components

### Dependency Injection Patterns
Techniques for providing dependencies to components:
- Context API for providing services
- Higher-order components for injecting dependencies
- Custom hooks for accessing shared services

## React 18+ Features

### Concurrent Rendering
A set of features allowing React to prepare multiple versions of the UI simultaneously in the background.

### Automatic Batching
Automatically batches state updates across multiple events, improving performance.

```jsx
// Before React 18 (only batched inside React events)
function handleClick() {
  setCount(c => c + 1); // Causes a re-render
  setFlag(f => !f); // Causes a re-render
}

// React 18 (batches these into a single re-render)
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // Only one render
}
```

### Streaming Server Rendering
Allows sending HTML in chunks from the server for faster first contentful paint.

### Transitions API
Marks UI updates as transitions vs. urgent updates, improving user experience.

```jsx
import { startTransition } from 'react';

// Urgent update (like typing in an input)
setInputValue(input);

// Mark update as non-urgent transition
startTransition(() => {
  // Less urgent UI update
  setSearchResults(searchQuery);
});
```

### React Server Components
Components that run and render on the server, helping reduce client bundle size.

## React Ecosystem

### Next.js (SSR, SSG, ISR)
A React framework providing:
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- API routes, file-based routing, and more

### Remix
A full stack web framework for React focusing on web standards and progressive enhancement.

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

### Styled Components and CSS-in-JS
Libraries for writing CSS directly in JavaScript/TypeScript:

```jsx
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'white'};
  color: ${props => props.primary ? 'white' : 'blue'};
  padding: 10px 15px;
  border-radius: 4px;
`;

function App() {
  return <Button primary>Click me</Button>;
}
```

### Storybook for Component Development
A tool for developing UI components in isolation:

```jsx
// Button.stories.js
export default {
  title: 'Components/Button',
  component: Button,
};

const Template = args => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Secondary Button',
};
```
