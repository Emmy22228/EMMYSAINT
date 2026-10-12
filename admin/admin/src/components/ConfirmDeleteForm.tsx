"use client";

import type { ReactNode } from "react";

type Props = {
  action: (formData: FormData) => Promise<void>;
  id: string;
  children: ReactNode;
};

// Asks for confirmation before submitting a delete action.
export default function ConfirmDeleteForm({ action, id, children }: Props) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm("Delete this project permanently? This cannot be undone.")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      {children}
    </form>
  );
}
