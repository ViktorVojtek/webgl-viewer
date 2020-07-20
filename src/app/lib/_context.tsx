import React, { createContext, useReducer } from 'react';

interface IState {
  showMatMenu: boolean;
}

interface IAction {
  payload: any;
  type: string;
}

const initialState: IState = {
  showMatMenu: false,
};

export const MatMenuContext = createContext<{
  state: IState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const Reducer = (state: IState, action: IAction) => {
  console.log('reducer called');
  console.log(state);
  console.log(action);
  switch (action.type) {
    case 'TOGGLE_MAT_MENU':
      return { ...state, showMatMenu: action.payload as boolean };
    default:
      return state;
  }
};

const MatMenuProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <MatMenuContext.Provider value={{ state, dispatch }}>
      {children}
    </MatMenuContext.Provider>
  );
};

export default MatMenuProvider;
