import type { User } from "firebase/auth";

export interface IMessage {
  sender: string;
  photoURL: string;
  text: string;
  timestamp: TimeStamp;
}

export interface IChat {
  id: string;
  users: string[];
  usersData: User[];
  timestamp: TimeStamp;
}

interface TimeStamp {
  nanoseconds: number;
  seconds: number;
}
