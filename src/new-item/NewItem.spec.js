import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/svelte';

import NewItem from './NewItem.svelte';

describe('NewItem Component', () => {
    let rendered;
    beforeEach(() => {
        // Needs to be in a beforeEach because testingLibrary clears the dom after each test.
        rendered = render(NewItem);
    })

    describe('when the item text box is empty', () => {
        it('disables the "Add" button', () => {
            expect(rendered.getByText('Add')).toHaveAttribute('disabled');
        });
    });

    describe('when the user enters text to the box', () => {
        it('enables the "Add" button', async () => {
            const input = rendered.getByPlaceholderText('O que precisa ser feito?');
            await fireEvent.change(input, { target: { value: 'teste' } });

            const addBtn = rendered.getByText('Add');
            expect(addBtn).not.toHaveAttribute('disabled');
        })
    });
});