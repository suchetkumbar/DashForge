

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


