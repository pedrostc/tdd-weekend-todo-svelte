import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import ToDo from './ToDo.svelte';

describe('given a ToDo', () => {
    let rendered;
    const expectedText = 'meu novo item';
    beforeEach(async ()=>{
        rendered = render(ToDo, { id: 1, text: expectedText });
    });

    describe('when loading', () => {
        it('does not show the edit text box.', () => {
            const textInput = rendered.queryByRole('textbox');

            expect(textInput).toBeFalsy();
        });
    });

    describe('when clicking on the checkbox',() => {
        it('should add the "completed" class to the item', async () => {

            const checkbox = rendered.getByLabelText(expectedText);
            await userEvent.click(checkbox);
       
            const label = rendered.getByText(expectedText);
            expect(label.className).toEqual('completed')
        });
    });
    
    describe('when double-clicking the text', () => {
        it('hide the label text', () => {

            const labelText = rendered.queryByTestId('itemLabel');

            expect(labelText).toBeFalsy();
          
        });        

        it('show an input field containing the label', async () => {

            const text = rendered.getByText(expectedText);

            await userEvent.dblClick(text);

            const textInput = rendered.getByRole('textbox');

            expect(textInput.value).toEqual(expectedText);
        });                
    });

});

describe("given the component is on edit mode" , () => {

    let rendered;
    const expectedText = 'meu novo item';
    const newText = 'meu item mais novo ainda';

    beforeEach(async () => {

        rendered = render(ToDo, { id: 1, text: expectedText });
        
        const text = rendered.getByText(expectedText);
        await userEvent.dblClick(text);        

    })

    describe('when blurring the input field', () => {
        beforeEach(() => {
            const checkbox = rendered.getByRole('checkbox');
            checkbox.focus(); 
        });

        it('hides the text box', async () => {
            const txtBox = rendered.queryByRole('textbox');
            expect(txtBox).toBeFalsy();
        });
    })

})