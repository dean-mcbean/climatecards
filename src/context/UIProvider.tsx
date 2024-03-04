import React, { ReactNode } from "react";

type Card = {
  id: number;
  title: string;
  content: string;
};

type UIState = {
  cards: Card[];
  status: string;
};

type UIAction =
  | { type: "ADD_CARD"; card: Card }
  | { type: "REMOVE_CARD"; id: number }
  | { type: "UPDATE_STATUS"; status: string };

type UIContextType = {
  state: UIState;
  dispatch: React.Dispatch<UIAction>;
};

const initialState: UIState = {
  cards: [],
  status: "",
};

const UIContext = React.createContext<UIContextType>({
  state: initialState,
  dispatch: () => {},
});

const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case "ADD_CARD":
      return {
        ...state,
        cards: [...state.cards, action.card],
      };
    case "REMOVE_CARD":
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.id),
      };
    case "UPDATE_STATUS":
      return {
        ...state,
        status: action.status,
      };
    default:
      return state;
  }
};

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);
  const contextValue = { state, dispatch };

  return (
    <UIContext.Provider value={contextValue}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  return React.useContext(UIContext);
};
