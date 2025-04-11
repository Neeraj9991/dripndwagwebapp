"use client";

import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-white text-neutral-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-lama-500">
            CONTACT US
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Have questions or feedback? Reach out to our team - we're here to
            help.
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="text-lama-500 mt-1">
                <FaMapMarkerAlt className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 uppercase tracking-wider">
                  OUR LOCATION
                </h3>
                <p className="text-neutral-600">
                  D139 Ground Floor, Abul Fazal,
                  <br />
                  Jamia Nagar, New Delhi 110025
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="text-lama-500 mt-1">
                <FaPhone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 uppercase tracking-wider">
                  PHONE
                </h3>
                <a
                  href="https://wa.me/918058362686"
                  className="text-neutral-600 hover:text-lama-500 transition-colors block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +91 8058362686
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="text-lama-500 mt-1">
                <FaEnvelope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 uppercase tracking-wider">
                  EMAIL
                </h3>
                <a
                  href="mailto:dwag.care@gmail.com"
                  className="text-neutral-600 hover:text-lama-500 transition-colors block"
                >
                  dwag.care@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="text-lama-500 mt-1">
                <FaClock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 uppercase tracking-wider">
                  WORKING HOURS
                </h3>
                <p className="text-neutral-600">
                  Monday - Saturday: 10AM - 7PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">
                FOLLOW US
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/dwagcreation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-lama-500 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a
                  href="https://www.facebook.com/Dwag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-lama-500 transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebook className="w-6 h-6" />
                </a>
                <a
                  href="https://wa.me/918058362686"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-lama-500 transition-colors duration-300"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="aspect-video bg-neutral-100 rounded-lg overflow-hidden border-2 border-lama-500">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.715847987581!2d77.2778123150812!3d28.5499829824496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3a8a5a5e50b%3A0x9a9e9b3b3b3b3b3b!2sAbul%20Fazal%20Enclave%2C%20Jamia%20Nagar%2C%20New%20Delhi%2C%20Delhi%20110025!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="opacity-90 hover:opacity-100 transition-opacity"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
