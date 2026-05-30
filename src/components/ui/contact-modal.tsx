import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Paperclip, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
    title: "",
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("title", formData.title);
    data.append("message", formData.message);
    if (file) {
      data.append("attachment", file);
    }

    try {
      // In a real scenario, make sure the backend is running on localhost:3001 
      // or use a relative path if proxied.
      const response = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }

      setSubmitStatus("success");
      setFormData({ firstName: "", lastName: "", phone: "", email: "", message: "", title: "" });
      setFile(null);
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-black/5">
                <h2 className="text-2xl font-black tracking-tight text-black">Contact Us</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-black hover:bg-black/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {submitStatus === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                    <h3 className="text-2xl font-bold text-black">Message Sent!</h3>
                    <p className="text-gray-600">
                      Thank you for reaching out. We will get back to you shortly.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-4 bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-black uppercase tracking-wider">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border bg-black/5 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-black/10 ${
                            errors.firstName ? "border-red-500" : "border-transparent"
                          }`}
                          placeholder="John"
                        />
                        {errors.firstName && <p className="text-red-500 text-xs font-bold mt-1">{errors.firstName}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-black uppercase tracking-wider">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border bg-black/5 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-black/10 ${
                            errors.lastName ? "border-red-500" : "border-transparent"
                          }`}
                          placeholder="Doe"
                        />
                        {errors.lastName && <p className="text-red-500 text-xs font-bold mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-black uppercase tracking-wider">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border bg-black/5 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-black/10 ${
                            errors.email ? "border-red-500" : "border-transparent"
                          }`}
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs font-bold mt-1">{errors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-black uppercase tracking-wider">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-transparent bg-black/5 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-black/10"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-black uppercase tracking-wider">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-transparent bg-black/5 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-black/10"
                        placeholder="Enter your title"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-black uppercase tracking-wider">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl border bg-black/5 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-black/10 resize-none ${
                          errors.message ? "border-red-500" : "border-transparent"
                        }`}
                        placeholder="How can we help you?"
                      />
                      {errors.message && <p className="text-red-500 text-xs font-bold mt-1">{errors.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-black uppercase tracking-wider">
                        Attachment
                      </label>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 px-4 py-3 bg-black/5 hover:bg-black/10 rounded-xl transition-colors text-black font-semibold text-sm"
                        >
                          <Paperclip className="w-4 h-4" />
                          {file ? "Change File" : "Upload File"}
                        </button>
                        {file && (
                          <span className="text-sm text-gray-600 truncate max-w-[200px]">
                            {file.name}
                          </span>
                        )}
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    </div>

                    {submitStatus === "error" && (
                      <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm font-semibold">{errorMessage}</p>
                      </div>
                    )}

                    <div className="pt-4 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-black text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all hover:pr-6 active:scale-95 shadow-xl shadow-black/20 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
