async function fetchData(url, method, data) {
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

