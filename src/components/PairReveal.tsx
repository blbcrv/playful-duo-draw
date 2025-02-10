
import { ParticipantPair } from "@/types/participant";
import { UserCircle } from "lucide-react";
import { motion } from "framer-motion";

interface PairRevealProps {
  pair: ParticipantPair;
}

export const PairReveal = ({ pair }: PairRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-lg space-y-4"
    >
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center">
          {pair.participant1.avatar ? (
            <img
              src={pair.participant1.avatar}
              alt={pair.participant1.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <UserCircle className="w-16 h-16 text-primary" />
          )}
          <span className="mt-2 font-medium">{pair.participant1.name}</span>
        </div>
        <div className="text-2xl font-bold text-primary">&</div>
        <div className="flex flex-col items-center">
          {pair.participant2.avatar ? (
            <img
              src={pair.participant2.avatar}
              alt={pair.participant2.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <UserCircle className="w-16 h-16 text-primary" />
          )}
          <span className="mt-2 font-medium">{pair.participant2.name}</span>
        </div>
      </div>
    </motion.div>
  );
};
