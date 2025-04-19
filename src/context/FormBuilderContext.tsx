
import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
import { FormField, FormState } from '@/types/formBuilder';

// Actions
type FormAction = 
  | { type: 'ADD_FIELD', payload: FormField }
  | { type: 'REMOVE_FIELD', payload: string }
  | { type: 'UPDATE_FIELD_VALUE', payload: { id: string, value: any } }
  | { type: 'RESET_FORM' };

// Context types
type FormBuilderContextType = {
  state: FormState;
  dispatch: Dispatch<FormAction>;
};

// Initial state
const initialState: FormState = {
  fields: [],
  formData: {},
};

// Create context
const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

// Reducer
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'ADD_FIELD':
      return {
        ...state,
        fields: [...state.fields, action.payload],
      };
    case 'REMOVE_FIELD':
      return {
        ...state,
        fields: state.fields.filter(field => field.id !== action.payload),
        formData: Object.keys(state.formData)
          .filter(key => key !== action.payload)
          .reduce((obj, key) => {
            obj[key] = state.formData[key];
            return obj;
          }, {} as Record<string, any>),
      };
    case 'UPDATE_FIELD_VALUE':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.id]: action.payload.value,
        },
      };
    case 'RESET_FORM':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

// Provider component
export const FormBuilderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormBuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </FormBuilderContext.Provider>
  );
};

// Custom hook to use the context
export const useFormBuilder = () => {
  const context = useContext(FormBuilderContext);
  if (context === undefined) {
    throw new Error('useFormBuilder must be used within a FormBuilderProvider');
  }
  return context;
};
