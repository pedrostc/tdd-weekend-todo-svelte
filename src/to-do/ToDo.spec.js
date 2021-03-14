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
        const updateItemHandler = jest.fn();

        it('fires updateItem event', async () => {
            rendered.component.$on('updateItem', updateItemHandler);

            const { text, id } = props.toDo;

            const checkbox = rendered.getByLabelText(text);
            await userEvent.click(checkbox);

            const expectedTodo = props.toDo.with(td => td.done = true);
       
            const expectedEventArgs = { detail: expectedTodo };

            expect(updateItemHandler).toHaveBeenCalledWith(
                expect.objectContaining(expectedEventArgs)
            );
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

describe("given the component is on edit mode and the user changes the item text" , () => {

    let rendered;
    let pendingTodo = new TodoModel(1, 'meu item incompleto');
    const props = {
        toDo: pendingTodo
    };
    const newText = 'meu item mais novo ainda';

    beforeEach(async () => {

        rendered = render(ToDo, props);
        
        // Enters edit mode
        const itemLabel = rendered.getByText(props.toDo.text);
        await userEvent.dblClick(itemLabel);

        // changes item text
        const textBox = rendered.getByDisplayValue(props.toDo.text);
        await userEvent.clear(textBox);
        await userEvent.type(textBox, newText);
    });

    const exitEditModeTestCases = [
        {
            method: "blurring the input field",
            exitEditMode: () => {
                const checkbox = rendered.getByRole('checkbox');
                checkbox.focus();
            }
        }, {
            method: "hitting ESC key",
            exitEditMode: () => {
                const txtBox = rendered.queryByRole('textbox');
                fireEvent.keyDown(txtBox, { keyCode: 27 })
            }
        }
    ];

    exitEditModeTestCases.forEach(({ method, exitEditMode }) => {
        describe(`when ${method}`, () => {
            const updateItemHandler = jest.fn();

            beforeEach(() => {
                exitEditMode();
            });
            

            it('fires updateItem event', async () => {
                rendered.component.$on('updateItem', updateItemHandler);
    
                const { text } = props.toDo;
    
                const checkbox = rendered.getByLabelText(text);
                await userEvent.click(checkbox);

            });
            it('hides the text box', () => {
                const txtBox = rendered.queryByRole('textbox');
                expect(txtBox).toBeFalsy();
            });
    
            it('fires updateItem event', () => {
                const expectedTodo = props.toDo.with(td => td.text = newText);
           
                const expectedEventArgs = { detail: expectedTodo };
    
                expect(updateItemHandler).toHaveBeenCalledWith(
                    expect.objectContaining(expectedEventArgs)
                );
            });
        });
    });
});

describe("given a completed Item", () => {
    let rendered;

    let completeToDo = new TodoModel(1, 'meu item incompleto');
    completeToDo.done = true;

    const props = {
        toDo: completeToDo
    };

    beforeEach(async ()=>{
        rendered = render(ToDo, props);
    });
    
    
    describe('when rendering', () => {
        it('should add the "completed" class to the item', async () => {
            const label = rendered.getByText(props.toDo.text);
            expect(label.className).toContain('completed')
        });

        it('renders the checkbox as checked', async () => {
            const checkBox = rendered.getByLabelText(props.toDo.text);
            expect(checkBox.checked).toEqual(true)
        });
    });
});