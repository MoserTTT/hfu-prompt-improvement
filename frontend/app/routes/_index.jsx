import React from "react";
import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "Prompt Management" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


export default function Index() {
  const history = useNavigate();

  useEffect(() => {
    history('/buildPrompt');
  }, []);

  return (
    <div>
      <h1>Index</h1>
    </div>
  );
}
