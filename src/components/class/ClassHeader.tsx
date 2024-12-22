import { CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ClassHeaderProps {
  name: string;
  description: string;
  courseId: number;
  courseTopic: string;
  isCompleted: boolean;
}

const ClassHeader = ({ name, description, courseId, courseTopic, isCompleted }: ClassHeaderProps) => {
  return (
    <div className="bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to={`/course/${courseId}`}
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-900 mb-6 group transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="magic-text font-medium">Back to {courseTopic}</span>
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600">
              {name}
            </h1>
            {isCompleted ? (
              <CheckCircle2 className="h-8 w-8 text-purple-500 animate-pulse" />
            ) : (
              <XCircle className="h-8 w-8 text-gray-300 transition-colors hover:text-purple-300" />
            )}
          </div>
          <p className="text-xl text-purple-800/70 max-w-3xl">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ClassHeader;