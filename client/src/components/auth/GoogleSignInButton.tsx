import { useEffect, useRef } from 'react';
import './GoogleSignInButton.css';

interface GoogleSignInButtonProps {
  onSuccess: (idToken: string) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

const GOOGLE_CLIENT_ID = '358854383197-8ohq3jacu2721lc8k2ce5r63brj8mem4.apps.googleusercontent.com';

const GoogleSignInButton = ({ onSuccess, onError, disabled }: GoogleSignInButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    // Wait for Google Identity Services to load
    const initializeGoogleSignIn = () => {
      if (initializedRef.current || disabled) return;

      if (typeof window !== 'undefined' && window.google) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (response: { credential: string }) => {
              if (response.credential) {
                onSuccess(response.credential);
              } else {
                onError?.('Failed to get Google credentials');
              }
            },
          });

          if (buttonRef.current) {
            window.google.accounts.id.renderButton(buttonRef.current, {
              type: 'standard',
              theme: 'outline',
              size: 'large',
              text: 'signin_with',
              width: buttonRef.current.offsetWidth || 300,
            });
            initializedRef.current = true;
          }
        } catch (error) {
          console.error('Error initializing Google Sign-In:', error);
          onError?.('Failed to initialize Google Sign-In');
        }
      } else {
        // Retry after a short delay if Google Identity Services hasn't loaded yet
        setTimeout(initializeGoogleSignIn, 100);
      }
    };

    // Check if Google Identity Services is already loaded
    if (typeof window !== 'undefined') {
      if (window.google) {
        initializeGoogleSignIn();
      } else {
        // Wait for the script to load
        const checkInterval = setInterval(() => {
          if (window.google) {
            clearInterval(checkInterval);
            initializeGoogleSignIn();
          }
        }, 100);

        // Cleanup after 10 seconds if still not loaded
        const timeout = setTimeout(() => {
          clearInterval(checkInterval);
          if (!initializedRef.current) {
            onError?.('Google Sign-In failed to load. Please refresh the page.');
          }
        }, 10000);

        return () => {
          clearInterval(checkInterval);
          clearTimeout(timeout);
        };
      }
    }
  }, [onSuccess, onError, disabled]);

  return (
    <div className="google-sign-in-container">
      <div ref={buttonRef} className="google-sign-in-button" />
    </div>
  );
};

export default GoogleSignInButton;
