let input = document.querySelector("input");

input.addEventListener("focus", function(e) {
    e.preventDefault();
    input.style.backgroundColor="red"

})