import React, { useState } from "react";
import Image from "next/image";
import {
  CardContainer,
  ImageContainer,
  ImageSkeleton,
  TextContent,
  Title,
  Subtitle,
  BuyButton,
  PlaceholderIcon,
  PriceContainer,
  EthIcon,
  PriceValue,
} from "./style";

interface CardProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
  price?: number;
  onBuy?: () => void;
  isAdded?: boolean;
}

export function Card({
  title,
  subtitle,
  imageSrc,
  price = 0,
  onBuy,
  isAdded,
}: CardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <CardContainer>
      <ImageContainer>
        {imageSrc ? (
          <>
            {!isImageLoaded && <ImageSkeleton />}
            <Image
              src={imageSrc}
              alt={title}
              width={216}
              height={195}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoad={() => setIsImageLoaded(true)}
              style={{
                objectFit: "cover",
                borderRadius: "8px",
                opacity: isImageLoaded ? 1 : 0,
                transition: "opacity 0.3s ease-in-out",
              }}
            />
          </>
        ) : (
          <PlaceholderIcon>
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
          </PlaceholderIcon>
        )}
      </ImageContainer>

      <TextContent>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>

        <PriceContainer>
          <EthIcon>
            <Image src="/eth.png" alt="ETH" width={29} height={29} />
          </EthIcon>
          <PriceValue>{price.toFixed(2)} ETH</PriceValue>
        </PriceContainer>
      </TextContent>

      <BuyButton onClick={onBuy} $isAdded={isAdded} disabled={isAdded}>
        {isAdded ? "ADICIONADO AO CARRINHO" : "Comprar"}
      </BuyButton>
    </CardContainer>
  );
}
