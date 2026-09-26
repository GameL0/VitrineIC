/**
 * DADOS FICTÍCIOS — convites gerados pela curadoria.
 *
 * Um convite é o resultado de um match confirmado. Ele referencia a demanda
 * por id em `@/data/demands` e o estudante em `@/data/students`, em vez de
 * copiar esses dados.
 */
import type { Invitation } from "@/types";

export const INVITATIONS: Invitation[] = [
  {
    id: "MCH-147713",
    demandId: "VIC-2026-0041",
    studentId: "STU-001",
    score: 80,
    curatorNote:
      "Perfil com aderência direta à stack da demanda (Python, MQTT, PostgreSQL, Docker) e projeto ativo em detecção de anomalias em rede, tema próximo ao pipeline de sensores pedido.",
    sentAt: "há 2h",
    deadline: "48h",
    status: "pendente",
  },
  {
    id: "MCH-147702",
    demandId: "VIC-2026-0038",
    studentId: "STU-001",
    score: 60,
    curatorNote:
      "Cobertura parcial da stack, mas experiência prévia com modelagem preditiva e disponibilidade imediata. Segunda opção caso a demanda 0041 não avance.",
    sentAt: "há 5h",
    deadline: "48h",
    status: "pendente",
  },
];

/** Estudante cuja caixa de convites é exibida no protótipo. */
export const CURRENT_STUDENT_ID = "STU-001";
