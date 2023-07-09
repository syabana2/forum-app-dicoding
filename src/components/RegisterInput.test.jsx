/**
 * testing scenario
 *
 * - RegisterInput component
 *  - should handle name typing correctly
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 *  - should call Register function when login button is clicked
 */

import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import {cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import RegisterInput from './RegisterInput';

expect.extend(matchers);


describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = screen.getByPlaceholderText('Name');

    // action
    await userEvent.type(nameInput, 'name test');

    // assert
    expect(nameInput).toHaveValue('name test');
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = screen.getByPlaceholderText('Email');

    // action
    await userEvent.type(emailInput, 'email@gmail.conm');

    // assert
    expect(emailInput).toHaveValue('email@gmail.conm');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'passwordTest');

    // assert
    expect(passwordInput).toHaveValue('passwordTest');
  });

  it('should call Register function when login button is clicked', async () => {
    // arrange
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'name test');
    const emailInput = screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'envkt@example.com');
    const passwordInput = screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, '123456');

    // action
    await userEvent.click(screen.getByText('Register'));

    // Assert
    expect(mockRegister).toBeCalledWith({
      name: 'name test',
      email: 'envkt@example.com',
      password: '123456',
    });
  });
});
