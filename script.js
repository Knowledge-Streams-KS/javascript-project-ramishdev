window.onload = function() {
    let mydata = localStorage.getItem("mydata");
    if (mydata) {
        let movied = document.getElementById("moviedata");
        movied.innerHTML = mydata;
    }
    sessionStorage.clear();

}
window.onbeforeunload = function() {
    let movied = document.getElementById("moviedata").innerHTML;
    localStorage.setItem("mydata", movied);
    
}
window.setTimeout(()=>{
    var b = document.getElementById("myblock");
    b.setAttribute("class","hide");
}, 2000);
const controller = new AbortController();
const { signal } = controller;

async function getdata(){
    let movied = document.getElementById("moviedata");
    movied.innerHTML = '';

    let name = document.getElementById("movietitle").value;
    let year = document.getElementById("movieyear").value;

    if(!name){
        return;
    }

    const x = await fetch(`http://www.omdbapi.com/?s=${name}&apikey=9b061cb2`,{signal})
    let data = await x.json();
    let arrdata = data['Search'];
    if (year){
        arrdata = arrdata.filter(m => year <= m["Year"]);
    }
    arrdata.forEach(element => {
        movied.insertAdjacentHTML("afterbegin",`
        <div>
            <img class="imgsize" src=${element['Poster']} alt="NotFound"> 
            <br>
            Title: ${element['Title']}
            <br> 
            Year: ${element['Year']} 
            <br><br>
        </div>`
            )
    });
}

const tb = document.getElementById("search-by-title-button");
tb.addEventListener("click",getdata);
const yb = document.getElementById("movieyear");
yb.addEventListener("keyup",getdata);

