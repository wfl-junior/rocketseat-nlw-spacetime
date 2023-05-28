import { Camera, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface NewMemoryProps {}

function NewMemory({}: NewMemoryProps): JSX.Element | null {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Link
        href="/"
        className="text-app-gray-200 hover:text-app-gray-100 flex items-center gap-1 text-sm transition-colors"
      >
        <ChevronLeft className="aspect-square w-4" />
        voltar à timeline
      </Link>

      <form className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-4">
          <label
            htmlFor="file"
            className="text-app-gray-200 hover:text-app-gray-100 flex cursor-pointer items-center gap-1.5 text-sm transition-colors"
          >
            <Camera className="aspect-square w-4" />
            Anexar mídia
          </label>

          <input type="file" id="file" name="file" className="hidden" />

          <label
            htmlFor="isPublic"
            className="text-app-gray-200 hover:text-app-gray-100 flex cursor-pointer items-center gap-1.5 text-sm transition-colors"
          >
            <input
              type="checkbox"
              id="isPublic"
              name="isPublic"
              className="border-app-gray-400 bg-app-gray-700 text-app-purple-500 focus:ring-offset-app-gray-900 focus-visible:ring-app-purple-500 aspect-square h-4 rounded focus:ring-0 focus-visible:ring-2"
            />
            Tornar memória pública
          </label>
        </div>

        <textarea
          name="content"
          spellCheck={false}
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          className="text-app-gray-100 placeholder:text-app-gray-400 flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed focus:ring-0"
        />
      </form>
    </div>
  );
}

export default NewMemory;
