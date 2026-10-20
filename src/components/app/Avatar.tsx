const SIZES = {
  sm: "size-8 rounded-[9px] text-[13px]",
  md: "size-10 rounded-[10px] text-[15px]",
  lg: "size-12 rounded-xl text-lg",
  xl: "size-20 rounded-[22px] text-[36px]",
} as const;

/** Quadrado navy com a inicial, como nos cards do Figma. `light` é a versão creme. */
export function Avatar({
  name,
  size = "md",
  light = false,
}: {
  name: string;
  size?: keyof typeof SIZES;
  light?: boolean;
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center font-display font-medium ${SIZES[size]} ${
        light ? "bg-offwhite text-navy" : "bg-navy text-offwhite"
      }`}
      aria-hidden="true"
    >
      {(name.trim()[0] || "?").toUpperCase()}
    </span>
  );
}
