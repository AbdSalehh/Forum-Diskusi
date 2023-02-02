/**
 * test scenario for RegisterInput
 *
 * - RegisterInput component
 *  - should handle name typing correctly
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 *  - should handle confirm password typing correctly
 *  - should call register function when login button is clicked
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './registerInput';

import '@testing-library/jest-dom';

describe('RegisterInput component', () => {
    it('should handle name typing correctly', async () => {
        // Arrange
        render(<RegisterInput register={() => { }} />);
        const nameInput = await screen.getByPlaceholderText('Name');

        // Action
        await userEvent.type(nameInput, 'Component Testing');

        // Assert
        expect(nameInput).toHaveValue('Component Testing');
    });

    it('should handle email typing correctly', async () => {
        // Arrange
        render(<RegisterInput register={() => { }} />);
        const emailInput = await screen.getByPlaceholderText('Email');

        // Action
        await userEvent.type(emailInput, 'componentesting135@gmail.com');

        // Assert
        expect(emailInput).toHaveValue('componentesting135@gmail.com');
    });

    it('should handle password typing correctly', async () => {
        // Arrange
        render(<RegisterInput register={() => { }} />);
        const passwordInput = await screen.getByPlaceholderText('Password');

        // Action
        await userEvent.type(passwordInput, '12345678');

        // Assert
        expect(passwordInput).toHaveValue('12345678');
    });

    it('should handle confirm password typing correctly', async () => {
        // Arrange
        render(<RegisterInput register={() => { }} />);
        const confirmPasswordInput = await screen.getByPlaceholderText('Confirm Password');

        // Action
        await userEvent.type(confirmPasswordInput, '12345678');

        // Assert
        expect(confirmPasswordInput).toHaveValue('12345678');
    });

    it('should call register function when register button is clicked', async () => {
        // arrange
        const mockRegister = jest.fn();
        render(<RegisterInput register={mockRegister} />);
        const nameInput = await screen.getByPlaceholderText('Name');
        await userEvent.type(nameInput, 'Component Testing');
        const emailInput = await screen.getByPlaceholderText('Email');
        await userEvent.type(emailInput, 'componentesting135@gmail.com');
        const passwordInput = await screen.getByPlaceholderText('Password');
        await userEvent.type(passwordInput, '12345678');
        const confirmPasswordInput = await screen.getByPlaceholderText('Confirm Password');
        await userEvent.type(confirmPasswordInput, '12345678');
        const registerButton = await screen.getByRole('button', { name: 'REGISTER' });

        // action
        await userEvent.click(registerButton);

        // assert
        expect(mockRegister).toBeCalledWith({
            name: 'Component Testing',
            email: 'componentesting135@gmail.com',
            password: '12345678',
        });
    });
});
