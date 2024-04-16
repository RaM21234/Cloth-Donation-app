// UserContext.tsx
import React, { createContext, Dispatch, SetStateAction } from 'react';

interface UserContextState {
  uid: string | null;
  setUid: Dispatch<SetStateAction<string | null>>;
}

const defaultState: UserContextState = {
  uid: null,
  setUid: () => {}, // Empty function as a placeholder
};

const UserContext = createContext<UserContextState>(defaultState);

export default UserContext;
