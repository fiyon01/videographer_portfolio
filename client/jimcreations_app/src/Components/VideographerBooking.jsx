import {
    Calendar,
    Clock,
    Camera,
    Film,
    Video,
    Package,
    CreditCard,
    ChevronRight,
    Phone,
  } from "lucide-react";
  import React, { useState } from "react";
  import { render } from "react-dom";
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  export default function VideographerBooking() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [selectedTime, setSelectedTime] = useState("");
    const [showContactForm, setShowContactForm] = useState(false);
    const [supportLoading, setSupportLoading] = useState(false);
    const services = [
      {
        id: 1,
        name: "Event Coverage",
        icon: <Video className="w-8 h-8 mb-4" />,
        price: 799,
        description: "Professional event videography with edited highlights",
      },
      {
        id: 2,
        name: "Commercial Shoot",
        icon: <Film className="w-8 h-8 mb-4" />,
        price: 1299,
        description: "High-end commercial video production",
      },
      {
        id: 3,
        name: "Wedding Package",
        icon: <Camera className="w-8 h-8 mb-4" />,
        price: 2499,
        description: "Full day wedding coverage with drone footage",
      },
    ];
    return (
      <main className="w-screen min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Book Your Videographer
            </h1>
            <p className="text-gray-400">
              Create stunning memories with our professional video services
            </p>
          </header>
  
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3 bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              {step === 1 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Calendar className="w-6 h-6" />
                    Select Date & Time
                  </h2>
  
                  <div className="bg-gray-700/50 rounded-xl p-4">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      inline
                      minDate={new Date()}
                      className="w-full bg-transparent"
                    />
                  </div>
  
                  <div className="space-y-4">
                    <label className="block text-gray-400 mb-2">
                      Select Time
                    </label>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="bg-transparent outline-none flex-1 text-white"
                      />
                    </div>
                  </div>
                </div>
              )}
  
              {step === 2 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Package className="w-6 h-6" />
                    Select Service
                  </h2>
  
                  <div className="grid md:grid-cols-2 gap-6">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className={`p-6 rounded-xl text-left transition-all ${selectedService?.id === service.id ? "bg-blue-600/50 ring-2 ring-blue-400" : "bg-gray-700/50 hover:bg-gray-600/50"}`}
                      >
                        {service.icon}
                        <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                        <p className="text-gray-400 mb-4">
                          {service.description}
                        </p>
                        <p className="text-2xl font-bold">${service.price}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
  
              {step === 3 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold">Personal Information</h2>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none"
                    />
                    <textarea
                      placeholder="Additional Notes"
                      rows={4}
                      className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none"
                    />
                  </form>
                </div>
              )}
  
              {step === 4 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <CreditCard className="w-6 h-6" />
                    Payment Details
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-all ${paymentMethod === "card" ? "bg-blue-600/50 ring-2 ring-blue-400" : "bg-gray-700/50 hover:bg-gray-600/50"}`}
                    >
                      <CreditCard className="w-6 h-6" />
                      <span>Card</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("mpesa")}
                      className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-all ${paymentMethod === "mpesa" ? "bg-blue-600/50 ring-2 ring-blue-400" : "bg-gray-700/50 hover:bg-gray-600/50"}`}
                    >
                      <Phone className="w-6 h-6" />
                      <span>M-Pesa</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("paystack")}
                      className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-all ${paymentMethod === "paystack" ? "bg-blue-600/50 ring-2 ring-blue-400" : "bg-gray-700/50 hover:bg-gray-600/50"}`}
                    >
                      <CreditCard className="w-6 h-6" />
                      <span>Paystack</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("paypal")}
                      className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-all ${paymentMethod === "paypal" ? "bg-blue-600/50 ring-2 ring-blue-400" : "bg-gray-700/50 hover:bg-gray-600/50"}`}
                    >
                      <CreditCard className="w-6 h-6" />
                      <span>PayPal</span>
                    </button>
                  </div>
                  <div className="bg-gray-700/50 rounded-xl p-6">
                    {paymentMethod === "card" && (
                      <form className="space-y-6">
                        <input
                          type="text"
                          placeholder="Card Number"
                          className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none"
                        />
                        <div className="grid grid-cols-3 gap-4">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none"
                          />
                        </div>
                      </form>
                    )}
  
                    {paymentMethod === "mpesa" && (
                      <form className="space-y-6">
                        <input
                          type="tel"
                          placeholder="M-Pesa Phone Number"
                          className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none"
                        />
                      </form>
                    )}
  
                    {paymentMethod === "paystack" && (
                      <form className="space-y-6">
                        <input
                          type="email"
                          placeholder="Email Address"
                          className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none"
                        />
                      </form>
                    )}
  
                    {paymentMethod === "paypal" && (
                      <form className="space-y-6">
                        <input
                          type="email"
                          placeholder="PayPal Email Address"
                          className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none"
                        />
                      </form>
                    )}
                  </div>
                </div>
              )}
  
              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => (step < 4 ? setStep(step + 1) : null)}
                  className="ml-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors flex items-center gap-2"
                >
                  {step === 4 ? "Confirm Booking" : "Continue"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
  
            <div className="w-full md:w-1/3 space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-400">
                    <span>Date</span>
                    <span>
                      {selectedDate
                        ? `${selectedDate.toLocaleDateString()} ${selectedTime || "Time not selected"}`
                        : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Service</span>
                    <span>{selectedService?.name || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Duration</span>
                    <span>4 hours</span>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${selectedService?.price || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                <p className="text-gray-400 mb-4">
                  Our support team is here to assist you with your booking
                </p>
                {!showContactForm ? (
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full px-6 py-3 rounded-lg border border-gray-600 hover:bg-gray-700/50 transition-colors"
                  >
                    Contact Support
                  </button>
                ) : (
                  <div className="space-y-4">
                    <form className="space-y-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none"
                      />
                      <textarea
                        placeholder="How can we help you?"
                        rows={4}
                        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none"
                      />
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="flex-1 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
                          onClick={(e) => {
                            e.preventDefault();
                            setSupportLoading(true);
                            setTimeout(() => {
                              setSupportLoading(false);
                              setShowContactForm(false);
                            }, 1500);
                          }}
                        >
                          {supportLoading ? (
                            <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                          ) : (
                            "Send Message"
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowContactForm(false)}
                          className="px-6 py-3 rounded-lg border border-gray-600 hover:bg-gray-700/50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
  
  