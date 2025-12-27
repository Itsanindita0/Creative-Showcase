export default function About() {
  return (
    <div className="min-h-screen px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center mt-15">
        About Creative Showcase
      </h1>

      <p className="text-gray-600 text-lg mb-8 text-center">
        Creative Showcase is a platform where users can upload, manage, and
        display their creative work securely and beautifully.
      </p>

      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3"> Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to provide creators with a simple and powerful platform
          to showcase their work, maintain ownership, and control visibility.
          We aim to empower creativity by removing technical barriers.
        </p>
      </section>

      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3"> Key Features</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Secure user authentication using JWT</li>
          <li>Image upload and management dashboard</li>
          <li>User-specific content access</li>
          <li>Clean and responsive UI using Tailwind CSS</li>
          <li>Modern MERN stack architecture</li>
        </ul>
      </section>

      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">🛠️ Technology Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
          <span>React.js</span>
          <span>Node.js</span>
          <span>Express.js</span>
          <span>MongoDB</span>
          <span>JWT Authentication</span>
          <span>Tailwind CSS</span>
        </div>
      </section>

      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">👩‍💻 About the Developer</h2>
        <p className="text-gray-700 leading-relaxed">
          This project was built by a Computer Science student passionate about
          full-stack development and modern web technologies. The focus was on
          building a scalable, secure, and user-friendly application.
        </p>
      </section>

      
      <p className="text-center text-sm text-gray-500 mt-12">
        © {new Date().getFullYear()} Creative Showcase. All rights reserved.
      </p>
    </div>
  );
}
