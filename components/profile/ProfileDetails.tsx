"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/button";

export function ProfileDetails() {
    const [formData, setFormData] = useState({
        firstName: "James",
        lastName: "Ade",
        email: "jamesgreat@gmail.com",
    });

    const [profileImage, setProfileImage] = useState("/images/profile-pic.png");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log("Saving profile:", formData);
        // Implementation for save action
    };

    return (
        <div className="w-full px-4 lg:pl-[56px] lg:pr-12 pt-8 lg:pt-0 flex flex-col h-full">
            {/* Profile Picture Section - Aligned left */}
            {/* Size reduced to 40px as requested */}
            {/* Profile Picture Section - Aligned left */}
            <div className="mb-[40px] relative w-max">
                <div className="relative h-[70px] w-[70px]">
                    <Image
                        src={profileImage} // Placeholder
                        alt="Profile"
                        fill
                        className="object-cover rounded-[10px]"
                    />
                </div>
                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                />
                {/* Camera Button */}
                <button
                    onClick={handleImageClick}
                    className="absolute -bottom-2 -right-2 bg-white rounded-full p-[8px] shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="Change profile picture"
                >
                    <Camera className="w-[18px] h-[18px] text-black" />
                </button>
            </div>

            {/* Form Section - Left Aligned */}
            <div className="w-full max-w-[380px] space-y-[24px]">
                <InputField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                />

                <InputField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                />

                <InputField
                    name="email"
                    value={formData.email}
                    disabled
                    type="email"
                />
            </div>

            {/* Save Button - Right Aligned on Desktop */}
            <div className="mt-12 flex justify-start lg:justify-end w-full">
                <Button
                    onClick={handleSave}
                    className="w-full max-w-[380px] bg-[#F5B400] hover:bg-[#D99F00] text-black font-semibold text-[14px] h-[52px] rounded-[10px] shadow-none border-none"
                >
                    Save
                </Button>
            </div>
        </div >
    );
}
