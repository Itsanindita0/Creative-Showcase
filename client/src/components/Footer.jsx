import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full mt-10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
        
        <p className="text-sm">
          © {new Date().getFullYear()} Creative Showcase. All rights reserved.
        </p>

        <div className="flex space-x-6 my-3 md:my-0">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
          <Link to="/dashboard" className="hover:text-white transition">Upload</Link>
        </div>

        <p className="text-sm">
          Built using <span className="text-pink-400 font-semibold">MERN</span> Stack
        </p>

      </div>
    </footer>
  );
}
