// AuthService.ts
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from 'firebase/auth';
import {auth as firebaseAuth} from './Firebase';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

class AuthService {
  // Sign Up with Email and Password
  signUpWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      return userCredential.user;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  // Sign In with Email and Password
  signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  changePassword = async (newPassword: string) => {
    const user = firebaseAuth.currentUser;
    if (user) {
      try {
        await updatePassword(user, newPassword);
        return true; // Indicates success
      } catch (error) {
        console.error('Error changing password:', error);
        throw error;
      }
    } else {
      throw new Error('No user logged in');
    }
  };

  signInWithGoogle = async () => {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return signInWithCredential(firebaseAuth, googleCredential);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  // Sign Out
}

export default new AuthService();
