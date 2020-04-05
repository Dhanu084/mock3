console.log("loaded")

//function to search the text
var search = document.getElementById("search");
search.addEventListener("click",function(){
    let text = document.getElementById("search-text");
    console.log(text.value);
    if(window.find(text.value)){
        console.log(true);
    }
    else{
        alert("text not found");
    }
})

var asc = document.getElementById("sort-asc");
asc.addEventListener("click",function(){
    var array=[];
    var data = document.getElementById("table");
    console.log(data.rows.length);
    for(let i=1;i<data.rows.length;i++){
        //for(let j=0;j<data.rows[i].cells.length;j++){
            array.push(data.rows[i].cells[1].innerText);
        //}
    }
    console.log(array);
})