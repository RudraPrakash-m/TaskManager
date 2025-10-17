import { Github, Linkedin, Mail } from 'lucide-react';
import React from 'react'

const FooterPrivate = () => {
    const currentYear = new Date().getFullYear();
    
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">

        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold text-blue-600">WorkEasy</h2>
          <p className="text-sm text-gray-500">
            Manage your daily tasks efficiently and stay productive.
          </p>
        </div>

        <div className="flex gap-5">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:support@taskmanager.com"
            className="hover:text-blue-600 transition"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 py-3 border-t border-gray-100">
        © {currentYear} WorkEasy — All rights reserved.
      </div>
    </footer>
  );
}

export default FooterPrivate