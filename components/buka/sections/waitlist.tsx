"use client";

import Image from "next/image";

export default function WaitlistSection() {
  return (
    <section
      className="relative w-full bg-white overflow-hidden py-20 lg:py-32"
      style={{
        backgroundImage: "url('/images/waves-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
        
        {/* 1. HEADER - Large & Centered */}
        <div className="text-center mb-20 lg:mb-28">
          <h2 className="text-[42px] md:text-[72px] font-[900] text-[#0B1B33] leading-[1.05] tracking-tighter">
            Be the first to experience <br className="hidden md:block" />
            the <span className="relative inline-block px-2">
              <span className="relative z-10">LocalBuka App</span>
              {/* Highlight bar positioned exactly like the mockup */}
              <div className="absolute bottom-[10%] left-0 w-full h-[14px] md:h-[24px] bg-[#FFC72C] z-0 rounded-sm"></div>
            </span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-0">
          
          {/* 2. LEFT SIDE: UI FORM */}
          <div className="w-full lg:w-[40%] z-40">
            <p className="text-[#0B1B33]/90 text-lg md:text-[23px] font-medium mb-12 max-w-[480px] leading-relaxed">
              Get early access to our application when it launches on the App & Play Store.
            </p>

            <div className="max-w-[460px] space-y-7">
              {/* Email Input - Precision border and label */}
              <div className="relative">
                <label className="absolute -top-3 left-6 bg-white px-2 text-[14px] text-gray-400 z-50 font-bold tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="jamesgreat@gl"
                  className="w-full border-2 border-gray-200 rounded-[22px] px-7 py-5 text-[#0B1B33] placeholder-gray-900 text-lg outline-none bg-white focus:border-[#0B1B33] transition-all"
                />
              </div>

              {/* Phone Input - Soft grey fill */}
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full bg-[#F5F5F7] border-none rounded-[22px] px-7 py-6 text-[#0B1B33] placeholder-gray-500 text-lg outline-none focus:ring-2 focus:ring-black/5 transition-all"
              />

              {/* Action Button */}
              <button className="w-full bg-[#FFC72C] hover:bg-[#FDB913] text-[#0B1B33] font-extrabold rounded-[22px] py-6 text-xl transition-transform active:scale-[0.98] shadow-lg shadow-yellow-400/20">
                Join the Waitlist
              </button>
            </div>
          </div>

          {/* 3. RIGHT SIDE: THE SYMMETRICAL FAN */}
          <div className="w-full lg:w-[60%] relative h-[550px] lg:h-[750px] mt-12 lg:mt-0 flex justify-center lg:justify-end">
            {/* The lg:translate-x-20 pushes the whole cluster right to balance the text */}
            <div className="relative w-full max-w-[800px] flex items-center justify-center lg:translate-x-20">
              
              {/* LEFT PHONE (Woman eating) 
                  - z-10 (Bottom layer)
                  - translate-y-16 matches the right phone exactly
              */}
              <div className="absolute z-10 transform -translate-x-[180px] lg:-translate-x-[250px] translate-y-16 -rotate-[15deg] opacity-95">
                <div className="w-[250px] md:w-[320px]">
                  <Image
                    src="/images/iphone 14 Pro Max (2).png" 
                    alt="Left Screen"
                    width={320}
                    height={640}
                    className="drop-shadow-2xl rounded-[3.5rem]"
                    priority
                  />
                </div>
              </div>

              {/* RIGHT PHONE (Profile)
                  - z-20 (Middle layer)
                  - Identical height and mirrored rotation
              */}
              <div className="absolute z-20 transform translate-x-[180px] lg:translate-x-[250px] translate-y-16 rotate-[15deg]">
                <div className="w-[250px] md:w-[320px]">
                  <Image
                    src="/images/iPhone 14 Pro Max (1).png"
                    alt="Right Screen"
                    width={320}
                    height={640}
                    className="drop-shadow-2xl rounded-[3.5rem]"
                    priority
                  />
                </div>
              </div>

              {/* CENTER PHONE (Hero)
                  - z-30 (Highest layer)
                  - Scaled up to dominate
                  - No rotation
              */}
              <div className="relative z-30 transform scale-105 lg:scale-115">
                <div className="w-[260px] md:w-[330px]">
                  <Image
                    src="/images/iPhone 14 Pro Max.png"
                    alt="Center Screen"
                    width={320}
                    height={660}
                    className="drop-shadow-[0_45px_70px_rgba(0,0,0,0.35)]"
                    priority
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}