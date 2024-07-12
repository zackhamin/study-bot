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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
      <header className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="text-3xl font-bold text-white">CodeBuddy</div>
        <nav>
          <Button variant="ghost" className="text-white hover:text-indigo-200">
            Features
          </Button>
          <Button variant="ghost" className="text-white hover:text-indigo-200">
            How It Works
          </Button>
          <Button variant="ghost" className="text-white hover:text-indigo-200">
            Testimonials
          </Button>
          <Button
            variant="outline"
            className="ml-4 text-white border-white hover:bg-white hover:text-indigo-900"
          >
            Sign Up
          </Button>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 flex items-center justify-between">
          <div className="w-1/2">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Master Coding with Your Personal AI Tutor
            </h1>
            <p className="text-xl mb-8 text-indigo-200">
              CodeBuddy: Your AI coding mentor. Ask questions, analyze code, and
              learn programming concepts with ease.
            </p>
            <Button className="bg-blue-400 hover:bg-blue-600 text-white text-lg px-8 py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="w-1/2">
            <Image
              src="/codeFour.png"
              alt="CodeBuddy in action"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-indigo-900 mb-12">
              Why Choose CodeBuddy?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <FeatureCard
                icon={<MessageSquare className="h-12 w-12 text-emerald-500" />}
                title="AI-Powered Q&A"
                description="Get instant answers to your coding questions, explained in simple terms."
              />
              <FeatureCard
                icon={<Code className="h-12 w-12 text-emerald-500" />}
                title="Code Analysis"
                description="Understand complex code snippets by typing or pasting them in."
              />
              <FeatureCard
                icon={<Sparkles className="h-12 w-12 text-emerald-500" />}
                title="Interactive Learning"
                description="Save answers to your questions for future reference and continuous learning."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-20 bg-gradient-to-br from-indigo-800 to-purple-700"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              How CodeBuddy Works
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <ol className="space-y-8">
                  <HowItWorksStep
                    icon={<Zap className="h-6 w-6 text-emerald-400" />}
                    title="Ask a Question"
                    description="Type in your coding query or paste a code snippet."
                  />
                  <HowItWorksStep
                    icon={<Sparkles className="h-6 w-6 text-emerald-400" />}
                    title="AI Analysis"
                    description="Our AI processes your input and generates a response."
                  />
                  <HowItWorksStep
                    icon={
                      <MessageSquare className="h-6 w-6 text-emerald-400" />
                    }
                    title="Get Answers"
                    description="Receive clear explanations and examples to boost your understanding."
                  />
                </ol>
              </div>
              <div className="l:w-1/2">
                <Image
                  src="/codeThree.png"
                  alt="CodeBuddy Analysis"
                  width={1000}
                  height={1000}
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-white py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-indigo-900 mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TestimonialCard
                quote="CodeBuddy has revolutionized my coding journey. The AI explanations are so clear, it's like having a patient tutor available 24/7!"
                author="Alex K., Web Developer"
              />
              <TestimonialCard
                quote="The code analysis feature is a game-changer. It helps me understand complex algorithms and improve my own coding style."
                author="Samantha L., Computer Science Student"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Elevate Your Coding Skills?
          </h2>
          <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
            Join thousands of developers already mastering code with CodeBuddys
            AI assistance.
          </p>
          <Button className="bg-blue-400 hover:bg-blue-600 text-white text-lg px-8 py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            Start Learning
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>
      </main>

      <footer className="bg-indigo-900 text-white py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <span className="text-2xl font-bold">CodeBuddy</span>
            <p className="text-indigo-300">Your AI-powered coding companion</p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end space-x-6">
            <a
              href="/privacy-policy"
              className="text-indigo-300 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-indigo-300 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/contact"
              className="text-indigo-300 hover:text-white transition-colors"
            >
              Contact Us
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-indigo-300 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: any) => (
  <div className="bg-indigo-50 p-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-indigo-900 mb-2">{title}</h3>
    <p className="text-indigo-700">{description}</p>
  </div>
);

const HowItWorksStep = ({ icon, title, description }: any) => (
  <li className="flex items-center space-x-4">
    <div className="bg-emerald-500 rounded-full p-2">{icon}</div>
    <div>
      <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
      <p className="text-indigo-200">{description}</p>
    </div>
  </li>
);

const TestimonialCard = ({ quote, author }: any) => (
  <div className="bg-indigo-50 p-6 rounded-lg shadow-lg">
    <p className="text-indigo-800 mb-4 italic">{quote}</p>
    <p className="font-semibold text-indigo-600">- {author}</p>
  </div>
);

export default LandingPage;
