//Ingenium Theme - audio visualizer
if (jQuery("#album-visualiser").length) {
    var pieces, radius, fft, mapMouseX, mapMouseY;
    var bgColor = "#0c0f27";
    var bassColor = ["#ffffff", "#ffffff"];
    var midColor = "#ffffff";
    var trembleColor = "#ffffff";
    var myCanvas;
    var vol;
    var dots = [];
    var numDots = 100;
    var t = 0;
    var time = 0;
    var getT = [];
    var getTime = [];
    var randNums = [];

    function preload() {

        var source = jQuery('#album-visualiser  .mp3_file').first().attr('data-src');
        jQuery('#album-visualiser  .mp3_file').first().addClass('active');
        song = loadSound(source);
    }
    function touchStarted() {
        if (getAudioContext().state !== 'running') {
            getAudioContext().resume();
            jQuery("#album-visualiser .play-button").removeClass("active");
            jQuery("#album-visualiser .pause-button").addClass("active");
        } 
    }   

    function playNext(file) {

        if (jQuery("#album-visualiser .pause-button").hasClass("active")) {

            if (jQuery("#album-visualiser .album-button-previous").hasClass("active")) {

                jQuery("#album-visualiser .album-button-previous").removeClass('active');

                if (jQuery("#album-visualiser  .mp3_file.active").prev('.mp3_file').length) {
                    var nextSong = jQuery("#album-visualiser  .mp3_file.active").prev('.mp3_file');
                    jQuery("#album-visualiser  .mp3_file.active").removeClass('active');
                    jQuery(nextSong).addClass('active');
                } else {
                    jQuery("#album-visualiser  .mp3_file.active").removeClass('active');
                    var nextSong = jQuery('#album-visualiser  .mp3_file').last();

                    jQuery('#album-visualiser  .mp3_file').last().addClass('active');
                }
            } else {
                if (jQuery("#album-visualiser  .mp3_file.active").next('.mp3_file').length) {
                    var nextSong = jQuery("#album-visualiser  .mp3_file.active").next('.mp3_file');
                    jQuery("#album-visualiser  .mp3_file.active").removeClass('active');
                    jQuery(nextSong).addClass('active');
                } else {
                    jQuery("#album-visualiser  .mp3_file.active").removeClass('active');
                    var nextSong = jQuery('#album-visualiser  .mp3_file').first();

                    jQuery('#album-visualiser  .mp3_file').first().addClass('active');
                }

            }

            uploadedAudio = loadSound(jQuery(nextSong).attr('data-src'), nextAudioPlay);
        }

    }


    function nextAudioPlay(audioFile) {
        
        if (song.isPlaying()) {
            song.pause();
        }

        song = audioFile;
        analyzer = new p5.Amplitude();
        analyzer.setInput(song);
        fft = new p5.FFT();
        fft.setInput(song);

        song.play();
        redraw();
        song.onended(playNext);
    }


    function setup() {

        // createFileInput(uploaded);


        myCanvas = createCanvas(windowWidth, windowHeight, 'p2d');
        myCanvas.parent("album-visualiser");
        frameRate(30);
        smooth();
        colorMode(HSB, 255, 255, 255, 255);
        analyzer = new p5.Amplitude();
        analyzer.setInput(song);
        fft = new p5.FFT();
        fft.setInput(song);
        song.play();
        song.onended(playNext);

        if (getAudioContext().state  == 'running') {
            jQuery("#album-visualiser .play-button").removeClass("active");
            jQuery("#album-visualiser .pause-button").addClass("active");
        } 
        else{
            jQuery("#album-visualiser .play-button").addClass("active");
            jQuery("#album-visualiser .pause-button").removeClass("active");
        } 
     
        jQuery("#album-visualiser .album-button").on("click", function() {
            if (song.isPlaying()) {
                song.pause();
                jQuery("#album-visualiser .play-button").addClass("active");
                jQuery("#album-visualiser .pause-button").removeClass("active");

            } else {
                song.play();
                jQuery("#album-visualiser .play-button").removeClass("active");
                jQuery("#album-visualiser .pause-button").addClass("active");
            }

        })

        ////next
        jQuery("#album-visualiser .album-button-next").on("click", function() {

            song.pause();
        });
        jQuery("#album-visualiser .album-button-previous").on("click", function() {
            jQuery("#album-visualiser .album-button-previous").addClass("active");
            song.pause();
        });
        jQuery('#next').on('click', function(e) {
            song.pause();
            jQuery("#album-visualiser .play-button").addClass("active");
            jQuery("#album-visualiser .pause-button").removeClass("active");

        });
        jQuery('.play-pause .play').on('click', function(e) {
            song.pause();
            jQuery("#album-visualiser .play-button").addClass("active");
            jQuery("#album-visualiser .pause-button").removeClass("active");

        });
        jQuery('.song-list-row').on('click', function(e) {
            song.pause();
            jQuery("#album-visualiser .play-button").addClass("active");
            jQuery("#album-visualiser .pause-button").removeClass("active");

        });

        // add an object inside array	
        for (var i = 0; i < numDots; i++) {
            dots[i] = new Dot(240, 0, random(0.95, 1), 0.5);
            t += 0.01;
            time += 0.001;
            getT[i] = t;
            getTime[i] = time;
        }
    }

    var varRot = 0;

    function draw() {
        vol_Bass = fft.getEnergy("bass") / 80;
        vol = map(vol_Bass, 0, 255, 0, 200);
        push();
        noStroke();
        fill(0);
        rect(0, 0, width, height);
        pop();
        push();
        translate(width / 2, height / 2);
        for (var i = 0; i < dots.length; ++i) {
            rotate(radians(360 / numDots));
            push();
            for (var j = i; j < dots.length; j += 10) {
                dots[i].intersect(dots[j]);
            }
            pop();
            dots[i].display();
            dots[i].move(vol); //*randNums[i]
        }
        varRot = varRot + vol / 100;
        time = time + 0.0001;
        pop();

        fft.analyze();
        var bass = fft.getEnergy("bass");
        var treble = fft.getEnergy(50, 110);
        var mid = fft.getEnergy("mid");
        var mapMid = map(mid, 0, 255, -radius, radius);
        var scaleMid = map(mid, 0, 255, 1, 1.5);
        var mapTreble = map(treble, 0, 255, -radius / 2, radius * 2);
        var scaleTreble = map(treble, 0, 255, 0.5, 2);
        var mapbass = map(bass, 0, 255, 0, 200);
        var scalebass = map(bass, 0, 255, 0, 0.8);

        mapMouseX = map(mouseX, 0, width, 100, 200);
        mapMouseScale = map(mouseX, 0, width, 0.35, 0.2);
        mapMouseY = map(mouseY, 0, height, windowHeight / 4, windowHeight);

        pieces = 9;
        radius = 200;
        translate(windowWidth / 2, windowHeight / 2);
        for (i = 0; i < pieces; i += 1) {
            rotate(TWO_PI / pieces);
            noFill();
            /*----------  BASS  ---------- */
            push();
            strokeWeight(8);
            stroke(bassColor[0]);
            scale(scalebass + mapMouseScale);
            point(mapbass, radius / 2);
            stroke(bassColor[1]);
            strokeWeight(2.2);
            point(mapMouseX, radius);
            pop();
            /*----------  MID  ---------- */
            push();
            stroke(midColor);
            strokeWeight(5);
            rotate(-frameCount * 0.01);
            point(mapMid, radius);
            pop();
            /*----------  TREMBLE  ----------*/
            push();
            stroke(trembleColor);
            strokeWeight(4);
            scale(mapMouseScale);
            rotate(frameCount * 0.01);
            point(-100, radius / 2);
            point(100, radius / 2);
            pop();

        }

    }

    function Dot(tempX, tempY, tempSpeed, tempSpeedY) {
        this.x = tempX;
        this.y = tempY;
        this.speed = tempSpeed;
        this.speedY = tempSpeedY;
        this.alph = random(120, 255);
        this.c = "#fff";
        this.eleSize = random(2, 10);
    }

    Dot.prototype.display = function() {
        noStroke();
        if (random(1) > 0.995) {
            this.vol2 = vol;

            if (analyzer.getLevel() > 0.3) {
                ellipse(this.x, this.y, this.vol2, this.vol2);
            } else {
                ellipse(this.x, this.y, this.vol2, this.vol2);
            }

        } else {
            ellipse(this.x, this.y, this.eleSize - 3, this.eleSize - 3);
        }
    }

    Dot.prototype.move = function(tempA) {
        this.ranSize = tempA * 10;
        constrain(this.ranSize, 0, 3);
        this.x = this.x + this.speed * (tempA / 1);
        if (this.y > 100) {
            this.speedY = -this.speedY;
        } else if (this.y < -100) {
            this.speedY = -this.speedY;
        }
        if (this.x > 240) {
            this.speed = -this.speed;
        } else if (this.x < 210) { //* tempA
            this.speed = -this.speed;
        }
    }

    Dot.prototype.intersect = function(other) {
        stroke(this.c);
        noFill();
        strokeWeight(1.5);
        line(other.x, other.y, this.x, this.y);

    }

    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
    }
}