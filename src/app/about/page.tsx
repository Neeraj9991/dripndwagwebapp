import React from "react";
import Image from "next/image";
import { FaLeaf, FaHandsHelping, FaAward } from "react-icons/fa";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Building a better shopping experience since 2015
        </p>
      </section>

      {/* About Section */}
      <section className="mb-20">
        {/* <div className="grid md:grid-cols-2 gap-12 items-center"> */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2015, our e-commerce platform began with a simple
            mission: to make online shopping more enjoyable, reliable, and
            accessible for everyone. What started as a small team of passionate
            individuals has grown into a trusted destination for thousands of
            customers worldwide.
          </p>
          <p className="text-gray-600 mb-4">
            We carefully curate our product selection to bring you the best
            quality items at fair prices. Our team personally tests and
            evaluates each product before adding it to our collection.
          </p>
          <p className="text-gray-600">
            Today, we&apos;re proud to serve over 500,000 satisfied customers with a
            catalog of more than 10,000 products across various categories.
          </p>
          {/* </div> */}
          {/* <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/about-team.jpg"
              alt="Our team working together"
              fill
              className="object-cover"
              priority
            />
          </div> */}
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Our Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaLeaf className="text-green-500 text-4xl mb-4" />,
              title: "Sustainability",
              description:
                "We&apos;re committed to eco-friendly practices and partner with suppliers who share our environmental values.",
            },
            {
              icon: <FaHandsHelping className="text-blue-500 text-4xl mb-4" />,
              title: "Customer First",
              description:
                "Your satisfaction is our top priority. Our support team is available 24/7 to assist you.",
            },
            {
              icon: <FaAward className="text-yellow-500 text-4xl mb-4" />,
              title: "Quality Assurance",
              description:
                "Every product undergoes rigorous testing to ensure it meets our high standards before reaching you.",
            },
          ].map((value, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg text-center">
              {value.icon}
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      {/* <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Meet The Team
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Alex Johnson",
              role: "Founder & CEO",
              image: "/team-member1.jpg",
            },
            {
              name: "Sarah Williams",
              role: "Head of Product",
              image: "/team-member2.jpg",
            },
            {
              name: "Michael Chen",
              role: "Tech Lead",
              image: "/team-member3.jpg",
            },
            {
              name: "Emily Rodriguez",
              role: "Customer Experience",
              image: "/team-member4.jpg",
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative h-64 w-64 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
};

export default About;
