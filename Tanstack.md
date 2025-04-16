## TanStack Query React Query
package: @tanstack/react-query & @tanstack/react-query-devtools

What is React Query and how does it work?
    - It is a library for fetching data and managing the state of the data in your application. 
    - It provides a set of hooks for fetching, caching, and updating data in your application. 
    - It also provides a set of utilities for managing the state of the data in your application.

How do you use React Query in your application?
    - You can use React Query in your application by installing it using npm or yarn. ['yarn add @tanstack/react-query']
    - You can then import the hooks provided by React Query and use them in your components to fetch, cache, and update data in your application.

step 1: after installing the package
step 2: Wrap the "QueryClientProvider" around the root component of your application
example: 
```jsx
import { QueryClient, QueryClientProvider, ReactQueryDevtools } from '@tanstack/react-query'
const App(){
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
            <div>
                <h1>My Application</h1>
                <MyComponent />
            </div>
        </QueryClientProvider>
    )
}
```
step 3: use the hooks provided by React Query to fetch, cache, and update data in your application
@REM # Fetch data using the "useQuery" hook
```jsx
import { useQuery } from '@tanstack/react-query'

- useQuery takes two arguments: the query key and a function that fetches the data
- The query key is a unique identifier for the query
- The function that fetches the data should return a promise that resolves to the data
- The useQuery hook returns an object with the data, isLoading, isError, and other properties
example:
const { data, isLoading, isError, error } = useQuery({
    queryKey: 'todos',
    queryFn: apiCall()
})
```
@REM ## React Query devtools
- React Query provides a devtools extension that allows you to inspect the state of the queries in your application
- You can open the devtools by adding the "ReactQueryDevtools" component to your application
- The devtools display information about the queries, such as the query key, status, and data
- You can also use the devtools to manually refetch queries or clear the cache
- The devtools are a useful tool for debugging and monitoring the state of the queries in your application

@REM ## Query cache
- React Query uses a query cache to store the data fetched by the queries in your application
- React query caches the data for every 5 minutes by default and you can change the cache time by setting the cacheTime property in the queryClient
- The query cache is automatically updated when the data changes, and you can manually invalidate or refetch queries using the queryClient
- when we make an api call then the reactQuery will cache the data if we make subsequent calls to the same api then it will return the cached data instead of making a new api call if suppose if there is a change in the data that were are displaying then it will automatically update the data in the cache and display the updated data in the UI. 

@REM ## What is stale time in React Query?
- The stale time is the time in milliseconds after which the data in the cache is considered stale
- If the data is stale, React Query will automatically refetch the data when the component is re-rendered
- You can set the stale time for a query by passing the staleTime property in the query options
- if we add the staletime in the query options then the react query will refetch the data after the specified time in the staleTime property till then it will be in Fresh state. after the time passwd then it will be in the stale state and it will refetch the data.

@REM POLLING IN REACT QUERY
- React Query provides a polling feature that allows you to automatically refetch data at regular intervals
- You can enable polling for a query by setting the pollingInterval property in the query options
- The pollingInterval property specifies the time in milliseconds between each poll
- React Query will automatically refetch the data at the specified interval using "refetchInterval" property in the query options
- This polling feature is useful for fetching real-time data or data that changes frequently
- it will when the current tab is focused then it will refetch the data at the specified interval and when the tab is not focused then it will not refetch the data.
- if we want to refetch the data even when the tab is not focused then we can use the "refetchIntervalInBackground" property in the query options.

@REM If we want to make an api call with some trigger point 
- in the useQuery hook we can pass the "enabled" property in the query options and pass the boolean value to it. 
- we can disable the query fetching on mount by passing the "enabled" property in the query options and pass the value as "false" to it.
- fetch data based on click 
- define a button and pass the "refetch" function to the onClick event of the button that comes from the useQuery hook.
- when the button is clicked then the refetch function will be called and the data will be fetched.

@REM fetch data by id. 
- we can pass the id in the query key and fetch the data based on the id.
- we can pass the id in the query key as an object and fetch the data based on the id.
- when we click on product from product page to navigate to the product details page then we can pass the id in the query key and fetch the data based on the id.
example:
```jsx
const {productId} = usePrams()
const { data, isLoading, isError, error } = useQuery({
    queryKey: ['product', { id: productId }],
    queryFn: apiCall()
})
```

@REM PAGINATION IN REACT QUERY
- React Query provides a pagination feature that allows you to fetch paginated data
- You can enable pagination for a query by setting the "pageParam" property in the query options
- The "pageParam" property specifies the name of the parameter that contains the page number in the API response
- React Query will automatically fetch the next page of data when the "fetchNextPage" function is called
- The "fetchNextPage" function is provided by the useQuery hook and can be called to fetch the next page of data
- The "hasNextPage" property is also provided by the useQuery hook and indicates whether there is more data to fetch
- The pagination feature is useful for fetching large sets of data in smaller chunks
example:
```jsx
const { data, isLoading, isError, error, fetchNextPage, hasNextPage } = useQuery({
    queryKey: 'todos',
    queryFn: apiCall(),
    getNextPageParam: (lastPage, allPages) => lastPage.nextPage
})
```
@REM ## Mutations in React Query
- React Query provides a mutation feature that allows you to update data on the server
- You can use the "useMutation" hook to perform mutations in your application
- The "useMutation" hook takes a mutation function as an argument and returns a tuple with the mutation function and the mutation state
- The mutation function can be called to perform the mutation, and the mutation state contains information about the mutation, such as isLoading, isError, and data
- The mutation function returns a promise that resolves to the data returned by the mutation
- The mutation state also contains a "mutate" function that can be called to manually trigger the mutation
- The mutation feature is useful for updating data on the server in response to user actions
example:
```jsx
mutate: addPostMutation is mean alias name for mutation when we have multiple mutations in the same component then we can use the alias name for the mutation.
const { mutate: addPostMutation , isLoading, isError, error, data } = useMutation({
    mutationFn: apiCall(),
    onMutate: () => {
        // Optimistically update the cache
    },
    onError: (error) => {
        // Roll back the optimistic update
    },
    onSuccess: (data) => {
        // Update the cache with the new data
    }
})
```
const handleClick = () => {
    mutate({ data: 'new data' })
}
const apiCall = async (bodyData) => {
    const response = await fetch('https://api.example.com/data', {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.json()
}
```
@REM refetch the data after adding or creating using queryCLient by using invalidateQueries method
- we can refetch the data after adding or creating the data by using the "invalidateQueries" method in the queryClient
- we can pass the query key to the "invalidateQueries" method and it will refetch the data based on the query key
example:
```jsx
const { mutate: addPostMutation , isLoading, isError, error, data } = useMutation({
    mutationFn: apiCall(),
    onMutate: () => {
        // Optimistically update the cache
    },
    onError: (error) => {
        // Roll back the optimistic update
    },
    onSuccess: (data) => {
        // Update the cache with the new data
        @REM refetch the data after adding or creating using queryCLient by using invalidateQueries method 
        @REM basically it will call the api and refetch the data
        queryClient.invalidateQueries('posts')

        @REM another way to update data by setQueryData method
        queryClient.setQueryData(['posts'], (oldData) => {
            return {
                ...oldData,
                data: [...oldData.data, data.data]
            }
        })
    }
})
```

@REM ## Optimistic updates in React Query
- Optimistic updates are a way to update the UI optimistically before the mutation is completed
- React Query provides an "onMutate" callback that allows you to optimistically update the cache before the mutation is performed
- The "onMutate" callback is called before the mutation function is called and allows you to update the cache optimistically
- You can use the "onMutate" callback to update the cache with the new data before the mutation is performed
- If the mutation fails, you can use the "onError" callback to roll back the optimistic update
- The optimistic update feature is useful for providing a better user experience by updating the UI immediately and then updating the server
example:
```jsx
const { mutate: addPostMutation , isLoading, isError, error, data } = useMutation({
    mutationFn: apiCall(),
    onMutate: (newData) => {
        @REM Optimistically update the cache using cancelQuery method
        @REM basically it will cancel the query and update the cache with the new data and the use of this is to update the cache with the new data before the mutation is performed and if the mutation fails then we can roll back the optimistic update. 
        await queryClient.cancelQueries(['posts'])
        const previousData = queryClient.getQueryData(['posts'])
        queryClient.setQueryData(['posts'], (oldData) => {
            return {
                ...oldData,
                data: [...oldData.data, newData]
            }
        })
    },
    onError: (error, newData, context) => {
        queryClient.setQueryData(['posts'], context.previousData)
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries('posts')
    }
})
```