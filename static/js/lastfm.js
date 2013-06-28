function Track(name, artist, url, now_playing, time, raw_time){
    this.name=name;
    this.artist = artist;
    this.url = url;
    this.now_playing = now_playing;
    this.time = time;
    this.raw_time = raw_time;
}

function LastFM(API_KEY){

    this.API_KEY = API_KEY;
    
    this.getRecentTracks = function(user){
        var tracks = new Array();
        $.getJSON("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user="+user+"&api_key="+this.API_KEY+"&format=json"    ,function(result){
            if(result.recenttracks.track == null){
                return false;
            }
            for (var i = 0; i < result.recenttracks.track.length; i++){
                var track = result.recenttracks.track[i];
                var name = track.name;
                var artist = track.artist["#text"];
                var url = track.url;
                var time = "";
                var rawTime = -1;
                var playing = false;
                if (track['@attr'] != null){
                    playing = track['@attr']['nowplaying'];
                }
                if (track.date != null){
                    current_time = Math.floor(new Date().getTime()/1000);
                    raw_time = track.date.uts;
                    track_time = track.date.uts;
                    diff = current_time - track_time;
                    if(diff < 60){
                        time = diff+" secs ago"
                    }
                    if(diff >= 60 && diff < 3600){
                        mins = Math.floor(diff / 60);
                        time = mins+" mins ago"
                    }
                    if(diff >= 3600){
                        hours = Math.floor(diff / 3600);
                        if(hours == 1){time = hours+" hour ago";}
                        else{time = hours+" hours ago";}
                    }
                }
                if (playing == "true"){
                    playing = true;
                }
                var mytrack = new Track(name, artist, url, playing, time, raw_time);
                tracks[i] = mytrack;
            }
        });
        return tracks;
    };
    
}


