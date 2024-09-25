"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the response from the server-side API
    fetch("/api/roles")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Log the response data to the browser's console (client-side)
        console.log("API Response from server:", data);

        // Update the state with the response data
        setApiResponse(JSON.stringify(data, null, 2)); // Convert data to a formatted string
      })
      .catch((err) => {
        // Handle and display errors
        console.error("Error fetching API:", err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    fetch("https://costmanagementapi.azurewebsites.net/api/test/public")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Authme:", data);
      })
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-5xl">Welcome to the Dashboard Page</h1>

      {/* Display a loading message while fetching */}
      {isLoading && <p>Loading...</p>}

      {/* Display an error message if something goes wrong */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Display the API response in a readable format */}
      {apiResponse && (
        <pre className="bg-gray-200 p-4 rounded-md">{apiResponse}</pre>
      )}
    </section>
  );
}
