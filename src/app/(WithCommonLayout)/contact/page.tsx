"use client";
import { Input, Button, Textarea, Card } from "@nextui-org/react";
import { useEffect, useState } from "react";
import "../../../../src/styles/animation.css";

const ContactUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    return () => {
      setIsVisible(false);
    };
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className={`transition-opacity duration-500 ${isVisible ? "fade-enter-active" : "fade-enter"}`}
    >
      <div className="bg-gray-100 py-12 container mx-auto max-w-4xl pt-16 px-6 flex-grow">
        <div className="mb-12 text-center container">
          <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
          <h3 className="text-lg text-gray-600 mt-4">
            Have any questions or need support? Fill out the form below, and
            we’ll get back to you shortly.
          </h3>
        </div>

        <div className="max-w-xl mx-auto container">
          <Card className="bg-white shadow-lg p-8">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <Input
                    fullWidth
                    label="Name"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                <div className="mb-6">
                  <Input
                    fullWidth
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                <div className="mb-6">
                  <Input
                    fullWidth
                    label="Subject"
                    placeholder="Enter the subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                <div className="mb-6">
                  <Textarea
                    fullWidth
                    label="Message"
                    placeholder="Enter your message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Send Message
                </Button>
              </form>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-green-600">
                  Thank You!
                </h3>
                <h3 className="text-gray-600 mt-2">
                  We have received your message and will get back to you
                  shortly.
                </h3>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
