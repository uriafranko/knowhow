import { useParams } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Class = () => {
  const { id } = useParams();

  const { data: classData, isLoading } = useQuery({
    queryKey: ['class', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('class')
        .select(`
          *,
          course:course (
            topic,
            description
          )
        `)
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </PageTransition>
    );
  }

  if (!classData) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Class not found</h1>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="text-sm text-gray-500 mb-2">
              Course: {classData.course?.topic}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{classData.name}</h1>
            <p className="text-xl text-gray-600">{classData.description}</p>
          </div>

          {/* We'll implement the full class content UI in the next iteration */}
        </div>
      </div>
    </PageTransition>
  );
};

export default Class;