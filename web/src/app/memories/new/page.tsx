import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { NewMemoryForm } from "~/components/NewMemoryForm";

interface NewMemoryProps {}

function NewMemory({}: NewMemoryProps): JSX.Element | null {
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="text-app-gray-200 hover:text-app-gray-100 flex items-center gap-1 text-sm transition-colors"
      >
        <ChevronLeft className="aspect-square w-4" />
        voltar à timeline
      </Link>

      <NewMemoryForm />
    </div>
  );
}

export default NewMemory;
