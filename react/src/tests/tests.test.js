import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
// import { store } from '../store';
import CreateBookForm from '../components/Books/CreateBookForm';

describe('Test CreateBookForm', () => {
    const dispatchMock = jest.fn()
    const jestSubscribe = jest.fn()
    const store = { getState:jest.fn(), dispatch: dispatchMock, subscribe: jestSubscribe }
    // jest.mock('../store', () => ({ store: { getStore:jest.fn(), dispatch: dispatchMock } }))
    it('tests create book', async () => {
        const utils = render(
            <Provider store={store}>
                <CreateBookForm />
            </Provider>
        );
        const bookName = await utils.findByLabelText('Book Title');
        const bookAuthor = await utils.findByLabelText('Book Author');
        const createButton = await utils.findByTestId('create_book_button');
        fireEvent.change(bookName, { target: { value: 'Forest Gymp' } });
        fireEvent.change(bookAuthor, { target: { value: 'Pushkin' } });

        expect(bookName.value).toBe('Forest Gymp');
        expect(bookAuthor.value).toBe('Pushkin');

        fireEvent.click(createButton);
        expect(dispatchMock).toBeCalled();      
        expect(bookName.value).toBe('');
        expect(bookAuthor.value).toBe('');        
    })
})