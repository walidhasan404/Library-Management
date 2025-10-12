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
    <div className="mb-4 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl text-center font-bold mb-10">Departments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {departments.map((dept, idx) => (
          <div
            key={idx}
            className="card w-full bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <figure className="overflow-hidden rounded-t-xl">
              <img
                src={dept.img}
                alt={dept.title}
                className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
              />
            </figure>
            <div className="card-body text-center">
              <h2 className="text-xl font-semibold text-gray-800">{dept.title}</h2>
              <div className="mt-4">
                <Link to={dept.route}>
                  <button className="btn bg-sky-400 hover:bg-sky-500 text-white px-6 rounded-md">
                    Books
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCategories;
