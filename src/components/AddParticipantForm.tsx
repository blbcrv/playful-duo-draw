
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AddParticipantFormProps {
  onAdd: (name: string) => void;
}

export const AddParticipantForm = ({ onAdd }: AddParticipantFormProps) => {
  const [name, setName] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom ne peut pas être vide",
        variant: "destructive",
      });
      return;
    }
    
    onAdd(name.trim());
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Nom du participant"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" className="w-full sm:w-auto">
          Ajouter
        </Button>
      </div>
    </form>
  );
};
