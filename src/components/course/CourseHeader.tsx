import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CourseProgress from "./CourseProgress";
import CourseHeaderActions from "./CourseHeaderActions";

interface CourseHeaderProps {
  topic: string;
  description: string | null;
  totalClasses: number;
  completedClassesCount: number;
  isCompleted: boolean;
  onComplete: () => void;
  courseId: number;
}

const CourseHeader = ({
  topic,
  description,
  totalClasses,
  completedClassesCount,
  isCompleted,
  onComplete,
  courseId,
}: CourseHeaderProps) => {
  return (
    <div className="mb-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Courses
      </Link>
      <div className="flex justify-between items-start gap-8 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{topic}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
        <CourseHeaderActions
          isCompleted={isCompleted}
          onComplete={onComplete}
          courseId={courseId}
        />
      </div>
      <CourseProgress
        totalClasses={totalClasses}
        completedClassesCount={completedClassesCount}
      />
    </div>
  );
};

export default CourseHeader;