
import { useState } from "react";
import { AddParticipantForm } from "@/components/AddParticipantForm";
import { ParticipantCard } from "@/components/ParticipantCard";
import { PairReveal } from "@/components/PairReveal";
import { Button } from "@/components/ui/button";
import { Participant, ParticipantPair } from "@/types/participant";
import { useToast } from "@/hooks/use-toast";
import { Shuffle, Plus } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [pairs, setPairs] = useState<ParticipantPair[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleAddParticipant = (name: string) => {
    const newParticipant: Participant = {
      id: Math.random().toString(),
      name,
    };
    setParticipants([...participants, newParticipant]);
    toast({
      title: "Participant ajouté",
      description: `${name} a été ajouté à la liste`,
    });
  };

  const handleAddJoker = () => {
    const joker: Participant = {
      id: "joker",
      name: "Joker 🎭",
    };
    setParticipants([...participants, joker]);
    toast({
      title: "Joker ajouté",
      description: "Un Joker a été ajouté pour équilibrer les duos",
    });
  };

  const handleRemoveParticipant = (id: string) => {
    setParticipants(participants.filter((p) => p.id !== id));
    setPairs([]);
  };

  const generatePairs = async () => {
    if (participants.length < 2) {
      toast({
        title: "Erreur",
        description: "Il faut au moins 2 participants pour faire des duos",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setPairs([]);

    // Ajouter un délai pour l'animation
    await new Promise((resolve) => setTimeout(resolve, 500));

    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    const newPairs: ParticipantPair[] = [];

    for (let i = 0; i < shuffled.length - 1; i += 2) {
      newPairs.push({
        id: Math.random().toString(),
        participant1: shuffled[i],
        participant2: shuffled[i + 1],
      });
    }

    // Gestion du cas impair
    if (shuffled.length % 2 !== 0) {
      toast({
        title: "Nombre impair de participants",
        description: "Ajoutez un Joker pour équilibrer les duos",
        action: (
          <Button onClick={handleAddJoker} variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un Joker
          </Button>
        ),
      });
    }

    setPairs(newPairs);
    setIsGenerating(false);
    
    toast({
      title: "Duos générés",
      description: "Les duos ont été créés avec succès !",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Random Duo
          </h1>
          <p className="text-muted-foreground">
            Créez des duos aléatoires facilement et rapidement
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-lg p-6 space-y-6"
        >
          <AddParticipantForm onAdd={handleAddParticipant} />

          <div className="space-y-3">
            {participants.map((participant, index) => (
              <motion.div
                key={participant.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ParticipantCard
                  participant={participant}
                  onRemove={handleRemoveParticipant}
                />
              </motion.div>
            ))}
          </div>

          {participants.length >= 2 && (
            <div className="flex justify-center">
              <Button
                onClick={generatePairs}
                size="lg"
                className="animate-scale-in"
                disabled={isGenerating}
              >
                <Shuffle className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
                {isGenerating ? "Génération..." : "Générer les duos"}
              </Button>
            </div>
          )}
        </motion.div>

        {pairs.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-center">Duos générés</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {pairs.map((pair, index) => (
                <motion.div
                  key={pair.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <PairReveal pair={pair} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
