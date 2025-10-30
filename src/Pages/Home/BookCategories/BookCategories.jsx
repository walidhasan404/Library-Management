import { Link } from "react-router-dom";

const departments = [
  {
    title: "CSE",
    img: "https://i.ibb.co/DPg2NrGq/884fc4a9e9431fa0cf6107381ee57997.jpg",
    route: "/books/CSE",
  },
  {
    title: "EEE",
    img: "https://i.ibb.co/vxzx9pR4/7fb5b63c34cf82142319b728d58716d0.jpg",
    route: "/books/EEE",
  },
  {
    title: "Civil",
    img: "https://i.ibb.co/KzNrsbTP/0-civil-engineering-and-architecture-graduation-thesis-defense-powerpoint-background-7f41d35b18-783.jpg",
    route: "/books/Civil",
  },
  {
    title: "Non-Tech",
    img: "https://i.ibb.co/ZpPTxr4w/nontech.png",
    route: "/books/Non-Tech",
  },
];

const BookCategories = () => {
  return (
    <div className="mb-4 px-4 max-w-7xl mx-auto py-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">🏛️</span>
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Departments
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Explore books from different academic departments and expand your knowledge
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          <div className="w-4 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          <div className="w-8 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {departments.map((dept, idx) => (
          <Link
            key={idx}
            to={dept.route}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white dark:bg-slate-800"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-slate-700/50 dark:to-slate-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            
            {/* Image Section */}
            <figure className="relative overflow-hidden h-64">
              <img
                src={dept.img}
                alt={dept.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=' + dept.title;
                  e.target.alt = dept.title + ' Image Placeholder';
                }}
              />
              {/* Department Badge */}
              <div className="absolute top-4 left-4">
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Department
                  </span>
                </div>
              </div>
            </figure>

            {/* Content Section */}
            <div className="relative z-20 p-6 text-center">
              <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {dept.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Explore {dept.title} books
              </p>
              
              {/* Button */}
              <div className="mt-4">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm">
                  View Books →
                </button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-tr from-purple-400/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookCategories;
