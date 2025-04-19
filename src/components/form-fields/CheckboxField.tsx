
import { useFormBuilder } from '@/context/FormBuilderContext';
import { FormField } from '@/types/formBuilder';
import { Label } from "@/components/ui/label";
import { X, Plus } from "lucide-react";
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface CheckboxFieldProps {
  field: FormField;
  onRemove: (id: string) => void;
}

const CheckboxField = ({ field, onRemove }: CheckboxFieldProps) => {
  const { dispatch, state } = useFormBuilder();
  const [newHobby, setNewHobby] = useState('');
  const [options, setOptions] = useState<string[]>(field.options || []);
  
  const selectedValues = (state.formData[field.id] as string[] | undefined) || [];

  const handleCheckboxChange = (option: string, checked: boolean) => {
    let updatedValues: string[];
    
    if (checked) {
      updatedValues = [...selectedValues, option];
    } else {
      updatedValues = selectedValues.filter(value => value !== option);
    }

    dispatch({
      type: 'UPDATE_FIELD_VALUE',
      payload: { id: field.id, value: updatedValues },
    });
  };

  const addNewOption = () => {
    if (newHobby.trim() && !options.includes(newHobby.trim())) {
      const updatedOptions = [...options, newHobby.trim()];
      setOptions(updatedOptions);
      setNewHobby('');
      
      // Check the newly added option
      handleCheckboxChange(newHobby.trim(), true);
    }
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
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <div key={option} className="flex items-center gap-2">
              <Checkbox 
                id={`${field.id}-${option}`}
                checked={selectedValues.includes(option)}
                onCheckedChange={(checked) => handleCheckboxChange(option, checked === true)}
              />
              <Label htmlFor={`${field.id}-${option}`} className="cursor-pointer">{option}</Label>
            </div>
          ))}
        </div>
        
        <div className="mt-3 flex items-center gap-2">
          <Input
            placeholder="Add custom hobby"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            className="flex-1"
          />
          <Button 
            type="button" 
            size="sm" 
            onClick={addNewOption}
            disabled={!newHobby.trim()}
            className="bg-formBuilder-primary hover:bg-formBuilder-secondary"
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckboxField;
