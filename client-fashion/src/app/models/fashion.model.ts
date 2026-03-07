export interface Fashion {
  _id?: string;
  title: string;
  details: string;
  thumbnail: string;
  style: string;
  creationDate: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface StyleGroup {
  style: string;
  fashions: Fashion[];
}
