
import { useState } from "react";
import { AddParticipantForm } from "@/components/AddParticipantForm";
import { ParticipantCard } from "@/components/ParticipantCard";
import { PairReveal } from "@/components/PairReveal";
import { Button } from "@/components/ui/button";
import { Participant, ParticipantPair } from "@/types/participant";
import { useToast } from "@/hooks/use-toast";
import { Shuffle } from "lucide-react";

const Index = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [pairs, setPairs] = useState<ParticipantPair[]>([]);
  const { toast } = useToast();

  const handleAddParticipant = (name: string) => {
    const newParticipant: Participant = {
      id: Math.floor(Math.random() * 1000),
      name,
    };
    setParticipants([...participants, newParticipant]);
    toast({
      title: "Participant ajouté",
      description: `${name} a été ajouté à la liste`,
    });
  };

  const handleRemoveParticipant = (id: string) => {
    setParticipants(participants.filter((p) => p.id !== id));
    setPairs([]);
  };

  const generatePairs = () => {
    if (participants.length < 2) {
      toast({
        title: "Erreur",
        description: "Il faut au moins 2 participants pour faire des duos",
        variant: "destructive",
      });
      return;
    }

    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    const newPairs: ParticipantPair[] = [];

    for (let i = 0; i < shuffled.length - 1; i += 2) {
      newPairs.push({
        id: Math.floor(Math.random() * 1000),
        participant1: shuffled[i],
        participant2: shuffled[i + 1],
      });
    }

    // If there's an odd number of participants, pair the last one with someone randomly
    if (shuffled.length % 2 !== 0) {
      const lastParticipant = shuffled[shuffled.length - 1];
      const randomPairIndex = Math.floor(Math.random() * newPairs.length);
      
      newPairs.push({
        id: Math.floor(Math.random() * 1000),
        participant1: lastParticipant,
        participant2: shuffled[0], // Pair with the first person
      });
    }

    setPairs(newPairs);
    toast({
      title: "Duos générés",
      description: "Les duos ont été créés avec succès !",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Random Duo</h1>
          <p className="text-muted-foreground">
            Créez des duos aléatoires facilement et rapidement
          </p>
        </div>

        <div className="glass-card rounded-lg p-6 space-y-6">
          <AddParticipantForm onAdd={handleAddParticipant} />

          <div className="space-y-3">
            {participants.map((participant) => (
              <ParticipantCard
                key={participant.id}
                participant={participant}
                onRemove={handleRemoveParticipant}
              />
            ))}
          </div>

          {participants.length >= 2 && (
            <div className="flex justify-center">
              <Button
                onClick={generatePairs}
                size="lg"
                className="animate-scale-in"
              >
                <Shuffle className="mr-2 h-4 w-4" />
                Générer les duos
              </Button>
            </div>
          )}
        </div>

        {pairs.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Duos générés</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {pairs.map((pair) => (
                <PairReveal key={pair.id} pair={pair} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
