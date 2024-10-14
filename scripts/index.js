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
        return result;
    } catch (error) {
        console.error(error.message);
    }
}

var list = document.createElement('ul').appendChild(document.body);

async function getTopTenSongs() {
    const token = getToken();
    const url = "https://api.spotify.com/v1/tracks";
    var result;

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        });

        if (!res.ok) {
            throw new Error(res.status);
        }
        
        result = await res.json();
    } catch (error) {
        console.error(error.message);
    }

    for (result['name'] in result) {
        document.createElement('li').appendChild(list);
    }
}

async function addToQueue(song, username) {
    const token = getToken;
    const url = "https://https://api.spotify.com/v1/" + username + "/player/queue";
    
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer' + getToken()
            }
        });
    } catch (error) {

    }
}
