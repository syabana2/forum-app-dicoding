/**
 * testing scenario
 *
 * - LoginInput component
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 *  - should call login function when login button is clicked
 *  - should change type password to text/password when show/hide button is clicked
 */

import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import {cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import LoginInput from './LoginInput';

expect.extend(matchers);


describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = screen.getByPlaceholderText('Enter email');

    // action
    await userEvent.type(emailInput, 'envkt@example.com');

    // assert
    expect(emailInput).toHaveValue('envkt@example.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Enter password');

    // action
    await userEvent.type(passwordInput, '123456');

    // assert
    expect(passwordInput).toHaveValue('123456');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = screen.getByPlaceholderText('Enter email');
    await userEvent.type(emailInput, 'envkt@example.com');
    const passwordInput = screen.getByPlaceholderText('Enter password');
    await userEvent.type(passwordInput, '123456');

    // action
    await userEvent.click(screen.getByText('Login'));

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'envkt@example.com',
      password: '123456',
    });
  });

  it('should change type password to text/password when show/hide button is clicked', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Enter password');

    // action: show password
    await userEvent.click(screen.getByText('Show'));

    // assert
    expect(passwordInput).toHaveAttribute('type', 'text');

    // action: hide password
    await userEvent.click(screen.getByText('Hide'));

    // assert
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
