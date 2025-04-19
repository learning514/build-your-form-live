
import { useFormBuilder } from '@/context/FormBuilderContext';
import { FormField } from '@/types/formBuilder';
import { Label } from "@/components/ui/label";
import { X, Copy, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FileFieldProps {
  field: FormField;
  onRemove: (id: string) => void;
  onEdit: (field: FormField) => void;
  onDuplicate: (field: FormField) => void;
}

const FileField = ({ field, onRemove, onEdit, onDuplicate }: FileFieldProps) => {
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
