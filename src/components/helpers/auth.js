import { auth } from "../services/firebase";
export function signup(email, password, username) {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const user = auth().currentUser;
      return user.updateProfile({
        displayName: username,
      });
    });
}

export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}
export function signOut() {
  return auth().signOut();
}
