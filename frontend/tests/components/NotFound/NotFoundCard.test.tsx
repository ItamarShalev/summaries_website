import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundCard from '@/components/NotFound/NotFoundCard';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/locales';
import { MemoryRouter } from 'react-router-dom';

describe('NotFoundCard', () => {
  const renderWithProviders = () =>
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <NotFoundCard />
        </I18nextProvider>
      </MemoryRouter>
    );

  it('renders the 404 title', () => {
    renderWithProviders();
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders a link back to home', () => {
    renderWithProviders();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
    expect(link).toBeInTheDocument();
  });
});
