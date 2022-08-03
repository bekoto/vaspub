export interface JwtResponse<T> {
    token: string;
    data: T;
}
