export interface IFashion {
    _id: string;
    style: string;
    fashion_subject: string;
    fashion_detail: string;
    fashion_image: string;
}

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
