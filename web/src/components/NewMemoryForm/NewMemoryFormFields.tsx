"use client";

import classNames from "classnames";
import { Camera } from "lucide-react";
import { Fragment } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { MediaPicker } from "../MediaPicker";

interface NewMemoryFormFieldsProps {}

export function NewMemoryFormFields({}: NewMemoryFormFieldsProps): JSX.Element | null {
  const { pending } = useFormStatus();

  return (
    <Fragment>
      <div className="flex items-center gap-4">
        <label
          htmlFor="file"
          aria-disabled={pending}
          className={classNames(
            "text-app-gray-200 flex cursor-pointer items-center gap-1.5 text-sm transition-colors",
            pending ? "cursor-not-allowed" : "hover:text-app-gray-100",
          )}
        >
          <Camera className="aspect-square w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className={classNames(
            "text-app-gray-200 flex cursor-pointer items-center gap-1.5 text-sm transition-colors",
            pending ? "cursor-not-allowed" : "hover:text-app-gray-100",
          )}
        >
          <input
            id="isPublic"
            type="checkbox"
            name="isPublic"
            disabled={pending}
            className="border-app-gray-400 bg-app-gray-700 text-app-purple-500 focus:ring-offset-app-gray-900 focus-visible:ring-app-purple-500 aspect-square h-4 cursor-pointer rounded focus:ring-0 focus-visible:ring-2 disabled:cursor-not-allowed"
          />
          Tornar memória pública
        </label>
      </div>

      <MediaPicker />

      <textarea
        required
        name="content"
        disabled={pending}
        spellCheck={false}
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        className="text-app-gray-100 placeholder:text-app-gray-400 flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed focus:ring-0 disabled:cursor-not-allowed"
      />

      <button
        type="submit"
        disabled={pending}
        className="bg-app-green-500 font-alt hover:enabled:bg-app-green-600 disabled:bg-app-gray-200 self-end rounded-full px-5 py-3 text-sm uppercase leading-none text-black transition-colors disabled:cursor-not-allowed"
      >
        Salvar
      </button>
    </Fragment>
  );
}
