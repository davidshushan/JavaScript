console.log("1");
//Array to store the quotes
var quotes = new Array();
quotes[0] = "“The Best Way To Get Started Is To Quit Talking And Begin Doing.” – Walt Disney";
quotes[1] = "“The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees Opportunity In Every Difficulty.” – Winston Churchill";
quotes[2] = "“Don’t Let Yesterday Take Up Too Much Of Today.” – Will Rogers";
quotes[3] = "“You Learn More From Failure Than From Success. Don’t Let It Stop You. Failure Builds Character.”";
quotes[4] = "“It’s Not Whether You Get Knocked Down, It’s Whether You Get Up.” – Inspirational Quote By Vince Lombardi";

function randomQuote() {
    // random quote index = i
    var i = Math.floor(Math.random() * quotes.length);

    document.getElementById("quoteArray").innerHTML = quotes[i];



}

function printPage() {
    window.print();
}

function userQuote() {
    var newQuote = prompt("Please enter your quote", "Write Here...");
    if (newQuote != null) {
        quotes.push(newQuote);
    }
}

function deleteQuote() {
    //prevent deleting default quotes
    console.log(quotes.length);
    if ((quotes.length) > 5)
        quotes.pop();
}