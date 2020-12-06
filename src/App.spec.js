import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import App from './App.svelte';
import TodoModel from './model/todo-model';

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
                const item1Text = 'meu novo item';

                const input = rendered.getByPlaceholderText('O que precisa ser feito?');
                await userEvent.type(input, item1Text);

                expect(rendered.queryAllByRole('listitem').length).toEqual(0);

                const addBtn = rendered.getByText('Add');
                await userEvent.click(addBtn);

                expect(rendered.getByText(item1Text)).toBeInTheDocument();
                expect(rendered.getAllByRole('listitem').length).toEqual(1);
            });

        });

        it('should NOT display how many toDos exist', () =>{
            const expectedTotalText = "0 item left"
            const totalText = rendered.queryByText(expectedTotalText);

            expect(totalText).toBeFalsy();
        })
    });

    describe('given a list of ToDos', () => {
        let rendered;
        const toDos = [
            new TodoModel(1, "My first Item"),
            new TodoModel(2, "My second Item"),
            new TodoModel(3, "My third Item")
        ];
        
        const item1Text = toDos[0].text;
        const item2Text = toDos[1].text;
        const item3Text = toDos[2].text;
        beforeEach(async ()=>{
            rendered = render(App);

            const input = rendered.getByPlaceholderText('O que precisa ser feito?');
            const addBtn = rendered.getByText('Add');

            for(let i = 0; i < toDos.length; i++) {
                const toDo = toDos[i];

                await userEvent.type(input, toDo.text);
                await userEvent.click(addBtn);  
            }
        });

        describe('when clicking on the checkbox',() => {
            it('should add the "completed" class to the item', async () => {
                const checkbox = rendered.getByLabelText(item1Text);
                await userEvent.click(checkbox);
           
                const label = rendered.getByText(item1Text);
                expect(label.className).toEqual('completed')
            });

            it('updates the total items counter', async () => {
                let checkbox = rendered.getByLabelText(item1Text);
                await userEvent.click(checkbox);

                checkbox = rendered.getByLabelText(item2Text);
                await userEvent.click(checkbox);
                
                const expectedTotalText = "1 item left"
                const totalText = rendered.getByText(expectedTotalText);
    
                expect(totalText).toBeInTheDocument();
            });

            it('show correct text for no items left', async () => {
                let checkbox = rendered.getByLabelText(item1Text);
                await userEvent.click(checkbox);

                checkbox = rendered.getByLabelText(item2Text);
                await userEvent.click(checkbox);
                
                checkbox = rendered.getByLabelText(item3Text);
                await userEvent.click(checkbox);

                const expectedTotalText = "0 items left"
                const totalText = rendered.getByText(expectedTotalText);
    
                expect(totalText).toBeInTheDocument();
            });
        });

        describe('when clicking on the delete button', () => {
            it('should remove a item from the list', async () => {
                const deleteBtn = rendered.getAllByText('Delete')[0];
                await userEvent.click(deleteBtn);
           
                const label = rendered.queryByText(item1Text);
                expect(label).toBeFalsy();
            });
        });

        it('should display how many toDos exist', () =>{
            const expectedTotalText = "3 items left"
            const totalText = rendered.getByText(expectedTotalText);

            expect(totalText).toBeInTheDocument();
        })
    });
});