export class UserData {
  userId: string;
}

export class DecryptedToken<T> {
  payload: T & UserData;
  exp: string;
}
