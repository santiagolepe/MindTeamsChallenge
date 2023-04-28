export enum Roles { super_admin = 'super_admin', admin = 'admin', user = 'user' };

export interface IUser {
  _id          : string;
  name         : string;
  email        : string;
  role         : Roles;
  englishLevel?: string;
  skills?      : string;
  resumeLink?  : string;
  created_at   : Date;
  updated_at   : Date;
}

export interface IAccount {
  _id        : string;
  name       : string;
  client     : string;
  responsible: IUser;
  team       : IUser[];
  created_at : Date;
  updated_at : Date;
}

export interface IAlertProps {
  message : string;
  variant?: 'danger' | 'success';
  timeout?: number;
}

export interface IUserFormProps {
  onSuccess: () => void;
  show     : boolean;
  user     : IUser | null;
}

export interface IAccountFormProps {
  onSuccess: () => void;
  show     : boolean;
  account  : IAccount | null;
}

export interface ILoginResponse {
  token: string;
}

export interface IAvatarProps {
  name   : string;
  width? : number;
  height?: number;
}

export interface ITransfer {
  _id       : string;
  user      : IUser;
  account   : IAccount;
  started_at: Date;
  ended_at  : Date;
};

export interface IFilter {
  userId   : string;
  accountId: string;
  startedAt: string;
  endedAt  : string;
}