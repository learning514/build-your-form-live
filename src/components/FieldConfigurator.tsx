
import { useState } from "react";
import { FieldType, FormField } from "@/types/formBuilder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";

interface FieldConfiguratorProps {
  fieldType: FieldType;
  initialValues?: Partial<Omit<FormField, "id">>;
  onSave: (field: Omit<FormField, "id">) => void;
  onCancel: () => void;
}

const FieldConfigurator = ({
  fieldType,
  initialValues,
  onSave,
  onCancel
}: FieldConfiguratorProps) => {
  const [field, setField] = useState<Omit<FormField, "id">>({
    type: fieldType,
    label: initialValues?.label || getDefaultLabel(fieldType),
    placeholder: initialValues?.placeholder || "",
    required: initialValues?.required || false,
    options: initialValues?.options || getDefaultOptions(fieldType),
    fieldName: initialValues?.fieldName || "",
  });

  const [newOption, setNewOption] = useState<string>("");

  function getDefaultLabel(type: FieldType): string {
    switch (type) {
      case "text": return "Text Field";
      case "email": return "Email Address";
      case "phone": return "Phone Number";
      case "number": return "Number Input";
      case "file": return "File Upload";
      case "textarea": return "Text Area";
      case "dropdown": return "Dropdown Menu";
      case "radio": return "Radio Group";
      case "checkbox": return "Checkbox Group";
      case "date": return "Date Picker";
      case "custom": return "Custom Field";
      default: return "New Field";
    }
  }

  function getDefaultOptions(type: FieldType): string[] {
    if (type === "dropdown") return ["Option 1", "Option 2", "Option 3"];
    if (type === "radio") return ["Option 1", "Option 2"];
    if (type === "checkbox") return ["Option 1", "Option 2", "Option 3"];
    return [];
  }

  const handleAddOption = () => {
    if (newOption && !field.options?.includes(newOption)) {
      setField(prev => ({
        ...prev,
        options: [...(prev.options || []), newOption]
      }));
      setNewOption("");
    }
  };

  const handleRemoveOption = (optionToRemove: string) => {
    setField(prev => ({
      ...prev,
      options: prev.options?.filter(option => option !== optionToRemove)
    }));
  };

  const needsOptions = ["dropdown", "radio", "checkbox"].includes(field.type);

  return (
    <div className="space-y-4 py-2">
      <div className="grid gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="field-label">Field Label</Label>
            <Input
              id="field-label"
              value={field.label}
              onChange={(e) => setField({ ...field, label: e.target.value })}
              placeholder="Enter field label"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="field-name">Field Name (for backend)</Label>
            <Input
              id="field-name"
              value={field.fieldName || ""}
              onChange={(e) => setField({ ...field, fieldName: e.target.value })}
              placeholder="e.g. user_name"
              className="mt-1"
            />
          </div>
        </div>

        {field.type !== "file" && field.type !== "checkbox" && field.type !== "radio" && field.type !== "date" && (
          <div>
            <Label htmlFor="field-placeholder">Placeholder</Label>
            <Input
              id="field-placeholder"
              value={field.placeholder || ""}
              onChange={(e) => setField({ ...field, placeholder: e.target.value })}
              placeholder="Enter placeholder text"
              className="mt-1"
            />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="field-required" 
            checked={field.required || false}
            onCheckedChange={(checked) => setField({ ...field, required: !!checked })}
          />
          <Label htmlFor="field-required" className="text-sm font-normal">Required field</Label>
        </div>

        {needsOptions && (
          <div className="space-y-2">
            <Label>Options</Label>
            <div className="bg-gray-50 p-3 rounded-md space-y-2">
              {field.options?.map((option, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input 
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(field.options || [])];
                      newOptions[i] = e.target.value;
                      setField({ ...field, options: newOptions });
                    }}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemoveOption(option)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}
              
              <div className="flex items-center gap-2 mt-2">
                <Input
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Add new option"
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  size="icon" 
                  onClick={handleAddOption} 
                  disabled={!newOption.trim()}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(field)}>Add Field</Button>
      </div>
    </div>
  );
};

export default FieldConfigurator;
