import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductDetailView } from '@/components/products/ProductDetailView';
import { PRODUCTS } from '@/data/products';
import { getDictionary } from '@/i18n/getDictionary';

describe('Product Interaction & Size Selection Flow', () => {
  const product = PRODUCTS[0]; // Multi Flora (250g: ₹220, 500g: ₹420, 1kg: ₹800)
  const dict = getDictionary('en');

  it('ProductCard displays default size and updates price when clicking another size pill', () => {
    render(<ProductCard product={product} locale="en" dict={dict} />);

    // Default is 500g (₹420)
    expect(screen.getByText('Multi Flora Honey')).toBeInTheDocument();
    expect(screen.getByText('₹420')).toBeInTheDocument();

    // Click 1 kg button
    const oneKgButton = screen.getByRole('button', { name: '1 kg' });
    fireEvent.click(oneKgButton);

    // Price updates to ₹800
    expect(screen.getByText('₹800')).toBeInTheDocument();

    // Click 250 g button
    const twoFiftyButton = screen.getByRole('button', { name: '250 g' });
    fireEvent.click(twoFiftyButton);

    // Price updates to ₹220
    expect(screen.getByText('₹220')).toBeInTheDocument();
  });

  it('ProductDetailView allows quantity adjustments via stepper buttons', () => {
    render(
      <ProductDetailView
        product={product}
        relatedProducts={[]}
        locale="en"
        dict={dict}
      />
    );

    // Default quantity is 1
    const quantityDisplay = screen.getByText('1');
    expect(quantityDisplay).toBeInTheDocument();

    // Click Increase (+)
    const plusButton = screen.getByLabelText('Increase quantity');
    fireEvent.click(plusButton);
    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.click(plusButton);
    expect(screen.getByText('3')).toBeInTheDocument();

    // Click Decrease (-)
    const minusButton = screen.getByLabelText('Decrease quantity');
    fireEvent.click(minusButton);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('ProductDetailView displays "Price on Enquiry" cleanly when size has null price', () => {
    const lahulSpiti = PRODUCTS.find((p) => p.slug === 'lahul-spiti')!;
    render(
      <ProductDetailView
        product={lahulSpiti}
        relatedProducts={[]}
        locale="en"
        dict={dict}
      />
    );

    // Click 250 g size which has pricePaise: null
    const twoFiftyButton = screen.getByRole('radio', { name: /250 g/i });
    fireEvent.click(twoFiftyButton);

    // Displays Price on Enquiry without crashing or showing ₹0
    expect(screen.getByText('Price on Enquiry')).toBeInTheDocument();
  });
});
