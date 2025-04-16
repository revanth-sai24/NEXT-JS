# React Interview Preparation Guide

This guide is designed to help React developers with 3 years of experience prepare for technical interviews, covering basic to advanced concepts and business-oriented questions.

## Table of Contents

- [Basic React Concepts](#basic-react-concepts)
- [Intermediate React Topics](#intermediate-react-topics)
- [Advanced React Concepts](#advanced-react-concepts)
- [Performance Optimization](#performance-optimization)
- [State Management](#state-management)
- [React Architecture & Patterns](#react-architecture--patterns)
- [Testing React Applications](#testing-react-applications)
- [React Ecosystem & Integration](#react-ecosystem--integration)
- [Business & Project Questions](#business--project-questions)
- [Behavioral Questions](#behavioral-questions)
- [Practical Coding Challenges](#practical-coding-challenges)

## Basic React Concepts

While you have 3 years of experience, interviewers often test fundamental knowledge to ensure a solid foundation.

### Key Questions:

1. **What is React and what are its core features?**

   - React is a JavaScript library for building user interfaces
   - Key features: Virtual DOM, component-based architecture, declarative syntax, unidirectional data flow

2. **Explain the difference between functional and class components**

   ```jsx
   // Functional component
   function Welcome(props) {
     return <h1>Hello, {props.name}</h1>;
   }

   // Class component
   class Welcome extends React.Component {
     render() {
       return <h1>Hello, {this.props.name}</h1>;
     }
   }
   ```

3. **What are props and state in React?**

   - Props: External data passed to components, immutable
   - State: Internal data managed by the component, mutable

4. **Explain the component lifecycle in React**

   - Mounting: componentDidMount
   - Updating: componentDidUpdate
   - Unmounting: componentWillUnmount
   - Hooks equivalent: useEffect

5. **What are controlled vs. uncontrolled components?**

   ```jsx
   // Controlled component
   function ControlledInput() {
     const [value, setValue] = useState("");
     return <input value={value} onChange={(e) => setValue(e.target.value)} />;
   }

   // Uncontrolled component
   function UncontrolledInput() {
     const inputRef = useRef();
     return <input ref={inputRef} defaultValue="default" />;
   }
   ```

6. **What is JSX and how does it work?**
   - JSX is a syntax extension for JavaScript that looks similar to HTML
   - It's transpiled to React.createElement() calls before execution
   - Allows writing HTML-like code in JavaScript

## Intermediate React Topics

These topics demonstrate deeper understanding of React's capabilities.

### Key Questions:

1. **Explain React Hooks and their advantages**

   - Hooks allow functional components to use state and lifecycle features
   - Common hooks: useState, useEffect, useContext, useReducer, useRef
   - Advantages: Simplify component logic, promote reuse, avoid class complexity

   ```jsx
   // Custom hook example
   function useWindowSize() {
     const [size, setSize] = useState({ width: 0, height: 0 });

     useEffect(() => {
       function updateSize() {
         setSize({ width: window.innerWidth, height: window.innerHeight });
       }
       window.addEventListener("resize", updateSize);
       updateSize();
       return () => window.removeEventListener("resize", updateSize);
     }, []);

     return size;
   }
   ```

2. **How do you handle API calls in React?**

   - Fetch in useEffect
   - Handling loading/error states
   - Using custom hooks for data fetching
   - Libraries like React Query, SWR

   ```jsx
   function UserProfile({ userId }) {
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
       async function fetchUser() {
         try {
           setLoading(true);
           const response = await fetch(`/api/users/${userId}`);
           if (!response.ok) throw new Error("Failed to fetch");
           const data = await response.json();
           setUser(data);
         } catch (err) {
           setError(err.message);
         } finally {
           setLoading(false);
         }
       }

       fetchUser();
     }, [userId]);

     if (loading) return <div>Loading...</div>;
     if (error) return <div>Error: {error}</div>;
     if (!user) return null;

     return (
       <div>
         <h1>{user.name}</h1>
         <p>{user.email}</p>
       </div>
     );
   }
   ```

3. **Explain Context API and when to use it**

   - Provides way to share values between components without prop drilling
   - Best for global state that changes infrequently
   - Examples: themes, user authentication, language preferences

   ```jsx
   // Creating context
   const ThemeContext = React.createContext("light");

   // Provider component
   function App() {
     const [theme, setTheme] = useState("light");
     return (
       <ThemeContext.Provider value={{ theme, setTheme }}>
         <MainContent />
       </ThemeContext.Provider>
     );
   }

   // Consumer component using hook
   function ThemedButton() {
     const { theme, setTheme } = useContext(ThemeContext);
     return (
       <button
         onClick={() => setTheme(theme === "light" ? "dark" : "light")}
         style={{
           background: theme === "light" ? "#fff" : "#333",
           color: theme === "light" ? "#333" : "#fff",
         }}
       >
         Toggle Theme
       </button>
     );
   }
   ```

4. **What are React Fragments and when would you use them?**

   ```jsx
   // Using Fragment to avoid unnecessary div wrappers
   function Table() {
     return (
       <table>
         <tbody>
           <tr>
             <React.Fragment>
               <td>Cell 1</td>
               <td>Cell 2</td>
             </React.Fragment>
           </tr>
         </tbody>
       </table>
     );
   }

   // Short syntax
   function List() {
     return (
       <>
         <li>Item 1</li>
         <li>Item 2</li>
       </>
     );
   }
   ```

5. **How do you optimize re-renders in React?**

   - React.memo for function components
   - PureComponent for class components
   - useCallback for event handlers
   - useMemo for expensive calculations

6. **Explain React Router and its core features**
   - Client-side routing for React applications
   - Components: BrowserRouter, Route, Link, Switch
   - Features: Nested routes, route parameters, navigation guards

## Advanced React Concepts

These questions test deeper expertise and specialized knowledge.

### Key Questions:

1. **Explain the Virtual DOM and React's reconciliation algorithm**

   - Virtual DOM is a lightweight copy of the actual DOM
   - Reconciliation is the process of comparing previous and new Virtual DOM trees
   - Uses keys in lists to efficiently update changed elements
   - O(n) complexity using heuristics like different component types produce different trees

2. **How does React handle events?**

   - Synthetic events system
   - Event delegation
   - Event pooling (pre React 17)
   - Event normalization across browsers

3. **Explain React Suspense and its use cases**

   ```jsx
   // Code splitting with Suspense
   const ProfilePage = React.lazy(() => import("./ProfilePage"));

   function App() {
     return (
       <Suspense fallback={<LoadingSpinner />}>
         <ProfilePage />
       </Suspense>
     );
   }
   ```

4. **What are Error Boundaries in React?**

   ```jsx
   class ErrorBoundary extends React.Component {
     constructor(props) {
       super(props);
       this.state = { hasError: false };
     }

     static getDerivedStateFromError(error) {
       return { hasError: true };
     }

     componentDidCatch(error, errorInfo) {
       logErrorToService(error, errorInfo);
     }

     render() {
       if (this.state.hasError) {
         return <h1>Something went wrong.</h1>;
       }
       return this.props.children;
     }
   }

   // Usage
   <ErrorBoundary>
     <MyComponent />
   </ErrorBoundary>;
   ```

5. **Explain Server Components in React**

   - Components that run on the server
   - Benefits: Reduced bundle size, access to server resources, improved loading performance
   - Interaction with Client Components

6. **What are Portals in React and when would you use them?**

   ```jsx
   // Creating a portal for a modal
   function Modal({ children, isOpen }) {
     if (!isOpen) return null;

     return ReactDOM.createPortal(
       <div className="modal-overlay">
         <div className="modal-content">{children}</div>
       </div>,
       document.getElementById("modal-root")
     );
   }
   ```

7. **Explain React Fiber architecture**
   - Complete rewrite of React's core algorithm
   - Enables incremental rendering
   - Prioritizes and schedules different types of updates
   - Foundation for concurrent mode

## Performance Optimization

Demonstrating expertise in making React applications faster.

### Key Questions:

1. **How would you analyze and improve the performance of a React application?**

   - React DevTools Profiler
   - Chrome Performance tab
   - Web Vitals metrics (LCP, FID, CLS)
   - Lighthouse reports

2. **Explain code splitting and how it improves performance**

   ```jsx
   // Route-based code splitting
   import { lazy, Suspense } from "react";

   const Home = lazy(() => import("./pages/Home"));
   const Dashboard = lazy(() => import("./pages/Dashboard"));
   const Settings = lazy(() => import("./pages/Settings"));

   function App() {
     return (
       <Suspense fallback={<div>Loading...</div>}>
         <Switch>
           <Route exact path="/" component={Home} />
           <Route path="/dashboard" component={Dashboard} />
           <Route path="/settings" component={Settings} />
         </Switch>
       </Suspense>
     );
   }
   ```

3. **How would you implement virtualization for large lists?**

   ```jsx
   import { FixedSizeList } from "react-window";

   function VirtualizedList({ items }) {
     const Row = ({ index, style }) => (
       <div style={style}>Item {items[index]}</div>
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

4. **Explain the concept of memoization in React and when to use it**

   - Using React.memo, useMemo, and useCallback
   - Trade-offs between memory and computation
   - When memoization is beneficial vs. overkill

5. **How do you handle resource prefetching in React?**
   - Prefetching assets
   - Preloading components
   - Eager vs. lazy loading strategies

## State Management

Demonstrating knowledge of state management approaches.

### Key Questions:

1. **Compare different state management solutions (Context API, Redux, MobX, Zustand, Recoil)**

   - When to use each one
   - Trade-offs in complexity, performance, developer experience
   - Context + useReducer vs. external libraries

2. **How would you structure a Redux store for a large application?**

   - Feature-based organization
   - Redux Toolkit implementation
   - Handling async operations with middleware
   - Normalization of complex data

3. **Explain the concept of middleware in Redux**

   ```jsx
   // Custom logging middleware
   const logger = (store) => (next) => (action) => {
     console.log("dispatching", action);
     const result = next(action);
     console.log("next state", store.getState());
     return result;
   };

   // Using middleware
   import { createStore, applyMiddleware } from "redux";
   import thunk from "redux-thunk";

   const store = createStore(rootReducer, applyMiddleware(thunk, logger));
   ```

4. **What are side effects in React/Redux and how do you manage them?**
   - Common side effects: API calls, timers, subscriptions
   - Management with useEffect, Redux middleware (thunks, sagas)
   - Handling cleanup to prevent memory leaks

## React Architecture & Patterns

Discussing higher-level design decisions.

### Key Questions:

1. **Explain component composition and how it helps with reusability**

   ```jsx
   // Composition example
   function Dialog({ title, children, footer }) {
     return (
       <div className="dialog">
         <div className="dialog-header">{title}</div>
         <div className="dialog-content">{children}</div>
         <div className="dialog-footer">{footer}</div>
       </div>
     );
   }

   // Usage
   <Dialog
     title={<h2>Welcome</h2>}
     footer={<Button onClick={onClose}>Close</Button>}
   >
     <p>Thank you for visiting our application.</p>
   </Dialog>;
   ```

2. **Compare presentational vs. container components pattern**

   - Presentational: Focused on UI, receive data via props
   - Container: Connected to data sources, manage state
   - Benefits of separation and modern alternatives

3. **How would you structure a large React application?**

   - Feature-based folder structure
   - Component organization (Atomic Design)
   - Code splitting strategies
   - Module boundaries

4. **Describe the Compound Components pattern**

   ```jsx
   // Compound components pattern
   function Tabs({ children, defaultIndex = 0 }) {
     const [activeIndex, setActiveIndex] = useState(defaultIndex);

     const context = {
       activeIndex,
       setActiveIndex,
     };

     return (
       <TabsContext.Provider value={context}>
         <div className="tabs">{children}</div>
       </TabsContext.Provider>
     );
   }

   function TabList({ children }) {
     return <div className="tab-list">{children}</div>;
   }

   function Tab({ index, children }) {
     const { activeIndex, setActiveIndex } = useContext(TabsContext);
     return (
       <button
         className={activeIndex === index ? "active" : ""}
         onClick={() => setActiveIndex(index)}
       >
         {children}
       </button>
     );
   }

   function TabPanel({ index, children }) {
     const { activeIndex } = useContext(TabsContext);
     if (activeIndex !== index) return null;
     return <div className="tab-panel">{children}</div>;
   }

   // Usage
   <Tabs>
     <TabList>
       <Tab index={0}>Profile</Tab>
       <Tab index={1}>Settings</Tab>
     </TabList>
     <TabPanel index={0}>Profile content</TabPanel>
     <TabPanel index={1}>Settings content</TabPanel>
   </Tabs>;
   ```

5. **How do you handle forms in React applications?**
   - Controlled vs. uncontrolled inputs
   - Form libraries (Formik, React Hook Form)
   - Validation strategies

## Testing React Applications

Demonstrate knowledge of testing methodologies.

### Key Questions:

1. **What testing libraries and frameworks do you use with React?**

   - Jest, React Testing Library, Cypress
   - Unit, integration, and E2E testing approaches
   - Test organization and best practices

2. **How do you test custom hooks?**

   ```jsx
   // Testing a custom hook with React Testing Library
   import { renderHook, act } from "@testing-library/react-hooks";
   import useCounter from "./useCounter";

   test("should increment counter", () => {
     const { result } = renderHook(() => useCounter());

     act(() => {
       result.current.increment();
     });

     expect(result.current.count).toBe(1);
   });
   ```

3. **How would you test a component that uses Context?**

   ```jsx
   // Testing components with context
   import { render, screen } from "@testing-library/react";
   import { ThemeContext } from "./ThemeContext";
   import ThemedButton from "./ThemedButton";

   test("renders button with dark theme", () => {
     render(
       <ThemeContext.Provider value={{ theme: "dark" }}>
         <ThemedButton>Click me</ThemedButton>
       </ThemeContext.Provider>
     );

     const button = screen.getByRole("button");
     expect(button).toHaveStyle({ backgroundColor: "#333" });
   });
   ```

4. **Explain the concept of snapshot testing**
   - Capturing component output and comparing to baseline
   - Benefits: Quick regression testing
   - Challenges: Brittle tests, noise in snapshots

## React Ecosystem & Integration

Understanding how React works with other technologies.

### Key Questions:

1. **Explain your experience with Next.js and when you would use it**

   - Server-side rendering benefits
   - Static site generation
   - API routes
   - File-based routing

2. **How do you handle styling in React applications?**

   - CSS modules
   - Styled-components
   - Tailwind CSS
   - CSS-in-JS solutions
   - Performance implications

3. **Describe your experience with TypeScript in React projects**

   ```tsx
   // TypeScript with React example
   interface ButtonProps {
     variant: "primary" | "secondary" | "danger";
     size?: "small" | "medium" | "large";
     isDisabled?: boolean;
     onClick: () => void;
     children: React.ReactNode;
   }

   const Button: React.FC<ButtonProps> = ({
     variant,
     size = "medium",
     isDisabled = false,
     onClick,
     children,
   }) => {
     return (
       <button
         className={`btn btn-${variant} btn-${size}`}
         disabled={isDisabled}
         onClick={onClick}
       >
         {children}
       </button>
     );
   };
   ```

4. **How do you integrate React with backend technologies?**
   - REST API integration patterns
   - GraphQL with Apollo or Relay
   - WebSockets for real-time features

## Business & Project Questions

These questions evaluate your understanding of React in a business context.

### Key Questions:

1. **How do you decide between using React Native vs. React for web?**

   - Considerations for mobile-first experiences
   - Code sharing strategies
   - Performance trade-offs
   - Team expertise and resource allocation

2. **What factors would you consider when choosing between a SPA (React) vs. SSR (Next.js)?**

   - SEO requirements
   - Performance considerations
   - Time-to-interactive importance
   - Development complexity

3. **How do you balance technical debt vs. new feature development?**

   - Refactoring strategies
   - Measuring technical debt impact
   - Making business cases for code improvements

4. **Describe how you would migrate a large legacy application to React**

   - Incremental migration strategies
   - Parallel implementations
   - Feature flagging
   - Measuring success metrics

5. **How do you ensure accessibility in React applications?**

   - Semantic HTML with JSX
   - ARIA attributes
   - Keyboard navigation
   - Screen reader testing

6. **How do you approach responsive design in React applications?**
   - CSS strategies (media queries, flexbox, grid)
   - Component-based responsiveness
   - Mobile-first development
   - Testing across devices

## Behavioral Questions

Prepare for questions about your experience and teamwork.

1. **Tell me about a challenging React project you worked on**

   - Prepare a STAR (Situation, Task, Action, Result) formatted response
   - Focus on technical challenges and your solutions
   - Highlight your specific contributions

2. **How do you keep up with changes in the React ecosystem?**

   - Mention resources: blogs, podcasts, conferences
   - Describe your learning process
   - Talk about implementing new features/patterns

3. **Describe how you've mentored junior developers in React**

   - Training methodologies
   - Code review processes
   - Knowledge sharing initiatives

4. **How do you approach code reviews for React components?**
   - What you look for in component structure
   - Performance considerations
   - Reusability and maintainability aspects

## Practical Coding Challenges

Be prepared for common React coding exercises.

1. **Build a simple todo list with CRUD operations**

   - State management
   - Form handling
   - List rendering with keys

2. **Implement a data fetch with loading, error, and success states**

   - useEffect patterns
   - API integration
   - Conditional rendering

3. **Create a custom hook for a specific purpose**

   - Window resize
   - Form validation
   - API data fetching

4. **Debug a React performance issue**

   - Identifying unnecessary re-renders
   - Using React DevTools
   - Implementing memoization

5. **Implement a design system component with proper props API**
   - Component composition
   - Prop validation
   - Style variants
   - Accessibility considerations

Remember to:

- Review your own projects before interviews
- Be prepared to explain technical decisions
- Practice coding challenges on a whiteboard or in a code editor
- Consider the business impact of your technical decisions
- Demonstrate both technical depth and communication skills
