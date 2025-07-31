import React from "react";
import { Phone, Mail, MapPin, Clock, Send, ExternalLink } from "lucide-react";
import { customItemVariants, sectionContainerVariants } from "@/lib/framer-variants";
import { AnimatedGroup } from "../ui/animated-group";


// Mock profile data
const profile = {
  contact: "+91 6306450212",
  mail: "dharmendrayadav747392@gmail.com",
  location: "Delhi, India",
  timezone: "IST (+5:30)"
};

const ReachoutSection = () => {
  const contactMethods = [
    {
      icon: Phone,
      label: "Phone",
      value: profile.contact,
      href: `tel:${profile.contact}`,
      description: "Call me directly",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      hoverColor: "hover:bg-blue-400/20"
    },
    {
      icon: Mail,
      label: "Email",
      value: profile.mail,
      href: `mailto:${profile.mail}`,
      description: "Send me an email",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      hoverColor: "hover:bg-green-400/20"
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      href: "#",
      description: "Where I'm based",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      hoverColor: "hover:bg-purple-400/20"
    },
    {
      icon: Clock,
      label: "Timezone",
      value: profile.timezone,
      href: "#",
      description: "My working hours",
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      hoverColor: "hover:bg-orange-400/20"
    }
  ];

  return (
    <section className="max-w-4xl">
      <div className="flex items-center space-x-3 mb-6">
        <div>
          <Phone size={24} className="text-red-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Reach Out</h3>
      </div>
      
      <AnimatedGroup
        variants={{
          container: sectionContainerVariants,
          item: customItemVariants,
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <div
                key={index}
                className={`group relative p-4 rounded-xl border border-gray-700/50 ${method.bgColor} ${method.hoverColor} transition-all duration-300 hover:border-gray-600 hover:scale-[1.02] cursor-pointer`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${method.color} bg-gray-800/50`}>
                    <IconComponent size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-gray-200">
                        {method.label}
                      </h4>
                      <ExternalLink size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-white font-medium mt-1 break-all">
                      {method.value}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {method.description}
                    </p>
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* Quick Action Section */}
        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-gray-800/30 to-gray-700/20 border border-gray-700/30">
          <div className="flex flex-col md:flex-row mb-2 md:mt-0 items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Let&apos;s Connect!</h4>
              <p className="text-gray-300 text-sm">
                Ready to discuss your next project? I&apos;m just a message away.
              </p>
            </div>
            <div className="flex space-x-3 mt-4">
              <a
                href={`tel:${profile.contact}`}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-400/10 hover:bg-blue-400/20 text-blue-400 rounded-lg transition-colors duration-200 border border-blue-400/20"
              >
                <Phone size={16} />
                <span className="text-sm font-medium">Call</span>
              </a>
              <a
                href={`mailto:${profile.mail}`}
                className="flex items-center space-x-2 px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg transition-colors duration-200"
              >
                <Send size={16} />
                <span className="text-sm font-medium">Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Response Time Info */}
        <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm mt-6">
          <Clock size={14} />
          <span>Typically responds within 24 hours</span>
        </div>
      </AnimatedGroup>
    </section>
  );
};

export default ReachoutSection;