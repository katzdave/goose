import { useState, useEffect } from 'react';
import { Recipe } from '../recipe';
import { RecipeParametersModal } from './RecipeParametersModal';

interface RecipeParametersViewProps {
  config?: Recipe;
  onSubmit: (paramValues: Record<string, string>) => void;
  onCancel: () => void;
}

export function RecipeParametersView({ config, onSubmit, onCancel }: RecipeParametersViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  // If no config or no parameters redirect to the chat view
  useEffect(() => {
    if (!config || !config.parameters || config.parameters.length === 0) {
      onCancel();
    }
  }, [config, onCancel]);

  const handleSubmit = async (paramValues: Record<string, string>) => {
    console.log('RecipeParametersView: Parameters submitted:', paramValues);
    setIsModalOpen(false);
    // Let App.tsx handle the initialization with parameters
    onSubmit(paramValues);
  };

  const handleCancel = async () => {
    console.log('RecipeParametersView: Parameters cancelled');
    setIsModalOpen(false);
    // Let App.tsx handle the initialization without parameters
    onCancel();
  };

  // If no config, don't render anything
  if (!config) {
    return null;
  }

  return (
    <div className="h-screen bg-gray-50">
      <RecipeParametersModal
        isOpen={isModalOpen}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        recipeConfig={config}
      />
    </div>
  );
}
