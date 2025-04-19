
export type FieldType = 
  | 'text' 
  | 'file' 
  | 'email' 
  | 'phone' 
  | 'number' 
  | 'dropdown' 
  | 'radio' 
  | 'checkbox'
  | 'textarea'
  | 'date'
  | 'custom';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  value?: string | string[] | number | boolean | File | null;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  };
  defaultValue?: string | string[] | number | boolean | null;
  fieldName?: string;
}

export interface FormState {
  fields: FormField[];
  formData: Record<string, any>;
}
