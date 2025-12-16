import { GraphQLFormattedError } from "graphql";

type Error = {
    message: string;
    statusCode: string;
}

//Custom Fetch function that returns errors and acts as middle ware for fetch requests
const customFetch = async (url: string, options: RequestInit = {}) => {
    const accessToken = localStorage.getItem("access_token");
    const header = options.headers as Record<string, string>;
    
    return await fetch(url,{
        ...options,
        headers:{
            ...header,
            Authorization: header?.Authorization || `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Apollo-Require-Preflight": "true",
        }
    })
}

const getGraphQLErrors = (body : Record<"errors", GraphQLFormattedError[] | undefined>):
Error | null => {
    if(!body){
        return {
            message: 'Unknown error',
            statusCode: "INTERNAL_SERVER_ERROR"
        }
    }

    if("errors" in body){
        const errors = body?.errors;
        const messages = errors?.map((error) => error?.message)?.join("");
        const code = errors?.[0]?.extensions?.code;

        return {
            message: messages || JSON.stringify(errors),
            statusCode: code || 500
        }
    }
    return null;
}


export const fetchWrapper =  async(url: string, options: RequestInit) => {
    const response = await customFetch(url,options);
    const responseClone = response.clone();
    const body = await responseClone.json(); // If body of response is read it cannot be read again, so we clone the response

    const error = getGraphQLErrors(body);
    if(error){
        throw error;
    }
    return response;
}

