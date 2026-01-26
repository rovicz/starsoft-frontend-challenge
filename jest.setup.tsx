import '@testing-library/jest-dom';

// 1. Mock do Next/Image (Corrigido para remover 'priority')
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Desestruturamos 'priority' e 'fill' para que NÃO sejam passados para a tag img
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { priority, fill, ...rest } = props;
    /* eslint-disable-next-line @next/next/no-img-element */
    return <img {...rest} />;
  },
}));

// 2. Mock do Framer Motion (Crucial para Styled Components funcionarem)
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    p: 'p',
    button: 'button',
    span: 'span',
    ul: 'ul',
    li: 'li',
    aside: 'aside', // Adicionei 'aside' pois vi o CartOverlay usar
    nav: 'nav',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock do window.scrollTo (usado em alguns hooks de scroll)
Object.defineProperty(window, 'scrollTo', { value: jest.fn(), writable: true });