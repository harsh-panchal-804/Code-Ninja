import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-gray-800/50 mt-auto">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent" />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Branding */}
          <div className="flex items-center gap-2 text-gray-400">
            <div className="box">
              {/* You can render BoxLogo or any logo here */}
            </div>
            <span className="mx-3">Built for fun!</span>
          </div>

          {/* Right: Social Links */}
          <div className="desc-inner flex items-center">
            <span className="text-gray-400 mr-4">Social Links</span>
            <ul className="flex gap-5 p-0 m-0 list-none">
              {/* GitHub */}
              <li>
                <a
                  href="https://github.com/harsh-panchal-804/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <FaGithub size={24} />
                </a>
              </li>
              {/* LinkedIn */}
              <li>
                <a
                  href="https://www.linkedin.com/in/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-400 transition-colors"
                >
                  <FaLinkedin size={24} />
                </a>
              </li>
              {/* LeetCode */}
              <li>
                <Link
                  href="https://leetcode.com/u/harshpanchal522/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    width={24}
                    height={24}
                  >
                    <path
                      fill="#FFA116"
                      d="M27.6 16.6c-0.2-0.2-0.4-0.4-0.6-0.6l-7.2-7.2c-0.8-0.8-2-0.8-2.8 0s-0.8 2 0 2.8l5.8 5.8-5.8 5.8c-0.8 0.8-0.8 2 0 2.8s2 0.8 2.8 0l7.2-7.2c0.2-0.2 0.4-0.4 0.6-0.6 0.2-0.2 0.2-0.4 0.2-0.6s0-0.4-0.2-0.6z"
                    />
                    <path
                      fill="#292D3D"
                      d="M13.2 25.2c-0.8 0.8-2 0.8-2.8 0l-7.2-7.2c-0.8-0.8-0.8-2 0-2.8l7.2-7.2c0.8-0.8 2-0.8 2.8 0s0.8 2 0 2.8l-5.8 5.8 5.8 5.8c0.8 0.8 0.8 2 0 2.8z"
                    />
                  </svg>
                </Link>
              </li>
              {/* Codeforces */}
              <li>
                <a
                  href="https://codeforces.com/profile/Harsh_Panchal01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    width={24}
                    height={24}
                    src="https://cdn.iconscout.com/icon/free/png-256/free-code-forces-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-2-pack-logos-icons-2944796.png?f=webp"
                    alt="Codeforces"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
