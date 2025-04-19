
import { useFormBuilder } from "@/context/FormBuilderContext";
import { Button } from "@/components/ui/button";
import FormFieldRenderer from "./FormFieldRenderer";
import { toast } from "@/components/ui/use-toast";

const FormPreview = () => {
  const { state, dispatch } = useFormBuilder();

  const handleRemoveField = (id: string) => {
    dispatch({
      type: 'REMOVE_FIELD',
      payload: id,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", state.formData);
    
    toast({
      title: "Form Submitted!",
      description: "Form data has been collected successfully.",
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg border h-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Your Form</h2>
        <p className="text-sm text-gray-500">This is how your form will look like. Add fields from the right panel.</p>
      </div>
      
      {state.fields.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400 border-2 border-dashed rounded-lg">
          <p className="mb-2">No fields added yet</p>
          <p className="text-sm">Select fields from the toolbox on the right side</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          {state.fields.map((field) => (
            <FormFieldRenderer 
              key={field.id} 
              field={field} 
              onRemove={handleRemoveField} 
            />
          ))}
          
          <div className="pt-4">
            <Button 
              type="submit"
              className="w-full bg-formBuilder-primary hover:bg-formBuilder-secondary"
            >
              Submit Form
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FormPreview;
