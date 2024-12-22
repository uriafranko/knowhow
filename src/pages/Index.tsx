import { motion } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import CourseCard from "@/components/CourseCard";
import PageTransition from "@/components/PageTransition";

const FEATURED_COURSES = [
  {
    id: "1",
    title: "Introduction to Digital Marketing",
    description: "Learn the fundamentals of digital marketing and grow your online presence",
    lessons: 12,
    duration: "6 hours"
  },
  {
    id: "2",
    title: "Web Development Fundamentals",
    description: "Master the basics of HTML, CSS, and JavaScript",
    lessons: 15,
    duration: "8 hours"
  },
  {
    id: "3",
    title: "Data Science Essentials",
    description: "Discover the power of data analysis and visualization",
    lessons: 10,
    duration: "5 hours"
  }
];

const Index = () => {
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {FEATURED_COURSES.map((course, index) => (
              <CourseCard key={course.id} {...course} index={index} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;