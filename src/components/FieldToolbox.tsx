
import { useFormBuilder } from "@/context/FormBuilderContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import { FieldType, FormField } from "@/types/formBuilder";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import FieldConfigurator from "./FieldConfigurator";
import { useState } from "react";

const FieldToolbox = () => {
  const { dispatch } = useFormBuilder();
  const [selectedFieldType, setSelectedFieldType] = useState<FieldType | null>(null);
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  
  const addField = (field: Omit<FormField, "id">) => {
    dispatch({
      type: 'ADD_FIELD',
      payload: {
        ...field,
        id: `${field.type}-${Date.now()}`,
      },
    });
  };

  const handleFieldTypeClick = (fieldType: FieldType) => {
    setSelectedFieldType(fieldType);
    setIsConfiguratorOpen(true);
  };

  const handleQuickAdd = (field: Omit<FormField, "id">) => {
    addField(field);
  };

  const fieldTypes: Array<{type: FieldType, label: string, icon: string}> = [
    { type: "text", label: "Text Input", icon: "input" },
    { type: "number", label: "Number Input", icon: "input" },
    { type: "file", label: "File Upload", icon: "file-upload" },
    { type: "email", label: "Email", icon: "input" },
    { type: "phone", label: "Phone Number", icon: "input" },
    { type: "textarea", label: "Textarea", icon: "input" },
    { type: "dropdown", label: "Dropdown", icon: "select" },
    { type: "radio", label: "Radio Group", icon: "radio" },
    { type: "checkbox", label: "Checkbox Group", icon: "checkbox" },
    { type: "date", label: "Date Picker", icon: "calendar" },
    { type: "custom", label: "Custom Field", icon: "settings" },
  ];

  const defaultFields = [
    {
      type: "text" as FieldType,
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      type: "file" as FieldType,
      label: "Photo",
      required: false,
    },
    {
      type: "email" as FieldType,
      label: "Email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      type: "phone" as FieldType,
      label: "Phone Number",
      placeholder: "Enter your phone number",
      required: false,
    },
    {
      type: "number" as FieldType,
      label: "Total Family Members",
      placeholder: "Enter number of family members",
      required: false,
    },
    {
      type: "dropdown" as FieldType,
      label: "City Address",
      options: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
      required: false,
    },
    {
      type: "text" as FieldType,
      label: "Home Address",
      placeholder: "Enter your home address",
      required: false,
    },
    {
      type: "radio" as FieldType,
      label: "Gender",
      options: ["Male", "Female", "Other"],
      required: false,
    },
    {
      type: "checkbox" as FieldType,
      label: "Hobbies",
      options: ["Playing Football", "Online Games", "Travelling"],
      required: false,
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg border h-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Form Builder Toolbox</h2>
        <p className="text-sm text-gray-500">Click on a field type to add it to your form</p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Field Types</h3>
        <div className="grid grid-cols-2 gap-2">
          {fieldTypes.map((fieldType, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start h-auto py-2 text-left"
              onClick={() => handleFieldTypeClick(fieldType.type)}
            >
              <span className="truncate">{fieldType.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-md font-medium mb-2">Quick Add Fields</h3>
        <div className="grid gap-3 max-h-[calc(100vh-400px)] overflow-y-auto pr-1">
          {defaultFields.map((field, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <h3 className="font-medium">{field.label}</h3>
                <p className="text-xs text-gray-500 mt-1">Type: {field.type}</p>
              </CardContent>
              <CardFooter className="p-2 pt-0 flex justify-end">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-xs border-formBuilder-primary text-formBuilder-primary hover:bg-formBuilder-light"
                  onClick={() => handleQuickAdd(field)}
                >
                  <Plus size={16} className="mr-1" /> Add Field
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isConfiguratorOpen} onOpenChange={setIsConfiguratorOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Configure {selectedFieldType?.charAt(0).toUpperCase() + selectedFieldType?.slice(1)} Field</DialogTitle>
          </DialogHeader>
          {selectedFieldType && (
            <FieldConfigurator 
              fieldType={selectedFieldType} 
              onSave={(field) => {
                addField(field);
                setIsConfiguratorOpen(false);
              }}
              onCancel={() => setIsConfiguratorOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FieldToolbox;
