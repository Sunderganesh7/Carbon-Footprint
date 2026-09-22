import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Calculator } from '../pages/Calculator';

describe('Calculator Page', () => {
  it('renders the calculator heading', () => {
    render(
      <BrowserRouter>
        <Calculator />
      </BrowserRouter>,
    );
    expect(
      screen.getByText('Carbon Footprint Calculator'),
    ).toBeDefined();
  });

  it('renders the transportation step initially', () => {
    render(
      <BrowserRouter>
        <Calculator />
      </BrowserRouter>,
    );
    expect(screen.getAllByText('Transportation').length).toBeGreaterThanOrEqual(1);
  });

  it('renders navigation buttons', () => {
    render(
      <BrowserRouter>
        <Calculator />
      </BrowserRouter>,
    );
    expect(screen.getByText('Next')).toBeDefined();
  });
});
