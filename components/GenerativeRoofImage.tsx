import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface GenerativeImageProps {
  prompt: string;
  fallbackUrl: string;
  className?: string;
  alt: string;
}

const GenerativeImage: React.FC<GenerativeImageProps> = ({ prompt, fallbackUrl, className, alt }) => {
  const [imageSrc, setImageSrc] = useState<string>(fallbackUrl);
  
  useEffect(() => {
    const generate = async () => {
      try {
        if (!process.env.API_KEY) {
            console.warn("No API Key found for image generation");
            return; 
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: prompt }] },
        });

        const parts = response.candidates?.[0]?.content?.parts;
        if (parts) {
          for (const part of parts) {
            if (part.inlineData) {
              setImageSrc(`data:image/png;base64,${part.inlineData.data}`);
              break;
            }
          }
        }
      } catch (e) {
        console.error("Image generation failed, using fallback", e);
      }
    };

    generate(); 
  }, [prompt]);

  return <img src={imageSrc} alt={alt} className={className} loading="lazy" />;
};

export default GenerativeImage;