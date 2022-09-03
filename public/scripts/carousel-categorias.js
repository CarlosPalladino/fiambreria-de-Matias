let track = document.querySelector("#track")
//NOS TRAEMOS AL UL#TRACK

let slides = Array.from(track.children)
//ACA NOS TRAEMOS A LOS HIJOS (LOS LI CON ETIQUETA SLIDE) Y LOS OCNVERTIMOS EN ARRAY

let widthSlide = slides[0].getBoundingClientRect().width
//ACA NOS FIJAMOS EL width DE ESOS LI

slides.forEach((slide,index)=>{
    slide.style.left = `${widthSlide * index}px`
})
//ACA HACEMOS QUE CADA SLIDE TENGA UN "MARGEN" DE LO QUE OCUPOAN TODOS LOS ANTERIORES

//track.style.transform = `translateX(-${slides[1].style.left})`

slides[0].classList.add("active")

document.querySelector("#btn-next").addEventListener("click", function(e){
    e.preventDefault()
    let current = document.querySelector("#track .slide.active")
    let next = current.nextElementSibling
    if(!next){
        track.style.transform = `translateX(0)`
        current.classList.remove("active")
        slides[0].classList.add("active")
    } else if(next){
        track.style.transform = `translateX(-${next.style.left})`
        current.classList.remove("active")
        next.classList.add("active")
        
}})
document.querySelector("#btn-prev").addEventListener("click", function(e){
    e.preventDefault()
    let current = document.querySelector("#track .slide.active")
    let next = current.previousElementSibling
    if(!next){
        track.style.transform = `translateX(-${slides[2].style.left})`
        current.classList.remove("active")
        slides[2].classList.add("active")
    } else if(next){
        track.style.transform = `translateX(-${next.style.left})`
        current.classList.remove("active")
        next.classList.add("active")
    }
})

