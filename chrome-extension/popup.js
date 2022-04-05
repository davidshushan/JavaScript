const button1 = document.getElementById("newPage_1");
button1.addEventListener("click", function() { window.open("https://www.google.com/") })
const button2 = document.getElementById("newPage_2");
button2.addEventListener("click", function() { window.open("https://mail.google.com/") })
const button3 = document.getElementById("newPage_3");
button3.addEventListener("click", function() { window.open("https://www.ynet.co.il/home/0,7340,L-8,00.html") })

// function openAll() {
//     window.open("https://www.google.com/");
//     window.open("https://mail.google.com/");
//     window.open("https://www.ynet.co.il/home/0,7340,L-8,00.html")

// }
const button4 = document.getElementById("allPages");
button4.addEventListener("click", function() {
    // for some reason its open only the first link (google)
    window.open("https://www.google.com/");
    console.log("1");
    window.open("https://mail.google.com/");
    console.log("2");
    window.open("https://www.ynet.co.il/home/0,7340,L-8,00.html")
})