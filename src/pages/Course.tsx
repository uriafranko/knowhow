import { useParams } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Target, ListChecks, Clock } from "lucide-react";
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

  // Calculate total duration
  const totalDuration = courseData.classes.reduce((total, classItem) => {
    const minutes = parseInt(classItem.duration);
    return total + minutes;
  }, 0);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <Badge variant="secondary" className="mb-6">{courseData.topic}</Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">{courseData.title}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">{courseData.description}</p>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Total Duration: {formatDuration(totalDuration)}</span>
            </div>
          </div>

          {/* Course Outcomes */}
          <Card className="mb-8 border-none shadow-lg bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Target className="h-6 w-6 text-blue-500" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {courseData.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <ListChecks className="h-5 w-5 text-green-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700">{outcome}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Class List */}
          <Card className="border-none shadow-lg bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <BookOpen className="h-6 w-6 text-blue-500" />
                Course Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseData.classes.map((classItem) => (
                  <Link
                    key={classItem.id}
                    to={`/class/${classItem.id}`}
                    className="block group"
                  >
                    <Card className="transition-all duration-300 hover:shadow-xl border-none bg-white">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                              {classItem.title}
                            </h3>
                            <p className="text-gray-600 mb-2">{classItem.description}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="h-4 w-4" />
                              <span>{classItem.duration}</span>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-2 group-hover:text-blue-500" />
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