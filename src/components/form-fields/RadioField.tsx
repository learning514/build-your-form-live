
import { useFormBuilder } from '@/context/FormBuilderContext';
import { FormField } from '@/types/formBuilder';
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface RadioFieldProps {
  field: FormField;
  onRemove: (id: string) => void;
}

const RadioField = ({ field, onRemove }: RadioFieldProps) => {
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
        <Label>{field.label}{field.required && <span className="text-red-500 ml-1">*</span>}</Label>
        <RadioGroup
          value={value}
          onValueChange={handleChange}
          className="flex flex-col gap-2"
          required={field.required}
        >
          {field.options?.map((option) => (
            <div key={option} className="flex items-center gap-2">
              <RadioGroupItem id={`${field.id}-${option}`} value={option} />
              <Label htmlFor={`${field.id}-${option}`} className="cursor-pointer">{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default RadioField;
