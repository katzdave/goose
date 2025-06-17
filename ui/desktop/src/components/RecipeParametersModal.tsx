import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Recipe, RecipeParameter } from '../recipe';

interface RecipeParametersModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe;
  onParametersSubmit: (parameters: Record<string, string>) => void;
}

export default function RecipeParametersModal({
  isOpen,
  onClose,
  recipe,
  onParametersSubmit,
}: RecipeParametersModalProps) {
  const [parameters, setParameters] = useState<Record<string, string>>({});

  if (!isOpen || !recipe.parameters) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onParametersSubmit(parameters);
  };

  const handleParameterChange = (key: string, value: string) => {
    setParameters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-bgApp shadow-xl rounded-lg z-50 flex flex-col">
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-xl font-semibold text-textProminent">Recipe Parameters</h2>
          <p className="text-sm text-textSubtle mt-2">
            Please provide the required parameters for this recipe.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {recipe.parameters.map((param: RecipeParameter) => (
            <div key={param.key}>
              <label className="block text-sm font-medium text-textProminent mb-2">
                {param.description}
                {param.requirement === 'required' && <span className="text-red-500 ml-1">*</span>}
              </label>
              <Input
                type={param.input_type === 'number' ? 'number' : 'text'}
                value={parameters[param.key] || param.default || ''}
                onChange={(e) => handleParameterChange(param.key, e.target.value)}
                required={param.requirement === 'required'}
                className="w-full"
                placeholder={`Enter ${param.description.toLowerCase()}`}
              />
            </div>
          ))}

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 