import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// write a code using tanstack react-query for making ai calls that are production deployable
const fetchAICall = async () => {
    const response = await axios.post('https://api.example.com/ai-endpoint', {
        // Add your request payload here
    });
    return response.data;
};

const useAICall = () => {
    return useQuery(['aiCall'], fetchAICall, {
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes
        refetchOnWindowFocus: false,
    });
};

const Tanstack = () => {
    const { data, error, isLoading } = useAICall();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>AI Call Result</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default Tanstack;
