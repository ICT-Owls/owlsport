export type UserID = string;

export type OtherUser = {
    id: UserID;
    firstName: string;
    lastName: string;
    avatarURL: URL;
};

export type SignedInUser = {
    id: UserID;
    firstName: string;
    lastName: string;
    email: string;
    avatarURL: URL;
    friends: UserID;
};

export type User = OtherUser | SignedInUser;
