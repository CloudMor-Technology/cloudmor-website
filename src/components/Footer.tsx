import { Link } from 'react-router-dom';
const Footer = () => {
  return <footer className="bg-slate-900 text-gowith-dark-blue pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <img src="/lovable-uploads/691e7939-254c-4028-91c9-7c00fd9a8db8.png" alt="CloudMor Logo" className="h-28 w-auto" />
            </Link>
            <p className="text-gowith-medium-blue mb-4">
              Enterprise-level technology and security solutions tailored for growing businesses.
            </p>
            <div className="text-gowith-dark-blue">
              <p className="mb-1"><strong>Phone:</strong> <a href="tel:8885546597" className="hover:text-gowith-medium-blue">(888) 554-6597</a></p>
              <p><strong>Email:</strong> <a href="mailto:sales@cloudmor.com" className="hover:text-gowith-medium-blue">sales@cloudmor.com</a></p>
            </div>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gowith-medium-blue hover:text-gowith-dark-blue transition-colors" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-gowith-medium-blue hover:text-gowith-dark-blue transition-colors" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-gowith-medium-blue hover:text-gowith-dark-blue transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.899 10.126-5.864 10.126-11.854z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gowith-dark-blue">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/managed-it" className="text-gowith-medium-blue hover:text-gowith-dark-blue transition-colors">
                  Managed IT Services
                </Link>
              </li>
              <li>
                <Link to="/services/cybersecurity" className="text-gowith-medium-blue hover:text-gowith-dark-blue transition-colors">
                  Cybersecurity Services
                </Link>
              </li>
              <li>
                <Link to="/services/cloud" className="text-gowith-medium-blue hover:text-gowith-dark-blue transition-colors">
                  Managed Cloud Services
                </Link>
              </li>
              <li>
                <Link to="/services/professional" className="text-gowith-medium-blue hover:text-gowith-dark-blue transition-colors">
                  Professional Services
                </Link>
              </li>
              <li>
                <Link to="/services/it-strategy" className="text-gowith-medium-blue hover:text-gowith-dark-blue transition-colors">
                  IT Strategy
                </Link>
              </li>
              <li>
                <Link to="/services/business-comms" className="text-gowith-medium-blue hover:text-gowith-dark-blue transition-colors">
                  Business Comms Platform
                </Link>
              </li>
              <li>
                <Link to="/services/face-id-auth" className="text-gowith-medium-blue hover:text-gowith-dark-blue transition-colors">
                  Face ID Auth
                </Link>
              </li>
              <li>
                <Link to="/services/web-dev-automation" className="text-gowith-medium-blue hover:text-gowith-dark-blue transition-colors">
                  Web Dev Automation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gowith-dark-blue">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gowith-medium-blue hover:text-gowith-dark-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/insights/case-studies" className="text-gowith-medium-blue hover:text-gowith-dark-blue transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/insights/blog" className="text-gowith-medium-blue hover:text-gowith-dark-blue transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gowith-medium-blue hover:text-gowith-dark-blue transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gowith-medium-blue hover:text-gowith-dark-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gowith-dark-blue">Stay Updated</h3>
            <p className="text-gowith-medium-blue mb-4">Subscribe to our newsletter for the latest insights on IT security and business technology.</p>
            <form className="mt-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <input type="email" placeholder="Your email address" className="px-4 py-2 rounded bg-white border-2 border-blue-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors">
                  Subscribe
                </button>
              </div>
            </form>
            <p className="text-xs text-gowith-medium-blue mt-2">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gowith-medium-blue text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} CloudMor. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-gowith-medium-blue hover:text-gowith-dark-blue text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/sitemap" className="text-gowith-medium-blue hover:text-gowith-dark-blue text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
