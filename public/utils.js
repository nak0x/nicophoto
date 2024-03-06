async function fetchData(searchUrl, method, data) {
  let url = "";
  if (searchUrl.includes("http")) url = searchUrl;
  else url = BASE_URL + searchUrl;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur:", error.message);
    throw error;
  }
}

async function fetchDataFile(searchUrl, method, data) {
  let url = "";
  if (searchUrl.includes("http")) url = searchUrl;
  else url = BASE_URL + searchUrl;

  try {
    const options = {
      method,
      body: data,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
const BASE_URL = "http://localhost:8000/api";
