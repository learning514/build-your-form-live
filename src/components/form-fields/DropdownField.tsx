
import { useFormBuilder } from '@/context/FormBuilderContext';
import { FormField } from '@/types/formBuilder';
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DropdownFieldProps {
  field: FormField;
  onRemove: (id: string) => void;
}

const DropdownField = ({ field, onRemove }: DropdownFieldProps) => {
  const { dispatch, state } = useFormBuilder();
  const value = state.formData[field.id] || '';

  const handleChange = (value: string) => {
    dispatch({
      type: 'UPDATE_FIELD_VALUE',
      payload: { id: field.id, value },
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border mb-4 relative animate-fade-in">
      <button 
        type="button"
        onClick={() => onRemove(field.id)} 
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        aria-label="Remove field"
      >
        <X size={16} />
      </button>
      <div className="space-y-2">
        <Label htmlFor={field.id}>{field.label}{field.required && <span className="text-red-500 ml-1">*</span>}</Label>
        <Select value={value} onValueChange={handleChange} required={field.required}>
          <SelectTrigger id={field.id} className="w-full">
            <SelectValue placeholder="Please Select" />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DropdownField;
