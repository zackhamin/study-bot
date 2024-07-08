"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-okaidia.css"; // Y

export default function CodeAnalysisPage() {
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeCode = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/analyse-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze code");
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error("Error analyzing code:", error);
      setAnalysis(
        "An error occurred while analyzing the code. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">Code Analysis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
        <Card className="flex flex-col bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Input Code</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <div className="w-full flex-grow overflow-auto bg-[#1e1e1e] rounded-md">
              <Editor
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={(code) => highlight(code, languages.js)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  backgroundColor: "#1e1e1e",
                  color: "#fff",
                }}
                className="min-h-[300px]"
              />
            </div>
            <Button
              onClick={analyzeCode}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Code"}
            </Button>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-indigo-700">Analysis Result</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="bg-white p-4 rounded-md h-full overflow-auto border border-gray-200">
              <pre className="whitespace-pre-wrap text-gray-800">
                {analysis}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
