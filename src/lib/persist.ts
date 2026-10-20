/**
 * SIMULAÇÃO de persistência: o estado inteiro do protótipo vai para o
 * localStorage deste navegador. Sem backend, sem sincronização entre
 * dispositivos. Trocar a versão da chave descarta o que estiver salvo.
 */

const KEY = "vitrineic:v1";

export function load<T>(): T | undefined {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as T) : undefined;
  } catch {
    return undefined;
  }
}

export function save(value: unknown) {
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // Navegação privada ou cota cheia: segue só em memória.
  }
}

export function reset() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // idem
  }
}
