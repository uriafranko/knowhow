import { motion } from 'framer-motion';
import SearchBar from '@/components/SearchBar';
import CourseCard from '@/components/CourseCard';
import PageTransition from '@/components/PageTransition';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['courses', searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('course')
        .select('*')
        .limit(10);

      if (searchQuery) {
        // Split search query into words and create a more flexible search pattern
        const searchTerms = searchQuery.toLowerCase().split(' ');
        const searchConditions = searchTerms.map(term => {
          // Create multiple patterns for each word to catch typos and partial matches
          return `topic.ilike.%${term}%,description.ilike.%${term}%`;
        });
        
        // Combine all search conditions with OR
        query = query.or(searchConditions.join(','));
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <SearchBar onSearch={setSearchQuery} />
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
                  description={course.description || ''}
                  lessons={0}
                  duration="Coming soon"
                  index={index}
                />
              ))}
              {courses?.length === 0 && (
                <div className="col-span-full text-center text-gray-500">
                  No courses found matching your search.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;