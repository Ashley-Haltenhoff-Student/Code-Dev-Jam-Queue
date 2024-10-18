async function getUserAuth() {
    const clientId = "1ef017c3043342b1a5dc582848ac57cd";

    // Request authorization from the user to access Spotify's resources on their behalf
    const redirectURI = document.location.href;
    const scope = 'user-read-private user-read-email';

    const url = `https://accounts.spotify.com/authorize?` + new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectURI,
    });

    // Redirect to Spotify Authorization
    window.location.href = url;
}

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
        return result;
    } catch (error) {
        console.error(error.message);
    }
}

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


async function getAllPlaylists(username) {
    var url = 'https://api.spotify.com/v1/users/' + username + '/playlists';
    const token = await getToken();

    try {
        const res = await fetch (url, {
            headers: {
                Authorization: 'Bearer ' + token['access_token']
            }
        });

        var result = await res.json();
        console.log(result['items']);

        const contentDiv = document.getElementById('content-div');
        const list = document.createElement('ul');

        for (playlist in result) {
            const listItem = document.createElement('li');
            listItem.value = playlist['name'];
            list.appendChild(listItem);
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function pause() {
    const url = "https://api.spotify.com/v1/me/player/pause?device_id=7762172D-EBB1-4AF6-B0C8-694A09F81769"
    const token = await getToken();

    try {
        const res = await fetch (url, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token['access_token']
            }
        });

        var result = await res.json();
        console.log(result['items']);

    } catch (error) {
        console.error(error.message);
    }
}