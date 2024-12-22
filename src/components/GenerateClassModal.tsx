import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";

interface GenerateClassModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (prompt: string) => void;
}

const GenerateClassModal = ({ open, onOpenChange, onGenerate }: GenerateClassModalProps) => {
  const [prompt, setPrompt] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-purple-50 to-white">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2 text-purple-800">
            <Sparkles className="h-5 w-5" />
            Magical Class Generator
            <Sparkles className="h-5 w-5" />
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label
              htmlFor="prompt"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-purple-700"
            >
              What do you want to learn?
            </label>
            <Textarea
              id="prompt"
              placeholder="Share your learning wishes..."
              className="min-h-[100px] border-purple-200 focus-visible:ring-purple-500"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <button
            onClick={() => onGenerate(prompt)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-purple-700 hover:to-indigo-700 hover:shadow-purple-200/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <Wand2 className="h-4 w-4" />
            Generate the Magic
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateClassModal;