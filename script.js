console.log("Welcome to player");

//initialize the varibales
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterplay');
let progessbar =document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName : "salam-e-ishq1", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName : "salam-e-ishq2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName : "salam-e-ishq3", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName : "salam-e-ishq4", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName : "salam-e-ishq5", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    // {songName : "salam-e-ishq", filePath: "songs/6.mp3", coverPath: "cover/1.mp3"},
    // {songName : "salam-e-ishq", filePath: "songs/1.mp3", coverPath: "cover/1.mp3"},
]

songItems.forEach((element, i) => {
    element.getElementsByClassName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    
});

// audioElement.play()

// handle play /pause click
masterPlay.addEventListener('click', ()=>
{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity = 0;

    }
})

// Listen to events
audioElement.addEventListener('timeupdate', () =>{
    console.log('timeupdate');

    //update Seekbar
    progess = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progess);
    progessbar.value = progess;
})

progessbar.addEventListener('change', () => {
    audioElement.currentTime = (progessbar.value * audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element. classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if(songIndex>5){
        songIndex = 0;
    }
    else
    {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex<=0){
        songIndex = 0;
    }
    else
    {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

