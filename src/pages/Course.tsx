import { useParams } from "react-router-dom";
import PageTransition from "@/components/PageTransition";

const Course = () => {
  const { id } = useParams();

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">Course {id}</h1>
          {/* Course content will be implemented in the next iteration */}
        </div>
      </div>
    </PageTransition>
  );
};

export default Course;