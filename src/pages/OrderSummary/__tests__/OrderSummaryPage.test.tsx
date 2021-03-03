import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrderSummary from '../OrderSummaryPage';

describe('Consent checkbox and submit button', () => {
  let consentCheckbox: HTMLElement;
  let submitButton: HTMLElement;

  beforeEach(() => {
    render(<OrderSummary />);
    consentCheckbox = screen.getByRole('checkbox', {
      name: /I agree to Terms and conditions/i,
    });
    submitButton = screen.getByRole('button', { name: /Confirm order/i });
  });

  test('checkbox is unchecked by default', () => {
    expect(consentCheckbox).toBeInTheDocument();
    expect(consentCheckbox).not.toBeChecked();
  });

  test('submit button is disabled by default', () => {
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test('checkbox enables the button on first click and disables on second click', () => {
    userEvent.click(consentCheckbox);
    expect(consentCheckbox).toBeChecked();
    expect(submitButton).toBeEnabled();

    userEvent.click(consentCheckbox);
    expect(consentCheckbox).not.toBeChecked();
    expect(submitButton).toBeDisabled();
  });
});

describe('Terms and conditions tooltip', () => {
  let highlightText: HTMLElement;

  beforeEach(() => {
    render(<OrderSummary />);
    highlightText = screen.getByText(/Terms and Conditions/i);
  });

  test('display highlight text', () => {
    expect(highlightText).toHaveStyle('color: #328DFF');
  });

  test('no tooltip being displayed by default', () => {
    const tooltip = screen.queryByText(/No ice cream will actually be delivered/i);
    expect(tooltip).not.toBeInTheDocument();
  });

  test('display tooltip when mouse hover and disappear when mouse leave', async () => {
    userEvent.hover(highlightText);
    const tooltip = await screen.findByText(/No ice cream will actually be delivered/i);
    expect(tooltip).toBeInTheDocument();

    userEvent.unhover(highlightText);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
