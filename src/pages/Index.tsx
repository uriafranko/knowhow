import { motion } from 'framer-motion';
import SearchBar from '@/components/SearchBar';
import CourseCard from '@/components/CourseCard';
import PageTransition from '@/components/PageTransition';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import GenerateClassModal from '@/components/GenerateClassModal';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const { toast } = useToast();

  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['courses', searchQuery],
    queryFn: async () => {
      let query = supabase.from('course').select('*').limit(8).eq('is_ready', true);

      if (searchQuery) {
        const searchTerms = searchQuery.toLowerCase().split(' ');
        const searchConditions = searchTerms.map((term) => {
          return `topic.ilike.%${term}%,description.ilike.%${term}%`;
        });

        query = query.or(searchConditions.join(','));
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
  });

  const handleGenerateClass = async (prompt: string) => {
    setIsGenerateModalOpen(false);
    toast({
      title: '✨ Magic in Progress',
      description: 'Your class is being crafted with care...',
    });
    // TODO: Implement class generation logic
  };

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
                  duration=""
                  index={index}
                />
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => setIsGenerateModalOpen(true)}
                className="group relative p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 shadow-sm ring-1 ring-purple-100 hover:shadow-md hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col h-full items-center justify-center text-center py-8">
                  <Sparkles className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-semibold text-purple-800 mb-2 group-hover:text-purple-900">
                    Let me generate a class for you
                  </h3>
                  <p className="text-purple-600">Click here to create something magical</p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      <GenerateClassModal
        searchQuery={searchQuery}
        open={isGenerateModalOpen}
        onOpenChange={setIsGenerateModalOpen}
        onGenerate={handleGenerateClass}
      />
    </PageTransition>
  );
};

export default Index;
