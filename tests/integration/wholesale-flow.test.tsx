import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WholesaleForm } from '@/components/wholesale/WholesaleForm';
import { getDictionary } from '@/i18n/getDictionary';

describe('Wholesale Enquiry Form Flow & Validation', () => {
  const dict = getDictionary('en');

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all required form fields with clear accessibility labels', () => {
    render(<WholesaleForm locale="en" dict={dict} />);

    expect(screen.getByLabelText(/Contact Person/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/WhatsApp \/ Mobile Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Estimated Requirement/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Delivery City/i)).toBeInTheDocument();
  });

  it('displays validation errors when submitting with empty required inputs', () => {
    render(<WholesaleForm locale="en" dict={dict} />);

    const submitBtn = screen.getByRole('button', {
      name: /Send Wholesale Enquiry on WhatsApp/i,
    });
    fireEvent.click(submitBtn);

    // Validation error messages should be displayed
    expect(screen.getByText(/Name must be at least 2 characters/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Please enter a valid 10-digit Indian mobile number/i)
    ).toBeInTheDocument();
  });

  it('opens WhatsApp with URL-encoded message on valid form submission', () => {
    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

    render(<WholesaleForm locale="en" dict={dict} />);

    // Fill in valid data
    fireEvent.change(screen.getByLabelText(/Contact Person/i), {
      target: { value: 'Himanshu Sood' },
    });
    fireEvent.change(screen.getByLabelText(/WhatsApp \/ Mobile Number/i), {
      target: { value: '9816098765' },
    });
    fireEvent.change(screen.getByLabelText(/Estimated Requirement/i), {
      target: { value: '50 kg bulk buckets' },
    });
    fireEvent.change(screen.getByLabelText(/Delivery City/i), {
      target: { value: 'Mandi Town, 175001' },
    });

    const submitBtn = screen.getByRole('button', {
      name: /Send Wholesale Enquiry on WhatsApp/i,
    });
    fireEvent.click(submitBtn);

    // Verify window.open was triggered with a wa.me URL containing the details
    expect(windowOpenSpy).toHaveBeenCalledTimes(1);
    const openedUrl = windowOpenSpy.mock.calls[0][0] as string;
    expect(openedUrl).toContain('https://wa.me/');
    expect(openedUrl).toContain('Himanshu%20Sood');
  });
});
