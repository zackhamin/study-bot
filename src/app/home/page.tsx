import React from "react";
import { Book, Calendar, Clock, MessageSquare, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-indigo-800">
        Welcome back, Student!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Study Hours
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5</div>
            <p className="text-xs text-muted-foreground">+2.5 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Questions Asked
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+8 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notes Created</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+3 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-indigo-600" />
                <span>Asked about photosynthesis</span>
              </li>
              <li className="flex items-center">
                <Book className="h-4 w-4 mr-2 text-purple-600" />
                <span>Created notes on cell biology</span>
              </li>
              <li className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-indigo-600" />
                <span>Asked about Newtons laws</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>Biology Essay</span>
                <span className="text-sm text-muted-foreground">
                  2 days left
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Physics Quiz</span>
                <span className="text-sm text-muted-foreground">
                  5 days left
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Math Assignment</span>
                <span className="text-sm text-muted-foreground">
                  1 week left
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Start Studying
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
