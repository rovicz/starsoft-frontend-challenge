import { useEffect, useRef } from "react";

export const useScrollLock = (isOpen: boolean) => {
  const originalStyle = useRef({ overflow: "", paddingRight: "" });

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      originalStyle.current = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
      };

      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalStyle.current.overflow;
      document.body.style.paddingRight = originalStyle.current.paddingRight;
    }

    return () => {
      if (isOpen) {
        document.body.style.overflow = originalStyle.current.overflow;
        document.body.style.paddingRight = originalStyle.current.paddingRight;
      }
    };
  }, [isOpen]);
};
