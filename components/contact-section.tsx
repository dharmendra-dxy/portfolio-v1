'use client';

import React, { useState } from "react";
import { AnimatedGroup } from "./ui/animated-group";
import { Mail, Send } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const ContactSection = ({ variantContainer, variantItem }: any) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Message sent!');
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };
    return (
        <section>
            <div className="flex items-center space-x-3">
                <Mail size={24} className="text-red-400" />
                <h3 className="text-xl font-bold">Hear From Me</h3>
            </div>
            <AnimatedGroup
                variants={{
                    container: variantContainer,
                    item: variantItem,
                }}
                className="mt-4 space-y-6 pl-2 md:pl-6"
            >
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
                        <div className="space-y-2 md:w-1/2">
                            <Label htmlFor="name" className="text-gray-200 font-medium text-sm">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your full name"
                                className="w-full bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-400 focus:border-red-400 focus:ring-red-400/20"
                            />
                        </div>

                        <div className="space-y-2 md:w-1/2">
                            <Label htmlFor="email" className="text-gray-200 font-medium text-sm">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="your.email@example.com"
                                className="w-full bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-400 focus:border-red-400 focus:ring-red-400/20"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message" className="text-gray-200 font-medium text-sm">
                            Message
                        </Label>
                        <Textarea
                            id="message"
                            name="message"
                            // value={formData.message}
                            // onChange={handleInputChange}
                            placeholder="Tell us how I can help you..."
                            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-400 focus:border-red-400 focus:ring-red-400/20 min-h-[120px] resize-none"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="bg-red-400 hover:bg-red-500 text-white font-medium px-6 py-2 text-sm transition-colors"
                    >
                        Send Message <Send size={12} />
                    </Button>
                </form>
            </AnimatedGroup>
        </section>
    );
};

export default ContactSection;
