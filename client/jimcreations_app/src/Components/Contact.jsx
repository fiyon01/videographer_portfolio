import {
    Moon,
    Sun,
    Search,
    Play,
    Pause,
    Instagram,
    Twitter,
    Mail,
    Phone,
    Menu,
    X,
    ChevronRight,
    Filter,
    Camera,
    Film,
    Award,
    Star,
    Calendar,
    Clock,
    Package,
    Shield,
    Check,
    User,
    Share2,
    Download,
    ArrowRight,
    Video,
    Sparkles,
    Gift,
    Settings,
    MessageSquare,
    FileCheck,
    Bell,
    Zap,
    Globe,
    Heart,
    Briefcase,
    Map,
    MessageCircle,
    MapPin,
    Send,
    CheckCircle,
  } from "lucide-react";
  import { render } from "react-dom";
  import React, { useState } from "react";
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  export default function ContactPage() {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      preferredDate: null,
      projectType: "",
      budget: 1000,
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      setLoading(false);
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
    return (
      <div className="w-screen min-h-screen bg-white dark:bg-gray-900">
        <section className="relative h-[40vh] bg-black">
          <div className="absolute inset-0 overflow-hidden">
            <video
              className="w-full h-full object-cover opacity-50"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/25">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Get in Touch
                </h1>
                <p className="text-xl text-gray-200">
                  Let's create something amazing together
                </p>
              </div>
            </div>
          </div>
        </section>
  
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: <Phone className="w-6 h-6" />,
                  title: "Call Us",
                  content: "(123) 456-7890",
                  action: "Call now",
                  link: "tel:+1234567890",
                },
                {
                  icon: <Mail className="w-6 h-6" />,
                  title: "Email Us",
                  content: "contact@jimcreations.com",
                  action: "Send email",
                  link: "mailto:contact@jimcreations.com",
                },
                {
                  icon: <MapPin className="w-6 h-6" />,
                  title: "Visit Us",
                  content: "123 Creative Studio St, NY 10001",
                  action: "Get directions",
                  link: "#",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-400 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {item.content}
                  </p>
                  <a
                    href={item.link}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {item.action}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              ))}
            </div>
  
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a project type</option>
                      <option value="wedding">Wedding Videography</option>
                      <option value="commercial">Commercial Video</option>
                      <option value="documentary">Documentary</option>
                      <option value="event">Event Coverage</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">
                      Preferred Date
                    </label>
                    <DatePicker
                      selected={formData.preferredDate}
                      onChange={(date) =>
                        setFormData((prev) => ({
                          ...prev,
                          preferredDate: date,
                        }))
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                      placeholderText="Select a date"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loading || submitted}
                    className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${loading ? "bg-gray-400" : submitted ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"}`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-3"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : submitted ? (
                      <span className="flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Message Sent!
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </span>
                    )}
                  </button>
                </form>
              </div>
  
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">
                    Office Hours
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        day: "Monday - Friday",
                        hours: "9:00 AM - 6:00 PM",
                      },
                      {
                        day: "Saturday",
                        hours: "10:00 AM - 4:00 PM",
                      },
                      {
                        day: "Sunday",
                        hours: "Closed",
                      },
                    ].map((schedule, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="text-gray-600 dark:text-gray-400">
                          {schedule.day}
                        </span>
                        <span className="font-medium dark:text-white">
                          {schedule.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
  
                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">
                    Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    {[
                      {
                        icon: "instagram",
                        link: "#",
                      },
                      {
                        icon: "twitter",
                        link: "#",
                      },
                      {
                        icon: "facebook",
                        link: "#",
                      },
                      {
                        icon: "youtube",
                        link: "#",
                      },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <span className="sr-only">{social.icon}</span>
                        <i className={`fab fa-${social.icon}`}></i>
                      </a>
                    ))}
                  </div>
                </div>
  
                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">FAQ</h3>
                  <div className="space-y-4">
                    {[
                      {
                        q: "What's your typical response time?",
                        a: "We aim to respond to all inquiries within 24 hours.",
                      },
                      {
                        q: "Do you travel for projects?",
                        a: "Yes, we're available for projects worldwide.",
                      },
                      {
                        q: "What's your booking process?",
                        a: "We require a signed contract and 50% deposit to secure your date.",
                      },
                    ].map((faq, index) => (
                      <div key={index}>
                        <h4 className="font-medium mb-2 dark:text-white">
                          {faq.q}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
