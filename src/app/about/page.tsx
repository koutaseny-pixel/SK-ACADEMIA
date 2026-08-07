export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">About SK Academia</h1>
      
      <div className="prose prose-lg mx-auto text-gray-700">
        <p className="mb-6">
          Founded with a clear mission, <strong>SK Academia</strong> is dedicated to empowering students across Senegal and beyond. We believe that access to high-quality educational materials should be seamless, affordable, and impactful.
        </p>
        <p className="mb-6">
          Whether you are preparing for the BAC, navigating university exams, or aiming for competitive entrance exams, our platform is designed to provide you with the best tools to succeed. From expertly crafted study guides to comprehensive past papers and dynamic online courses, we have everything you need.
        </p>
        <div className="bg-primary/5 p-8 rounded-xl border border-primary/10 my-12 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Our Vision</h2>
          <p className="italic text-gray-700">
            "To become the most trusted and comprehensive digital learning companion for every student in Senegal."
          </p>
        </div>
      </div>
    </div>
  );
}
