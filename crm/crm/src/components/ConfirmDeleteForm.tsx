"use client";

import type { ReactNode } from "react";

type Props = {
  action: (formData: FormData) => Promise<void>;
  id: string;
  label?: string;
  children: ReactNode;
};

// Asks for confirmation before submitting a delete action.
export default function ConfirmDeleteForm({
  action,
  id,
  label = "Delete this item permanently? This cannot be undone.",
  children,
}: Props) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(label)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      {children}
    </form>
  );
}
