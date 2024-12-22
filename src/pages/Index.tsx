import { motion } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import CourseCard from "@/components/CourseCard";
import PageTransition from "@/components/PageTransition";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data: courses, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('course')
        .select('*');
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-4"
            >
              Discover Your Next Learning Adventure
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            >
              Explore our curated collection of courses designed to help you grow
            </motion.p>
            <SearchBar />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              Failed to load courses. Please try again later.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
              {courses?.map((course, index) => (
                <CourseCard
                  key={course.id}
                  id={course.id.toString()}
                  title={course.topic}
                  description={course.description || ""}
                  lessons={0} // We'll implement this count later
                  duration="Coming soon" // We'll implement this calculation later
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;