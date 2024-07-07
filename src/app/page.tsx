import React from "react";
import { ArrowRight, Book, Brain, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <header className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-indigo-600" />
          <span className="text-2xl font-bold text-indigo-800">Uni Bot</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a
                href="#features"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Pricing
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold text-indigo-900 mb-4">
            Your AI Study Buddy
          </h1>
          <p className="text-xl text-indigo-700 mb-8">
            Get instant answers, personalized study plans, and 24/7 support for
            all your academic needs.
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-3">
            Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-indigo-800 mb-12">
              Why Choose Uni Bot?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                  24/7 AI Tutor
                </h3>
                <p className="text-indigo-600">
                  Get instant answers to your questions anytime, anywhere.
                </p>
              </div>
              <div className="text-center">
                <Book className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                  Comprehensive Notes
                </h3>
                <p className="text-indigo-600">
                  Organize and access your study materials with ease.
                </p>
              </div>
              <div className="text-center">
                <Sparkles className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                  Personalized Learning
                </h3>
                <p className="text-indigo-600">
                  Tailored study plans based on your progress and goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-indigo-50 py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-indigo-800 mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-indigo-600 mb-4">
                  Uni Bot has been a game-changer for my studies. Its like
                  having a personal tutor available 24/7!
                </p>
                <p className="font-semibold text-indigo-800">
                  - Sarah J., Biology Major
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-indigo-600 mb-4">
                  Ive improved my grades significantly since I started using Uni
                  Bot. The personalized study plans are amazing!
                </p>
                <p className="font-semibold text-indigo-800">
                  - Mike T., Computer Science Student
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">
            Ready to Boost Your Academic Performance?
          </h2>
          <p className="text-xl text-indigo-700 mb-8">
            Join thousands of students already excelling with Uni Bot.
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3">
            Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>
      </main>

      <footer className="bg-indigo-800 text-white py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-bold">Uni Bot</span>
            <p className="text-indigo-200">Your AI-powered study companion</p>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-indigo-200 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-indigo-200 hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
