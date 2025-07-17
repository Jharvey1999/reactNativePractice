import React, { createContext, useContext, useState } from 'react';

type ProfileContextType = {
  portraitUri?: string;
  setPortraitUri: (uri?: string) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portraitUri, setPortraitUri] = useState<string | undefined>(undefined);

  return (
    <ProfileContext.Provider value={{ portraitUri, setPortraitUri }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile must be used within a ProfileProvider');
  return context;
};