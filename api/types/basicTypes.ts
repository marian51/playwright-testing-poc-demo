export type ParamsType = { 
    [key: string]: string | number | boolean; 
}

export type HeadersType = {
    [key: string]: string;
}

export type FormType = ParamsType

export type BasicResponseType = {
    code: number,
    message: string,
    type: string
}