

export interface Reclamation {
  id: number;
  username: string;
  description: string;
  date: Date;
  statut: string;
  type: string;
  pieceJointe: Uint8Array | null;
  }
