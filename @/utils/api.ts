// utils/api.js

/**
 * Sends a user prompt to the backend and retrieves the AI response.
 * @param {string} input - The user's input or prompt to send to the backend.
 * @returns {Promise<{ magneto: { session_id: string; outputs: string } }>} - The response from the backend.
 */
export async function sendPrompt(input: string): Promise<string> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/magneto_agent/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch response from the Magneto API.");
    }

    const data = await response.json();
    const text =
      data?.magneto?.outputs?.[0]?.outputs?.[0]?.results?.message?.text ||
      "No response received.";
    return text;
  } catch (error) {
    console.error("Error in sendPrompt function:", error);
    throw error; // Propagate the error to the caller
  }
}
