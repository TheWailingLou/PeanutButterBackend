$(document).ready(function(){
  var clientID = "HjF9QoEqHA1T6anLRuXoHXNFo5m76Po3"
  var clientDomain = 'q2weather.auth0.com'

  var lock = new Auth0Lock(clientID, clientDomain, {
    auth: {
      redirect: false,
      sso: false
    }
  });

  var idToken = localStorage.getItem('id_token') || null;
  var profile = JSON.parse(localStorage.getItem('profile')) || null;


  lock.on('authenticated', (authResult) => {
    localStorage.setItem('id_token', authResult.idToken);
    idToken = authResult.idToken;
    lock.getProfile(authResult.idToken, (err, prof) => {
      profile = prof;

      localStorage.setItem('profile', JSON.stringify(prof));
    });
    lock.hide();
  });
  $('.upload_main_track').click(function(){
    if (profile && idToken && ready) {
      var startProgress = new Promise(function(resolve, reject){
        console.log("upload begin")
        $('.explore_button').toggle()
        $('.progress_text').toggle();
        $('.progress_text').text("Uploading...");
        $('.unloaded_track').addClass('greyed_out');
        $('.play_button').addClass('greyed_out');
        $('.song_name_input').addClass('greyed_out')
        $('.create_tracks').addClass('greyed_out')
        $('.single_creation_spec').toggle()
        $('.logo').toggle()
        $('.logo-spin').toggle()
        ready = false;
        setTimeout(function(){
          resolve()
        }, 0)
      })
      startProgress.then(function(){
        var pathToMain = path.join(__dirname, "assets/tempFiles/mainMp3.mp3")
        if (!fs.existsSync(pathToMain)) {
          alert("Converting to mp3 for upload.")
          mainMp3Blob = saveAsMp3(completeMainBuffer);
        }
        cloudinary.v2.uploader.unsigned_upload(pathToMain, "sendMp3",
        {
          cloud_name: "louman",
          resource_type: "raw",
        },
        function(error, result) {
          if (result) {
            var obToPost = {
              "sound_title": $('.song_name_input').val(),
              "sound_type": "Full",
              "download_url": result.url,
              "creator":profile.given_name
            }
            console.log(obToPost)
            $.ajax({
              type: "POST",
              url: "https://pb-backend.herokuapp.com/cloudUpload",
              data: JSON.stringify(obToPost),
              contentType: 'application/json',
              success: function(result) {
                if (true) {
                  alert("Track uploaded successfully.")
                }
                $('.explore_button').toggle()
                $('.progress_text').toggle();
                $('.progress_text').text("Crushing Peanuts..");
                $('.single_creation_spec').toggle()
                $('.logo').toggle()
                $('.logo-spin').toggle()
                $('.unloaded_track').removeClass('greyed_out');
                $('.play_button').removeClass('greyed_out');
                $('.song_name_input').removeClass('greyed_out')
                $('.create_tracks').removeClass('greyed_out')
                ready = true;
              },
              error: function(err) {
                $('.explore_button').toggle()
                $('.progress_text').toggle();
                $('.progress_text').text("Crushing Peanuts..");
                $('.single_creation_spec').toggle()
                $('.logo').toggle()
                $('.logo-spin').toggle()
                alert('There was an error uploading the track.')
                console.log("there was an error: ", err)
                $('.unloaded_track').removeClass('greyed_out');
                $('.play_button').removeClass('greyed_out');
                $('.song_name_input').removeClass('greyed_out')
                $('.create_tracks').removeClass('greyed_out')
                ready = true;
              }
            })
          } else {
            alert("There was and error uploading your track.")
            console.log("Error: ", error)
            $('.explore_button').toggle()
            $('.progress_text').toggle();
            $('.progress_text').text("Crushing Peanuts..");
            $('.single_creation_spec').toggle()
            $('.logo').toggle()
            $('.logo-spin').toggle()
            $('.unloaded_track').removeClass('greyed_out');
            $('.play_button').removeClass('greyed_out');
            $('.song_name_input').removeClass('greyed_out')
            $('.create_tracks').removeClass('greyed_out')
            ready = true;
          }
        });
      })
    } else {
      if (ready) {
        alert('Please log in to upload your track')
        lock.show()
      }
    }
  })

  $('.upload_bass_track').click(function(){
    if (profile && idToken && ready) {
      var startProgress = new Promise(function(resolve, reject){
        $('.explore_button').toggle()
        $('.progress_text').toggle();
        $('.progress_text').text("Uploading...");
        $('.single_creation_spec').toggle()
        $('.logo').toggle()
        $('.logo-spin').toggle()
        $('.unloaded_track').addClass('greyed_out');
        $('.play_button').addClass('greyed_out');
        $('.song_name_input').addClass('greyed_out')
        $('.create_tracks').addClass('greyed_out')
        ready = false;
        setTimeout(function(){
          resolve()
        }, 0)
      })
      startProgress.then(function(){
        var pathToBass = path.join(__dirname, "assets/tempFiles/bassMp3.mp3")
        if (!fs.existsSync(pathToBass)) {
          alert("Converting to mp3 for upload.")
          bassMp3Blob = saveAsMp3(completeBassBuffer, "bass");
        }
        cloudinary.v2.uploader.unsigned_upload(pathToBass, "sendMp3",
        {
          cloud_name: "louman",
          resource_type: "raw",
        },
        function(error, result) {
          if (result) {
            var obToPost = {
              "sound_title": $('.song_name_input').val(),
              "sound_type": "Bass",
              "download_url": result.url,
              "creator":profile.given_name
            }
            $.ajax({
              type: "POST",
              url: "https://pb-backend.herokuapp.com/cloudUpload",
              data: JSON.stringify(obToPost),
              contentType: 'application/json',
              success: function(result) {
                if (true) {
                  alert("Track uploaded successfully.")
                }
                $('.explore_button').toggle()
                $('.progress_text').toggle();
                $('.progress_text').text("Crushing Peanuts..");
                $('.single_creation_spec').toggle()
                $('.logo').toggle()
                $('.logo-spin').toggle()
                $('.unloaded_track').removeClass('greyed_out');
                $('.play_button').removeClass('greyed_out');
                $('.song_name_input').removeClass('greyed_out')
                $('.create_tracks').removeClass('greyed_out')
                ready = true;
              },
              error: function(err) {
                $('.explore_button').toggle()
                alert('There was an error uploading the track.')
                console.log("there was an error: ", err)
                $('.progress_text').toggle();
                $('.progress_text').text("Crushing Peanuts..");
                $('.single_creation_spec').toggle()
                $('.logo').toggle()
                $('.logo-spin').toggle()
                $('.unloaded_track').removeClass('greyed_out');
                $('.play_button').removeClass('greyed_out');
                $('.song_name_input').removeClass('greyed_out')
                $('.create_tracks').removeClass('greyed_out')
                ready = true;
              }
            })
          } else {
            $('.explore_button').toggle()
            alert('There was an error uploading the track.')
            console.log(error)
            $('.progress_text').toggle();
            $('.progress_text').text("Crushing Peanuts..");
            $('.single_creation_spec').toggle()
            $('.logo').toggle()
            $('.logo-spin').toggle()
            $('.unloaded_track').removeClass('greyed_out');
            $('.play_button').removeClass('greyed_out');
            $('.song_name_input').removeClass('greyed_out')
            $('.create_tracks').removeClass('greyed_out')
            ready = true;
          }
        })
      })
    } else {
      if (ready) {
        alert('Please log in to upload your track')
        lock.show()
      }
    }
  })

  $('.upload_drum_track').click(function(){
    if (profile && idToken && ready) {
      var startProgress = new Promise(function(resolve, reject){
        $('.explore_button').toggle()
        $('.progress_text').toggle();
        $('.progress_text').text("Uploading...");
        $('.single_creation_spec').toggle()
        $('.create_tracks').addClass('greyed_out')
        $('.logo').toggle()
        $('.logo-spin').toggle()
        $('.unloaded_track').addClass('greyed_out');
        $('.play_button').addClass('greyed_out');
        $('.song_name_input').addClass('greyed_out')
        ready = false;
        setTimeout(function(){
          resolve()
        }, 0)
      })
      startProgress.then(function(){
        var pathToDrums = path.join(__dirname, "assets/tempFiles/drumsMp3.mp3")
        console.log("drumMp3 Exists? ", fs.existsSync(pathToDrums))
        if (!fs.existsSync(pathToDrums)) {
          alert("Converting to mp3 for upload.")
          drumMp3Blob = saveAsMp3(completeDrumBuffer, "drums");
        }
        cloudinary.v2.uploader.unsigned_upload(pathToDrums, "sendMp3",
        {
          cloud_name: "louman",
          resource_type: "raw",
        },
        function(error, result) {
          if (result) {
            var obToPost = {
              "sound_title": $('.song_name_input').val(),
              "sound_type": "Drums",
              "download_url": result.url,
              "creator":profile.given_name
            }
            $.ajax({
              type: "POST",
              url: "https://pb-backend.herokuapp.com/cloudUpload",
              data: JSON.stringify(obToPost),
              contentType: 'application/json',
              success: function(result) {
                if (true) {
                  alert("Track uploaded successfully.")
                }
                $('.explore_button').toggle()
                $('.create_tracks').removeClass('greyed_out')
                $('.progress_text').toggle();
                $('.progress_text').text("Crushing Peanuts..");
                $('.single_creation_spec').toggle()
                $('.logo').toggle()
                $('.logo-spin').toggle()
                $('.unloaded_track').removeClass('greyed_out');
                $('.play_button').removeClass('greyed_out');
                $('.song_name_input').removeClass('greyed_out')
                ready = true;
              },
              error: function(err) {
                $('.explore_button').toggle()
                $('.create_tracks').removeClass('greyed_out')
                $('.progress_text').toggle();
                $('.progress_text').text("Crushing Peanuts..");
                $('.single_creation_spec').toggle()
                $('.logo').toggle()
                $('.logo-spin').toggle()
                alert('There was an error uploading the track.')
                console.log("there was an error: ", err)
                $('.unloaded_track').removeClass('greyed_out');
                $('.play_button').removeClass('greyed_out');
                $('.song_name_input').removeClass('greyed_out')
                ready = true;
              }
            })
          } else {
            $('.explore_button').toggle()
            $('.create_tracks').removeClass('greyed_out')
            $('.progress_text').toggle();
            $('.progress_text').text("Crushing Peanuts..");
            $('.single_creation_spec').toggle()
            $('.logo').toggle()
            $('.logo-spin').toggle()
            alert('There was an error uploading the track.')
            console.log(error)
            $('.unloaded_track').removeClass('greyed_out');
            $('.play_button').removeClass('greyed_out');
            $('.song_name_input').removeClass('greyed_out')
            ready = true;
          }
        });
      })
    } else {
      if (ready) {
        alert('Please log in to upload your track')
        lock.show()
      }
    }
  })
})
