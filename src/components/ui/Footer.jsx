import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = ({ variant = 'full' }) => {
  const navigationLinks = [
    { name: 'Dashboard', path: '/exercise-dashboard' },
    { name: 'Exercise Detail', path: '/exercise-detail' },
    { name: 'Workout Builder', path: '/workout-builder' },
    { name: 'Workout Execution', path: '/workout-execution' }
  ];

  const supportLinks = [
    { name: 'Help Center', href: '#' },
    { name: 'Contact Us', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'API Documentation', href: '#' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Data Protection', href: '#' }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', href: '#' },
    { name: 'Facebook', icon: 'Facebook', href: '#' },
    { name: 'Instagram', icon: 'Instagram', href: '#' },
    { name: 'YouTube', icon: 'Youtube', href: '#' }
  ];

  if (variant === 'compact') {
    return (
      <footer className="bg-surface border-t border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={16} color="white" />
              </div>
              <span className="text-lg font-bold text-text-primary">FitFlow</span>
            </div>

            {/* Copyright */}
            <div className="text-sm text-text-tertiary">
              © 2024 FitFlow. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-text-tertiary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-text-primary">FitFlow</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Transform your fitness journey with personalized workouts, progress tracking, and expert guidance. 
              Your path to a healthier lifestyle starts here.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-text-tertiary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <nav className="space-y-3" role="navigation" aria-label="Footer navigation">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-text-secondary hover:text-primary transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Support
            </h3>
            <nav className="space-y-3" role="navigation" aria-label="Support links">
              {supportLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-text-secondary hover:text-primary transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Legal
            </h3>
            <nav className="space-y-3" role="navigation" aria-label="Legal links">
              {legalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-text-secondary hover:text-primary transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-text-tertiary">
              © 2024 FitFlow. All rights reserved.
            </div>
            
            {/* Newsletter Signup */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-text-secondary">Stay updated:</span>
              <div className="flex items-center space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  aria-label="Email for newsletter"
                />
                <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;