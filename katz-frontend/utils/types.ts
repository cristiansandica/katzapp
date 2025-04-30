export type RootStackParamList = {
    PrelanderKatz: undefined;
    Login: undefined;
    CreateKatzName: undefined;
    CreateKatzImage: { selectedName: string };
    KatzUI: undefined;
};

export type User = {
    uid: string, email: string
}

export interface CreateKatz {
    name: string;
    imageUrl: string;
  }
  
  export interface Katz extends CreateKatz {
    id: string;
    userUid: string;
    createdAt: string;
  }

export type GoogleUser = {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
} | undefined
