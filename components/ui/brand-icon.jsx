export function BrandIcon({ src, className = "h-4 w-4" }) {
  return (
    <span
      className={`brand-icon inline-block shrink-0 ${className}`}
      style={{ "--brand-icon": `url("${src}")` }}
      aria-hidden="true"
    />
  );
}
