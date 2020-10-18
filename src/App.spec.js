import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import App from './App.svelte';

describe('App', () => {
    it('shows title', () => {
        const rendered = render(App);

        expect(rendered.getByText('ToDos')).toBeInTheDocument();
    });

    describe('given 0 ToDos', () => {
        let rendered;
        beforeEach(()=>{
            rendered = render(App);
        });

        describe('when page loads', () => {
            it('shows new item box', () => {
                const input = rendered.getByPlaceholderText('O que precisa ser feito?');

                expect(input).toBeInTheDocument();
            });
        });


        describe('when adding a new item', () => {
            it('renders the text on the page', async () => {
                const expectedText = 'meu novo item';

                const input = rendered.getByPlaceholderText('O que precisa ser feito?');
                await userEvent.type(input, expectedText);

                expect(rendered.queryAllByRole('listitem').length).toEqual(0);

                const addBtn = rendered.getByText('Add');
                await userEvent.click(addBtn);

                expect(rendered.getByText(expectedText)).toBeInTheDocument();
                expect(rendered.getAllByRole('listitem').length).toEqual(1);
            });

        });
    });

    describe('given a list of ToDos', () => {
        let rendered;
        const expectedText = 'meu novo item';
        beforeEach(async ()=>{
            rendered = render(App);
            const input = rendered.getByPlaceholderText('O que precisa ser feito?');
            await userEvent.type(input, expectedText);

            const addBtn = rendered.getByText('Add');
            await userEvent.click(addBtn);            
        });

        describe('when clicking on the checkbox',() => {
            it('should add the "completed" class to the item', async () => {

                const checkbox = rendered.getByLabelText(expectedText);
                await userEvent.click(checkbox);
           
                const label = rendered.getByText(expectedText);
                expect(label.className).toEqual('completed')
            })
        })
    });
});