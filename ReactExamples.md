# CodeAutomation

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

**Practical Example:**

````jsx
// Mouse tracker component using render props
function MouseTracker({ render }) {// MouseTracker component using render props
  const [position, setPosition] = useState({ x: 0, y: 0 });MouseTracker = ({ render }) => {
  osition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };  setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);  };
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);    window.addEventListener("mousemove", handleMouseMove);
  ow.removeEventListener("mousemove", handleMouseMove);
  return render(position);  }, []);
}

// Usage in interactive visualization
<MouseTracker
  render={({ x, y }) => (// Usage
    <div>
      <h3>Current mouse position:</h3>  render={({ x, y }) => (
      <p>X: {x}, Y: {y}</p>
      <CustomCursor position={{ x, y }} />      <h1>Mouse position:</h1>
    </div><p>
  )}
/>      </p>
```sor x={x} y={y} />

### Higher-Order Components (HOCs)

Functions that take a component and return a new enhanced component. HOCs allow for reusing component logic, adding additional props, or modifying behavior.

```jsx## Higher-Order Components (HOCs)
const withAuth = (Component) => {
  return function WithAuth(props) {Functions that take a component and return a new enhanced component. HOCs allow for reusing component logic, adding additional props, or modifying behavior.
    const isAuthenticated = checkAuth();
    return isAuthenticated ? <Component {...props} /> : <LoginPage />;```jsx
  };
};
````

s} /> : <LoginPage />;
**Real-world Usage:** };

- Authentication wrappers that redirect unauthenticated users```
- Analytics tracking that injects tracking methods into components
- Redux's connect() HOC for connecting components to the store**Real-world Usage:**
- Internationalization wrappers that inject translation functions

**Practical Example:**at injects tracking methods into components

```jsxedux's connect() HOC for connecting components to the store
// Analytics tracking HOCnternationalization wrappers that inject translation functions
function withAnalytics(Component) {
  return function WithAnalytics(props) {*
    useEffect(() => {
      // Track page view when component mounts
      analytics.trackPageView({
        component: Component.displayName || Component.name,
        timestamp: new Date()
      });    useEffect(() => {
      ponent mounts
      return () => {      analytics.trackPageView({
        analytics.trackEvent('component_unmounted', {
          component: Component.displayName || Component.name
        });      });
      }; []);
    }, []);
    t {...props} />;
    return <Component {...props} />;
  };};
}
Usage
// Usageconst DashboardPage = () => <div>Dashboard Content</div>;
const ProductPage = ({ product }) => (alytics = withAnalytics(DashboardPage);
  <div className="product-page">{/* Product content */}</div>
);lly track it

const ProductPageWithAnalytics = withAnalytics(ProductPage);
// Now ProductPage automatically sends analytics data
```

o pass data through the component tree without having to pass props manually at each level. Useful for global data like themes, user information, or language preferences.

### Context API

Provides a way to pass data through the component tree without having to pass props manually at each level. Useful for global data like themes, user information, or language preferences.const ThemeContext = React.createContext("light");

````jsx
const ThemeContext = React.createContext("light");
    <ThemeContext.Provider value="dark">
function App() { />
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>```
  );
}e:**
````

**Real-world Usage:**thentication context providing current user data

- Multi-language support/internationalization
- Theme providers for styling (dark/light mode) management across the application
- User authentication context providing current user data
- Multi-language support/internationalizationractical Example:\*\*
- Feature flag management across the application

**Practical Example:**// Theme context implementation

````jsx
// Multi-language support with Context API
const LanguageContext = React.createContext({
  language: 'en',
  setLanguage: () => {}
});const ThemeProvider = ({ children }) => {
heme] = useState("light");
function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem('language') || 'en'    setTheme(theme === "light" ? "dark" : "light");
  );

  useEffect(() => {
    localStorage.setItem('language', language);.Provider value={{ theme, toggleTheme }}>
  }, [language]);>{children}</div>
   </ThemeContext.Provider>
  return (  );
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>Component using theme context
  );const ThemedButton = () => {
}eme, toggleTheme } = useContext(ThemeContext);

// Component using language context
function Greeting() {button
  const { language } = useContext(LanguageContext);
     style={{
  const greetings = {       background: theme === "light" ? "#fff" : "#333",
    en: 'Hello, welcome!',     color: theme === "light" ? "#333" : "#fff",
    es: '¡Hola, bienvenido!',        border: `1px solid ${theme === "light" ? "#333" : "#fff"}`,
    fr: 'Bonjour, bienvenue!'
  };    >

  return <h2>{greetings[language] || greetings.en}</h2>;
}

// Language selector component
function LanguageSelector() {
  const { language, setLanguage } = useContext(LanguageContext);<ThemeProvider>

  return (</ThemeProvider>;
    <select value={language} onChange={e => setLanguage(e.target.value)}>
      <option value="en">English</option>
      <option value="es">Español</option> React.memo
      <option value="fr">Français</option>
    </select>ent that memoizes the rendered output, preventing unnecessary re-renders when props haven't changed.
  );
}
```) {

### React.memo
````

A higher-order component that memoizes the rendered output, preventing unnecessary re-renders when props haven't changed.
**Real-world Usage:**

````jsx
const MemoizedComponent = React.memo(function MyComponent(props) {- Items in large lists where each item's rendering is expensive
  // Render using propsonents in dashboards that don't need to re-render when other parts change
});layout
```- UI components like modals or tooltips that shouldn't re-render with parent changes

**Real-world Usage:**l Example:**

- Items in large lists where each item's rendering is expensive
- Components in dashboards that don't need to re-render when other parts changem component
- Sidebar components that rarely change but are part of a complex layoutt ProductCard = React.memo(({ product, onAddToCart }) => {
- UI components like modals or tooltips that shouldn't re-render with parent changes console.log(`Rendering product: ${product.id}`);

**Practical Example:**  // Some expensive calculation for display
```jsxe = useMemo(() => {
// Comment component in a social media feed    return new Intl.NumberFormat("en-US", {
const Comment = React.memo(({ author, text, timestamp }) => {
  console.log(`Rendering comment by ${author}`);

  const formattedDate = useMemo(() => {
    return new Date(timestamp).toLocaleString();
  }, [timestamp]);
      <div className="product-card">
  return (
    <div className="comment">      <h3>{product.name}</h3>
      <div className="comment-header">ice}</p>
        <span className="author">{author}</span>      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
        <span className="time">{formattedDate}</span>
      </div>
      <p className="comment-text">{text}</p>
    </div>
  );// In parent component
}); ({ products }) => {
  const handleAddToCart = useCallback((productId) => {
// Usage in a feed where comments rarely change but parent re-renders frequently
function CommentsFeed({ comments, onNewPost }) {    console.log(`Adding product ${productId} to cart`);
  const [newComment, setNewComment] = useState('');
  // Other state that changes frequently...
  rn (
  return (
    <div className="comments-feed">      {products.map((product) => (
      {comments.map(comment => (
        <Commentduct.id}
          key={comment.id}
          author={comment.author}ddToCart={handleAddToCart}
          text={comment.text}
          timestamp={comment.timestamp}
        />div>
      ))}
      {/* Form that causes parent re-renders but doesn't affect Comments */}
    </div>```
  );
}ack and useMemo Hooks
````

useCallback\*\*: Memoizes functions to prevent unnecessary re-creation between renders

### useCallback and useMemo Hooks\*useMemo\*\*: Memoizes computed values to prevent recalculation between renders

- **useCallback**: Memoizes functions to prevent unnecessary re-creation between renders```jsx
- **useMemo**: Memoizes computed values to prevent recalculation between rendersk = useCallback(() => {
  doSomething(a, b);

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);, [a, b]);
}, [a, b]);

const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);d Usage:**
```

s
**Real-world Usage:**- Complex data transformations used in renders (sorting, filtering large datasets)
nsive calculations like chart data processing or geometry calculations

- Event handlers passed to child components in performance-critical listsdepends on multiple changing variables
- Complex data transformations used in renders (sorting, filtering large datasets)
- Expensive calculations like chart data processing or geometry calculations
- API request formation that depends on multiple changing variables

**Practical Example:**ata filtering with useMemo and useCallback

````jsxst FilterableProductList = ({ products }) => {
// Dashboard with expensive data processing  const [filter, setFilter] = useState("");
function ProductDashboard({ products, salesData }) {
  const [selectedCategory, setSelectedCategory] = useState('all');  // Memoized filtered products

  // Memoized filter function
  const getFilteredProducts = useCallback((category) => {
    console.log('Filtering products by:', category);
    if (category === 'all') return products;    return products.filter((product) =>
    return products.filter(product => product.category === category);uct.name.toLowerCase().includes(filter.toLowerCase())
  }, [products]);    );

  // Memoized expensive calculation
  const salesMetrics = useMemo(() => {emoized handler function
    console.log('Calculating sales metrics');> {
    // This would be an expensive calculation in a real app    setFilter(e.target.value);
    return {
      totalSales: salesData.reduce((sum, sale) => sum + sale.amount, 0),
      averageSale: salesData.reduce((sum, sale) => sum + sale.amount, 0) / salesData.length,
      topProducts: salesData <div>
        .sort((a, b) => b.amount - a.amount)      <input
        .slice(0, 5)
        .map(sale => sale.productId)
    };
  }, [salesData]);       placeholder="Filter products..."
     />
  const filteredProducts = getFilteredProducts(selectedCategory);      <p>
  eredProducts.length} of {products.length}
  return (      </p>
    <div className="dashboard">
      <CategoryFilter
        selectedCategory={selectedCategory}
        onChange={setSelectedCategory}
      />```
      <SalesChart metrics={salesMetrics} />
      <ProductTable products={filteredProducts} />### Custom Hooks
    </div>
  );Reusable functions that contain stateful logic, allowing you to extract component logic into reusable functions.
}
````

function useWindowSize() {

### Custom HooksuseState({ width: 0, height: 0 });

Reusable functions that contain stateful logic, allowing you to extract component logic into reusable functions.

```jsx
function useWindowSize() {   };
  const [size, setSize] = useState({ width: 0, height: 0 });
    window.addEventListener("resize", updateSize);
  useEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });esize", updateSize);
    };

    window.addEventListener("resize", updateSize);
    updateSize();}

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;LocalStorage` for persisting state across page reloads
}g/error states
```

- `useOnClickOutside` for detecting clicks outside modal/popup elements
  **Real-world Usage:**keyboard shortcuts

- `useLocalStorage` for persisting state across page reloads**Practical Example:**
- `useFetch` for data fetching with loading/error states
- `useMediaQuery` for responsive designs
- `useOnClickOutside` for detecting clicks outside modal/popup elementsuseLocalStorage hook implementation
- `useKeyPress` for keyboard shortcutsfunction useLocalStorage(key, initialValue) {
  l value from localStorage or use the provided initial value
  **Practical Example:**, setStoredValue] = useState(() => {

````jsx try {
// Authentication hook for applications     const item = window.localStorage.getItem(key);
function useAuth() {      return item ? JSON.parse(item) : initialValue;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);   return initialValue;
   }
  // Check if user is logged in on mount  });
  useEffect(() => {
    const checkAuthStatus = async () => {  // Update localStorage when storedValue changes
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');
        dValue) : value;
        if (!token) {
          setUser(null);toredValue(valueToStore);
          return;      window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
              console.error(error);
        // Validate token with API
        const response = await fetch('/api/auth/validate', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Invalid token');

        const userData = await response.json();
        setUser(userData);("theme", "light");
      } catch (err) {nst [fontSize, setFontSize] = useLocalStorage("fontSize", 16);
        console.error('Auth error:', err);
        setError(err.message);eturn (
        localStorage.removeItem('authToken');    <div>
      } finally {theme} onChange={(e) => setTheme(e.target.value)}>
        setLoading(false);        <option value="light">Light</option>
      }
    };

    checkAuthStatus();
  }, []);        type="range"

  const login = async (email, password) => {        max="24"
    try {tSize}
      setLoading(true);        onChange={(e) => setFontSize(Number(e.target.value))}
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },tSize: `${fontSize}px` }}>
        body: JSON.stringify({ email, password })        This text will be {fontSize}px in size and persist across refreshes!
      });

      if (!response.ok) throw new Error('Login failed');

      const { user, token } = await response.json();```
      localStorage.setItem('authToken', token);
      setUser(user);### Error Boundaries
      return user;
    } catch (err) {Component that catches JavaScript errors in their child component tree, logs those errors, and displays a fallback UI.
      setError(err.message);
      throw err;
    } finally {class ErrorBoundary extends React.Component {
      setLoading(false);
    }    super(props);
  }; { hasError: false };

  const logout = () => {
    localStorage.removeItem('authToken');eFromError(error) {
    setUser(null);sError: true };
  };

  return {ender() {
    user,    if (this.state.hasError) {
    loading,thing went wrong.</h1>;
    error,    }
    login,
    logout,
    isAuthenticated: !!user
  };
}

// Usage in a component
function ProfilePage() {
  const { user, loading, logout, isAuthenticated } = useAuth();- Third-party widget integrations that might throw errors
   visualization components with complex rendering logic
  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Redirect to="/login" />;

  return (
    <div className="profile">```jsx
      <h2>Welcome, {user.name}</h2>oundary implementation with fallback UI and reset functionality
      <button onClick={logout}>Log Out</button>undary extends React.Component {
      {/* Profile content */}s) {
    </div>
  );alse, error: null };
} = this.resetError.bind(this);
````

### Error BoundariestateFromError(error) {

return { hasError: true, error };
Component that catches JavaScript errors in their child component tree, logs those errors, and displays a fallback UI. }

````jsx componentDidCatch(error, info) {
class ErrorBoundary extends React.Component {onitoring service
  constructor(props) {    console.error("Chart error:", error, info);
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {    this.setState({ hasError: false, error: null });
    return { hasError: true };
  }

  render() {    if (this.state.hasError) {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;        <div className="error-container">
    }
    return this.props.children; error"}</p>
  }tton>
}
```      );

**Real-world Usage:**

- Form submission components to prevent entire app crashes on validation errors  }
- Third-party widget integrations that might throw errors
- Data visualization components with complex rendering logic
- Implementation around experimental features

**Practical Example:**
```jsx
// Error boundary for third-party widget integration      <ChartErrorBoundary>
class WidgetErrorBoundary extends React.Component {ataChart data={complexData} />
  constructor(props) {      </ChartErrorBoundary>
    super(props);rd elements remain functional even if chart fails */}
    this.state = { hasError: false, error: null };      <DashboardMetrics />
    this.resetError = this.resetError.bind(this);
  }  );

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }### Portals

  componentDidCatch(error, info) {to a DOM node that exists outside the DOM hierarchy of the parent component.
    console.error('Widget error:', error, info);
    // Send to monitoring service
    window.Sentry?.captureException(error);OM.createPortal(children, document.getElementById("modal-root"));
  }```

  resetError() {*Real-world Usage:**
    this.setState({ hasError: false, error: null });
  } level to avoid z-index issues
ooltips that need to break out of hidden overflow containers
  render() {- Dropdown menus that should appear above other elements
    if (this.state.hasError) {s that display at fixed positions
      return (
        <div className="widget-error">
          <h3>Widget Failed to Load</h3>
          <p>{this.state.error?.message || 'Unknown error occurred'}</p>
          <button onClick={this.resetError}>Retry</button>
        </div>function Modal({ isOpen, onClose, children }) {
      );rn null;
    }

    return this.props.children;    <div className="modal-overlay">
  }<div className="modal-content">
}me="modal-close-btn" onClick={onClose}>

// Usage
function AnalyticsDashboard() {     {children}
  return (      </div>
    <div className="dashboard">
      <h2>Analytics Dashboard</h2>    document.getElementById("modal-root") // Separate DOM node outside React tree

      {/* Each widget isolated with its own error boundary */}
      <div className="widgets-grid">
        <WidgetErrorBoundary>
          <TrafficWidget />function ProductPage() {
        </WidgetErrorBoundary>l, setShowModal] = useState(false);

        <WidgetErrorBoundary>
          <ConversionWidget />    <div className="product-page">
        </WidgetErrorBoundary><h1>Product Details</h1>
        r has overflow:hidden, modal appears correctly */}
        <WidgetErrorBoundary>iv className="content-container" style={{ overflow: "hidden" }}>
          <RevenueWidget />wModal(true)}>
        </WidgetErrorBoundary>Detailed Specifications
      </div>       </button>
    </div>     <p>Product description...</p>
  );      </div>
}
```      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>

### Portals

Render children into a DOM node that exists outside the DOM hierarchy of the parent component.
  );
```jsx
ReactDOM.createPortal(children, document.getElementById("modal-root"));```
````

### Suspense and Lazy Loading

**Real-world Usage:**
s on demand and showing fallback content while loading.

- Modal dialogs rendered at the root level to avoid z-index issues
- Tooltips that need to break out of hidden overflow containers
- Dropdown menus that should appear above other elementsLazyComponent = React.lazy(() => import("./LazyComponent"));
- Notification systems that display at fixed positions

**Practical Example:**n (

````jsx<React.Suspense fallback={<div>Loading...</div>}>
// Tooltip implementation using portals     <LazyComponent />
function Tooltip({ children, content, isOpen }) { </React.Suspense>
  if (!isOpen) return children;  );

  return (```
    <>
      {children}
      {ReactDOM.createPortal(
        <div className="tooltip" role="tooltip"> loaded only when needed
          {content}- Features behind authentication that only load after login
        </div>,site (product details, cart, checkout)
        document.getElementById('tooltip-root')- Media-heavy pages where images/videos should be loaded only when needed
      )}
    </>
  );
}

// Usage in a complex UI with nested scrolling containers
function ProductInfo() {ort { Routes, Route } from "react-router-dom";
  const [showTooltip, setShowTooltip] = useState(false);import LoadingSpinner from "./LoadingSpinner";

  return (// Lazy load heavy dashboard components
    <div className="product-container" style={{ overflow: 'hidden' }}>
      <div className="product-details">
        <h3>Product Name</h3>

        <Tooltip
          content="This product is currently on sale with 20% discount!"ediately, nested routes are lazy loaded
          isOpen={showTooltip}function DashboardLayout() {
        >
          <span     <div className="dashboard-layout">
            className="info-icon"<Sidebar />
            onMouseEnter={() => setShowTooltip(true)}d-content">
            onMouseLeave={() => setShowTooltip(false)}
          >es>
            ℹ️ent={<Dashboard />} />
          </span>ics />} />
        </Tooltip>Reports />} />
                 <Route path="/settings" element={<Settings />} />
        {/* Other product details */}        </Routes>
      </div>     </Suspense>
    </div>      </div>
  );
}  );
````

### Suspense and Lazy Loading

Enables loading components on demand and showing fallback content while loading.
digm allowing components to run directly on the server, reducing bundle size and enabling direct access to server resources.

```jsx
const LazyComponent = React.lazy(() => import("./LazyComponent"));

function MyComponent() {
  return (- CMS content rendering where data can be fetched and rendered server-side
    <React.Suspense fallback={<div>Loading...</div>}>critical pages that need server-rendered content
      <LazyComponent />
    </React.Suspense>
  );
}
```

onent (app/products/page.jsx)
**Real-world Usage:**wser
nc function ProductsPage({ params }) {

- Admin dashboards with many heavy components loaded only when needed/ Direct database access without exposing credentials to client
- Features behind authentication that only load after login const products = await db.products.findMany({
- Different sections of an e-commerce site (product details, cart, checkout): params.category },
- Media-heavy pages where images/videos should be loaded only when needed include: { reviews: true },

**Practical Example:**

````jsxavoid sending to client
// E-commerce app with code splitting by feature> ({
import React, { lazy, Suspense } from 'react';    id: product.id,
import { Routes, Route } from 'react-router-dom';ame,
    avgRating: calculateAverageRating(product.reviews),
// Core components loaded immediately
import Header from './components/Header';
import Footer from './components/Footer';rn (
import HomePage from './pages/HomePage';">

// Feature-specific components loaded on demand
const ProductList = lazy(() => import('./pages/ProductList'));   {/* ProductList receives only the data it needs */}
const ProductDetail = lazy(() => import('./pages/ProductDetail'));   <ProductList products={averageRatings} />
const ShoppingCart = lazy(() => import('./pages/ShoppingCart'));    </div>
const Checkout = lazy(() => import('./pages/Checkout'));
}
// Large, rarely visited pages loaded on demand
const ReturnPolicy = lazy(() => import('./pages/ReturnPolicy'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

function App() {  const [filter, setFilter] = useState("");
  return (
    <div className="app">  return (
      <Header />
            type="text"
      <main>value={filter}
        <Suspense fallback={<div className="page-loader">Loading...</div>}>arget.value)}
          <Routes>"
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/checkout" element={<Checkout />} />            <Route path="/return-policy" element={<ReturnPolicy />} />            <Route path="/privacy-policy" element={<PrivacyPolicy />} />          </Routes>        </Suspense>      </main>            <Footer />    </div>  );}```### Server ComponentsA new paradigm allowing components to run directly on the server, reducing bundle size and enabling direct access to server resources.**Real-world Usage:**- Database access components that fetch data directly on the server- CMS content rendering where data can be fetched and rendered server-side- SEO-critical pages that need server-rendered content- Sensitive operations that should happen server-side only**Practical Example:**```jsx// In a Next.js 13+ project (app/products/[id]/page.js)import { notFound } from 'next/navigation';import { getPrismaClient } from '@/lib/prisma';import ClientSidePricing from './ClientSidePricing';// This component runs entirely on the serverasync function ProductPage({ params }) {  const prisma = getPrismaClient();    // Server-side data fetching directly from database  const product = await prisma.product.findUnique({    where: { id: parseInt(params.id) },    include: {      reviews: {        include: { user: { select: { name: true, avatar: true } } }      },      category: true,      images: true    }  });    if (!product) {    notFound();  }    // Server-side processing - never sent to client  const averageRating = product.reviews.length     ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length    : 0;      return (    <div className="product-page">      <h1>{product.name}</h1>            <div className="product-images">        {product.images.map(img => (          <img             key={img.id}             src={img.url}             alt={img.alt || product.name}             width={600}            height={400}          />        ))}      </div>            <div className="product-details">        <p className="description">{product.description}</p>        <p className="category">Category: {product.category.name}</p>        <p className="rating">Rating: {averageRating.toFixed(1)} ⭐</p>                {/* Client interactive component */}        <ClientSidePricing           basePrice={product.price}          discount={product.discountPercentage}          inStock={product.inventory > 0}        />      </div>            {/* Reviews rendered on server */}      <div className="reviews">        <h3>Customer Reviews ({product.reviews.length})</h3>        {product.reviews.map(review => (          <div key={review.id} className="review">            <div className="user-info">              <img src={review.user.avatar} alt={review.user.name} />              <span>{review.user.name}</span>            </div>            <p>{review.content}</p>          </div>        ))}      </div>    </div>  );}// Client component for interactive elements'use client'function ClientSidePricing({ basePrice, discount, inStock }) {  const [quantity, setQuantity] = useState(1);    const finalPrice = basePrice * (1 - discount / 100);  const totalPrice = finalPrice * quantity;    return (    <div className="pricing">      {discount > 0 && (        <p className="original-price">${basePrice.toFixed(2)}</p>      )}      <p className="current-price">${finalPrice.toFixed(2)}</p>            <div className="quantity">        <button           onClick={() => setQuantity(q => Math.max(1, q - 1))}          disabled={quantity <= 1}        >          -        </button>        <span>{quantity}</span>        <button onClick={() => setQuantity(q => q + 1)}>+</button>      </div>            <p className="total">Total: ${totalPrice.toFixed(2)}</p>            <button         className="add-to-cart"        disabled={!inStock}      >        {inStock ? 'Add to Cart' : 'Out of Stock'}      </button>    </div>  );}```## State Management### Redux and Redux ToolkitA predictable state container for JavaScript apps with centralized store, actions, and reducers. Redux Toolkit simplifies Redux setup and usage.```jsximport { createSlice, configureStore } from "@reduxjs/toolkit";const counterSlice = createSlice({  name: "counter",  initialState: { value: 0 },  reducers: {    increment: (state) => {      state.value += 1;    },  },});const store = configureStore({  reducer: {    counter: counterSlice.reducer,  },});```**Real-world Usage:**- E-commerce shopping cart management across the application- Complex multi-step form wizards with preserved state- Real-time applications with many interconnected state updates- Applications with complex CRUD operations needing predictable state flow**Practical Example:**```jsx// E-commerce cart implementation with Redux Toolkitimport { createSlice, configureStore } from '@reduxjs/toolkit';import { Provider, useSelector, useDispatch } from 'react-redux';// Cart slice with state managementconst cartSlice = createSlice({  name: 'cart',  initialState: {    items: [],    totalItems: 0,    totalAmount: 0,  },  reducers: {    addItem: (state, action) => {      const newItem = action.payload;      const existingItem = state.items.find(item => item.id === newItem.id);            if (existingItem) {        existingItem.quantity++;        existingItem.totalPrice += newItem.price;      } else {        state.items.push({          id: newItem.id,          name: newItem.name,          price: newItem.price,          quantity: 1,          totalPrice: newItem.price        });      }            state.totalItems++;      state.totalAmount += newItem.price;    },    removeItem: (state, action) => {      const id = action.payload;      const existingItem = state.items.find(item => item.id === id);            if (existingItem.quantity === 1) {        state.items = state.items.filter(item => item.id !== id);      } else {        existingItem.quantity--;        existingItem.totalPrice -= existingItem.price;      }            state.totalItems--;      state.totalAmount -= existingItem.price;    }  }});// Example usage in product pagefunction ProductPage({ product }) {  const dispatch = useDispatch();    const addToCart = () => {    dispatch(cartSlice.actions.addItem({      id: product.id,      name: product.name,      price: product.price    }));        // Show toast notification    toast.success(`${product.name} added to cart!`);  };    return (    <div className="product">      <h2>{product.name}</h2>      <p>${product.price.toFixed(2)}</p>      <button onClick={addToCart}>Add to Cart</button>    </div>  );}// Cart component displaying the itemsfunction Cart() {  const { items, totalItems, totalAmount } = useSelector(state => state.cart);  const dispatch = useDispatch();    return (    <div className="cart">      <h2>Your Cart ({totalItems} items)</h2>            {items.length === 0 ? (        <p>Your cart is empty</p>      ) : (        <>          <ul>            {items.map(item => (              <li key={item.id}>                {item.name} x {item.quantity} - ${item.totalPrice.toFixed(2)}                <button onClick={() => dispatch(cartSlice.actions.removeItem(item.id))}>                  Remove one                </button>              </li>            ))}          </ul>                    <div className="cart-total">            <strong>Total: ${totalAmount.toFixed(2)}</strong>            <button>Proceed to Checkout</button>          </div>        </>      )}    </div>  );}```### ZustandA small, fast, and scalable state management solution with a simple API.```jsximport create from "zustand";const useStore = create((set) => ({  count: 0,  increment: () => set((state) => ({ count: state.count + 1 })),}));```**Real-world Usage:**- Lightweight applications needing shared state without Redux complexity- Projects where bundle size is critically important- Progressive web apps that need efficient state management- Application prototypes needing quick setup with minimal boilerplate**Practical Example:**```jsx// Theme switcher with persisted state using Zustandimport create from 'zustand';import { persist } from 'zustand/middleware';// Create store with persistenceconst useThemeStore = create(  persist(    (set) => ({      theme: 'light',      fontSize: 16,      setTheme: (theme) => set({ theme }),      setFontSize: (fontSize) => set({ fontSize }),      toggleTheme: () => set((state) => ({         theme: state.theme === 'light' ? 'dark' : 'light'       })),      increaseFontSize: () => set((state) => ({         fontSize: state.fontSize + 1       })),      decreaseFontSize: () => set((state) => ({         fontSize: Math.max(12, state.fontSize - 1)       })),    }),    { name: 'theme-settings' } // localStorage key  ));// Theme provider componentfunction ThemeProvider({ children }) {  const { theme, fontSize } = useThemeStore();    // Apply theme to document  useEffect(() => {    document.documentElement.setAttribute('data-theme', theme);    document.documentElement.style.fontSize = `${fontSize}px`;  }, [theme, fontSize]);    return children;}// Theme controls in headerfunction ThemeControls() {  const { theme, fontSize, toggleTheme, increaseFontSize, decreaseFontSize } = useThemeStore();    return (    <div className="theme-controls">      <button onClick={toggleTheme}>        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}      </button>            <div className="font-size-controls">        <button onClick={decreaseFontSize}>A-</button>        <span>{fontSize}px</span>        <button onClick={increaseFontSize}>A+</button>      </div>    </div>  );}// App with theme integrationfunction App() {
  return (
    <ThemeProvider>
      <div className="app">
        <header>
          <h1>My App</h1>
          <ThemeControls />
        </header>
        <main>
          {/* App content */}
        </main>
      </div>
    </ThemeProvider>
  );
}
````

For the remaining topics, I'll provide concise examples that focus on practical implementations without repeating the concepts and real-world usage sections that already exist.

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

**Practical Example:**

```jsx
// Search feature with filters using Recoil
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

// Define atoms
const searchQueryAtom = atom({
  key: "searchQuery",
  default: "",
});

const categoryFilterAtom = atom({
  key: "categoryFilter",
  default: "all",
});

const productsAtom = atom({
  key: "products",
  default: [], // Loaded from API later
});

// Derived state with selector
const filteredProductsSelector = selector({
  key: "filteredProducts",
  get: ({ get }) => {
    const products = get(productsAtom);
    const query = get(searchQueryAtom).toLowerCase();
    const category = get(categoryFilterAtom);

    return products.filter((product) => {
      const matchesQuery =
        query === "" || product.name.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesQuery && matchesCategory;
    });
  },
});

// Product search component
function ProductSearch() {
  const [query, setQuery] = useRecoilState(searchQueryAtom);
  const [category, setCategory] = useRecoilState(categoryFilterAtom);
  const filteredProducts = useRecoilValue(filteredProductsSelector);

  return (
    <div className="product-search">
      <div className="search-controls">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="home">Home & Garden</option>
        </select>

        <p>Found {filteredProducts.length} products</p>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

I'll continue adding practical examples for each concept, following this format, demonstrating real implementation scenarios with code that addresses specific use cases for each advanced React concept.
