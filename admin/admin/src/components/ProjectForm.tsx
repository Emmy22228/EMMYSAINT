import { CATEGORIES, STATUSES, VISIBILITIES } from "@/lib/constants";
import type { DbProject } from "@/lib/projects";

type Props = {
  action: (formData: FormData) => Promise<void>;
  project?: DbProject;
  imageUrl?: string;
  error?: string;
};

const fieldClass = "w-full rounded-md bg-surface border border-line px-3 py-2 focus:border-accent outline-none";
const labelClass = "flex flex-col gap-1 text-sm";

export default function ProjectForm({ action, project, imageUrl, error }: Props) {
  return (
    <form action={action} encType="multipart/form-data" className="flex flex-col gap-6 max-w-3xl">
      {project && <input type="hidden" name="id" value={project.id} />}
      <input type="hidden" name="existingImage" value={project?.cover_image_path ?? ""} />

      {error && (
        <p role="alert" className="rounded-md border border-red-500/40 bg-red-500/10 text-red-300 px-4 py-3 text-sm">
          {error}
        </p>
      )}

      <label className={labelClass}>
        Title
        <input name="title" required maxLength={120} defaultValue={project?.title} className={fieldClass} />
      </label>

      <label className={labelClass}>
        URL slug (used in the project address)
        <input
          name="slug"
          required
          maxLength={80}
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
          defaultValue={project?.slug}
          className={fieldClass}
        />
      </label>

      <label className={labelClass}>
        Short summary (shown on cards)
        <input name="summary" required maxLength={200} defaultValue={project?.summary} className={fieldClass} />
      </label>

      <label className={labelClass}>
        Full description
        <textarea name="description" rows={6} maxLength={5000} defaultValue={project?.description} className={fieldClass} />
      </label>

      <div className="grid gap-6 sm:grid-cols-3">
        <label className={labelClass}>
          Category
          <select name="category" defaultValue={project?.category ?? CATEGORIES[0]} className={fieldClass}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          Status
          <select name="status" defaultValue={project?.status ?? "in_development"} className={fieldClass}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace("_", " ")}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          Visibility
          <select name="visibility" defaultValue={project?.visibility ?? "draft"} className={fieldClass}>
            {VISIBILITIES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className={labelClass}>
        Technologies (comma separated, leave empty if unconfirmed)
        <input
          name="technologies"
          defaultValue={project?.technologies?.join(", ")}
          className={fieldClass}
        />
      </label>

      <label className={labelClass}>
        Live site URL (https only, optional)
        <input name="liveUrl" type="url" defaultValue={project?.live_url ?? ""} className={fieldClass} />
      </label>

      <div className="flex flex-col gap-2 text-sm">
        <span>Cover image (JPG, PNG or WebP, up to 5 MB)</span>
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="Current cover" className="w-48 rounded border border-line" />
        )}
        <input name="image" type="file" accept="image/jpeg,image/png,image/webp" className="text-sm" />
      </div>

      <div className="flex gap-6 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured" defaultChecked={project?.featured} /> Featured on home page
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="clientWork" defaultChecked={project?.client_work} /> Client work
        </label>
      </div>

      <div>
        <button type="submit" className="rounded-lg bg-accent text-bg font-semibold px-5 py-3 hover:opacity-90">
          Save project
        </button>
      </div>
    </form>
  );
}
