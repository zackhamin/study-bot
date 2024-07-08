"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <h1 className="text-2xl font-bold mb-4">Code Analysis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Input Code</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <Textarea
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full flex-grow font-mono resize-none"
            />
            <Button
              onClick={analyzeCode}
              className="mt-4"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Code"}
            </Button>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="bg-gray-100 p-4 rounded-md h-full overflow-auto">
              <pre className="whitespace-pre-wrap">{analysis}</pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
