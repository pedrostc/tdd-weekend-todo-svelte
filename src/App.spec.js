import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/svelte';

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
                
            });
        });
    });
});