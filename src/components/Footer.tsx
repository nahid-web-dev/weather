

import { Github } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full py-6 bg-gradient-to-br from-indigo-700 to-sky-500 border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors"
            >
              <Github className="h-6 w-6" />
            </Link>
          </div>
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Weather App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
