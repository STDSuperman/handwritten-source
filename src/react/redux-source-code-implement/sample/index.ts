import { createStore, IState, IAction } from '../core/index';

const initialState = {
	count: 0
}

function reducer(state: IState = initialState, action: IAction): IState {
	switch (action.type) {
		case 'INCREMENT':
			return {...state, count: state.count + 1}
		case 'DECREMENT':
			return {...state, count: state.count - 1}
		default: return state;
	}
}

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()))

store.dispatch({
	type: 'INCREMENT'
})