console.log('welcome to Javascript')

// Initialize variables
let songIndex = 0
let audioElememt = new Audio('songs/1.mp3')
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar') 
let gif = document.getElementById('gif')
let masterSongName = document.getElementById('masterSongName')
let songItems = Array.from(document.getElementsByClassName('songItem'))

let songs = [
  {songName: "Warriyo - Mortals (feat. Brehm)", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
  {songName: "Cielo Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
  {songName: "Deaf KEV - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
  {songName: "Different Heavens & EH!DE", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
  {songName: "Janji Heroes Tonight ", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
  {songName: "Khairiyat - random", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
  {songName: "Phir bhi tumko - random", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
  {songName: "Bulleya - random", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"}
]
songItems.forEach((element, i)=>{
  console.log(element,i)
  element.getElementsByTagName('img')[0].src = songs[i].coverPath
  element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName
})

// Handle Play/Pause click
masterPlay.addEventListener('click',()=>{
  if(audioElememt.paused || audioElememt.currentTime<=0){
    audioElememt.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1
  }
  else{
    audioElememt.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity=0
  }
})
// Listen to Events
audioElememt.addEventListener('timeupdate',()=>{
  // Update Seekbar
  progress = parseInt((audioElememt.currentTime/audioElememt.duration)*100)
  myProgressBar.value = progress
})

myProgressBar.addEventListener('change', ()=>{
  audioElememt.currentTime = myProgressBar.value * audioElememt.duration/100
} )

const makeAllPlays = ()=>{
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
     element.classList.remove('fa-pause-circle')
     element.classList.add('fa-play-circle')
  })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
  element.addEventListener('click',(e)=>{
    makeAllPlays()
    e.target.classList.remove('fa-play-circle')
    e.target.classList.add('fa-pause-circle')
    songIndex = parseInt(e.target.id)
    audioElememt.src = `songs/${songIndex+1}.mp3`
    masterSongName.innerText = songs[songIndex].songName
    audioElememt.currentTime = 0
    audioElememt.play()
    gif.style.opacity=1
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
  })
})

document.getElementById('next').addEventListener('click',()=>{
  if(songIndex>=9){
    songIndex = 0
  }
  else{
    songIndex += 1
  }
  audioElememt.src = `songs/${songIndex + 1}.mp3`
  masterSongName.innerText = songs[songIndex].songName
  audioElememt.currentTime = 0
  audioElememt.play()
  masterPlay.classList.remove('fa-play-circle')
  masterPlay.classList.add('fa-pause-circle')
})

document.getElementById('previous').addEventListener('click', () => {
  if (songIndex <= 0) {
    songIndex = 0
  }
  else {
    songIndex -= 1
  }
  audioElememt.src = `songs/${songIndex + 1}.mp3`
  masterSongName.innerText = songs[songIndex].songName
  audioElememt.currentTime = 0
  audioElememt.play()
  masterPlay.classList.remove('fa-play-circle')
  masterPlay.classList.add('fa-pause-circle')
})