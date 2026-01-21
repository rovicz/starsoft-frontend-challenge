import React from "react";
import Image from "next/image";

interface CardProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
}

export function Card({ title, subtitle, imageSrc }: CardProps) {
  return (
    <div className="w-full max-w-[345px] h-[555px] bg-[#191A20] rounded-[8px] p-[1.531rem] flex flex-col">
      {/* Image Area - Taking remaining space naturally or fixed height? 
          The specs don't strictly say, but usually it fills the space above text. 
          Let's make it flexible. */}
      <div className="flex-1 w-full bg-[#232323] rounded-[8px] relative overflow-hidden mb-4">
        {imageSrc ? (
          <Image src={imageSrc} alt={title} fill className="object-cover" />
        ) : (
          // Placeholder if no image
          <div className="w-full h-full flex items-center justify-center text-[#393939] h-[258px] w-[296px] rounded-[4px]">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className="flex flex-col mt-[49px] mb-[33.5px]">
        <h3 className="text-[18px] font-semibold text-white leading-tight">
          {title}
        </h3>
        <p className="text-[12px] font-normal text-[#CCCCCC] mt-[10px] font-[300]">
          {subtitle}
        </p>
      </div>

      <div className="flex mb-[24px] gap-[10px]">
        <Image src="/eth.png" alt="Star" width={29} height={29} />

        <p className="text-[20px] font-semibold">10 ETH</p>
      </div>

      {/* Action Button */}
      <button className="w-full h-[66px] bg-[#FF8310] hover:bg-[#e0720e] transition-colors rounded-[8px] text-white font-semibold text-base mt-auto cursor-pointer">
        Comprar
      </button>
    </div>
  );
}
