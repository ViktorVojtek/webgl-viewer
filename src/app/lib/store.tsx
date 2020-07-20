import create from 'zustand';

interface IAction {
  type: string;
  payload: any;
}

interface IState {
  state: {
    matMenuOpen: boolean;
    matIdx: number;
  };
  dispatch: (args: any) => void;
}

const types = { MAT_MENU: 'MAT_MENU', SET_MAT_IDX: 'SET_MAT_IDX' };
const initState = { matMenuOpen: false, matIdx: 0 };

const reducer = (gstate: IState, action: IAction) => {
  switch (action.type) {
    case types.MAT_MENU:
      return {
        ...gstate,
        state: {
          ...gstate.state,
          matMenuOpen: action.payload,
        },
      };
    case types.SET_MAT_IDX:
      return {
        ...gstate,
        state: {
          ...gstate.state,
          matIdx: action.payload,
        },
      };
  }
};

const [useStore] = create((set) => ({
  state: initState,
  dispatch: (args: any) => set((state: IState) => reducer(state, args)),
}));

export default useStore;
