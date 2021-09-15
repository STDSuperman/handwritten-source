
export type ISubListenerCb = () => unknown;

export type IAction = {
	type: String;
	[key: string]: any
}

export type IState = Record<string, any>

export type IReducer = (state: any, action: IAction) => IState;

class Store {
	private state!: IState;
	private listeners: ISubListenerCb[] = [];
	private reducer: IReducer;

	constructor(reducer: IReducer) {
		this.reducer = reducer;
		this.dispatch({
			type: `@@redux/__INIT__${Math.random()}`
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

export const createStore = (reducer: IReducer) => {
	const store = new Store(reducer);
	return store;
}

export const combineReducers = () => {

}