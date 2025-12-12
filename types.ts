export interface UserData {
  name: string;
  major: string;
  graduationDate: string; // ISO string YYYY-MM-DD
}

export enum AppState {
  INPUT,
  LOADING,
  RESULT,
  ERROR
}
