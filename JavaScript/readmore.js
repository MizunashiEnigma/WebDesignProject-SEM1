
//taken from W3 schools' example
function ReadMore() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("newBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Secret Sauce :&#41;";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "The Feds are Back!";
      moreText.style.display = "inline";
    }
  }