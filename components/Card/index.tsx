import React from "react";
import Image from "next/image";
import { 
  CardContainer, 
  ImageContainer, 
  TextContent, 
  Title, 
  Subtitle, 
  BuyButton,
  PlaceholderIcon 
} from "./style";

interface CardProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
}

export function Card({ title, subtitle, imageSrc }: CardProps) {
  return (
    <CardContainer>
      <ImageContainer>
         {imageSrc ? (
            <Image 
              src={imageSrc} 
              alt={title} 
              fill 
              style={{ objectFit: "cover" }}
            />
         ) : (
            <PlaceholderIcon>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
            </PlaceholderIcon>
         )}
      </ImageContainer>

      <TextContent>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </TextContent>

      <BuyButton>
        Comprar
      </BuyButton>
    </CardContainer>
  );
}
