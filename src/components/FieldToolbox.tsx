
import { useFormBuilder } from "@/context/FormBuilderContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FormField } from "@/types/formBuilder";

const FieldToolbox = () => {
  const { dispatch } = useFormBuilder();
  
  const addField = (field: Omit<FormField, "id">) => {
    dispatch({
      type: 'ADD_FIELD',
      payload: {
        ...field,
        id: `${field.type}-${Date.now()}`,
      },
    });
  };

  const fieldTypes = [
    {
      type: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      type: "file",
      label: "Photo",
      required: false,
    },
    {
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      type: "phone",
      label: "Phone Number",
      placeholder: "Enter your phone number",
      required: false,
    },
    {
      type: "number",
      label: "Total Family Members",
      placeholder: "Enter number of family members",
      required: false,
    },
    {
      type: "dropdown",
      label: "City Address",
      options: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
      required: false,
    },
    {
      type: "text",
      label: "Home Address",
      placeholder: "Enter your home address",
      required: false,
    },
    {
      type: "radio",
      label: "Gender",
      options: ["Male", "Female", "Other"],
      required: false,
    },
    {
      type: "checkbox",
      label: "Hobbies",
      options: ["Playing Football", "Online Games", "Travelling"],
      required: false,
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg border h-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Field Toolbox</h2>
        <p className="text-sm text-gray-500">Drag or click to add fields to your form</p>
      </div>
      
      <div className="grid gap-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
        {fieldTypes.map((field, index) => (
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
                onClick={() => addField(field)}
              >
                <Plus size={16} className="mr-1" /> Add Field
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FieldToolbox;
