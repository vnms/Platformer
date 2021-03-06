var c = document.getElementById("game");
var ctx = c.getContext("2d");
setTimeout(function(){c.style.opacity = 1;}, 250);

function sizeWindow() {
    c.width = document.body.clientWidth || self.innerWidth;
    c.height = document.body.clientHeight || self.innerHeight;
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}
function colorSet(clr) {
    player.color = clr;
    fadeCol(clr);
}

function fadeIO() {
    c.style.opacity = 0;
    setTimeout(function() {c.style.opacity = 1}, 200);
}
function fadeCol(thecolor) {
    c.style.background = thecolor;
    setTimeout(function() {c.style.background = "lightblue";}, 200);
}

var mouseX = 0, mouseY = 0, keys = [], mousePressed = false, menu = false;

document.addEventListener("mousemove", function(e) {mouseX = e.clientX; mouseY = e.clientY;});
document.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;

    if (keys[80]) {
        if (!paused) {
            paused = true;
            postToBoard("Paused");
        } else {
            paused = false;
            postToBoard("Unpaused");
        }
    }
    if (keys[79]) {
        if (!outlines) {
            fadeIO();
            setTimeout(function() {outlines = true;}, 100);
        } else {
            fadeIO();
            setTimeout(function() {outlines = false;}, 100);
        }
    }
    if (keys[77]) {
        if (!menu) {
            menu = true;
            document.getElementById("overlay").style.display = "block";
            setTimeout(function() {document.getElementById("overlay").style.opacity = 1;}, 25);
        } else {
            menu = false;
            document.getElementById("overlay").style.opacity = 0;
            setTimeout(function() {document.getElementById("overlay").style.display = "none"}, 300);
        }
    }
});
document.addEventListener("keyup", function(e) {keys[e.keyCode] = false});

var map = {
    output: [],
    grass: [],
    clouds: [],
    trees: [],
    levels: [
      [{type: 'g', x: -100, y: 0}],
      [{type: 's', x: 100, y: 0},{type: 'g', x: 180, y: 0}],
      [{type: 's', x: -520, y: 20},{type: 's', x: -580, y: 20},{type: 's', x: -600, y: 20},{type: 's', x: -620, y: 20},{type: 'g', x: -600, y: 0}],
      [{type: 's', x: 80, y: 0},{type: 'l', x: 60, y: 0},{type: 'g', x: 260, y: 0}],
      [{type: 's', x: 500, y: 20},{type: 's', x: 560, y: 20},{type: 's', x: 500, y: 40},{type: 's', x: 560, y: 40},{type: 's', x: 560, y: 60},{type: 's', x: 640, y: 20},{type: 's', x: 640, y: 20},{type: 's', x: 640, y: 40},{type: 's', x: 720, y: 20},{type: 's', x: 780, y: 40},{type: 's', x: 780, y: 60},{type: 's', x: 860, y: 60},{type: 's', x: 900, y: 60},{type: 's', x: 880, y: 60},{type: 's', x: 880, y: 80},{type: 's', x: 900, y: 80},{type: 's', x: 900, y: 100},{type: 's', x: 900, y: 120},{type: 's', x: 920, y: 80},{type: 'g', x: 920, y: 60}],
      [{type: 'l', x: 140, y: 0},{type: 'l', x: 160, y: 0},{type: 'l', x: 180, y: 0},{type: 'l', x: 200, y: 0},{type: 'l', x: 220, y: 0},{type: 's', x: 120, y: 0},{type: 's', x: 100, y: 0},{type: 's', x: 240, y: 0},{type: 's', x: 260, y: 0},{type: 's', x: 340, y: 0},{type: 's', x: 360, y: 0},{type: 'l', x: 280, y: 0},{type: 'l', x: 300, y: 0},{type: 'l', x: 320, y: 0},{type: 'g', x: 480, y: -40}],
      [{type: 's', x: 500, y: 300},{type: 's', x: 520, y: 300},{type: 's', x: 540, y: 300},{type: 's', x: 560, y: 300},{type: 's', x: 580, y: 300},{type: 's', x: 560, y: 320},{type: 's', x: 600, y: 300},{type: 's', x: 620, y: 300},{type: 's', x: 640, y: 300},{type: 's', x: 640, y: 320},{type: 's', x: 720, y: 300},{type: 's', x: 720, y: 320},{type: 's', x: 740, y: 300},{type: 's', x: 760, y: 300},{type: 's', x: 820, y: 300},{type: 's', x: 840, y: 300},{type: 's', x: 840, y: 320},{type: 's', x: 940, y: 300},{type: 's', x: 960, y: 300},{type: 's', x: 980, y: 300},{type: 's', x: 980, y: 320},{type: 's', x: 1060, y: 320},{type: 's', x: 1060, y: 300},{type: 's', x: 1080, y: 300},{type: 's', x: 1120, y: 300},{type: 's', x: 1100, y: 300},{type: 's', x: 1180, y: 280},{type: 's', x: 1260, y: 300},{type: 's', x: 1300, y: 260},{type: 's', x: 1280, y: 280},{type: 's', x: 1300, y: 280},{type: 's', x: 1300, y: 300},{type: 's', x: 1280, y: 300},{type: 's', x: 1380, y: 260},{type: 's', x: 1460, y: 280},{type: 's', x: 1560, y: 280},{type: 's', x: 1540, y: 280},{type: 'g', x: 1560, y: 260}],
      [{type: 'i', x: 100, y: 0},{type: 'i', x: 160, y: -20},{type: 'i', x: 220, y: -20},{type: 'i', x: 260, y: -40},{type: 'i', x: 340, y: -60},{type: 'i', x: 280, y: -40},{type: 'i', x: 400, y: -20},{type: 'i', x: 480, y: 0},{type: 'l', x: 120, y: 0},{type: 'l', x: 140, y: 0},{type: 'l', x: 160, y: 0},{type: 'l', x: 180, y: 0},{type: 'l', x: 200, y: 0},{type: 'l', x: 220, y: 0},{type: 'l', x: 240, y: 0},{type: 'l', x: 260, y: 0},{type: 'l', x: 280, y: 0},{type: 'l', x: 300, y: 0},{type: 'l', x: 320, y: 0},{type: 'l', x: 340, y: 0},{type: 'l', x: 360, y: 0},{type: 'l', x: 380, y: 0},{type: 'l', x: 400, y: 0},{type: 'l', x: 420, y: 0},{type: 'l', x: 440, y: 0},{type: 'l', x: 460, y: 0},{type: 's', x: 500, y: 100},{type: 's', x: 520, y: 100},{type: 'i', x: 580, y: 100},{type: 's', x: 640, y: 140},{type: 's', x: 660, y: 140},{type: 'g', x: 680, y: 140},{type: 's', x: 660, y: 160},{type: 's', x: 640, y: 160},{type: 's', x: 640, y: 180},{type: 's', x: 660, y: 180},{type: 's', x: 680, y: 180},{type: 's', x: 700, y: 180},{type: 's', x: 700, y: 180},{type: 's', x: 720, y: 180},{type: 's', x: 680, y: 160},{type: 's', x: 700, y: 160},{type: 's', x: 700, y: 140},{type: 's', x: 720, y: 140},{type: 's', x: 720, y: 160},{type: 's', x: 720, y: 120},{type: 's', x: 720, y: 100},{type: 's', x: 640, y: 120},{type: 's', x: 640, y: 100},{type: 's', x: 680, y: 200},{type: 's', x: 680, y: 220},{type: 's', x: 680, y: 240},{type: 's', x: 680, y: 260},{type: 's', x: 680, y: 280},{type: 's', x: 680, y: 300},{type: 's', x: 680, y: 300},{type: 's', x: 640, y: 200},{type: 's', x: 640, y: 220},{type: 's', x: 640, y: 240},{type: 's', x: 640, y: 260},{type: 's', x: 640, y: 280},{type: 's', x: 640, y: 300},{type: 's', x: 640, y: 320},{type: 's', x: 680, y: 320},{type: 's', x: 720, y: 200},{type: 's', x: 720, y: 220},{type: 's', x: 720, y: 240},{type: 's', x: 720, y: 260},{type: 's', x: 720, y: 280},{type: 's', x: 720, y: 300},{type: 's', x: 720, y: 320}],
      [{type: 'b', x: -160, y: -60}, {type: 's', x: 80, y: 0},{type: 's', x: -60, y: 0},{type: 's', x: -60, y: -20},{type: 's', x: -60, y: -40},{type: 's', x: -60, y: -60},{type: 's', x: 80, y: -20},{type: 's', x: 80, y: -40},{type: 's', x: 80, y: -60},{type: 'b', x: 60, y: 0},{type: 'b', x: -40, y: 0},{type: 'i', x: 100, y: -60},{type: 'i', x: -80, y: -60},{type: 'i', x: 120, y: -60},{type: 'i', x: -100, y: -60},{type: 's', x: -160, y: -40},{type: 's', x: 160, y: -80},{type: 's', x: 220, y: -100},{type: 's', x: -140, y: -120},{type: 's', x: -100, y: -140},{type: 's', x: -40, y: -160},{type: 's', x: 20, y: -180},{type: 'g', x: 20, y: -200},{type: 's', x: 280, y: -100},{type: 's', x: 320, y: -60},{type: 's', x: 360, y: -40},{type: 's', x: 420, y: -60},{type: 'g', x: 420, y: -80}],
      [{type: 'tp', x1: -200, y1: 0, x: 380, y: 0},{type: 'g', x: 460, y: 0},{type: 's', x: 120, y: 0},{type: 's', x: 120, y: -20},{type: 's', x: 120, y: -40},{type: 's', x: 120, y: -60},{type: 's', x: 120, y: -80},{type: 'l', x: 120, y: -100},{type: 'l', x: 100, y: -120},{type: 'l', x: 80, y: -120},{type: 'l', x: 140, y: -120},{type: 'l', x: 160, y: -120},{type: 'l', x: 100, y: -100},{type: 'l', x: 140, y: -100}],
      [{type: 'tp', x: -220, y: 0, x1: 0, y1: -220},{type: 'tp', x: 140, y: -220, x1: -160, y1: -320},{type: 'tp', x: -260, y: -320, x1: -520, y1: 160},{type: 'tp', x: -560, y: 160, x1: 500, y1: 200},{type: 'g', x: 540, y: 200},{type: 's', x: -20, y: -200},{type: 's', x: 0, y: -200},{type: 's', x: 20, y: -200},{type: 's', x: 40, y: -200},{type: 's', x: 60, y: -200},{type: 's', x: 80, y: -200},{type: 's', x: 100, y: -200},{type: 's', x: 120, y: -200},{type: 's', x: 140, y: -200},{type: 's', x: 160, y: -200},{type: 's', x: -140, y: -300},{type: 's', x: -160, y: -300},{type: 's', x: -180, y: -300},{type: 's', x: -200, y: -300},{type: 's', x: -220, y: -300},{type: 's', x: -240, y: -300},{type: 's', x: -260, y: -300},{type: 's', x: -280, y: -300},{type: 's', x: -580, y: 180},{type: 's', x: -560, y: 180},{type: 's', x: -540, y: 180},{type: 's', x: -520, y: 180},{type: 's', x: 500, y: 220},{type: 's', x: 520, y: 220},{type: 's', x: 540, y: 220},{type: 's', x: 560, y: 220}],
      [{type: 's', x: 40, y: 0},{type: 's', x: 100, y: -20},{type: 'i', x: 120, y: -20},{type: 's', x: 180, y: -20},{type: 's', x: 260, y: -40},{type: 's', x: 320, y: -20},{type: 's', x: 400, y: 0},{type: 'g', x: 480, y: 0},{type: 'l', x: 60, y: 0},{type: 'l', x: 80, y: 0},{type: 'l', x: 100, y: 0},{type: 'l', x: 120, y: 0},{type: 'l', x: 140, y: 0},{type: 'l', x: 180, y: 0},{type: 'l', x: 160, y: 0},{type: 'l', x: 200, y: 0},{type: 'l', x: 220, y: 0},{type: 'l', x: 240, y: 0},{type: 'l', x: 260, y: 0},{type: 'l', x: 280, y: 0},{type: 'l', x: 300, y: 0},{type: 'l', x: 320, y: 0},{type: 'l', x: 340, y: 0},{type: 'l', x: 360, y: 0},{type: 'l', x: 380, y: 0},{type: 's', x: 440, y: 0},{type: 's', x: 440, y: -20},{type: 's', x: 440, y: -40},{type: 's', x: 460, y: -40},{type: 's', x: 480, y: -40},{type: 's', x: 500, y: -40},{type: 's', x: 520, y: -40},{type: 's', x: 500, y: 20},{type: 's', x: 520, y: 20},{type: 's', x: 540, y: 20},{type: 's', x: 540, y: 0},{type: 's', x: 540, y: -20},{type: 's', x: 540, y: -40},{type: 's', x: 540, y: 40},{type: 's', x: 520, y: 60},{type: 's', x: 500, y: 80},{type: 's', x: 520, y: 80},{type: 's', x: 540, y: 60},{type: 's', x: 500, y: 100},{type: 's', x: 500, y: 140},{type: 's', x: 500, y: 120},{type: 's', x: 120, y: -140},{type: 's', x: 300, y: -160},{type: 's', x: 180, y: -200},{type: 's', x: 20, y: -200},{type: 's', x: -40, y: -120},{type: 's', x: -220, y: -180},{type: 's', x: -260, y: -140},{type: 's', x: -80, y: -180},{type: 's', x: 380, y: -200},{type: 's', x: -360, y: -180},{type: 's', x: -400, y: -140},{type: 'i', x: -160, y: -160},{type: 'i', x: 20, y: -160},{type: 'i', x: 80, y: -200},{type: 'i', x: 200, y: -160},{type: 'i', x: 280, y: -200},{type: 'i', x: 380, y: -180},{type: 'i', x: -320, y: -140},{type: 'i', x: 580, y: 0},{type: 'i', x: 560, y: -100},{type: 'i', x: 460, y: -100},{type: 's', x: 460, y: -140},{type: 's', x: 540, y: -80},{type: 's', x: 600, y: -60},{type: 'i', x: -400, y: -180},{type: 'tp', x: -520, y: 280, x1: 520, y1: 0},{type: 's', x: -560, y: 300},{type: 's', x: -540, y: 300},{type: 's', x: -520, y: 300}],
      [{type: 's', x: 240, y: -140},{type: 's', x: 260, y: -140},{type: 's', x: 280, y: -140},{type: 's', x: 300, y: -140},{type: 's', x: 320, y: -140},{type: 's', x: 340, y: -140},{type: 's', x: 240, y: 0},{type: 's', x: 260, y: 0},{type: 's', x: 280, y: 0},{type: 's', x: 300, y: 0},{type: 's', x: 320, y: 0},{type: 's', x: 340, y: 0},{type: 'l', x: 240, y: -160},{type: 'l', x: 240, y: -180},{type: 'l', x: 340, y: -160},{type: 'l', x: 340, y: -180},{type: 's', x: 260, y: -160},{type: 's', x: 280, y: -160},{type: 's', x: 300, y: -160},{type: 's', x: 320, y: -160},{type: 's', x: 320, y: -180},{type: 's', x: 300, y: -180},{type: 's', x: 280, y: -180},{type: 's', x: 260, y: -180},{type: 's', x: 220, y: -140},{type: 's', x: 220, y: -160},{type: 's', x: 360, y: -140},{type: 's', x: 360, y: -160},{type: 's', x: 360, y: -180},{type: 's', x: 360, y: -200},{type: 's', x: 220, y: -180},{type: 's', x: 220, y: -200},{type: 's', x: 220, y: -120},{type: 's', x: 240, y: -120},{type: 's', x: 240, y: -100},{type: 's', x: 260, y: -120},{type: 's', x: 300, y: -120},{type: 's', x: 320, y: -120},{type: 's', x: 340, y: -120},{type: 's', x: 320, y: -100},{type: 'i', x: -120, y: -220},{type: 'i', x: -100, y: -220},{type: 'i', x: -80, y: -220},{type: 'i', x: -100, y: -200},{type: 'i', x: -100, y: -180},{type: 'i', x: -40, y: -220},{type: 'i', x: -40, y: -200},{type: 'i', x: -40, y: -180},{type: 'i', x: -20, y: -200},{type: 'i', x: 0, y: -180},{type: 'i', x: 0, y: -220},{type: 'i', x: 0, y: -200},{type: 'i', x: 40, y: -220},{type: 'i', x: 60, y: -200},{type: 'i', x: 40, y: -180},{type: 'i', x: 80, y: -180},{type: 'i', x: 80, y: -220},{type: 'i', x: -160, y: -160},{type: 'i', x: -160, y: -140},{type: 'i', x: -160, y: -120},{type: 'i', x: -180, y: -140},{type: 'i', x: -180, y: -140},{type: 'i', x: -200, y: -140},{type: 'i', x: -200, y: -160},{type: 'i', x: -100, y: -100},{type: 'i', x: -100, y: -120},{type: 'i', x: -100, y: -140},{type: 'i', x: -80, y: -140},{type: 'i', x: -60, y: -140},{type: 'i', x: -60, y: -120},{type: 'i', x: -80, y: -120},{type: 'i', x: -40, y: -140},{type: 'i', x: -40, y: -120},{type: 'i', x: 0, y: -140},{type: 'i', x: 0, y: -120},{type: 'i', x: 0, y: -100},{type: 'i', x: 20, y: -100},{type: 'i', x: 60, y: -100},{type: 'i', x: 60, y: -120},{type: 'i', x: 60, y: -140},{type: 'i', x: 80, y: -140},{type: 'i', x: 100, y: -140},{type: 'i', x: 100, y: -120},{type: 'i', x: 100, y: -100},{type: 'i', x: -160, y: -80},{type: 'i', x: -160, y: -60},{type: 'i', x: -140, y: -60},{type: 'i', x: -120, y: -80},{type: 'i', x: -120, y: -60},{type: 'i', x: -140, y: -40},{type: 'i', x: -80, y: -80},{type: 'i', x: -80, y: -60},{type: 'i', x: -80, y: -40},{type: 'i', x: -60, y: -40},{type: 'i', x: -60, y: -60},{type: 'i', x: -60, y: -80},{type: 'i', x: -20, y: -40},{type: 'i', x: -20, y: -60},{type: 'i', x: 0, y: -60},{type: 'i', x: 20, y: -40},{type: 'i', x: 40, y: -40},{type: 'i', x: 40, y: -60},{type: 'i', x: 80, y: -40},{type: 'i', x: 100, y: -40},{type: 'i', x: 80, y: -60},{type: 'i', x: 100, y: -60},{type: 'i', x: 80, y: -20},{type: 'i', x: 100, y: -20},{type: 'i', x: 120, y: -20},{type: 'i', x: 140, y: -20},{type: 'i', x: 140, y: -40},{type: 'g', x: 280, y: -20}],
    ],
    levelMessages: [{msg: "enter the green shaky thing. that is the goal.", said: false}, {msg: "block in the way.", said: false}, {msg: "mind the gap.", said: false}, {msg: "oh. lava.", said: false}, {msg: "don't fall!", said: false}, {msg: "haha.", said: false}, {msg: "sea spray", said: false}, {msg: "icy death", said: false}, {msg: "choose+bounce", said: false}, {msg: "teleport", said: false}, {msg: "confusion", said: false}, {msg: "wut", said: false}, {msg: "", said: false}],
    currlevel: 0
}

var deathmessages = ["ow.", "that hurt!", "please stop.", "this isn't fun!", "why?", "stop!", "I'm telling the creator!", "that's it!", "I don't want to do this anymore!", "I'm warning you!", "last chance!"];
var dmgc = 0;

var goalTime = 300;

for (var cl = 0; cl < 20; cl += 1) {
    map.clouds.push({x: random(-2000, 2000), y: random(200, 500), op: random(2, 7)/10, s: random(100, 300), sp: random(1, 30)/10});
}
for (var t = 0; t < 5; t += 1) {
    map.trees.push({x: Math.round(random(-5.00, 4.50)+6.75)*100-200});
}

function postToBoard(txt, hl) {
    if (!hl) {
        hl = 200;
    }
    map.output.push({text: txt, time: hl});
}

var tpCoolDown = 0;

var flymode;
//SET TRUE FOR FLIGHT ^^^

var ggui = false;
function toggleGui() {
    if (ggui) {
        ggui = false;
    } else {
        ggui = true;
    }
}

var totalFrames = 0;

var player = {
    x: 0,
    y: 0,
    xv: 0,
    yv: 0,
    overFloor: false,
    die: function() {
        player.x = 0;
        player.y = 0;
        player.xv = 0;
        player.yv = 0;
        fadeIO();
        postToBoard("player: "+deathmessages[player.deaths]);
        player.overFloor = false;
        player.deaths += 1;
        if (player.deaths > 11) {
          fadeIO();
          window.location = "lose.html";
        }
    },
    overIce: false,
    overStone: false,
    tps: 0,
    deaths: 0,
    nextLevel: function() {
        if (map.currlevel < map.levels.length-1) {
            map.currlevel ++;
            player.x = 0;
            player.y = 0;
            player.xv = 0;
            player.yv = 0;
            fadeIO();
            //postToBoard("level "+(map.currlevel+1)+")")
        } else {
            window.location="win.html";
        }
    },
    setLevel: function(toWhat) {
        toWhat = Math.round(toWhat);
        if (toWhat <= map.levels.length && toWhat >= 1) {

            map.currlevel = toWhat-1;
            player.x = 0;
            player.y = 0;
            player.xv = 0;
            player.yv = 0;
            fadeIO();

            if (map.levelMessages[map.currlevel].said === true) {
                postToBoard(map.levelMessages[map.currlevel].msg);
            }
            postToBoard("Level is now level! (Level "+(map.currlevel+1)+")");
        }
    },
    color: "#777",
    shifting: false,
}
var achievements = [{name: "Jump!", desc: "Take your first leap!", condition: function() {if (player.yv < 0) {achievements[0].yes = true}}, acheived: false}, {name: "Slippery!", desc: "Slide on ice.", condition: function() {if (player.overIce) {achievements[1].yes = true}}, acheived: false}, {name: "Teleporter!", desc: "Teleport.", condition: function() {if (player.tps > 0) {achievements[2].yes = true}}, acheived: false}, {name: "Owwww!", desc: "Die.", condition: function() {if (player.deaths > 0) {achievements[3].yes = true}}, acheived: false}, {name: "Experienced at Death", desc: "Die over 10 times.", condition: function() {if (player.deaths > 10) {achievements[4].yes = true}}, acheived: false}, {name: "Move It!", desc: "Try moving a little", condition: function() {if (player.xv !== 0) {achievements[5].yes = true}}, achieved: false}, {name: "Taking it Slowly", desc: "Use shift", condition: function() {if (player.shifting) {achievements[6].yes = true}}, achieved: false}];

var paused = false;
var outlines = false;

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);

    for (var t in map.trees) {
        if (!outlines) {
            ctx.fillStyle = "#661400";
            ctx.fillRect(map.trees[t].x-player.x+c.width/2-500, c.height/2-190-player.y, 50, 200);
            ctx.fillStyle = "#2a4";
            ctx.fillRect(map.trees[t].x-player.x-10+c.width/2-500, c.height/2-200-player.y, 70, 125);
        } else {
            ctx.strokeStyle = "#661400";
            ctx.strokeRect(map.trees[t].x-player.x+c.width/2-500, c.height/2-190-player.y, 50, 200);
            ctx.strokeStyle = "#2a4";
            ctx.strokeRect(map.trees[t].x-player.x-10+c.width/2-500,  c.height/2-200-player.y, 70, 125);
        }
    }

    for (var g = 0; g < map.grass.length; g++) {
        ctx.fillStyle = "#4A3";
        ctx.strokeStyle = "#4A3";
        if (!outlines) {
            ctx.fillRect(map.grass[g].x-player.x+(c.width/2)-5, c.height/2-player.y-(map.grass[g].height-10), map.grass[g].width, map.grass[g].height);
        } else {
            ctx.strokeRect(map.grass[g].x-player.x+(c.width/2)-5, c.height/2-player.y-(map.grass[g].height-10), map.grass[g].width, map.grass[g].height);
        }
    }

    ctx.fillStyle = player.color;
    ctx.strokeStyle = player.color;
    if (!outlines) {
        ctx.fillRect(c.width/2-10, c.height/2-10, 20, 20);
        ctx.fillStyle = "rgba(250, 250, 250, 0.3)"
        ctx.beginPath();
        ctx.moveTo(c.width/2-10, c.height/2-10);
        ctx.lineTo(c.width/2+10, c.height/2-10);
        ctx.lineTo(c.width/2-10, c.height/2+10);
        ctx.fill();
    } else {
        ctx.strokeRect(c.width/2-10, c.height/2-10, 20, 20);
    }

    for (var b = 0; b < map.levels[map.currlevel].length; b ++) {
        ctx.fillStyle = "#AAA";
        ctx.strokeStyle="#AAA";
        if (map.levels[map.currlevel][b].type === "s" || map.levels[map.currlevel][b].type === "mp") {
            if (!outlines) {
                ctx.fillRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-10, map.levels[map.currlevel][b].y-player.y+(c.height/2)-10, 20, 20);
                ctx.fillStyle = "#999";
                ctx.fillRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-7.5, map.levels[map.currlevel][b].y-player.y+(c.height/2)-7.5, 15, 15);
            } else {
                ctx.strokeRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-10, map.levels[map.currlevel][b].y-player.y+(c.height/2)-10, 20, 20);
                ctx.strokeStyle = "#999";
                ctx.strokeRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-7.5, map.levels[map.currlevel][b].y-player.y+(c.height/2)-7.5, 15, 15);
            }
        } else if (map.levels[map.currlevel][b].type === "l") {
            ctx.fillStyle = "#F30";
            ctx.strokeStyle="#F30";
            if (!outlines) {
                ctx.fillRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-10, map.levels[map.currlevel][b].y-player.y+(c.height/2)-7, 20, 17);
                ctx.fillStyle = "#F42";
                ctx.fillRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-7.5, map.levels[map.currlevel][b].y-player.y+(c.height/2)-7.5, 15, 15);
            } else {
                ctx.strokeRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-10, map.levels[map.currlevel][b].y-player.y+(c.height/2)-7, 20, 17);
                ctx.strokeStyle = "#F42";
                ctx.strokeRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-7.5, map.levels[map.currlevel][b].y-player.y+(c.height/2)-7.5, 15, 15);
            }
        } else if (map.levels[map.currlevel][b].type === "b") {
            ctx.fillStyle = "#A0A";
            ctx.strokeStyle="#A0A";
            if (!outlines) {
                ctx.fillRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-10, map.levels[map.currlevel][b].y-player.y+(c.height/2)+6, 20, 4);
            } else {
                ctx.strokeRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-10, map.levels[map.currlevel][b].y-player.y+(c.height/2)+6, 20, 4);
            }
        } else if (map.levels[map.currlevel][b].type === "i") {
            ctx.fillStyle = "#9BF";
            ctx.strokeStyle="#9BF";
            if (!outlines) {
                ctx.fillRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-10, map.levels[map.currlevel][b].y-player.y+(c.height/2)-10, 20, 20);
                ctx.fillStyle = "#8AE";
                ctx.fillRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-10, map.levels[map.currlevel][b].y-player.y+(c.height/2)-10, 20, 5);
            } else {
                ctx.strokeRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-10, map.levels[map.currlevel][b].y-player.y+(c.height/2)-10, 20, 20);
                ctx.strokeStyle = "#8AE";
                ctx.strokeRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-10, map.levels[map.currlevel][b].y-player.y+(c.height/2)-10, 20, 5);
            }
        }  else if (map.levels[map.currlevel][b].type === "tp") {
            ctx.fillStyle = "#0BF";
            ctx.strokeStyle="#0BF";
            if (!outlines) {
                ctx.fillRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-10, map.levels[map.currlevel][b].y-player.y+(c.height/2)-10, 20, 20);
                ctx.fillStyle = "#FB0";
                ctx.fillRect(map.levels[map.currlevel][b].x1-player.x+(c.width/2)-10, map.levels[map.currlevel][b].y1-player.y+(c.height/2)-10, 20, 20);
            } else {
                ctx.strokeRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-10, map.levels[map.currlevel][b].y-player.y+(c.height/2)-10, 20, 20);
                ctx.strokeStyle="#FB0";
                ctx.strokeRect(map.levels[map.currlevel][b].x1-player.x+(c.width/2)-10, map.levels[map.currlevel][b].y1-player.y+(c.height/2)-10, 20, 20);
            }
        } else if (map.levels[map.currlevel][b].type === "g") {
            ctx.fillStyle = "#9F9";
            ctx.strokeStyle = "#9F9";
            var _ = random(-2, 2);
            var __ = random(-2, 2);
            if (!outlines) {
                ctx.fillRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-10+_, map.levels[map.currlevel][b].y-player.y+(c.height/2)-10+__, 20, 20);
            } else {
                ctx.strokeRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-10+_, map.levels[map.currlevel][b].y-player.y+(c.height/2)-10+__, 20, 20);
            }
            ctx.fillStyle = "#5A5";
            ctx.strokeStyle = "#5A5";
            if (!outlines) {
                ctx.fillRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-7.5+(_*2), map.levels[map.currlevel][b].y-player.y+(c.height/2)-7.5+(__*2), 15, 15);
            } else {
                ctx.strokeRect(map.levels[map.currlevel][b].x-player.x+(c.width/2)-7.5+(_*2), map.levels[map.currlevel][b].y-player.y+(c.height/2)-7.5+(__*2), 15, 15);
            }
            _ = undefined;
            __ = undefined;
        } else {

        }
    }

    ctx.fillStyle = "#2D5";
    ctx.strokeStyle = "#2D5";
    if (!outlines) {
        ctx.fillRect(c.width/2-507.5-player.x, (c.height/2+10)-player.y, 997.5, (c.height/2+10)+player.y);
    } else {
        ctx.strokeRect(c.width/2-507.5-player.x, (c.height/2+10)-player.y, 997.5, (c.height/2+10)+player.y);
    }
    ctx.fillStyle = "#801a00";
    ctx.strokeStyle = "#801a00";
    if (!outlines) {
        ctx.fillRect(c.width/2-507.5-player.x, (c.height/2+50)-player.y, 997.5, (c.height/2+50)+player.y);
    } else {
        ctx.strokeRect(c.width/2-507.5-player.x, (c.height/2+50)-player.y, 997.5, (c.height/2+50)+player.y);
    }
    ctx.fillStyle = "#400600";
    ctx.strokeStyle = "#400600";
    if (!outlines) {
        ctx.fillRect(c.width/2-507.5-player.x, (c.height/2+150)-player.y, 997.5, (c.height/2+150)+player.y);
    } else {
        ctx.strokeRect(c.width/2-507.5-player.x, (c.height/2+150)-player.y, 997.5, (c.height/2+150)+player.y);
    }
    ctx.fillStyle = "#555";
    ctx.strokeStyle = "#555";
    if (!outlines) {
        ctx.fillRect(c.width/2-507.5-player.x, (c.height/2+300)-player.y, 997.5, (c.height/2+300)+player.y);
    } else {
        ctx.strokeRect(c.width/2-507.5-player.x, (c.height/2+300)-player.y, 997.5, (c.height/2+300)+player.y);
    }

    ctx.fillStyle = "#09e";
    ctx.strokeStyle = "#09e";
    if (!outlines) {
        ctx.fillRect(0, (c.height/2+310+Math.sin(totalFrames/50)*10)-player.y, c.width, (c.height/2+300)+player.y);
    } else {
        ctx.strokeRect(0, (c.height/2+310)-player.y, c.width, (c.height/2+300)+player.y);
    }

    for (var cl = 0; cl < map.clouds.length; cl++) {
        ctx.fillStyle = "rgba(255, 255, 255, "+map.clouds[cl].op+")";
        ctx.strokeStyle = "#FFF";
        if (!outlines) {
            ctx.fillRect(map.clouds[cl].x-player.x+(c.width/2)-5, c.height/2-player.y-(map.clouds[cl].y), map.clouds[cl].s, 100);
        } else {
            ctx.strokeRect(map.clouds[cl].x-player.x+(c.width/2)-5, c.height/2-player.y-(map.clouds[cl].y), map.clouds[cl].s, 100);
        }
        map.clouds[cl].x += map.clouds[cl].sp;
        if (map.clouds[cl].x > 2000) {
          map.clouds[cl].x = -2100
        }
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    if (ggui) {ctx.fillRect(5, 0, 190, 25);}
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font="20px Open Sans Condensed, arial";
    if (ggui) {
        ctx.fillText("x:"+Math.round(player.x)+" y:"+Math.round(player.y)+" yv:"+Math.round(player.yv)+" xv:"+Math.round(player.xv)+" deaths:"+player.deaths, 10, 20);
    }
    var oty = 45;
    var anyText = false;
    for (var t = 0; t < map.output.length; t ++) {
        if (map.output[t].time > 0) {
            map.output[t].time -= 1;
            if (c.width < 500) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
            ctx.fillRect(10, oty-20, map.output[t].text.length*10, 25);
            ctx.fillStyle = "rgba(255, 255, 255, "+map.output[t].time/100+")";
            ctx.fillText(map.output[t].text, 20, oty);
            anyText = true;
            oty += 30;
          } else {
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
            ctx.fillRect(50, oty+10, map.output[t].text.length*20, 50);
            ctx.font="50px Open Sans Condensed, arial";
            ctx.fillStyle = "rgba(255, 255, 255, "+map.output[t].time/100+")";
            ctx.fillText(map.output[t].text, 50, oty+50);
            anyText = true;
            oty += 60;
          }
        } else {
            //Why is this even here???
        }
    }
    //Cleaning the board if there is nothing in it.
    if (!anyText) {
        map.output = []; //Variables in lists add up, so this will keep this list clean.
    }

    anyText = undefined;
    oty = undefined;

    if (!paused) {
        if (tpCoolDown > 0) {
            tpCoolDown --;
        }
        if (player.yv > 9) {
            player.yv = 9;
        }
        player.y += player.yv;
        player.x += player.xv;

        if (player.y > 0 && player.x > -517.5 && player.x < 497.5 && player.y < 20) {
            player.y = 0;
            player.overFloor = true;
            player.yv = 0;
        }
        if (player.y > 20 && player.x > -517.5 && player.x < -500) {
            player.x = -517.5;
        }
        if (player.y > 20 && player.x > 485 && player.x < 497.5) {
            player.x = 497.5;
        }

        if (player.y > 400) {
            player.die();
        }

        for (var b = 0; b < map.levels[map.currlevel].length; b += 1) {
            if (player.x >= map.levels[map.currlevel][b].x && player.x < map.levels[map.currlevel][b].x+20 || player.x < map.levels[map.currlevel][b].x && player.x > map.levels[map.currlevel][b].x-20) {
                if (map.levels[map.currlevel][b].type === "s" || map.levels[map.currlevel][b].type === "i" || map.levels[map.currlevel][b].type === "mp") {
                    if (player.y < map.levels[map.currlevel][b].y+20 && player.y > map.levels[map.currlevel][b].y+14) {
                        player.y = map.levels[map.currlevel][b].y+21;
                        player.yv = 0;
                    }
                    if (player.y < map.levels[map.currlevel][b].y-10 && player.y > map.levels[map.currlevel][b].y-20) {
                        player.overFloor = true;
                        player.yv = 0;
                        player.y = map.levels[map.currlevel][b].y-20;
                    }
                    if (player.y < map.levels[map.currlevel][b].y+14 && player.y > map.levels[map.currlevel][b].y-14) {
                        if (player.x > map.levels[map.currlevel][b].x && player.x < map.levels[map.currlevel][b].x+20) {
                            player.x = map.levels[map.currlevel][b].x + 20.4;
                            player.xv = -player.xv;
                        }
                        if (player.x < map.levels[map.currlevel][b].x && player.x > map.levels[map.currlevel][b].x-20) {
                            player.x = map.levels[map.currlevel][b].x - 20.4;
                            player.xv = -player.xv;
                        }
                    } /*else if (player.y < map.blocks[b].y+20 && player.y > map.blocks[b].y-20) {
                        player.yv = 0;
                        player.y = map.blocks[b].y-20;
                    }*/
                }
                if (map.levels[map.currlevel][b].type === "l") {
                    if (player.y >= map.levels[map.currlevel][b].y-17 && player.y <= map.levels[map.currlevel][b].y+20) {
                        player.die();
                    }
                }
                if (map.levels[map.currlevel][b].type === "b") {
                    if (player.y <= map.levels[map.currlevel][b].y+20 && player.y >= map.levels[map.currlevel][b].y-4) {
                        player.yv = -15;
                        if (keys[87] && map.currlevel > 11 && map.currlevel !== 14) {
                            player.yv -= 8;
                            player.overFloor = false;
                        }
                    }
                }
                if (map.levels[map.currlevel][b].type === "i") {
                    if (player.y <= map.levels[map.currlevel][b].y+20 && player.y >= map.levels[map.currlevel][b].y-20) {
                        player.overIce = true;
                    }
                }
                if (map.levels[map.currlevel][b].type === "s") {
                    if (player.y <= map.levels[map.currlevel][b].y+20 && player.y >= map.levels[map.currlevel][b].y-20) {
                        player.overStone = true;
                    }
                }
            }
            if (map.levels[map.currlevel][b].type === "tp" && tpCoolDown <= 0) {
                var otp;
                if (player.y <= map.levels[map.currlevel][b].y+20 && player.y >= map.levels[map.currlevel][b].y-20 && player.x <= map.levels[map.currlevel][b].x+20 && player.x >= map.levels[map.currlevel][b].x-20) {
                    if (map.levels[map.currlevel][b].t <= 0) {
                        player.x = map.levels[map.currlevel][b].x1;
                        player.y = map.levels[map.currlevel][b].y1;
                        fadeIO();
                        map.levels[map.currlevel][b].t = 100;
                        player.tps += 1;
                        ctx.fillStyle = "#0BF";
                        ctx.fillRect(0, 0, c.width, c.height);
                        otp = true;
                        tpCoolDown = 100;
                    }
                    if (map.levels[map.currlevel][b].t > 0) {
                        map.levels[map.currlevel][b].t -= 1;
                        ctx.fillStyle = "rgba(255, 255, 255, "+(100-map.levels[map.currlevel][b].t)/100+")";
                        ctx.fillRect(0, 0, c.width, c.height);
                        for (var a = 0; a < (100-map.levels[map.currlevel][b].t); a ++) {
                            ctx.fillStyle = "#0BF";
                            ctx.strokeStyle = "#0BF";
                            if (!outlines) {
                                ctx.fillRect(0, random(0, c.height), c.width, 5);
                                ctx.fillRect(random(0, c.width), random(0, c.height), 10, 10);
                            } else {
                                ctx.strokeRect(0, random(0, c.height), c.width, 5);
                                ctx.strokeRect(random(0, c.width), random(0, c.height), 10, 10);
                            }
                        }
                        otp = true;
                    }
                } if (player.y <= map.levels[map.currlevel][b].y1+20 && player.y >= map.levels[map.currlevel][b].y1-20 && player.x <= map.levels[map.currlevel][b].x1+20 && player.x >= map.levels[map.currlevel][b].x1-20 ) {
                    if (map.levels[map.currlevel][b].t <= 0) {
                        player.x = map.levels[map.currlevel][b].x;
                        player.y = map.levels[map.currlevel][b].y;
                        fadeIO();
                        map.levels[map.currlevel][b].t = 100;
                        player.tps += 1;
                        ctx.fillStyle = "#FB0";
                        ctx.fillRect(0, 0, c.width, c.height);
                        otp = true;
                        tpCoolDown = 100;
                    }
                    if (map.levels[map.currlevel][b].t > 0) {
                        map.levels[map.currlevel][b].t -= 1;
                        ctx.fillStyle = "rgba(255, 255, 255, "+(100-map.levels[map.currlevel][b].t)/100+")";
                        ctx.fillRect(0, 0, c.width, c.height);
                        for (var a = 0; a < (100-map.levels[map.currlevel][b].t); a ++) {
                            ctx.fillStyle = "#FB0";
                            ctx.strokeStyle = "#FB0";
                            if (!outlines) {
                                ctx.fillRect(0, random(0, c.height), c.width, 5);
                                ctx.fillRect(random(0, c.width), random(0, c.height), 10, 10);
                            } else {
                                ctx.strokeRect(0, random(0, c.height), c.width, 5);
                                ctx.strokeRect(random(0, c.width), random(0, c.height), 10, 10);
                            }
                        }
                        otp = true;
                    }
                }
                if (!otp) {
                    map.levels[map.currlevel][b].t = 100;
                }
            }
            if (map.levels[map.currlevel][b].type === "mp") {
                map.levels[map.currlevel][b].y += map.levels[map.currlevel][b].yv;
                map.levels[map.currlevel][b].x += map.levels[map.currlevel][b].xv;

                if (map.levels[map.currlevel][b].y1 > map.levels[map.currlevel][b].y2) {
                    if (map.levels[map.currlevel][b].y > map.levels[map.currlevel][b].y1) {
                        map.levels[map.currlevel][b].yv = -1;
                    }
                    if (map.levels[map.currlevel][b].y < map.levels[map.currlevel][b].y2) {
                        map.levels[map.currlevel][b].yv = 1;
                    }
                } else if (map.levels[map.currlevel][b].y1 < map.levels[map.currlevel][b].y2) {
                    if (map.levels[map.currlevel][b].y < map.levels[map.currlevel][b].y1) {
                        map.levels[map.currlevel][b].yv = 1;
                    }
                    if (map.levels[map.currlevel][b].y > map.levels[map.currlevel][b].y2) {
                        map.levels[map.currlevel][b].yv = -1;
                    }
                }

                if (map.levels[map.currlevel][b].x1 > map.levels[map.currlevel][b].x2) {
                    if (map.levels[map.currlevel][b].x > map.levels[map.currlevel][b].x1) {
                        map.levels[map.currlevel][b].xv = -1;
                    }
                    if (map.levels[map.currlevel][b].x < map.levels[map.currlevel][b].x2) {
                        map.levels[map.currlevel][b].xv = 1;
                    }
                } else if (map.levels[map.currlevel][b].x1 < map.levels[map.currlevel][b].x2) {
                    if (map.levels[map.currlevel][b].x < map.levels[map.currlevel][b].x1) {
                        map.levels[map.currlevel][b].xv = 1;
                    }
                    if (map.levels[map.currlevel][b].x > map.levels[map.currlevel][b].x2) {
                        map.levels[map.currlevel][b].xv = -1;
                    }
                }
            }
            if (map.levels[map.currlevel][b].type === "g") {
                if (player.y <= map.levels[map.currlevel][b].y+20 && player.y >= map.levels[map.currlevel][b].y-20 && player.x <= map.levels[map.currlevel][b].x+20 && player.x >= map.levels[map.currlevel][b].x-20) {
                    player.nextLevel();
                }
            }
        }

        if (player.overFloor !== true && !flymode) {
            player.yv += 1;
        }

        if (!menu) {
            if (keys[87]) {
                if (player.overFloor && !flymode) {
                    player.yv -= 8;
                }
                if (flymode) {
                    player.yv -= 1;
                }
            }
            if (keys[65]) {
                player.xv -= 1;
            }
            if (keys[68]) {
                player.xv += 1;
            }
            if (keys[83]) {
                player.yv += 1;
            }
            if (keys[16] && map.currlevel > 8) {
                player.shifting = true;
            }
        }

        player.x = Math.round(player.x*100)/100;
        player.xv *= 0.89;
        if (flymode) {
            player.yv *= 0.89;
        }
        player.xv = Math.round(player.xv*10000)/10000;

        if (player.overIce && !player.overStone) {
            player.xv *= 1.1;
        }

        player.overFloor = false;
        player.onMP = [false, 0];

        for (var ach = 0; ach < achievements.length; ach ++) {
            achievements[ach].condition();
            if (achievements[ach].yes && !achievements[ach].acheived) {
                postToBoard("Achievement Earned: "+achievements[ach].name+" ("+achievements[ach].desc+")");
                achievements[ach].acheived = true;
            }
        }
        for (var ms = 0; ms < map.levelMessages.length; ms ++) {
            if (map.currlevel === ms && map.levelMessages[ms].said === false) {
                map.levelMessages[ms].said = true;
                postToBoard("Level "+(map.currlevel+1)+") "+map.levelMessages[ms].msg);
            }
        }

        if (player.shifting) {
            player.xv *= 0.87;
        }

        player.overStone = false;
        player.overIce = false; //I put this here so I could add the "Slippery!" achievement
        player.shifting = false;
    }
    totalFrames++;
}

setInterval(draw, 20);
sizeWindow();
