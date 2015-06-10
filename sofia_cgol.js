
$( window ).load(function() {
  // Run code

// block size`
size = 20;
var canvas = document.getElementById('c');
var w;
var h;
// get some info about the canvas

var ctx = canvas.getContext('2d');
ctx.strokeStyle = "DBDADA";
ctx.lineWidth = .2;
// how many cells fit on the canvas
w = ~~ (canvas.width / size);
h = ~~ (canvas.height / size);
for (var i = 0; i < w; i++) {
    for (var j = 0; j < h; j++) {
        ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ',' + Math.floor(255 - 42.5 * j) + ',0)';
        ctx.strokeRect((j * size), (i * size), size, size);
    }
}



var interval;
$("#changesize").click(function () {
    resizeCanvas($("#sqsize").val(), $("#squarenum").val());

    //resizeCanvas();
});
$("#run").click(function () {
    interval = setInterval(function () {
        executeStep()
    }, 1000);
});

$("#stop").click(function () {
    console.log("stopping interval");
    clearInterval(interval);

});


$("#step").click(function () {
    executeStep();
});

function executeStep() {
    var tempArray = createArray();

    try {
        //Copy base array into a temporary array, so it doesn't change the contents while filling the new array. 
        tempArray = $.map(state, function (a, index) {
            return [a];
        });
        LeftBorder(tempArray);
        CenterGrid(tempArray, w);
        RightBorder(tempArray, (w - 1));
        fillGridArray(state2);
    } catch (err) {
        alert("there was an error with the grid")
    } finally {
        //Execute after everything else is done. 
        state = state2;
    }
    console.log("state changed");
}

function resizeCanvas(size, x) {
    $("#c").attr("width", x * size);
    $("#c").attr("height", x * size);


    var canvas = document.getElementById('c');

    // get some info about the canvas

    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = "DBDADA";
    ctx.lineWidth = .2;
    // how many cells fit on the canvas
    var w = ~~ (canvas.width / size);
    var h = ~~ (canvas.height / size);
    for (var i = 0; i < w; i++) {
        for (var j = 0; j < h; j++) {
            ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ',' + Math.floor(255 - 42.5 * j) + ',0)';
            ctx.strokeRect((j * size), (i * size), size, size);
        }
    }
}


function createArray() {
    var state2 = new Array(h);
    for (var y = 0; y < h; ++y) {
        state2[y] = new Array(w);
        state2[y] = jQuery.map(state2[y], function () {
            return 0;
        });
    }
    return state2;
}
// create empty state array to save base state.  
var state = createArray();
//Create Second array to save new state. 
var state2 = createArray();


//Function to fill the canvas based on the array contents. 
function fillGridArray(baseArray) {

    for (var i = 0; i < w; i++) {
        for (var j = 0; j < h; j++) {
            var fillStyle = 'rgb(' + Math.floor(255 - (((baseArray[i][j] * Math.random() * 200) + 1))) + ',' + Math.floor(255 - (((baseArray[i][j] * Math.random() * 200) + 1))) + ',' + Math.floor(255 - (((baseArray[i][j] * Math.random() * 200) + 1))) + ')';
            fill(fillStyle, i, j);

        }
    }

}

$("#reset").click(function () {
    reset(state);
    //getGridArray();
});

function reset(baseArray) {
    for (var i = 0; i < w; i++) {
        for (var j = 0; j < h; j++) {
            state[i][j] = 0;
            var fillStyle = 'rgb(255, 255, 255)';
            fill(fillStyle, i, j);

        }
    }
}

function LeftBorder(baseArray) {
    indexArray = 0;
    state2[indexArray] = $.map(baseArray[indexArray], function (a, index) {
        var neighbornum = (parseInt(baseArray[indexArray][index - 1]) || 0) + (parseInt(baseArray[indexArray][index + 1]) || 0) + (parseInt(state[indexArray + 1][index - 1]) || 0) + (parseInt(baseArray[indexArray + 1][index]) || 0) + (parseInt(baseArray[indexArray + 1][index + 1]) || 0);
        var neighbornum_final = ((((((neighbornum.toString().replace("1", "0")).replace("4", "0")).replace("5", "0")).replace("6", "0")).replace("7", "0")).replace("8", "0").replace("2", baseArray[indexArray][index])).replace("3", "1");
        return [neighbornum_final];
    });
}

function RightBorder(baseArray, indexArray) {
    state2[indexArray] = $.map(baseArray[indexArray], function (a, index) {
        var neighbornum = (parseInt(baseArray[indexArray][index - 1]) || 0) + (parseInt(baseArray[indexArray][index + 1]) || 0) + (parseInt(state[indexArray - 1][index - 1]) || 0) + (parseInt(baseArray[indexArray - 1][index]) || 0) + (parseInt(baseArray[indexArray - 1][index + 1]) || 0);
        //Check how many neighboors does it have, and return the next state, save it on state2 
        var neighbornum_final = ((((((neighbornum.toString().replace("1", "0")).replace("4", "0")).replace("5", "0")).replace("6", "0")).replace("7", "0")).replace("8", "0").replace("2", baseArray[indexArray][index])).replace("3", "1");
        return [neighbornum_final];
    });
}

function CenterGrid(baseArray, indexArray) {
    for (var i = 1; i < (indexArray - 1); i++) {
        state2[i] = $.map(baseArray[i], function (a, index) {
            // alert((parseInt(state[i][index-1]) || 0) + (parseInt(state[i][index+1]) || 0 ) + (parseInt(state[i-1][index-1]) || 0) +  (parseInt(state[i-1][index]) || 0)  + (parseInt(state[i-1][index+1]) || 0 ) + (parseInt(state[i+1][index-1]) || 0) +   (parseInt(state[i+1][index]) || 0)  + (parseInt(baseArray[i+1][index+1]) || 0 ));
            var neighbornum = (parseInt(baseArray[i][index - 1]) || 0) + (parseInt(baseArray[i][index + 1]) || 0) + (parseInt(baseArray[i - 1][index - 1]) || 0) + (parseInt(baseArray[i - 1][index]) || 0) + (parseInt(baseArray[i - 1][index + 1]) || 0) + (parseInt(baseArray[i + 1][index - 1]) || 0) + (parseInt(baseArray[i + 1][index]) || 0) + (parseInt(baseArray[i + 1][index + 1]) || 0);
            // alert(baseArray);
            //Check how many neighboors does it have, and return the next state, save it on state2 
            var neighbornum_final = ((((((neighbornum.toString().replace("1", "0")).replace("4", "0")).replace("5", "0")).replace("6", "0")).replace("7", "0")).replace("8", "0").replace("2", state[i][index])).replace("3", "1");
            return [neighbornum_final];
        });
    }
}

function fill(s, gx, gy) {
    ctx.fillStyle = s;
    ctx.fillRect((gx * size) + 1, (gy * size) + 1, size - 2, size - 2);
}


//Use the click function to Create the base grid. Everytime a square is clicked, it is saved on the state base array, this is used later to calculate the next state. 
$(canvas).click(function (e) {
    // get mouse click position
    var mx = e.offsetX;
    var my = e.offsetY;

    // calculate grid square numbers
    var gx = ~~ (mx / size);
    var gy = ~~ (my / size);

    // make sure we're in bounds
    if (gx < 0 || gx >= w || gy < 0 || gy >= h) {
        return;
    }
    //Gets the status of the bit, and it does a bitwise toggle to save it 
    var str = (~state[gx][gy] * (-1).toString());
    var strbase2 = str.toString(2);
    var strlength = str.toString(2).length - 1;
    var finalstring = strbase2[strlength];
    //if the finalstring is 0, it returns the box to white color, if it its not, it generates a random color and fills it.  
    var fillStyle = 'rgb(' + Math.floor(255 - (((finalstring * Math.random() * 200) + 1))) + ',' + Math.floor(255 - (((finalstring * Math.random() * 200) + 1))) + ',' + Math.floor(255 - (((finalstring * Math.random() * 200) + 1))) + ')';
    //Saves the final status of the bin on the base Array. 
    state[gx][gy] = finalstring;
    fill(fillStyle, gx, gy);
});
});
