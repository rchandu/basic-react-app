import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const AllTheProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <MemoryRouter>{children}</MemoryRouter>;
};

const customRender = (ui: any, options: any) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
