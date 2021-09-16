
export type ISubListenerCb = () => unknown;

export type IAction = {
	type: String | Symbol;
	[key: string]: any
}

export type IState = Record<string, any> | undefined

export type IReducer = (state: any, action: IAction) => IState;

class Store {
	private state: IState;
	private listeners: ISubListenerCb[] = [];
	private reducer: IReducer;

	constructor(reducer: IReducer, initialState?: IState) {
		this.state = initialState;
		this.reducer = reducer;
		this.dispatch({
			type: Symbol(`@@redux/__INIT__${Math.random()}`)
		})
	}

	subscribe(cb: ISubListenerCb) {
		this.listeners.push(cb);
		return () => {
			this.listeners = this.listeners.filter(ls => ls !== cb);
		}
	}

	getState() { return this.state }

	dispatch(action: IAction) {
		const newState = this.reducer(this.state, action);
		this.state = newState;
		this.batchCallListeners();
	}

	batchCallListeners() {
		this.listeners.forEach(cb => cb());
	}
};

export const createStore = (reducer: IReducer, initialState?: IState) => {
	const store = new Store(reducer, initialState);
	return store;
}

export const combineReducers = (reducerObj: Record<string, IReducer>): IReducer => {
	const rdKeys = Object.keys(reducerObj);
	return (state = {}, action): IState => {
		const newState: IState = {};
		for (let i = 0; i < rdKeys.length; i++) {
			const key = rdKeys[i];
			const reducer = reducerObj[key];
			const prevState = state[key];
			newState[key] = reducer(prevState, action);
		}
		return newState;
	}
}

export const applyMiddleware = () => {}