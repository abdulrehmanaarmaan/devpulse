export interface ResponseInfo<X, Y> {
    status_code: number,
    success: boolean,
    message?: string,
    data?: X,
    errors?: Y
}