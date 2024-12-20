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
  ArrowLeft,
  CreditCard,
  DollarSign,
} from "lucide-react";
import React, { useEffect, useState, createContext, useContext } from "react";
import { render } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createRoot } from "react-dom/client";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
const stripePromise = loadStripe("your_publishable_key");
const getVideoEmbedComponent = (videoUrl) => {
  if (videoUrl.includes("facebook.com")) {
    return (
      <div
        className="fb-video"
        data-href={videoUrl}
        data-width="auto"
        data-show-text="false"
      />
    );
  } else if (
    videoUrl.includes("youtube.com") ||
    videoUrl.includes("youtu.be")
  ) {
    const videoId = videoUrl.includes("youtu.be")
      ? videoUrl.split("/").pop()
      : videoUrl.split("v=")[1].split("&")[0];
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        className="w-full h-full rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  } else {
    return (
      <video
        src={videoUrl}
        controls
        autoPlay
        className="w-full h-full rounded-lg"
      >
        Your browser does not support the video tag.
      </video>
    );
  }
};
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
const VideographerPortfolio = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [bookingDate, setBookingDate] = useState(null);
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState(1000);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [paymentStep, setPaymentStep] = useState("select");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    showNotification("Successfully subscribed to newsletter!");
  };
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    switch (paymentMethod) {
      case "mpesa":
        break;
      case "stripe":
        break;
      // ... other payment methods
    }
    setShowBookingModal(false);
  };
  const handleContactSubmit = (e) => {
    e.preventDefault();
    showNotification("Your message has been sent successfully!");
    setShowContactModal(false);
  };
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setPaymentStep("details");
  };
  const blogPosts = [
    {
      id: 1,
      title: "Essential Gear for Wedding Videography",
      excerpt:
        "Discover the must-have equipment for capturing perfect wedding moments...",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
      date: "2023-09-15",
      category: "Equipment",
    },
    {
      id: 2,
      title: "Creating Emotional Storytelling in Films",
      excerpt: "Learn the art of weaving narratives that touch hearts...",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
      date: "2023-09-10",
      category: "Tips",
    },
    {
      id: 3,
      title: "Behind the Scenes: Mountain Wedding",
      excerpt:
        "A look into the challenges and beauty of filming at altitude...",
      image: "https://images.unsplash.com/photo-1469510360132-641e1df43c32",
      date: "2023-09-05",
      category: "Behind the Scenes",
    },
  ];
  const scrollToNextSection = () => {
    const journeySection = document.querySelector("#journey");
    if (journeySection) {
      journeySection.scrollIntoView();
    }
  };
  const togglePlay = () => setIsPlaying(!isPlaying);
  const openVideoModal = (video) => setActiveVideo(video);
  const closeVideoModal = () => setActiveVideo(null);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const subscribe = () => {
    console.log("Subscribing with email:", email);
    setIsSubscribed(true);
  };
  const scrollToContact = (reason) => {
    setContactReason(reason);
    setShowContactForm(true);
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const openContactModal = () => setShowContactModal(true);
  const handlePaymentSubmit = async () => {
    try {
      switch (paymentMethod) {
        case "mpesa":
          showNotification("Processing M-Pesa payment...");
          break;
        case "stripe":
        case "card":
          showNotification("Processing card payment...");
          break;
        case "paystack":
          showNotification("Processing Paystack payment...");
          break;
      }
    } catch (error) {
      showNotification("Payment failed. Please try again.");
    }
  };
  const CardPaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!stripe || !elements) return;
      setProcessing(true);
      setError(null);
      const { error: stripeError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });
      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
      } else {
        showNotification("Payment method created successfully!");
        setProcessing(false);
        setShowBookingModal(false);
      }
    };
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-700">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: theme === "dark" ? "#fff" : "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
              },
            }}
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          disabled={!stripe || processing}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    );
  };
  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "mpesa":
        return (
          <div className="space-y-4">
            <input
              type="tel"
              placeholder="M-Pesa Phone Number"
              className="w-full px-4 py-2 rounded-lg border"
            />
          </div>
        );
      case "stripe":
      case "card":
        return (
          <Elements stripe={stripePromise}>
            <CardPaymentForm />
          </Elements>
        );
      case "paypal":
        return (
          <div className="mt-4">
            <button
              onClick={() => {
                showNotification("PayPal integration coming soon!");
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg"
            >
              Pay with PayPal
            </button>
          </div>
        );
      case "paystack":
        return (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg border"
            />
          </div>
        );
      default:
        return null;
    }
  };
  const [consultationType, setConsultationType] = useState("general");
  const [contactReason, setContactReason] = useState("");
  const handleConsultationClick = () => {
    setContactReason("consultation");
    setShowContactModal(true);
  };
  const handleScheduleCall = () => {
    setContactReason("call");
    setShowContactModal(true);
  };
  const getModalTitle = () => {
    switch (contactReason) {
      case "consultation":
        return "Book Consultation";
      case "call":
        return "Schedule a Call";
      default:
        return "Contact Us";
    }
  };
  const getModalDescription = () => {
    switch (contactReason) {
      case "consultation":
        return "Book a consultation to discuss your project in detail.";
      case "call":
        return "Schedule a quick call to discuss your requirements.";
      default:
        return "Get in touch with us.";
    }
  };
  return (
    <div className="w-screen min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-fade-in-down">
          <Check size={20} />
          {toastMessage}
        </div>
      )}

      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a className="text-xl font-bold text-black dark:text-white flex items-center gap-2">
              <Camera size={24} />
              Jim Creations
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#work"
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white flex items-center gap-2"
              >
                <Video size={20} />
                Work
              </a>
              <a
                href="#services"
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white flex items-center gap-2"
              >
                <Package size={20} />
                Services
              </a>
              <a
                href="#about"
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white flex items-center gap-2"
              >
                <User size={20} />
                About
              </a>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-900 transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-50 md:hidden`}
      >
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Camera size={24} />
            Jim Creations
          </div>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <a
            href="#work"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <Film size={20} />
            Work
          </a>
          <a
            href="#services"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <Package size={20} />
            Services
          </a>
          <a
            href="#about"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <User size={20} />
            About
          </a>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://scontent.fnbo2-1.fna.fbcdn.net/v/t39.30808-6/274343325_2027951197378195_7748995526855260032_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHGEfFmDuoy-QWj3mkw83vnXgliGEujMtZeCWIYS6My1uEBFQ7SSaoDcUl8wrVPVsmT4FejNaKhCd7rj9irTB0u&_nc_ohc=DFzRxP7egEQQ7kNvgEHeVO5&_nc_zt=23&_nc_ht=scontent.fnbo2-1.fna&_nc_gid=AoAENdb8ILnNSR3lNnJmMMo&oh=00_AYDmVAPqvl-7Q_WCk397qlejLAkeAxVm5ebMp2HKUyu0EA&oe=6769F5AF"
            alt="Videographer background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 backdrop-blur-[2px]">
          <div className="container mx-auto h-full flex items-center px-4">
            <div className="text-white max-w-3xl">
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="text-5xl md:text-7xl font-bold mb-4"
              >
                Jim Creations
              </motion.h1>
              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                }}
                className="text-xl md:text-2xl mb-8 text-gray-200"
              >
                Capturing life's moments in motion
              </motion.p>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                }}
                className="flex flex-wrap gap-4"
              >
                <button
                  className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors group"
                  onClick={() =>
                    openVideoModal({
                      video:
                        "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4",
                    })
                  }
                >
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Watch Showreel</span>
                </button>
                <button
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/20 transition-colors border border-white/20 group"
                  onClick={handleConsultationClick}
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Get Quote</span>
                </button>
                <button
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/20 transition-colors border border-white/20 group"
                  onClick={handleScheduleCall}
                >
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Schedule Call</span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
        <motion.button
          onClick={scrollToNextSection}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1,
            duration: 1,
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white hover:text-blue-400 transition-colors cursor-pointer"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <ChevronRight size={24} className="rotate-90" />
          </motion.div>
        </motion.button>
      </section>

      <motion.section
        id="journey"
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white">
              My Journey
            </h2>

            <div className="space-y-12">
              {[
                {
                  year: "2013",
                  title: "Started Filmmaking",
                  description: "Bought first DSLR camera",
                },
                {
                  year: "2015",
                  title: "First Wedding Film",
                  description: "Shot my first wedding",
                },
                {
                  year: "2018",
                  title: "Award Winner",
                  description: "Best Documentary Short Film",
                },
                {
                  year: "2023",
                  title: "Studio Launch",
                  description: "Opened production studio",
                },
              ].map((milestone, i) => (
                <motion.div
                  initial={{
                    x: -50,
                    opacity: 0,
                  }}
                  whileInView={{
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{
                    delay: i * 0.2,
                  }}
                  key={milestone.year}
                  className="flex gap-8 items-start"
                >
                  <div className="text-2xl font-bold text-blue-600">
                    {milestone.year}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold dark:text-white">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <section className="py-20 px-4" id="work">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white">
            Featured Work
          </h2>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative max-w-md mx-auto">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative max-w-md mx-auto">
                <Filter
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="wedding">Wedding</option>
                  <option value="commercial">Commercial</option>
                  <option value="documentary">Documentary</option>
                  <option value="event">Event</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                title: "Destination Wedding Film",
                thumbnail:
                  "https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf",
                video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                category: "wedding",
              },
              {
                id: 2,
                title: "Commercial Brand Story",
                thumbnail:
                  "https://images.unsplash.com/photo-1536240478700-b869070f9279",
                video: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
                category: "commercial",
              },
              {
                id: 3,
                title: "Wedding Highlights",
                thumbnail:
                  "https://images.unsplash.com/photo-1465188162913-8fb5709d6d57",
                video:
                  "https://www.facebook.com/facebook/videos/10153231379946729/",
                category: "wedding",
              },
              {
                id: 4,
                title: "Travel Documentary",
                thumbnail:
                  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
                video: "https://www.youtube.com/watch?v=hZB9h_ZLpF0",
                category: "documentary",
              },
              {
                id: 5,
                title: "Event Coverage",
                thumbnail:
                  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
                video:
                  "https://www.facebook.com/facebook/videos/10153231379946729/",
                category: "event",
              },
              {
                id: 6,
                title: "Product Launch",
                thumbnail:
                  "https://images.unsplash.com/photo-1493612276216-ee3925520721",
                video: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
                category: "commercial",
              },
            ]
              .filter(
                (item) =>
                  (selectedCategory === "all" ||
                    item.category === selectedCategory) &&
                  item.title.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => openVideoModal(item)}
                  className="cursor-pointer group relative aspect-video overflow-hidden rounded-lg"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-4">
                    <Play className="text-white mb-2" size={48} />
                    <h3 className="text-white text-lg font-semibold text-center">
                      {item.title}
                    </h3>
                    <p className="text-gray-200 text-sm capitalize">
                      {item.category}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <motion.section
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        className="py-20 px-4 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white">
            Client Testimonials
          </h2>

          <div className="max-w-4xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -20,
                }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
              >
                {(() => {
                  const testimonial = [
                    {
                      name: "Sarah & John",
                      image:
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
                      text: "Absolutely amazing work! Captured our wedding perfectly.",
                      rating: 5,
                      video: "https://example.com/testimonial1.mp4",
                    },
                  ][currentTestimonial];
                  return (
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold dark:text-white">
                            {testimonial.name}
                          </h4>
                          <div className="flex text-yellow-400">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} size={16} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {testimonial.text}
                      </p>
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900" id="services">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white">
            Services & Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Premium Equipment",
                description:
                  "Latest 4K & 8K cameras, professional audio gear, and stabilization equipment",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Worldwide Coverage",
                description:
                  "Available for destination weddings and international projects",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Fast Delivery",
                description:
                  "Quick turnaround times with regular updates on progress",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Customized Approach",
                description:
                  "Tailored solutions for your specific needs and preferences",
              },
              {
                icon: <FileCheck className="w-8 h-8" />,
                title: "Quality Guarantee",
                description:
                  "Multiple rounds of revisions to ensure satisfaction",
              },
              {
                icon: <Gift className="w-8 h-8" />,
                title: "Bonus Features",
                description:
                  "Complimentary drone shots and behind-the-scenes content",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Basic Package",
                price: "$1,499",
                features: [
                  "4-6 Hours Coverage",
                  "Edited Highlight Film",
                  "Digital Delivery",
                  "2 Videographers",
                ],
              },
              {
                title: "Premium Package",
                price: "$2,499",
                features: [
                  "8-10 Hours Coverage",
                  "Extended Highlight Film",
                  "Raw Footage",
                  "3 Videographers",
                  "Drone Footage",
                ],
              },
              {
                title: "Luxury Package",
                price: "$3,999",
                features: [
                  "Full Day Coverage",
                  "Feature Film",
                  "Same-Day Edit",
                  "4 Videographers",
                  "Drone Footage",
                  "Premium Equipment",
                ],
              },
            ].map((pkg) => (
              <div
                key={pkg.title}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 dark:text-white">
                  {pkg.title}
                </h3>
                <p className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400">
                  {pkg.price}
                </p>
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-gray-600 dark:text-gray-300"
                    >
                      <span className="mr-2">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full mt-8 bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition"
                  onClick={() => {
                    setSelectedPackage(pkg);
                    setShowBookingModal(true);
                  }}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center dark:text-white">
              Additional Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Settings className="w-6 h-6" />,
                  title: "Equipment Rental",
                  description:
                    "Professional video equipment available for rent",
                  price: "Starting at $200/day",
                },
                {
                  icon: <MessageSquare className="w-6 h-6" />,
                  title: "Consultation",
                  description: "Expert advice on your video projects",
                  price: "$150/hour",
                },
                {
                  icon: <Briefcase className="w-6 h-6" />,
                  title: "Post-Production",
                  description: "Professional editing and color grading",
                  price: "Custom quotes",
                },
                {
                  icon: <Bell className="w-6 h-6" />,
                  title: "Live Streaming",
                  description: "Professional live event broadcasting",
                  price: "Starting at $500",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                >
                  <div className="text-blue-600 dark:text-blue-400">
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2 dark:text-white">
                      {service.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {service.description}
                    </p>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">
                      {service.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800" id="about">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white">
            About Me
          </h2>
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Jim</h3>
              <p className="text-lg mb-8 dark:text-white">
                With over 10 years of experience in videography, I specialize in
                wedding films, documentaries, and commercial projects. My
                passion lies in telling compelling stories through the lens of
                my camera.
              </p>
              <div className="flex gap-4">
                <button
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
                  onClick={handleConsultationClick}
                >
                  <Calendar size={20} />
                  Book Consultation
                </button>
                <button className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-full hover:bg-gray-300 dark:hover:bg-gray-800 transition">
                  <Download size={20} />
                  Download Portfolio
                </button>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://scontent.fnbo2-1.fna.fbcdn.net/v/t39.30808-6/274343325_2027951197378195_7748995526855260032_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHGEfFmDuoy-QWj3mkw83vnXgliGEujMtZeCWIYS6My1uEBFQ7SSaoDcUl8wrVPVsmT4FejNaKhCd7rj9irTB0u&_nc_ohc=1FSpgu_dBxcQ7kNvgESNbPf&_nc_zt=23&_nc_ht=scontent.fnbo2-1.fna&_nc_gid=AukUFGCw_avKBdIn9Ecij-x&oh=00_AYCvBAinKvGaWVTOgLVjPJtklD4Omi1FfhqtZ_rBOmQDCQ&oe=6769F5AF"
                alt="Jim"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white">
            Latest Blog Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-bold mb-4 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-gray-600 dark:text-gray-300">
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {post.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-blue-600 dark:bg-blue-800">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
            Subscribe to Our Newsletter
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-8 text-center text-white">
              Stay updated with the latest from our blog and projects.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full md:w-1/2 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
              <button
                onClick={handleSubscribe}
                disabled={isSubscribed}
                className="w-full md:w-1/4 bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {isSubscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white mb-6">
                <Camera size={24} />
                <span className="text-xl font-bold">Jim Creations</span>
              </div>
              <p className="text-sm">
                Professional videography services for weddings, documentaries,
                and commercial projects.
              </p>
              <div className="flex space-x-4">
                <a className="hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a className="hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a className="hover:text-white transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#work"
                    className="hover:text-white transition-colors"
                  >
                    Portfolio
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-6">Services</h3>
              <ul className="space-y-3">
                <li>
                  <a className="hover:text-white transition-colors">
                    Wedding Videography
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors">
                    Commercial Films
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors">
                    Documentary Production
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors">
                    Event Coverage
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors">
                    Aerial Filming
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-6">Contact Info</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Mail size={16} />
                  <a
                    href="mailto:contact@jimcreations.com"
                    className="hover:text-white transition-colors"
                  >
                    contact@jimcreations.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} />
                  <a
                    href="tel:+1234567890"
                    className="hover:text-white transition-colors"
                  >
                    (123) 456-7890
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-gray-800">
            <div className="text-center md:text-left space-y-2">
              <h4 className="text-white font-semibold">Equipment Rentals</h4>
              <p className="text-sm">
                Professional video equipment available for rent
              </p>
              <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 mx-auto md:mx-0">
                View Equipment <ChevronRight size={16} />
              </button>
            </div>
            <div className="text-center md:text-left space-y-2">
              <h4 className="text-white font-semibold">Workshop & Training</h4>
              <p className="text-sm">Learn videography from professionals</p>
              <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 mx-auto md:mx-0">
                View Courses <ChevronRight size={16} />
              </button>
            </div>
            <div className="text-center md:text-left space-y-2">
              <h4 className="text-white font-semibold">Partner Program</h4>
              <p className="text-sm">Collaborate with Jim Creations</p>
              <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 mx-auto md:mx-0">
                Learn More <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-sm">
              © {new Date().getFullYear()} Jim Creations. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeVideoModal}
        >
          <div className="w-full max-w-4xl aspect-video">
            {getVideoEmbedComponent(activeVideo.video)}
          </div>
        </div>
      )}

      {showBookingModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-8 w-full max-w-2xl my-8 relative">
            <button
              onClick={() => {
                if (paymentStep === "details") {
                  setPaymentStep("select");
                } else {
                  setShowBookingModal(false);
                }
              }}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              {paymentStep === "details" ? (
                <ArrowLeft size={24} />
              ) : (
                <X size={24} />
              )}
            </button>

            <h3 className="text-2xl font-bold mb-6 dark:text-white">
              {paymentStep === "select"
                ? `Book ${selectedPackage?.title}`
                : `Pay with ${paymentMethod.toUpperCase()}`}
            </h3>

            {paymentStep === "select" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPaymentStep("details");
                }}
              >
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                  <DatePicker
                    selected={bookingDate}
                    onChange={setBookingDate}
                    className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                  />

                  <div className="space-y-2">
                    <h4 className="font-semibold">Payment Method</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {["mpesa", "stripe", "paystack", "paypal", "card"].map(
                        (method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => handlePaymentMethodChange(method)}
                            className={`p-4 border rounded-lg transition-all ${paymentMethod === method ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "hover:border-blue-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                          >
                            <div className="flex items-center justify-center gap-2">
                              {method === "mpesa" && (
                                <Phone className="w-5 h-5" />
                              )}
                              {method === "stripe" && (
                                <CreditCard className="w-5 h-5" />
                              )}
                              {method === "paystack" && (
                                <CreditCard className="w-5 h-5" />
                              )}
                              {method === "paypal" && (
                                <DollarSign className="w-5 h-5" />
                              )}
                              {method === "card" && (
                                <CreditCard className="w-5 h-5" />
                              )}
                              <span className="font-medium">
                                {method.toUpperCase()}
                              </span>
                            </div>
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg"
                  >
                    Complete Booking
                  </button>
                </div>
              </form>
            ) : (
              <div>
                {renderPaymentForm()}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setPaymentStep("select")}
                    className="w-1/2 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePaymentSubmit}
                    className="w-1/2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                  >
                    Complete Payment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showContactModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full relative">
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-2 dark:text-white">
              {getModalTitle()}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {getModalDescription()}
            </p>
            <form onSubmit={handleContactSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                  required
                />
                {contactReason === "consultation" && (
                  <select
                    value={consultationType}
                    onChange={(e) => setConsultationType(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="wedding">Wedding Videography</option>
                    <option value="commercial">Commercial Project</option>
                    <option value="documentary">Documentary</option>
                    <option value="event">Event Coverage</option>
                  </select>
                )}
                <DatePicker
                  selected={bookingDate}
                  onChange={setBookingDate}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                  placeholderText="Select date and time"
                  required
                />
                <textarea
                  placeholder="Tell us about your project"
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                  rows={4}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  {contactReason === "consultation"
                    ? "Book Consultation"
                    : "Schedule Call"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <motion.button
        initial={{
          y: 100,
        }}
        animate={{
          y: 0,
        }}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-40 flex items-center gap-2"
        onClick={() => setShowHelpModal(true)}
      >
        <MessageSquare size={24} />
        <span className="hidden sm:inline">Need Help?</span>
      </motion.button>

      {showHelpModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full relative">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-6 dark:text-white">
              Contact Us
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showNotification("Message sent successfully!");
                setShowHelpModal(false);
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">
                    How can we help?
                  </label>
                  <select className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Booking Issue</option>
                    <option>Payment Problem</option>
                    <option>Other</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                  required
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <motion.button
        initial={{
          y: 100,
        }}
        animate={{
          y: 0,
        }}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-40"
      >
        <ArrowRight size={24} />
      </motion.button>
    </div>
  );
};
const App = () => (
  <ThemeProvider>
    <VideographerPortfolio />
  </ThemeProvider>
);
export default App;
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
const style = document.createElement("style");
style.textContent = `
  :root {
    --background: #ffffff;
    --text: #000000;
  }

  .dark {
    --background: #1a1a1a; 
    --text: #ffffff;
  }

  body {
    background-color: var(--background);
    color: var(--text);
    transition: background-color 0.3s, color 0.3s;
  }
`;
document.head.appendChild(style);
render(<App />, document.getElementById("root"));
