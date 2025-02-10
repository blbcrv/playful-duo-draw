
export interface Participant {
  id: string;
  name: string;
  avatar?: string;
}

export interface ParticipantPair {
  id: string;
  participant1: Participant;
  participant2: Participant;
}
