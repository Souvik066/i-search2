import { SEARCH_API_URL } from "../enviroments/API_URL";

export const getPdfSearchResults = async (searchText: string) => {
  const url = `${SEARCH_API_URL}search-text-in-pdf?text=${searchText}`;

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    // Add any other custom headers here
  };

  const requestOptions = {
    method: "GET", // or 'POST', 'PUT', 'DELETE', etc.
    headers: headers,
    // You can also add other options like body, redirect, etc. as needed.
  };

  const result = await fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log(result);
  return result;
};

export const getHtmlSearchResults = async (searchText: string) => {
  const url = `${SEARCH_API_URL}search-html?question=${searchText}`;

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    // Add any other custom headers here
  };

  const requestOptions = {
    method: "GET", // or 'POST', 'PUT', 'DELETE', etc.
    headers: headers,
    // You can also add other options like body, redirect, etc. as needed.
  };

  const result = await fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log(result);
  return result;
};

export const getProductAnswerResults = async (searchText: string) => {
  const productUrl = `${SEARCH_API_URL}search-products-qa?question=${searchText}`;

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    // Add any other custom headers here
  };

  const requestOptions = {
    method: "GET", // or 'POST', 'PUT', 'DELETE', etc.
    headers: headers,
    // You can also add other options like body, redirect, etc. as needed.
  };

  const result = await fetch(productUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(productUrl);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log(result);

  return result;
};

export const getProductDataResults = async (searchText: string) => {
  const productUrl = `${SEARCH_API_URL}search-products-qdrant?question=${searchText}`;

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    // Add any other custom headers here
  };

  const requestOptions = {
    method: "GET", // or 'POST', 'PUT', 'DELETE', etc.
    headers: headers,
    // You can also add other options like body, redirect, etc. as needed.
  };

  const result = await fetch(productUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(productUrl);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log(result);

  return result;
};

export const getSearchImageResults = async (imageFile: any) => {
  const productUrl = `${SEARCH_API_URL}search-products-by-image`;
  console.log(imageFile);

  const headers = {
    accept: "application/json",
    // Add any other custom headers here
  };

  const formData = new FormData();
  formData.append("file", imageFile);

  const requestOptions = {
    method: "POST", // or 'POST', 'PUT', 'DELETE', etc.
    headers: headers,
    body: formData,
    // You can also add other options like body, redirect, etc. as needed.
  };

  const result = await fetch(productUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(productUrl);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log(result);

  return result;
};
