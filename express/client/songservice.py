# client for updating db from spotify data
# keep on cronjob? every call adds to db
# TODO: how do i make this not a script lol

import time
import vars # env variables
import requests
import base64

# spotify_client_id
# spotify_client_secret
url = 'https://api.spotify.com/v1'
authVal = (vars.spotify_client_id + ":" + vars.spotify_client_secret).encode("ascii")
authVal = base64.b64encode(authVal)
url = "https://accounts.spotify.com/api/token"
authOptions = {
        "headers": {
            'Authorization': "Basic " + authVal.decode()
            },
        "form": {
            "grant_type": 'client_credentials'
            },
        "json": True
}

resp = requests.post(url, authOptions)

current_time = int(time.time())
