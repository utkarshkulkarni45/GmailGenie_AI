const API_BASE_URL = "http://localhost:8080/api/email";

export const generateEmailReply = async (emailContent, tone) => {
  const response = await fetch(`${API_BASE_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailContent,
      tone,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to generate email reply");
  }

  return response.text();
};

