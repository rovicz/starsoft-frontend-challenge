import '@testing-library/jest-dom';
import React from 'react';

// Mock robusto do Next/Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Filtra props exclusivas do Next.js que o <img> nativo não aceita
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { priority, fill, quality, loader, unoptimized, ...validProps } = props;
    /* eslint-disable-next-line @next/next/no-img-element */
    return <img {...validProps} />;
  },
}));

// Mock do Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    aside: 'aside',
    p: 'p',
    button: 'button',
    span: 'span',
    ul: 'ul',
    li: 'li',
    nav: 'nav',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

Object.defineProperty(window, 'scrollTo', { value: jest.fn(), writable: true });
