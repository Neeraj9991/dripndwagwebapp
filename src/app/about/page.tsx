"use client";

import React from "react";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-20 sm:px-8 md:px-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          About DripnDwag
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
          Where fashion meets personality — one T-shirt at a time.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          At DripnDwag, we're not just selling T-shirts — we’re delivering
          confidence, comfort, and creativity. Whether you’re into anime, street
          culture, or minimalist design, our collections are crafted to let you
          express your vibe effortlessly.
        </p>
      </div>

      {/* Values Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-4">What We Stand For</h2>
        <ul className="space-y-4 text-gray-700 text-lg">
          <li>
            ✅ <strong>Quality First</strong> — We source premium fabrics and
            pay attention to every stitch.
          </li>
          <li>
            🚀 <strong>Bold Expression</strong> — Fashion is your voice. We help
            you turn it up.
          </li>
          <li>
            🌿 <strong>Slow Fashion</strong> — Our pieces are made to last and
            respect the planet.
          </li>
          <li>
            🙌 <strong>Community Driven</strong> — You inspire our next drop.
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center mt-20">
        <h3 className="text-2xl font-bold mb-4">Join the Movement</h3>
        <p className="text-gray-700 text-lg mb-6">
          Be part of a growing community that values style, creativity, and
          comfort.
        </p>
        <a
          href="/shop"
          className="inline-block bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition"
        >
          Explore the Collection
        </a>
      </div>
    </div>
  );
};

export default AboutUsPage;
