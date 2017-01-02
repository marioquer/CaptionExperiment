var tVideo = document.getElementById("myVideo");
var trackList = tVideo.textTracks;
var track = trackList[0];
var currentCue, currentText, currentIndex, currentTime, currentRecord = 1; // textList: divided cue text
//get all text lists
var allCues = track.cues; //cue object list
var myAllCues = new Array(); //all intact text
var textArrayList = new Array(); //all splited text
tVideo.oncanplay = function () {
    var tempText, tempList;
    for (var i = 0; i < allCues.length; i++) {
        tempText = allCues[i].text;
        tempList = tempText.split('`');
        allCues[i].text = "";
        for (var j = 0; j < tempList.length; j++) {
            allCues[i].text += tempList[j];
            myAllCues[i] = allCues[i].text;
            textArrayList[i] = tempList;
        }
    }
};
//pause event
tVideo.addEventListener("pause", function () {
    //current change
    currentCue = track.activeCues;
    currentText = currentCue[0].text;
    for (var i = 0; i < myAllCues.length; i++) {
        if (myAllCues[i] == currentText) {
            currentIndex = i;
            break;
        }
    }
    currentTime = (tVideo.currentTime / 100).toFixed(2);
    currentCue[0].text = "";
    for (var i = 0; i < textArrayList[currentIndex].length; i++) {
        var tText = "<c.fg" + i + ".bg" + i + ">";
        currentCue[0].text = currentCue[0].text + tText + textArrayList[currentIndex][i] + "</c>"
    }
}, false);
//play event
tVideo.addEventListener("play", function () {
    currentCue[0].text = myAllCues[currentIndex];
}, false);
//key control when video is paused
document.onkeypress = function (e) {
    switch ((e || window.event).keyCode) {
    case 49:
        ifRecord(currentIndex, 0);
        break;
    case 50:
        ifRecord(currentIndex, 1);
        break;
    case 51:
        ifRecord(currentIndex, 2);
        break;
    case 32:
        e.preventDefault();
        tVideo.paused ? tVideo.play() : tVideo.pause();
        break;
    }
};

function ifRecord(x, y) {
    if (textArrayList[x][y] == undefined) {
        alert("该按键暂无对应色块");
    }
    else {
        alert("已标记： " + textArrayList[x][y]);
        var container = document.getElementById('recordTable');
        var tr = document.createElement('tr');
        tr.className = "table";
        tr.innerHTML = "<td class='col_1'>" + currentRecord + "</td>" + "<td class='col_8'>" + textArrayList[x][y] + "</td>" + "<td class='col_1'>" + currentTime + "</td>";
        container.appendChild(tr);
        currentRecord++;
    }
}