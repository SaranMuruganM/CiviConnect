import React from 'react';

const Mission = () => {
  return (
    <section className="bg-gradient-to-r from-custom-sandals via-purple-500 to-custom-lightGreen py-16 px-8">
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-white mb-6 tracking-wide">
          Our Mission
        </h2>

        {/* Section Description */}
        <p className="text-lg text-gray-200 max-w-3xl mx-auto mb-12">
          At Civi Connect, our mission is to bridge the gap between communities
          and local authorities by offering an efficient, transparent platform
          for reporting and resolving civic issues. We strive to create an
          environment where every voice is heard, every problem is visible, and
          every solution is achievable, making cities smarter, safer, and more
          responsive.
        </p>

        {/* Icons with Mission Points */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3198/3198140.png"
                alt="Connect"
                className="w-full h-full"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Empower Communities
            </h3>
            <p className="text-gray-600">
              We empower residents to take action by providing them with the
              tools to report civic issues easily and effectively.
            </p>
          </div>

          {/* Second Item */}
          <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto mb-4">
              <img
                src="https://img.icons8.com/fluent/48/000000/globe-earth.png"
                alt="Transparency"
                className="w-full h-full"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Drive Transparency
            </h3>
            <p className="text-gray-600">
              Transparency is at the core of our platform, ensuring that civic
              authorities are accountable and issues are addressed promptly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto mb-4">
              <img
                src="https://img.icons8.com/fluent/48/000000/city.png"
                alt="Smart Cities"
                className="w-full h-full"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Build Smart Cities
            </h3>
            <p className="text-gray-600">
              We aim to create smart cities that are better equipped to respond
              to the needs of their citizens through innovative technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
