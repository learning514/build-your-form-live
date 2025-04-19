
export type FieldType = 
  | 'text' 
  | 'file' 
  | 'email' 
  | 'phone' 
  | 'number' 
  | 'dropdown' 
  | 'radio' 
  | 'checkbox' 
  | 'custom';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  value?: string | string[] | number | boolean | File | null;
}

export interface FormState {
  fields: FormField[];
  formData: Record<string, any>;
}
