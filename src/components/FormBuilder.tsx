
import { FormBuilderProvider } from "@/context/FormBuilderContext";
import FormPreview from "./FormPreview";
import FieldToolbox from "./FieldToolbox";

const FormBuilder = () => {
  return (
    <FormBuilderProvider>
      <div className="container mx-auto py-8 px-4 min-h-screen bg-gradient-to-br from-formBuilder-light to-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-formBuilder-primary">Dynamic Form Builder</h1>
          <p className="text-gray-600 mt-2">Create custom forms by adding fields from the toolbox</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="md:order-1 order-2 p-6">
            <FormPreview />
          </div>
          <div className="md:order-2 order-1 bg-formBuilder-light/50 p-6 border-l border-gray-200">
            <FieldToolbox />
          </div>
        </div>
      </div>
    </FormBuilderProvider>
  );
};

export default FormBuilder;

