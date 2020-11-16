import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import TodoModel from '../model/todo-model';

import ToDo from './ToDo.svelte';

describe('given a ToDo', () => {
    let rendered;

    let pendingTodo = new TodoModel(1, 'meu item incompleto');

    const props = {
        toDo: pendingTodo
    };

    beforeEach(async ()=>{
        rendered = render(ToDo, props);
    });

    describe('when loading', () => {
        it('does not show the edit text box.', () => {
            const textInput = rendered.queryByRole('textbox');

            expect(textInput).toBeFalsy();
        });
    });

    describe('when clicking on the checkbox',() => {
        it('should add the "completed" class to the item', async () => {

            const checkbox = rendered.getByLabelText(props.toDo.text);
            await userEvent.click(checkbox);
       
            const label = rendered.getByText(props.toDo.text);
            expect(label.className).toEqual('completed')
        });
    });
    
    describe('when double-clicking the text', () => {
        beforeEach(async () => {
            const text = rendered.getByText(props.toDo.text);

            await userEvent.dblClick(text);
        })

        it('hide the label text', async () => {
            const labelText = rendered.queryByTestId('itemLabel');

            expect(labelText).toBeFalsy();
          
        });        

        it('show an input field containing the label', async () => {
            const textInput = rendered.getByRole('textbox');

            expect(textInput.value).toEqual(props.toDo.text);
        });                
    });

    describe('when clicking the DELETE button', () => {
        const deleteItemHandler = jest.fn();

        beforeEach(async () => {
            rendered.component.$on('deleteItem', deleteItemHandler);

            const deleteBtn = rendered.getByText('Delete');
            await userEvent.click(deleteBtn);
        });

        it('fires the itemDeleted event passing the item id', () => {
            const expectedEventArgs = { detail: { id: props.toDo.id } };
            expect(deleteItemHandler).toHaveBeenCalled();
            expect(deleteItemHandler).toHaveBeenCalledWith(
                expect.objectContaining(expectedEventArgs)
                );
        });
    });
});

describe("given the component is on edit mode" , () => {

    let rendered;
    let pendingTodo = new TodoModel(1, 'meu item incompleto');
    const props = {
        toDo: pendingTodo
    };
    const newText = 'meu item mais novo ainda';

    beforeEach(async () => {

        rendered = render(ToDo, props);
        
        const itemLabel = rendered.getByText(props.toDo.text);
        await userEvent.dblClick(itemLabel);        

    });

    describe('when blurring the input field', () => {
        beforeEach(async () => {
            const checkbox = rendered.getByRole('checkbox');
            checkbox.focus();
        });

        it('hides the text box', async () => {
            const txtBox = rendered.queryByRole('textbox');
            expect(txtBox).toBeFalsy();
        });
    });

    describe('when hitting ESC on the keyboard', () => {
        beforeEach(async () => {
            const txtBox = rendered.queryByRole('textbox');
            await fireEvent.keyDown(txtBox, { keyCode: 27 })
        });

        it('hides the text box', async () => {
            const txtBox = rendered.queryByRole('textbox');
            expect(txtBox).toBeFalsy();
        });
    })

})