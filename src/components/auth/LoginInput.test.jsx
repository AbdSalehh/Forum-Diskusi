/**
 * test scenario for LoginInput
 *
 * - LoginInput component
 *  - should handle username typing correctly
 *  - should handle password typing correctly
 *  - should call login function when login button is clicked
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './loginInput';

import '@testing-library/jest-dom';

describe('LoginInput component', () => {
    it('should handle email typing correctly', async () => {
    // Arrange
        render(<LoginInput login={() => {}} />);
        const emailInput = await screen.getByPlaceholderText('Email');

        // Action
        await userEvent.type(emailInput, 'componentesting@gmail.com');

        // Assert
        expect(emailInput).toHaveValue('componentesting@gmail.com');
    });

    it('should handle password typing correctly', async () => {
    // Arrange
        render(<LoginInput login={() => {}} />);
        const passwordInput = await screen.getByPlaceholderText('Password');

        // Action
        await userEvent.type(passwordInput, '12345678');

        // Assert
        expect(passwordInput).toHaveValue('12345678');
    });

    it('should call login function when login button is clicked', async () => {
    // arrange
        const mockLogin = jest.fn();
        render(<LoginInput login={mockLogin} />);
        const emailInput = await screen.getByPlaceholderText('Email');
        await userEvent.type(emailInput, 'componentesting@gmail.com');
        const passwordInput = await screen.getByPlaceholderText('Password');
        await userEvent.type(passwordInput, '12345678');
        const loginButton = await screen.getByRole('button', { name: 'LOGIN' });

        // action
        await userEvent.click(loginButton);

        // assert
        expect(mockLogin).toBeCalledWith({
            email: 'componentesting@gmail.com',
            password: '12345678',
        });
    });
});
