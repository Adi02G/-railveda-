import axios from 'axios';

// Singleton instance for external API calls
const rapidApiClient = axios.create({
    baseURL: 'https://irctc1.p.rapidapi.com', // Base URL for the specific provider
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json',
    }
});

/**
 * Securely wraps RapidAPI calls.
 * INJECTS secrets on the server-side.
 */
export const fetchRapidApiData = async (endpoint: string, params: Record<string, any> = {}) => {
    const apiKey = process.env.RAPIDAPI_KEY;

    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
        console.warn("API_WRAPPER: Missing Valid RapidAPI Key. Serving MOCK Data.");
        throw new Error("MOCK_FALLBACK"); // Signal to caller to use fallback
    }

    try {
        const response = await rapidApiClient.get(endpoint, {
            params,
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
            }
        });

        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.error(`API_WRAPPER_ERROR [${error.response?.status}]:`, error.message);
        }
        throw error;
    }
};
