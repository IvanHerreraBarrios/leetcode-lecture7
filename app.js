//874

const moves = {
    "up": {x:0, y:1},
    "down": {x:0, y:-1},
    "right": {x:1, y:0},
    "left": {x:-1, y:0}
}

var robotSim = function(commands, obstacles) {
let x = 0, y = 0
let dir = "up"
let max = 0

const map = {}
for(const [x, y] of obstacles){
    map[`${x}-${y}`] = true
}

for(let i=0; i <commands.length; i++){
    const command = commands[i]
    if (command === -1) dir = turnRight(dir)
    else if (command === -2) dir = turnLeft(dir)
    else  {
        for(let j=0; j<command;j++){
            const move = moves[dir]
            let key1 = x + move.x
            let key2 = y + move.y
            if (! map[`${key1}-${key2}`]){
                x = key1
                y = key2

                const dist = Math.abs(x)**2 + Math.abs(y)**2
                if (dist > max) max = dist
            }
        }
    }
}
return max
};

function hasObstacle(obstacles,x,y){
for(let i=0; i < obstacles.length; i++){
    const obs = obstacles[i]
    if (x === obs[0] && y===obs[1]) return true
}
return false
}
function turnLeft(dir){
if(dir === "up") return "left"
else if(dir === "right") return "up"
else if(dir === "down") return "right"
else return "down"
}

function turnRight(dir){
if(dir === "up") return "right"
else if(dir === "right") return "down"
else if(dir === "down") return "left"
else return "up"
}


//solution 2

function robotSim(commands, obstacles) {
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const set = new Set(obstacles.map(obstacle => obstacle[0] + ',' + obstacle[1]));

    let x = 0, y = 0, di = 0, maxDist = 0;

    for (const cmd of commands) {
        if (cmd === -1) {
            di = (di + 1) % 4;
        } else if (cmd === -2) {
            di = (di + 3) % 4;
        } else {
            for (let k = 0; k < cmd; k++) {
                const nx = x + dirs[di][0];
                const ny = y + dirs[di][1];
                if (set.has(nx + ',' + ny)) break;
                x = nx;
                y = ny;
                maxDist = Math.max(maxDist, x * x + y * y);
            }
        }
    }

    return maxDist;
}