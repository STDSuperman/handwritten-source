
export type ISubListenerCb = () => unknown;
export type IAction = {
	type: String | Symbol;
	[key: string]: any
}
export type IState = Record<string, any> | undefined
export type IReducer = (state: any, action: IAction) => IState;
export type IMiddleware = (...args: any[]) => any
export type ICreateStore = (reducer: IReducer, initialState?: IState) => Store;
export type IDispatch = (action: IAction) => void;
export type IMiddlewareApi = {
	getState: () => IState;
	dispatch: IDispatch
}
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

export const createStore: ICreateStore = (reducer, initialState) => {
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

export const applyMiddleware = (...middleware: IMiddleware[]) => {
	return (createStore: ICreateStore) => {
		return (reducer: IReducer, initialState?: IState): Store => {
			const store = createStore(reducer, initialState);
			const middlewareApi = {
				getState: store.getState,
				dispatch: store.dispatch.bind(store)
			};
			const middlewareList = middleware.map(md => md(middlewareApi));
			const midDispatch = compose(...middlewareList)(middlewareApi.dispatch);
			store.dispatch = midDispatch;
			return store;
		}
	}
}

export function compose(...middleware: IMiddleware[]): IMiddleware{
	if (!middleware.length) return arg => arg;
	if (middleware.length === 1) return middleware[0];
	return middleware.reduce((a, b) => {
		return (...args) => {
			return a(b(...args));
		}
	})
}