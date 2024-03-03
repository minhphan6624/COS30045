let images = ["img/Pets2019.png", "img/Pets2021.png", "img/Both.png"];

function changeFig(a) {
    console.log("function run");

    let image = document.getElementById("figImg");
    let figCap = document.getElementById("figCap");

    if (a == '0') {
        image.src = "img/Pets2019.png";
        figCap.innerHTML = "Figure 1. Australian Pet Ownership in 2019";
    }
    else if (a == '1') {
        image.src = "img/Pets2021.png";
        figCap.innerHTML = "Figure 2. Australian Pet Ownership in 2021";
    }
    else if (a == '2') {
        image.src = "img/Both.png";
        figCap.innerHTML = "Figure 3. Australian Pet Ownership comparison between 2019 and 2021";
    }
}
