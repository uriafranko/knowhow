import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

interface ClassItem {
  id: number;
  name: string;
  description: string;
  duration: string;
}

interface ClassListProps {
  classes: ClassItem[];
  completedClasses: number[];
}

const ClassList = ({ classes, completedClasses }: ClassListProps) => {
  return (
    <Card className="border-none shadow-lg bg-white/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <BookOpen className="h-6 w-6 text-blue-500" />
          Course Classes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {classes?.map((classItem) => {
            const isCompleted = completedClasses.includes(classItem.id);
            return (
              <Link key={classItem.id} to={`/class/${classItem.id}`} className="block group">
                <Card
                  className={`transition-all duration-300 hover:shadow-xl border-none ${
                    isCompleted ? 'bg-green-50' : 'bg-white'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3">
                          {isCompleted && (
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          )}
                          <h3
                            className={`text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors ${
                              isCompleted ? 'text-green-700' : 'text-gray-900'
                            }`}
                          >
                            {classItem.name}
                          </h3>
                        </div>
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
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassList;