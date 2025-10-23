"use client";

import { createContext, useReducer, useContext } from "react";

interface Body {
  contributors: Contributor[];
  shelterID: number;
  shelterName?: string;
  value: number;
  type: "shelter" | "foundation";
}

interface Contributor {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface FormContextType {
  state: Body;
  dispatch: React.Dispatch<FormAction>;
  reset: () => void;
}

type FormAction =
  | { type: "SET_TYPE"; payload: "shelter" | "foundation" }
  | { type: "SET_AMOUNT"; payload: number }
  | { type: "SET_SHELTER_ID"; payload: number }
  | { type: "SET_SHELTER_NAME"; payload: string }
  | { type: "SET_CONTRIBUTORS"; payload: Contributor[] }
  | { type: "RESET" };

const FormContext = createContext<FormContextType | null>(null);

const initialState: Body = {
  contributors: [],
  type: "shelter",
  shelterID: 0,
  value: 0,
};

function formReducer(state: Body, action: FormAction): Body {
  switch (action.type) {
    case "SET_TYPE":
      return { ...state, type: action.payload };
    case "SET_AMOUNT":
      return { ...state, value: action.payload };
    case "SET_SHELTER_ID":
      return { ...state, shelterID: action.payload };
    case "SET_SHELTER_NAME":
      return { ...state, shelterName: action.payload };
    case "SET_CONTRIBUTORS":
      return { ...state, contributors: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}
export default function FormContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const reset = () => dispatch({ type: "RESET" });

  return (
    <FormContext.Provider value={{ state, dispatch, reset }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext) as FormContextType;
}
