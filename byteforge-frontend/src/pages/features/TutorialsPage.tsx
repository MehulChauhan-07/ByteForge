// TutorialsPage.js
import React, { useState } from 'react';
import { BookOpen, Search, Filter, ArrowRight } from 'lucide-react';

const TutorialsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Coding', 'Design', 'Data Science'];
  
  const tutorials = [
    {
      id: 1,
      title: 'Getting Started with React',
      description: 'Learn the fundamentals of React and build your first component.',
      category: 'Beginner',
      duration: '45 min',
      level: 'Beginner',
      author: 'Sarah Johnson',
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'Advanced CSS Techniques',
      description: 'Master modern CSS layouts with flexbox and grid.',
      category: 'Design',
      duration: '60 min',
      level: 'Intermediate',
      author: 'Michael Chen',
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'Data Visualization with D3',
      description: 'Create interactive data visualizations for the web.',
      category: 'Data Science',
      duration: '75 min',
      level: 'Advanced',
      author: 'Elena Rodriguez',
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      title: 'JavaScript for Beginners',
      description: 'Introduction to JavaScript programming concepts.',
      category: 'Coding',
      duration: '50 min',
      level: 'Beginner',
      author: 'David Kim',
      image: '/api/placeholder/300/200'
    },
    {
      id: 5,
      title: 'Building APIs with Node.js',
      description: 'Learn to create RESTful APIs with Node and Express.',
      category: 'Coding',
      duration: '65 min',
      level: 'Intermediate',
      author: 'Alex Taylor',
      image: '/api/placeholder/300/200'
    },
    {
      id: 6,
      title: 'Machine Learning Basics',
      description: 'Introduction to core machine learning concepts and techniques.',
      category: 'Data Science',
      duration: '90 min',
      level: 'Intermediate',
      author: 'Priya Patel',
      image: '/api/placeholder/300/200'
    }
  ];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tutorial.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tutorials</h1>
        <p className="text-gray-600">Expand your knowledge with our comprehensive tutorials</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search tutorials..."
            className="w-full p-2 pl-10 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="relative w-full md:w-64">
          <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
          <select
            className="w-full p-2 pl-10 border rounded-lg appearance-none bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map(tutorial => (
          <div key={tutorial.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img 
              src={tutorial.image} 
              alt={tutorial.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {tutorial.level}
                </span>
                <span className="text-sm text-gray-500">{tutorial.duration}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{tutorial.title}</h3>
              <p className="text-gray-600 mb-4">{tutorial.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">By {tutorial.author}</span>
                <button className="flex items-center text-blue-600 hover:text-blue-800">
                  Start learning
                  <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredTutorials.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No tutorials found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default TutorialsPage;