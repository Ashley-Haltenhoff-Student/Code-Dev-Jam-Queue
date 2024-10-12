async function getToken() {
    // Codes that give access to the database
    const clientId = "1ef017c3043342b1a5dc582848ac57cd";
    const clientSecret = "a1d0fa4085b549c3aa00c00c30d6ab4e";
    
    // btoa() used for base64 encoding
    const authentication = btoa(clientId + ":" + clientSecret);
    const url = "https://accounts.spotify.com/api/token";
    const data = {
        grant_type: "client_credentials"
    };

    // send a POST request to get access token
    try {
        const res = await fetch (url, {
            method: 'POST',
            headers: {
                "Authorization": "Basic " + authentication,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(data)
        });
        
        // check for response error
        if (!res.ok) {
            throw new Error(res.status);
        }

        // convert to json
        const result = await res.json();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
}

getToken();
