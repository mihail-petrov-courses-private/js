const ENDPOINT = 'http://localhost:8223/api/';
export const apiEndpoint = (base, rest, queryParam) => {
    const queryParameter = (queryParam)
        ? buildQueryString(queryParam)
        : "";
    return `${ENDPOINT}/${base}/${rest}${queryParameter}`;
};
const buildQueryString = (queryString) => {
    const queryCollection = [];
    for (const key in queryString) {
        queryCollection.push(`${key}=${queryString[key]}`);
    }
    if (queryCollection.length > 0) {
        return `?${queryCollection.join('&')}`;
    }
    return "";
};
