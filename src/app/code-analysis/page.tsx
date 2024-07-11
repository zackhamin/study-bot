"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-java";
import "prismjs/themes/prism-okaidia.css";

const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "typescript", label: "TypeScript" },
  { value: "java", label: "Java" },
];

export default function CodeAnalysisPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
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
        body: JSON.stringify({ code, language }),
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

  const renderAnalysis = () => {
    if (!analysis) return null;

    const sections = analysis.split("\n\n");
    return sections.map((section, index) => {
      if (section.startsWith("```")) {
        const [, lang, ...codeLines] = section.split("\n");
        const code = codeLines.join("\n").replace(/```$/, "");
        return (
          <div
            key={index}
            className="mb-4 bg-gray-100 p-4 rounded-md overflow-x-auto"
          >
            <pre className="text-sm">
              <code
                dangerouslySetInnerHTML={{
                  __html: highlight(
                    code,
                    languages[lang] || languages.javascript,
                    lang || "javascript"
                  ),
                }}
              />
            </pre>
          </div>
        );
      } else if (
        section.startsWith("Key points:") ||
        section.startsWith("Potential improvements")
      ) {
        const [title, ...points] = section.split("\n");
        return (
          <div key={index} className="mb-4">
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <ul className="list-disc pl-5">
              {points.map((point, i) => (
                <li key={i} className="mb-1">
                  {point.replace(/^- /, "")}
                </li>
              ))}
            </ul>
          </div>
        );
      } else {
        return (
          <p key={index} className="mb-4">
            {section}
          </p>
        );
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 overflow-hidden">
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
        <Card className="flex flex-col bg-gray-800 border-gray-700 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Input Code</CardTitle>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px] bg-gray-700 text-white border-gray-600">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col overflow-hidden">
            <div className="flex-grow overflow-auto bg-[#1e1e1e] rounded-md">
              <Editor
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={(code) =>
                  highlight(
                    code,
                    languages[language] || languages.javascript,
                    language
                  )
                }
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  backgroundColor: "#1e1e1e",
                  color: "#fff",
                  minHeight: "100%",
                }}
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
        <Card className="flex flex-col overflow-hidden">
          <CardHeader>
            <CardTitle className="text-indigo-700">Analysis Result</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto">
            <div className="prose prose-sm max-w-none">{renderAnalysis()}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
