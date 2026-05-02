interface AdminFormFieldProps {
  label: string;
  type?: "text" | "textarea" | "select" | "date" | "number" | "email" | "url" | "datetime-local";
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: { label: string; value: string }[];
  error?: string;
  required?: boolean;
}

export function AdminFormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  options,
  error,
  required,
}: AdminFormFieldProps) {
  const baseClass =
    "w-full px-3 py-2 border border-olive-200 rounded-sm text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent";

  return (
    <div>
      <label className="block text-sm font-medium text-olive-800 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${baseClass} min-h-[100px] resize-y`}
          required={required}
        />
      ) : type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
          required={required}
        >
          <option value="">Select...</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClass}
          required={required}
        />
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
