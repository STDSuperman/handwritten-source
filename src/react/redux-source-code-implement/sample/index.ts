import { createStore, IState, IAction, combineReducers } from '../core/index';

const initialState = {
	reducer1: {
		count: 0
	},
	reducer2: {
		count: 0
	}
}

function reducer(state: IState = initialState.reducer1, action: IAction): IState {
	switch (action.type) {
		case 'INCREMENT':
			return {...state, count: state.count + 1}
		case 'DECREMENT':
			return {...state, count: state.count - 1}
		default: return state;
	}
}

function reducer1(state: IState = initialState.reducer2, action: IAction): IState {
	switch (action.type) {
		case 'INCREMENT':
			return {...state, count: state.count + 1}
		case 'DECREMENT':
			return {...state, count: state.count - 1}
		default: return state;
	}
}

const store = createStore(combineReducers({
	reducer1: reducer,
	reducer2: reducer1
}));

store.subscribe(() => console.log(store.getState()))

store.dispatch({
	type: 'INCREMENT'
})