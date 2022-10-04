/**
 * 1. Render songs => OK
 * 2. Play / Pause / Seek => OK
 * 3. CD rotate => OK
 * 4. Next / Previous => OK
 * 5. Show / Hide Playlist => OK
 * 6. Random => OK
 * 7. Next / Repeat when ended => OK
 * 8. Active song => OK
 * 9. Scroll active song into  => OK
 * 10. Play song when click => OK
 * 11. Volumn => OK
 */

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const audio = $('#audio')
const playlistList = $('.playlist__list')
const cd = $('.cd__img')
const songName = $('.song__name')
const songAuthor = $('.song__author')
const songDuration = $('.progress-time__duration')
const songCurrentTime = $('.progress-time__current-time')
const showPlaylistIcon = $('.music-card__icon')
const closePlaylistIcon = $('.close-list')
const playlist = $('.playlist__container')
const playlistInner = $('.playlist')
const playBtn = $('.btn__play')
const prevBtn = $('.btn__previous')
const nextBtn = $('.btn__next')
const randomBtn = $('.btn__random')
const repeatBtn = $('.btn__repeat')
const progressBar = $('.progress-bar')
const progress = $('.progress-bar__value')
const volumeBtn = $('.volume')
const volumeBar = $('.volume-bar')
const volume = $('.volume-bar__value')
const heartIcon = $('.favourite')
const wave = $('#wave-2')


const songPlayedList = new Set()

const app = {
    currentIndex: 0,
    currentVolume: 1,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    isMute: false,
    isHoldProgressBar: false,
    isHoldVolumeBar: false,
    isFavourite: false,

    songs: [
        {
            name: "Tại vì sao",
            author: "MCK",
            image: "./assets/img/mck.jpg",
            path: "./assets/music/y2mate.com - RPT MCK  TẠI VÌ SAO  Official Music Video.mp3"
        },
        {
            name: "Cheap Thrills Sia",
            author: "Singer",
            image: "./assets/img/song9.jpg",
            path: "./assets/music/Cheap_Thrills_Sia.mp3"
        },
        {
            name: " Diamond Ver2",
            author: "VQ Remix",
            image: "./assets/img/song7.jpg",
            path: "./assets/music/Diamond_Ver2_VQ_Remix.mp3"
        },
        {
            name: "Kiss Remix",
            author: "Hung Bobi",
            image: "./assets/img/song6.png",
            path: "./assets/music/Kiss_Hung_Bobi_Remix.mp3"
        },
        {
            name: "Larg Elgit Doda",
            author: "Singer",
            image: "./assets/img/song8.jpg",
            path: "./assets/music/Larg_Elgit_Doda.mp3"
        },
        {
            name: "Trap Queen Remix",
            author: "Adriana Gomez",
            image: "./assets/img/song2.jpg",
            path: "./assets/music/Trap_Queen_Remix_Adriana_Gomez.mp3"
        },
        {
            name: "MILLION DOLLAR BOY",
            author: "16 Typh",
            image: "./assets/img/16typh.jpg",
            path: "./assets/music/y2mate.com - 16 Typh  MILLION DOLLAR BOY  OFFICIAL MUSIC VIDEO.mp3"
        },
        {
            name: "QUERRY",
            author: "QNT x TRUNG TRẦN ft RPT MCK Prod By RASTZ",
            image: "./assets/img/song3.jpg",
            path: "./assets/music/y2mate.com - QUERRY  QNT x TRUNG TRẦN ft RPT MCK Prod By RASTZ  OFFICIAL MV.mp3"
        },
        {
            name: "Waiting For Love",
            author: "Avicii",
            image: "./assets/img/avici.jpg",
            path: "./assets/music/y2mate.com - Avicii  Waiting For Love.mp3"
        },
        {
            name: "GENE",
            author: "TOULIVER X BINZ",
            image: "./assets/img/binz.jpg",
            path: "./assets/music/y2mate.com - TOULIVER X BINZ  GENE  OFFICIAL MV .mp3"
        },
        {
            name: "Càng Cua",
            author: "Low G x Last Fire Crew",
            image: "./assets/img/song1.jpg",
            path: "./assets/music/y2mate.com - Càng Cua  Low G x Last Fire Crew  Nhà Hóa Học Đống Đa.mp3"
        },
        {
            name: "MURDER IN MY MIND",
            author: "KORDHELL",
            image: "./assets/img/kordhell.jpg",
            path: "./assets/music/y2mate.com - KORDHELL  MURDER IN MY MIND.mp3"
        },
        {
            name: "Nguời đi bao",
            author: "tlinh x Low G",
            image: "./assets/img/lowg.jpg",
            path: "./assets/music/y2mate.com - NGƯỜI ĐI BAO  tlinh x Low G l  OFFICIAL MUSIC VIDEO.mp3"
        },
        {
            name: "Thủ đô Cypher",
            author: "RPT Orijinn, LOW G, RZMas, RPT MCK",
            image: "./assets/img/cypher.jpg",
            path: "./assets/music/y2mate.com - Thủ Đô Cypher  BeckStage X Bitis Hunter  RPT Orijinn LOW G RZMas RPT MCK.mp3"
        },
        {
            name: "CUA",
            author: "HIEU THU HAI",
            image: "./assets/img/cua.jpg",
            path: "./assets/music/y2mate.com - CUA.mp3"
        }
    ],

    renderSong() {
        const htmls = this.songs.map((song, index) => {
            return `
            <li class="playlist__item" data-index="${index}">
                <div class="playlist__item-img">
                    <img src="${song.image}" alt="">
                </div>
                <div class="playlist__item-info">
                    <h3 class="playlist__item-name">${song.name}</h3>
                    <p class="playlist__item-author">${song.author}</p>
                </div>
                <div class="music-waves">  
                    <span></span>  
                    <span></span>  
                    <span></span>  
                    <span></span>  
                    <span></span>
                </div>
                <span class="playlist__item-option">
                    <i class="fa-solid fa-ellipsis"></i>
                </span>
            </li>
            `
        })
        playlistList.innerHTML = htmls.join('')
    },

    activeSong() {
        const songs = $$('.playlist__item')
        const musicWaves = $$('.music-waves')
        songs.forEach((song, index) => {
            if(index === this.currentIndex){
                song.classList.add('active')
                musicWaves[index].classList.add('active')
                song.scrollIntoView(
                    {
                        behavior: "smooth",
                        block: "center",
                        inline: "center"
                    }
                )
            } else {
                song.classList.remove('active')
                musicWaves[index].classList.remove('active')
            }
        })
    },

    defineProperties() {
        Object.defineProperty(this, 'currenSong', {
            get: () => this.songs[this.currentIndex]
        })
    },

    timeFormat(secs) {
        const date = new Date(null)
        date.setSeconds(secs)
        return date.toISOString().slice(14, 19)
    },

    togglePlaylist() {
        playlist.classList.toggle('list-open')
    },

    loadCurrentSong() {
        const _this = this
        songName.textContent = this.currenSong.name
        songAuthor.textContent = this.currenSong.author
        cd.src = this.currenSong.image
        audio.src = this.currenSong.path
        progress.style.width = 0


        // Xử lý lấy tiến trình và thời lượng bài hát trước khi phát
        audio.onloadedmetadata = function() {
            songCurrentTime.textContent = _this.timeFormat(this.currentTime.toFixed(2))
            songDuration.textContent = _this.timeFormat(this.duration.toFixed(2))
        }
    },

    nextSong(){
        this.currentIndex++
        if(this.currentIndex > this.songs.length-1) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
        this.activeSong()
    },

    prevSong(){
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length-1
        }
        this.loadCurrentSong()
        this.activeSong()
    },

    // Xử lý random song nhưng sẽ hết tất cả các bài
    randomSong(){
        let random
        do {
            random = Math.floor(Math.random() * this.songs.length)
        } while (songPlayedList.has(random))
        this.currentIndex = random
        this.loadCurrentSong()
        songPlayedList.add(random)
        if(songPlayedList.size === this.songs.length){
            songPlayedList.clear()
        }
        this.activeSong()
    },

    repeatSong(){
        this.loadCurrentSong()
        this.activeSong()
    },

    handleEvents() {
        const _this = this
        _this.activeSong()

        // Xử lý quay CD khi play / pause nhạc
        const cdRotate = cd.animate({
            transform: ['rotate(360deg)']
        },
        {
            duration: 7500,
            iterations: Infinity
        })
        cdRotate.pause()

        // Xử lý Play / Pause khi click
        playBtn.onclick = function() {
            if(_this.isPlaying){
                audio.pause()
            } else {
                audio.play()
            }
        }
        audio.onplay = function() {
            playBtn.classList.add('playing')
            cdRotate.play()
            wave.classList.add('loader')
            _this.isPlaying = true
        }
        audio.onpause = function() {
            playBtn.classList.remove('playing')
            cdRotate.pause() 
            wave.classList.remove('loader')
            _this.isPlaying = false
        }


        // Xử lý current time và thanh tiến trình 
        audio.ontimeupdate = function() {
            songCurrentTime.textContent = _this.timeFormat(this.currentTime)
            const progressPercent = this.currentTime / this.duration * 100
            progress.style.width = progressPercent + '%'
        }


        // Xử lý Next / Previous Song
        nextBtn.onclick = function() {
            if(_this.isRepeat){
                _this.repeatSong()
            } else {
                if(_this.isRandom){
                    _this.randomSong()
                } else {
                    _this.nextSong()
                }
            }
            cdRotate.cancel()
            if(_this.isPlaying){
                audio.play()
            }
        }
        prevBtn.onclick = function() {
            if(_this.isRepeat){
                _this.repeatSong()
            } else {
                if(_this.isRandom){
                    _this.randomSong()
                } else {
                    _this.prevSong()
                }
            }
            cdRotate.cancel()
            if(_this.isPlaying){
                audio.play()
            }
        }


        // Xử lý next bài, random bài hoặc phát lại khi hết bài
        // Khi lặp thì không phát ngẫu nhiên
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            this.classList.toggle('active', _this.isRepeat)
        }
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            this.classList.toggle('active', _this.isRandom)
        }
        audio.onended = function() {
            if(!_this.isRepeat){
                if(_this.isRandom){
                    _this.randomSong()
                    cdRotate.cancel()
                } else {
                    _this.nextSong()
                    cdRotate.cancel()
                }
                audio.play()
            } else {
                _this.repeatSong()
                audio.play()
            }
        }


        // Xử lý show / hide Playlist
        showPlaylistIcon.onclick = function() {
            _this.togglePlaylist()
        }
        closePlaylistIcon.onclick = function() {
            _this.togglePlaylist()
        }
        playlist.onclick = function() {
            _this.togglePlaylist()
        }
        playlistInner.onclick = function(){
            event.stopPropagation()
        }


        // Xử lý Playlist
        // Xử lý play song khi click trong Playlist
        const songs = $$('.playlist__item')
        songs.forEach((song, index) => {
            const option = song.querySelector('.playlist__item-option')
            option.onclick = function() {
                event.stopPropagation()
            }
            song.onclick = function(e) {
                if(e.target != option && _this.currentIndex != index) {
                    _this.currentIndex = index
                    _this.loadCurrentSong()
                    _this.activeSong()
                    audio.play()
                }
            }
        })


        // Xử lý volume
        volumeBtn.onclick = function() {
            _this.isMute = !_this.isMute
            this.classList.toggle('active', _this.isMute)
            if(_this.isMute)
                audio.volume = 0
            else 
                audio.volume = _this.currentVolume
        }

        // // Xử lý Favourite
        // heartIcon.onclick = function() {
        //     _this.isFavourite = !_this.isFavourite
        //     this.classList.toggle('active', this.isFavourite)
        // }

        // Xử lý MOUSE EVENT
        // Xử lý Seek, tua nhạc và thanh tiến trình
        progressBar.onmousedown = function(e) {
            audio.currentTime = e.offsetX / this.offsetWidth * audio.duration
            // Đặt cái này để làm được vừa giữ vừa kéo
            _this.isHoldProgressBar = true
        }
        progressBar.onmousemove = function(e) {
            if(_this.isHoldProgressBar){
                audio.currentTime = e.offsetX / this.offsetWidth * audio.duration
            }
        }

        // Xử lý thanh volume
        volumeBar.onmousedown = function(e) {
            if(e.offsetX >= 0 && e.offsetX <= this.offsetWidth) {
                _this.currentVolume = (e.offsetX / this.offsetWidth).toFixed(2)
                audio.volume = _this.currentVolume
                volume.style.width = audio.volume * 100 + '%'
                if(audio.volume === 0) {
                    _this.isMute = true
                }
                else {
                    _this.isMute = false
                }
                _this.isHoldVolumeBar = true
            }
        }
        volumeBar.onmousemove = function(e) {
            if(_this.isHoldVolumeBar){
                if(e.offsetX >= 0 && e.offsetX <= this.offsetWidth){
                    _this.currentVolume = (e.offsetX / this.offsetWidth).toFixed(2)
                    audio.volume = _this.currentVolume
                    volume.style.width = audio.volume * 100 + '%'
                    if(audio.volume === 0)  _this.isMute = true
                    else _this.isMute = false
                }
            }
        }
        audio.onvolumechange = function() {
            if(_this.isMute){
                volumeBtn.classList.add('active')
                volume.style.width = 0
            }
            else {
                volumeBtn.classList.remove('active')
                volume.style.width = this.volume * 100 + '%'
            }
        }
        window.onmouseup = function() {
            _this.isHoldProgressBar = false
            _this.isHoldVolumeBar = false
        }


        // Xử lý Keyboard Events
        // Ấn space để Play / Pause Music
        document.onkeyup = function(e) {
            if(e.which === 32){
                playBtn.click()
            }
        }
    },

    start() {
        // Xử lý render bài hát ra Playlist
        this.renderSong()

        // Định nghĩa các thuộc tính
        this.defineProperties()

        // Tải bài hát hiện tại vào UI để sẵn sàng phát nhạc
        this.loadCurrentSong()
        
        // Lắng nghe, xử lý các sự kiện (DOM Events)
        this.handleEvents()
    },
}

app.start()