import '@testing-library/jest-dom';

// Global Mock for Next.js Image to handle 'priority' prop issue
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ priority, fill, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));
