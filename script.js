
//              Creating 5 layers
var body = document.getElementsByTagName('body')[0]
for (var i = 0; i < 5; i++) {
    var color = document.createElement("div");
    color.className = "color";
    var newC = newColor();
    color.style.backgroundColor = newC;
    color.textContent = newC;
    color.style.color = pickTextColorBasedOnBgColorAdvanced(newC);
    body.appendChild(color);
}

//              Generating new color
function newColor() {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');
}


//              Copy text on clicking
document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.tagName == "DIV") {
        const copy = document.createElement('textarea');
        copy.value = target.textContent;
        document.body.appendChild(copy);
        copy.select();
        document.execCommand('copy');
        document.body.removeChild(copy);
        alert(`Copied "${target.textContent}"`);
    }
}, false);

function pickTextColorBasedOnBgColorAdvanced(bgColor) {
    var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    var uicolors = [r / 255, g / 255, b / 255];
    var c = uicolors.map((col) => {
        if (col <= 0.03928) {
            return col / 12.92;
        }
        return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
    return (L > 0.179) ? "#111" : "#fff";
}