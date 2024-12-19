import React, { useEffect } from "react";

function TutorInterface() {
  useEffect(() => {
    async function sendPrompt() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/magneto_agent/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.identifier,
            password: data.password,
          }),
        }
      );
    }
  });

  return <div>TutorInterface</div>;
}

export default TutorInterface;
