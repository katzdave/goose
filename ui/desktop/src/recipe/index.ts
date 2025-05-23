import { Message } from '../types/message';
import { getApiUrl, getSecretKey } from '../config';
import { FullExtensionConfig } from '../extensions';

export interface RecipeParameter {
  key: string;
  input_type: 'string' | 'number' | 'boolean' | 'date' | 'file';
  requirement: 'required' | 'optional' | 'user_prompt';
  description: string;
  default?: string;
}

export interface Recipe {
  title: string;
  description: string;
  instructions: string;
  prompt?: string;
  activities?: string[];
  author?: {
    contact?: string;
    metadata?: string;
  };
  extensions?: FullExtensionConfig[];
  goosehints?: string;
  context?: string[];
  parameters?: RecipeParameter[];
  _paramValues?: Record<string, string>; // Filled at runtime
  profile?: string;
  mcps?: number;
  [key: string]: unknown; // Index signature for compatibility with RecipeConfig
}

export interface CreateRecipeRequest {
  messages: Message[];
  title: string;
  description: string;
  activities?: string[];
  author?: {
    contact?: string;
    metadata?: string;
  };
}

export interface CreateRecipeResponse {
  recipe: Recipe | null;
  error: string | null;
}

export async function createRecipe(request: CreateRecipeRequest): Promise<CreateRecipeResponse> {
  const url = getApiUrl('/recipe');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Secret-Key': getSecretKey(),
      },
      body: JSON.stringify(request),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to create recipe:', {
      error,
      url,
      requestBodyLength: JSON.stringify(request).length,
    });
    return { error: error instanceof Error ? error.message : 'Failed to create recipe', recipe: null };
  }
}
