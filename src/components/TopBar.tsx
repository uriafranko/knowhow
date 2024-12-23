import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './ui/use-toast';
import { LogOut, User, Compass, BookOpen } from 'lucide-react';

const TopBar = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const location = useLocation();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Error signing out',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Signed out successfully',
      });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="font-semibold text-xl">
              KnowHow
            </Link>
            {user && (
              <div className="hidden sm:flex items-center space-x-1">
                <Link to="/">
                  <Button
                    variant={location.pathname === '/' ? 'default' : 'ghost'}
                    className="gap-2"
                  >
                    <Compass className="h-4 w-4" />
                    Explore
                  </Button>
                </Link>
                <Link to="/library">
                  <Button
                    variant={location.pathname === '/library' ? 'default' : 'ghost'}
                    className="gap-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    Library
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata.avatar_url} />
                      <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2">
                    <User className="h-4 w-4" />
                    <span>{user.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="gap-2">
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button>Sign in</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;