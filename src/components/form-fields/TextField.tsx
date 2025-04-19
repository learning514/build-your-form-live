
import { useFormBuilder } from '@/context/FormBuilderContext';
import { FormField } from '@/types/formBuilder';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface TextFieldProps {
  field: FormField;
  onRemove: (id: string) => void;
}

const TextField = ({ field, onRemove }: TextFieldProps) => {
  const { dispatch, state } = useFormBuilder();
  const value = state.formData[field.id] || '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_FIELD_VALUE',
      payload: { id: field.id, value: e.target.value },
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
        <Input
          id={field.id}
          type={field.type}
          placeholder={field.placeholder}
          value={value}
          onChange={handleChange}
          required={field.required}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default TextField;
