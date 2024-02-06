async function fetchData(url, method, data) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Request failed');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

