"use client";

import React from "react";
import {
  ArrowRight,
  Code,
  MessageSquare,
  Sparkles,
  Zap,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";
const LandingPage = () => {
  const { user } = useUser();

  if (user) {
    redirect("/chat");
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 text-indigo-900">
        <main>
          {/* Hero Section */}
          <section className="container mx-auto px-6 py-20 text-center">
            <h1 className="text-5xl font-bold mb-4 text-indigo-800">
              Master Coding with AI
            </h1>
            <p className="text-xl text-indigo-600 mb-8 max-w-2xl mx-auto">
              CodeBuddy: Your personal AI coding mentor. Ask questions, analyze
              code, and learn programming concepts with ease.
            </p>
          </section>

          {/* Features Section */}
          <section id="features" className="bg-white py-20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-indigo-800 mb-12">
                Why Choose CodeBuddy?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
                  <MessageSquare className="h-12 w-12 text-indigo-600 mb-4" />
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                    AI-Powered Q&A
                  </h3>
                  <p className="text-indigo-600">
                    Get instant answers to your coding questions, explained in
                    simple terms.
                  </p>
                </div>
                <div className="bg-purple-100 p-6 rounded-lg shadow-lg">
                  <Code className="h-12 w-12 text-indigo-600 mb-4" />
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                    Code Analysis
                  </h3>
                  <p className="text-indigo-600">
                    Understand complex code snippets with AI-generated
                    explanations.
                  </p>
                </div>
                <div className="bg-pink-100 p-6 rounded-lg shadow-lg">
                  <Sparkles className="h-12 w-12 text-indigo-600 mb-4" />
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                    Interactive Learning
                  </h3>
                  <p className="text-indigo-600">
                    Save the answers to your questions so you can refer back to
                    them later!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="py-20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-emerald-400 mb-12">
                How CodeBuddy Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <ol className="space-y-6">
                    <li className="flex items-center space-x-4">
                      <div className="bg-emerald-500 rounded-full p-2">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-1">
                          Ask a Question
                        </h3>
                        <p className="text-slate-800">
                          Type in your coding query or paste a code snippet.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-center space-x-4">
                      <div className="bg-blue-500 rounded-full p-2">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-1">
                          AI Analysis
                        </h3>
                        <p className="text-slate-800">
                          Our AI processes your input and generates a response.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-center space-x-4">
                      <div className="bg-purple-500 rounded-full p-2">
                        <MessageSquare className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-1">
                          Get Answers
                        </h3>
                        <p className="text-slate-800">
                          Receive clear explanations and examples to boost your
                          understanding.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
                <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
                  <Image
                    src="/code.png"
                    alt="Logo"
                    width={500}
                    height={500}
                    className="rounded-md mb-2"
                  />
                  <Image
                    src="/codeTwo.png"
                    alt="Logo"
                    width={500}
                    height={500}
                    className="rounded-md"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="bg-slate-800 py-20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-emerald-400 mb-12">
                What Our Users Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
                  <p className="text-slate-300 mb-4">
                    CodeBuddy has revolutionized my coding journey. The AI
                    explanations are so clear, its like having a patient tutor
                    available 24/7!
                  </p>
                  <p className="font-semibold text-emerald-400">
                    - Alex K., Web Developer
                  </p>
                </div>
                <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
                  <p className="text-slate-300 mb-4">
                    The code analysis feature is a game-changer. It helps me
                    understand complex algorithms and improve my own coding
                    style.
                  </p>
                  <p className="font-semibold text-emerald-400">
                    - Samantha L., Computer Science Student
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="container mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 mb-4">
              Ready to Elevate Your Coding Skills?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers already mastering code with
              CodeBuddys AI assistance.
            </p>
            <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white text-lg px-8 py-3">
              Start Coding for Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </section>
        </main>
        <footer className="from-blue-100 to-purple-100 text-indigo-90 py-8">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold text-emerald-400">
                CodeBuddy
              </span>
              <p className="text-slate-400">Your AI-powered coding companion</p>
            </div>
            <nav className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <a
                href="/privacy-policy"
                className="text-slate-400 hover:text-emerald-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-slate-400 hover:text-emerald-400 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/contact"
                className="text-slate-400 hover:text-emerald-400 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
