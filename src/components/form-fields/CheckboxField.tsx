
import { useFormBuilder } from '@/context/FormBuilderContext';
import { FormField } from '@/types/formBuilder';
import { Label } from "@/components/ui/label";
import { X, Copy, Settings, Plus } from "lucide-react";
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CheckboxFieldProps {
  field: FormField;
  onRemove: (id: string) => void;
  onEdit: (field: FormField) => void;
  onDuplicate: (field: FormField) => void;
}

const CheckboxField = ({ field, onRemove, onEdit, onDuplicate }: CheckboxFieldProps) => {
  const { dispatch, state } = useFormBuilder();
  const [newOption, setNewOption] = useState('');
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
    if (newOption.trim() && !options.includes(newOption.trim())) {
      const updatedOptions = [...options, newOption.trim()];
      setOptions(updatedOptions);
      setNewOption('');
      
      // Update the field definition with new options
      dispatch({
        type: 'UPDATE_FIELD',
        payload: {
          ...field,
          options: updatedOptions
        },
      });
      
      // Check the newly added option
      handleCheckboxChange(newOption.trim(), true);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border mb-4 relative animate-fade-in group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-gray-500"
            >
              <Settings size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="end">
            <div className="grid gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start"
                onClick={() => onEdit(field)}
              >
                <Settings size={14} className="mr-2" /> Edit Field
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start"
                onClick={() => onDuplicate(field)}
              >
                <Copy size={14} className="mr-2" /> Duplicate
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => onRemove(field.id)}
              >
                <X size={14} className="mr-2" /> Remove
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
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
            placeholder="Add custom option"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            className="flex-1"
          />
          <Button 
            type="button" 
            size="sm" 
            onClick={addNewOption}
            disabled={!newOption.trim()}
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
