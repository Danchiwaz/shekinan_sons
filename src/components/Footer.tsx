import React from "react";
import logo from '../assets/logo.jpeg'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + Social */}
          <div>
            <div className="flex items-center mb-4">
              <img src={logo} alt="Shekinah logo" className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover ring-2 ring-white/20" />
            </div>
            <p className="text-gray-400 mb-4">
             Shekinah Sons is an interdenominational movement under the leadership of Joseph Macharia, focused on raising believers.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: "facebook-f", href: "https://www.facebook.com/shekinahsonsglobal" },
                { icon: "instagram", href: "https://www.instagram.com/shekinahsonsglobal?igsh=MWE5MTFyc3l3aDRsOA==" },
                { icon: "youtube", href: "https://youtube.com/@shekinahsonsglobal?si=yTbAl7BCwp36y6b8" },
                { icon: "tiktok", href: "https://www.tiktok.com/@shekinahsonsglobal?_t=ZM-8z8Py8Ywvgc&_r=1" },
                { icon: "spotify", href: "https://open.spotify.com/show/62bFC5Jqy3FZQeOQA3XwRK?si=VKwpFqu1RRurP1uAt3Rx0w" },
                { icon: "twitter", href: "https://www.threads.net/@shekinahsonsglobal" },
              ].map(({ icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition duration-300"
                  aria-label={`Link to ${icon}`}
                >
                  <i className={`fab fa-${icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="heading-font text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About Us", "Beliefs", "Ministries", "Sermons", "Events"].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <h3 className="heading-font text-lg font-bold mb-4">Ministries</h3>
            <ul className="space-y-2">
              {["Children", "Youth", "Women", "Men", "Seniors", "Missions"].map((group, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                    {group}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="heading-font text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2 text-amber-600" aria-hidden="true" />
                <span>Kutus, Kirinyaga</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-2 text-amber-600" aria-hidden="true" />
                <span>0796481049</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-2 text-amber-600" aria-hidden="true" />
                <span>info@shekinahsons.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Shekinah Sons. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
