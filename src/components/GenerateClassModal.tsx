import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Wand2, Lock } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface GenerateClassModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (prompt: string) => void;
}

const GenerateClassModal = ({ open, onOpenChange, onGenerate }: GenerateClassModalProps) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('queue-class-generation', {
        body: {
          prompt,
          userId: user.id,
        },
      });

      if (error) throw error;

      toast({
        title: 'Request queued successfully',
        description: 'Your class will be generated shortly.',
      });

      onGenerate(prompt);
      onOpenChange(false);
    } catch (error) {
      console.error('Error queueing generation:', error);
      toast({
        title: 'Error queueing generation',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-purple-50 via-white to-purple-50 border border-purple-100">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 text-xl">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Magical Class Generator
            <Sparkles className="h-5 w-5 text-purple-500" />
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
              className="min-h-[100px] border-purple-200 focus-visible:ring-purple-400 bg-white/50 placeholder:text-purple-300"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={!user || isLoading}
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={!user || isLoading}
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
              user && !isLoading
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-purple-300/40 transform hover:-translate-y-0.5'
                : 'bg-gray-100 text-gray-500 cursor-not-allowed'
            }`}
          >
            {!user ? (
              <>
                <Lock className="h-4 w-4" />
                Please Authenticate
              </>
            ) : isLoading ? (
              <>
                <Wand2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                Generate the Magic
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateClassModal;
