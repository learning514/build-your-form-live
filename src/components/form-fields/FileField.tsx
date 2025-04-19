
import { useFormBuilder } from '@/context/FormBuilderContext';
import { FormField } from '@/types/formBuilder';
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface FileFieldProps {
  field: FormField;
  onRemove: (id: string) => void;
}

const FileField = ({ field, onRemove }: FileFieldProps) => {
  const { dispatch, state } = useFormBuilder();
  const [fileName, setFileName] = useState<string>("No file chosen");
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      dispatch({
        type: 'UPDATE_FIELD_VALUE',
        payload: { id: field.id, value: file },
      });
    } else {
      setFileName("No file chosen");
      dispatch({
        type: 'UPDATE_FIELD_VALUE',
        payload: { id: field.id, value: null },
      });
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
        <Label htmlFor={field.id}>{field.label}{field.required && <span className="text-red-500 ml-1">*</span>}</Label>
        <div className="flex items-center gap-3">
          <Button 
            type="button"
            variant="outline"
            className="relative overflow-hidden"
            onClick={() => document.getElementById(field.id)?.click()}
          >
            Browse
            <input
              id={field.id}
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
              required={field.required}
            />
          </Button>
          <span className="text-sm text-gray-500">{fileName}</span>
        </div>
      </div>
    </div>
  );
};

export default FileField;
