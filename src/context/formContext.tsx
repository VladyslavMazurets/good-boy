"use client";

import { createContext, useReducer, useContext } from "react";

interface Body {
  contributors: Contributor[];
  shelterID: number;
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
}

type FormAction =
  | { type: "SET_TYPE"; payload: "shelter" | "foundation" }
  | { type: "SET_AMOUNT"; payload: number }
  | { type: "SET_SHELTER"; payload: number };

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
    case "SET_SHELTER":
      return { ...state, shelterID: action.payload };
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

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext) as FormContextType;
}
