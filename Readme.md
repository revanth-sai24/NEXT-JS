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
    export default function About(){
    return <div>About</div>
    }
