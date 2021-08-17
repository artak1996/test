export enum EmailStatuses {
  VERIFIED = 'verified',
  NOT_VERIFIED = 'not-verified'
}

export interface UserInterface {
  name: string;
  email: string;
  status?: EmailStatuses;
  password?: string;
  avatar?: string;
}