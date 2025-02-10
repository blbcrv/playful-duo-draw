
import { Participant } from "@/types/participant";
import { UserCircle } from "lucide-react";

interface ParticipantCardProps {
  participant: Participant;
  onRemove: (id: string) => void;
}

export const ParticipantCard = ({ participant, onRemove }: ParticipantCardProps) => {
  return (
    <div className="animate-fade-in glass-card p-4 rounded-lg flex items-center justify-between gap-4 interactive-card">
      <div className="flex items-center gap-3">
        {participant.avatar ? (
          <img
            src={participant.avatar}
            alt={participant.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <UserCircle className="w-10 h-10 text-primary" />
        )}
        <span className="font-medium">{participant.name}</span>
      </div>
      <button
        onClick={() => onRemove(participant.id)}
        className="text-destructive/80 hover:text-destructive transition-colors"
      >
        Supprimer
      </button>
    </div>
  );
};
