/**
 * Símbolo do VitrineIC: quadrado com "V" e o nome com "IC" em vermelho.
 * `inverted` é a versão para fundos escuros (quadrado creme, V navy).
 */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span
        className={`grid size-7 place-items-center rounded-lg font-display text-[13px] font-semibold ${
          inverted ? "bg-offwhite text-navy" : "bg-navy text-offwhite"
        }`}
      >
        V
      </span>
      <span
        className={`font-display text-[17px] font-medium tracking-[-0.02em] ${inverted ? "text-offwhite" : "text-navy"}`}
      >
        Vitrine<span className="text-red">IC</span>
      </span>
    </span>
  );
}
