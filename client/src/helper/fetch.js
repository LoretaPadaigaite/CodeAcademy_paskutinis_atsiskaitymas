/*fetch( `${process.env.REACT_API_URL}/participants`, {
    method: 'POST',
    headersa: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
})
.then(res => res.json())
.then(data);
*/

export const internalFetch = (url) => {
    return fetch( `${process.env.REACT_API_URL}${url}`).then(res => res.json());
}