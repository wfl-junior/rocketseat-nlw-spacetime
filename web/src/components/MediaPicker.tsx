"use client";

import { Fragment, useState } from "react";

interface Preview {
  type: string;
  url: string;
}

interface MediaPickerProps {
  isDisabled?: boolean;
}

export function MediaPicker({
  isDisabled,
}: MediaPickerProps): JSX.Element | null {
  const [preview, setPreview] = useState<Preview | null>(null);

  function handleSelectFile(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (!files?.length) return;

    const file = files[0];
    const mimeTypeRegex = /^(image|video)/;
    if (!mimeTypeRegex.test(file.type)) return;

    if (preview) {
      URL.revokeObjectURL(preview.url);
    }

    setPreview({
      url: URL.createObjectURL(file),
      type: file.type,
    });
  }

  return (
    <Fragment>
      <input
        id="file"
        type="file"
        name="file"
        className="hidden"
        disabled={isDisabled}
        accept="image/*,video/*"
        onChange={handleSelectFile}
      />

      {preview?.type.startsWith("image") ? (
        // eslint-disable-next-line
        <img
          alt=""
          src={preview.url}
          className="aspect-video w-full rounded-lg object-cover"
        />
      ) : preview?.type.startsWith("video") ? (
        <video
          controls
          key={preview.url}
          controlsList="nodownload"
          className="aspect-video w-full rounded-lg"
        >
          <source src={preview.url} type={preview.type} />
        </video>
      ) : null}
    </Fragment>
  );
}
