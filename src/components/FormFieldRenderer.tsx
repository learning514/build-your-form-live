
import { FormField } from "@/types/formBuilder";
import TextField from "./form-fields/TextField";
import FileField from "./form-fields/FileField";
import DropdownField from "./form-fields/DropdownField";
import RadioField from "./form-fields/RadioField";
import CheckboxField from "./form-fields/CheckboxField";
import NumberField from "./form-fields/NumberField";
import DateField from "./form-fields/DateField";
import TextareaField from "./form-fields/TextareaField";

interface FormFieldRendererProps {
  field: FormField;
  onRemove: (id: string) => void;
  onEdit: (field: FormField) => void;
  onDuplicate: (field: FormField) => void;
}

const FormFieldRenderer = ({ field, onRemove, onEdit, onDuplicate }: FormFieldRendererProps) => {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'phone':
      return <TextField field={field} onRemove={onRemove} onEdit={onEdit} onDuplicate={onDuplicate} />;
    case 'file':
      return <FileField field={field} onRemove={onRemove} onEdit={onEdit} onDuplicate={onDuplicate} />;
    case 'number':
      return <NumberField field={field} onRemove={onRemove} onEdit={onEdit} onDuplicate={onDuplicate} />;
    case 'textarea':
      return <TextareaField field={field} onRemove={onRemove} onEdit={onEdit} onDuplicate={onDuplicate} />;
    case 'dropdown':
      return <DropdownField field={field} onRemove={onRemove} onEdit={onEdit} onDuplicate={onDuplicate} />;
    case 'radio':
      return <RadioField field={field} onRemove={onRemove} onEdit={onEdit} onDuplicate={onDuplicate} />;
    case 'checkbox':
      return <CheckboxField field={field} onRemove={onRemove} onEdit={onEdit} onDuplicate={onDuplicate} />;
    case 'date':
      return <DateField field={field} onRemove={onRemove} onEdit={onEdit} onDuplicate={onDuplicate} />;
    default:
      return null;
  }
};

export default FormFieldRenderer;
