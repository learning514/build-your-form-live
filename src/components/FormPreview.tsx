
import { useFormBuilder } from "@/context/FormBuilderContext";
import { Button } from "@/components/ui/button";
import FormFieldRenderer from "./FormFieldRenderer";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import FieldConfigurator from "./FieldConfigurator";
import { FormField } from "@/types/formBuilder";
import { Download } from "lucide-react";

const FormPreview = () => {
  const { state, dispatch } = useFormBuilder();
  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRemoveField = (id: string) => {
    dispatch({
      type: 'REMOVE_FIELD',
      payload: id,
    });
  };

  const handleEditField = (field: FormField) => {
    setEditingField(field);
    setIsDialogOpen(true);
  };

  const handleDuplicateField = (field: FormField) => {
    const newId = `${field.type}-${Date.now()}`;
    dispatch({
      type: 'ADD_FIELD',
      payload: {
        ...field,
        id: newId
      },
    });
    toast({
      title: "Field Duplicated",
      description: `${field.label} has been duplicated.`,
    });
  };

  const saveUpdatedField = (updatedField: Omit<FormField, "id">) => {
    if (editingField) {
      dispatch({
        type: 'UPDATE_FIELD',
        payload: {
          ...updatedField,
          id: editingField.id
        },
      });
      setEditingField(null);
      setIsDialogOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", state.formData);
    
    toast({
      title: "Form Submitted!",
      description: "Form data has been collected successfully.",
    });
  };

  const handleExportConfig = () => {
    const formConfig = {
      fields: state.fields,
    };
    
    const dataStr = JSON.stringify(formConfig, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `form-config-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="p-4 bg-white rounded-lg border h-full">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-formBuilder-primary">Live Form Preview</h2>
          <p className="text-sm text-gray-500">This is how your form will look like</p>
        </div>
        {state.fields.length > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleExportConfig}
            className="text-xs flex items-center gap-1 border-formBuilder-primary text-formBuilder-primary hover:bg-formBuilder-light/50"
          >
            <Download size={14} />
            Export Config
          </Button>
        )}
      </div>
      
      {state.fields.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400 border-2 border-dashed rounded-lg border-formBuilder-light">
          <p className="mb-2">No fields added yet</p>
          <p className="text-sm">Select fields from the toolbox on the right side</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {state.fields.map((field) => (
            <FormFieldRenderer 
              key={field.id} 
              field={field} 
              onRemove={handleRemoveField} 
              onEdit={handleEditField}
              onDuplicate={handleDuplicateField}
            />
          ))}
          
          <div className="pt-4">
            <Button 
              type="submit"
              className="w-full bg-formBuilder-primary hover:bg-formBuilder-secondary text-white transition-colors"
            >
              Submit Form
            </Button>
          </div>
        </form>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit {editingField?.label}</DialogTitle>
          </DialogHeader>
          {editingField && (
            <FieldConfigurator 
              fieldType={editingField.type}
              initialValues={editingField}
              onSave={saveUpdatedField}
              onCancel={() => setIsDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormPreview;
