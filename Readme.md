## Next JS ( A React JS Framework...)

    - Next JS is a React Framework for building user Interface, Provides additional features that enables you to build production-ready applications.
    - Features like routing, bundling, optimized rendering, data fetching and compiling , etc. so there is a less dependency on third party packages like (routers, fetching, etc.)
    - It Simplifies the process of building a web application for production:
        1. Routing
        2. API routes
        3. Rendering ( Supports Client and server side rendering)
        4. Data Styling
        5. Styling
        6. Optimization
        7. Dev and prod build system

## Creating a Next App Process & Start.

### To create a Next app

    - npx create-next-app@latest

### After entering the command will the prompts to create the app.

- Give the Project name
- Select the Yes/ No for using typescript (No)
- Select the Yes/ No for using eslint (Yes)
- Select the Yes/ No for using tailwind-css (Yes)
- Select the Yes/ No for using src directory (Yes)
- Select the Yes/ No for using App Router (Yes)
- Select the Yes/ No for customize the default import alias (No)

### To Start Next App

    - npm run dev

### Project Folder Structure

- `Package.json` file contains the app metadata and application dependencies
- `next.config.js` file contains the next config
- `eslintrc.json` file contains the eslint config
- `.next` folder is generated when we start or build the application the app serves from this folder.
- `src` folder contains our app code.
- `public` folder contains the static file where we can store the images and svg's.

## React Server Components (RSC)

- The RSC introduces new way of creating the React components, splitting them into two ways.
  - Server Component:
    - In Next JS all the components are server components by default.
    - The have ability to fetch data and reading files
    - they can't use the Hooks or handle user interactions.
  - Client Component:
    - to create a client component we need to use `use client` at the top of the file
    - It can use the Hooks but not able to rad files.

## Routing

- Next JS has a file-system based routing Mechanism
- All our routes need to be create in app folder only where each file name will act as the route in the app.
- Each route need to create as folder inside that folder will create a `page.jsx` file that will server as our route.
- For an Instance If I want to create a about route `I need to create a about folder in app then inside the about folder I will create a page.jsx where I'll keep my about screen code`

```
/app
  |-- /about
  |    |-- page.jsx
  |
  |-- /contact
  |    |-- page.jsx
  |
  |-- /blog
       |-- /[id]
            |-- page.jsx
```

```javascript
export default function About() {
  return <div>About</div>;
}
```

### Nested Routing:

- `/blog` and `/blog/first` and `/blog/second`
- If we want to create a nested route we need to create a blog folder in app folder inside that we will create page.jsx and one and second folder with page.jsx each

```
/app
  |-- /blog
  |    |-- page.jsx
       |--/one
            |--page.jsx
       |--/second
            |--page.jsx
```

### Dynamic Routing:

- We will create a dynamic routing using `Square brackets []`
- If we want to implement the products
- Here thr[productId] folder will act as dynamic routes..

```
/app
  |-- /products
  |    |-- page.jsx
       |--/[productId]
            |--page.jsx
```

- Every page in Next will get the params as default were we can get the productId dynamically

```javascript
export default function ProductDetails({ params }) {
  return <div>{params.productId}</div>; // here the productId will get dynamically based on the route
}
```

### Nested Dynamic Routing:

```
- /app
  |-- /products
  |    |-- page.jsx
       |--/[productId]
            |--page.jsx
            |--/reviews
                |--/[reviewId]
                    |--page.jsx
```

- Create a products folder where it contains the page.jsx along with that we have dynamic productId folder inside that need to create a review folder along with that create a page.jsx nd create one more folder as dynamic folder as reviewId and create a page.jsx for that
- `/products/1reviews/1`

### Catch All Segments:

- Where If we are having many routes to handle there we can utilize this routing [`Eg: documentations were we will have n no.of routes `]
- There is special syntax to handle this kind of routing
- So based on the routes and params we need to display the text based on the route parameters.

```
/app
  |-- /docs
       |--/[...slug] //format
              |-- page.jsx
```

- page.jsx code

```javascript
function const Content({params}){
  const slugLen = params?.slug.length
  if(slugLen === 2){
    return "docs for the Feature"+params?.slug[0] + "and concept" + params.slug[1]
  }else if(slugLen === 1){
    return "docs for feature" + params.slug[0]
  }else{
    return "Mai doc page"
  }

}
```
### 404- Not FOund Page:
- In Next by default we have a 404 page that handles the undefined routes in the app 
- If we want to modify we can save the file as not-found.jsx in app folder
- we can add our own custom styles...
- If we want to render the not-found page dynamically (For Example if we don't want display the product page more than 10 the we can display the not-found page)
- Then we need to create a not-found file in the reviews folder and we can modify accordingly

```javascript
export default function NotFound(){
  return "Not Found"
}
```

```javascript
import {notFound} from 'next/navigation'

//for the reviews folder in the app

export default function ReviewDetails({params}){
  if (params?.reviewId  > 10){
    notFound() //calling programmatically
    return 
  }
  return <div>{params?.reviewId}</div>
}

```

### Private Folders:
- It is a feature that Next provides where the folders and sub-folders are excluded from the routing for the private implementations.
- To create a private folder we need to use the underscore at start of the folder `_utils`
- If we try to access it will show as 404 not found.

```
/app
  |-- /_utils
        |-- page.jsx
```
### Route Groups:
- It allows us to logically to group our routes and project files without affecting the url path structure.
- stops -- 13 video
