async function fetchData(endUrl, method, data) {
    const url = 'http://localhost:8000/api' + endUrl;
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Request failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur:', error.message);
        throw error;
    }
}

const BASE_URL = "http://localhost:8000/";
