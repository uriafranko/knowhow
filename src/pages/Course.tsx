import { useParams } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Target, ListChecks } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - in a real app, this would come from an API
const courseData = {
  title: "Advanced JavaScript Programming",
  topic: "Web Development",
  description: "Master modern JavaScript with this comprehensive course. Learn ES6+, async programming, and advanced concepts through practical examples and real-world projects.",
  outcomes: [
    "Understand advanced JavaScript concepts and patterns",
    "Build modern web applications using ES6+ features",
    "Master asynchronous programming with Promises and async/await",
    "Implement design patterns and best practices"
  ],
  classes: [
    {
      id: "1",
      title: "JavaScript Fundamentals Review",
      description: "A quick refresher on core JavaScript concepts and modern syntax.",
      duration: "45 minutes"
    },
    {
      id: "2",
      title: "Advanced Functions and Closures",
      description: "Deep dive into function mechanics and closure patterns.",
      duration: "60 minutes"
    },
    {
      id: "3",
      title: "Asynchronous Programming",
      description: "Understanding Promises, async/await, and event loop.",
      duration: "90 minutes"
    }
  ]
};

const Course = () => {
  const { id } = useParams();

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <Badge className="mb-4">{courseData.topic}</Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{courseData.title}</h1>
            <p className="text-xl text-gray-600">{courseData.description}</p>
          </div>

          {/* Course Outcomes */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {courseData.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ListChecks className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Class List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Course Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseData.classes.map((classItem) => (
                  <Link
                    key={classItem.id}
                    to={`/class/${classItem.id}`}
                    className="block"
                  >
                    <Card className="transition-all duration-300 hover:shadow-md hover:bg-gray-50">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {classItem.title}
                            </h3>
                            <p className="text-gray-600 mb-2">{classItem.description}</p>
                            <p className="text-sm text-gray-500">Duration: {classItem.duration}</p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Course;