import { NewMemoryFormFields } from "./NewMemoryFormFields";
import { createMemory } from "./actions";

interface NewMemoryFormProps {}

export function NewMemoryForm({}: NewMemoryFormProps): JSX.Element | null {
  return (
    <form action={createMemory} className="flex flex-1 flex-col gap-2">
      <NewMemoryFormFields />
    </form>
  );
}
