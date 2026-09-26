/**
 * Primeiro item da ordem de tabulação: pula a navegação e leva ao conteúdo.
 * Fica fora da tela até receber foco. O alvo é o <main id="conteudo">.
 * Estilo em `src/index.css` (.skip-link) porque depende de :focus.
 */
export function SkipLink() {
  return (
    <a href="#conteudo" className="skip-link">
      Pular para o conteúdo
    </a>
  );
}
