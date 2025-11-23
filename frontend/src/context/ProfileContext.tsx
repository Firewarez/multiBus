import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProfileData {
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  uf: string;
  cpf: string;
  endereco?: string;
  numero?: string;
  bairro?: string;
  cep?: string;
  foto?: string; // ← ADICIONE ESTA LINHA
}

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (data: ProfileData) => void;
  getProfileImage: (name: string) => string;
  updateProfilePhoto: (photoUrl: string) => void; // ← NOVA FUNÇÃO
}

const defaultProfile: ProfileData = {
  nome: "Arthur Barcelos",
  email: "arthurbarcelos04@gmail.com",
  telefone: "83988569012",
  cidade: "João Pessoa",
  uf: "PB",
  cpf: "",
  foto: undefined,
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const updateProfile = (data: ProfileData) => {
    setProfile(data);
    localStorage.setItem('userProfile', JSON.stringify(data));
  };

  // Nova função para atualizar apenas a foto
  const updateProfilePhoto = (photoUrl: string) => {
    const updatedProfile = { ...profile, foto: photoUrl };
    setProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
  };

  const getProfileImage = (name: string): string => {
    // Se tem foto customizada, usa ela
    if (profile.foto) {
      return profile.foto;
    }

    if (!name || name.trim() === '') {
      return "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80";
    }

    // Lista de nomes femininos
    const femaleNames = [
      'ana', 'maria', 'sofia', 'julia', 'isabella', 'laura', 'luiza', 'beatriz',
      'manuela', 'giovanna', 'alice', 'lara', 'helena', 'valentina', 'clara',
      'isabela', 'lorena', 'catarina', 'larissa', 'amanda', 'leticia', 'gabriela',
      'rafaela', 'carolina', 'vitória', 'bianca', 'camilia', 'fernanda', 'patricia',
      'adriana', 'vanessa', 'daniela', 'bruna', 'jéssica', 'thais', 'natalia'
    ];

    const firstName = name.toLowerCase().split(' ')[0];
    const normalizedFirstName = firstName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    const isFemale = femaleNames.includes(normalizedFirstName);

    return isFemale 
      ? "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
      : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80";
  };

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, getProfileImage, updateProfilePhoto }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};