"use client";
import { Card } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import "../../../../src/styles/animation.css";
import { useEffect, useState } from "react";

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    return () => {
      setIsVisible(false);
    };
  }, []);

  return (
    <div
      className={`transition-opacity duration-500 ${isVisible ? "fade-enter-active" : "fade-enter"}`}
    >
      <div className="bg-gray-100 py-12 container mx-auto max-w-4xl pt-16 px-6 flex-grow">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
            Welcome to Recipe Sharing Community
          </h2>
          <h2 className="text-center text-lg text-gray-600 max-w-2xl mx-auto">
            Recipe Sharing Community is a community-driven platform where food
            lovers can create, share, and discover delicious recipes. Whether
            you're a home cook or a professional chef, you're welcome to join
            us!
          </h2>
        </div>

        <div className="my-6">
          <Card className="bg-white shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h3>
            <h2 className="text-gray-600">
              At Recipe Sharing Community, our mission is to connect food
              enthusiasts, foster creativity, and make sharing recipes easy. We
              believe food brings people together, and we're excited to share
              that passion with the world.
            </h2>
          </Card>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-800 text-center mb-8">
            Meet Our Team
          </h3>
          <div className="grid md:grid-cols-2 gap-2">
            <div>
              <Card className="bg-white shadow-lg p-4 text-center">
                <Avatar
                  className="mx-auto mb-4"
                  size="lg"
                  src="/team-member-1.jpg"
                />
                <h4 className="font-semibold text-gray-800">John Doe</h4>
                <h4 className="text-gray-600">Founder & CEO</h4>
                <h4 className="text-sm text-gray-500">
                  Loves making pasta from scratch
                </h4>
              </Card>
            </div>
            <div>
              <Card className="bg-white shadow-lg p-4 text-center">
                <Avatar
                  className="mx-auto mb-4"
                  size="lg"
                  src="/team-member-1.jpg"
                />
                <h4 className="font-semibold text-gray-800">Robert Brost</h4>
                <h4 className="text-gray-600">Manager</h4>
                <h4 className="text-sm text-gray-500">
                  Loves making pasta from scratch
                </h4>
              </Card>
            </div>
          </div>
        </div>

        <div className="my-6">
          <Card className="bg-white shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Journey
            </h3>
            <h3 className="text-gray-600">
              It all started with a love for food. Since our founding in 2024,
              we've grown into a community of passionate cooks, and we've hit
              some incredible milestones along the way...
            </h3>
          </Card>
        </div>

        <div>
          <Card className="bg-white shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Get In Touch
            </h3>
            <h3 className="text-gray-600">
              Office: 123 Recipe St, Flavor Town, USA
            </h3>
            <h3 className="text-gray-600">Phone: (123) 456-7890</h3>
            <h3 className="text-gray-600">Email: contact@platformname.com</h3>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
