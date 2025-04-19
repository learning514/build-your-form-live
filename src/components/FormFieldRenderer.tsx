
import { FormField } from "@/types/formBuilder";
import TextField from "./form-fields/TextField";
import FileField from "./form-fields/FileField";
import DropdownField from "./form-fields/DropdownField";
import RadioField from "./form-fields/RadioField";
import CheckboxField from "./form-fields/CheckboxField";
import NumberField from "./form-fields/NumberField";

interface FormFieldRendererProps {
  field: FormField;
  onRemove: (id: string) => void;
}

const FormFieldRenderer = ({ field, onRemove }: FormFieldRendererProps) => {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'phone':
      return <TextField field={field} onRemove={onRemove} />;
    case 'file':
      return <FileField field={field} onRemove={onRemove} />;
    case 'number':
      return <NumberField field={field} onRemove={onRemove} />;
    case 'dropdown':
      return <DropdownField field={field} onRemove={onRemove} />;
    case 'radio':
      return <RadioField field={field} onRemove={onRemove} />;
    case 'checkbox':
      return <CheckboxField field={field} onRemove={onRemove} />;
    default:
      return null;
  }
};

export default FormFieldRenderer;
