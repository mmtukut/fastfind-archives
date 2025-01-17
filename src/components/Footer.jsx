import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Users, Coins, Building2, Building, Store, Castle, Warehouse, Hotel, TreePine, TrendingUp, Map } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Company",
      links: [
        { label: "About Us", path: "/about" },
        { label: "Contact", path: "/contact" },
        { label: "Properties", path: "/properties" }
      ]
    },
    {
      title: "Property Types",
      links: [
        { 
          label: "Residential", 
          path: "/properties?type=residential",
          icon: Building2,
          description: "Homes & Apartments"
        },
        { 
          label: "Commercial", 
          path: "/properties?type=commercial",
          icon: Store,
          description: "Office & Retail spaces"
        },
        { 
          label: "Luxury", 
          path: "/properties?type=luxury",
          icon: Castle,
          description: "Premium properties"
        },
        { 
          label: "Industrial", 
          path: "/properties?type=industrial",
          icon: Warehouse,
          description: "Warehouses & Factories"
        }
      ]
    },
    {
      title: "BuildFund Hub",
      isNew: true,
      links: [
        { 
          label: "CommunityPulse", 
          path: "/buildfund-hub/community-pulse",
          icon: Users,
          description: "Vote on infrastructure projects"
        },
        { 
          label: "SmartVest", 
          path: "/buildfund-hub/smart-vest",
          icon: Coins,
          description: "Invest from ₦1,000"
        }
      ]
    },
    {
      title: "Analysis",
      links: [
        { 
          label: "Market Analysis", 
          path: "/market-analysis",
          icon: TrendingUp,
          description: "Property market insights"
        },
        { 
          label: "Infrastructure", 
          path: "/infrastructure-analysis",
          icon: Map,
          description: "Development tracking"
        }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", path: "/terms" },
        { label: "Privacy Policy", path: "/privacy" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, path: "https://facebook.com" },
    { icon: Twitter, path: "https://twitter.com" },
    { icon: Instagram, path: "https://instagram.com" },
    { icon: Linkedin, path: "https://linkedin.com" }
  ];

  return (
    <footer className="bg-white border-t border-[#1c5bde]/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="block mb-4">
              <img 
                src={new URL('/src/assets/images/logo.png', import.meta.url).href}
                alt="FastFind360 Logo" 
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-neutral-600 text-sm mb-6">
              Transforming real estate investment and community development in Nigeria
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-neutral-600 text-sm hover:text-[#1c5bde] transition-colors">
                <Mail className="h-4 w-4" />
                <a href="mailto:contact@fastfind360.com">contact@fastfind360.com</a>
              </div>
              <div className="flex items-center gap-2 text-neutral-600 text-sm hover:text-[#1c5bde] transition-colors">
                <Phone className="h-4 w-4" />
                <a href="tel:+2348000000000">+234 800 000 0000</a>
              </div>
              <div className="flex items-center gap-2 text-neutral-600 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                {section.title}
                {section.isNew && (
                  <span className="px-1.5 py-0.5 bg-[#ff8533] text-white text-xs rounded-full">
                    New
                  </span>
                )}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path}
                      className="group text-sm text-neutral-600 hover:text-[#1c5bde] transition-colors flex items-center gap-2"
                    >
                      {link.icon && (
                        <link.icon className="h-4 w-4 text-neutral-500 group-hover:text-[#1c5bde] transition-colors" />
                      )}
                      <div>
                        <span className="group-hover:translate-x-0.5 transition-transform inline-block">
                          {link.label}
                        </span>
                        {link.description && (
                          <p className="text-xs text-neutral-500">{link.description}</p>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-[#1c5bde]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-600">
              © {currentYear} FastFind360. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-[#1c5bde]/5 text-neutral-600 hover:text-[#1c5bde] transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 