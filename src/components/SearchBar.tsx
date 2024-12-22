import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useDebouncedCallback } from "use-debounce";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [focused, setFocused] = useState(false);
  
  const debouncedSearch = useDebouncedCallback(
    (value: string) => {
      onSearch(value);
    },
    300
  );

  return (
    <motion.div
      className="relative max-w-2xl w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div
        className={`relative rounded-xl transition-all duration-300 ${
          focused
            ? "shadow-lg ring-2 ring-black/5 bg-white"
            : "shadow ring-1 ring-black/5 bg-white/80"
        }`}
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-4 py-4 rounded-xl bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-lg"
          placeholder="Search for courses..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
    </motion.div>
  );
};

export default SearchBar;