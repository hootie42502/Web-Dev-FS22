var fruitArray = new Array();

fruitArray[0] = new Image();
fruitArray[0].src = './Fruit/apple-g56a141b7e_640.png';

fruitArray[1] = new Image();
fruitArray[1].src = './Fruit/orange-g37e0fbbbb_640.png';

fruitArray[2] = new Image();
fruitArray[2].src = './Fruit/pear-gf679252a5_1280.png';

fruitArray[3] = new Image();
fruitArray[3].src = './Fruit/pineapple-g0b83a3b6c_640.png';

function changeImage(fruitNum){
    var currFruit = document.getElementById("mainImage");
    if(currFruit.src == fruitArray[fruitNum].src) {
        for(var i = 0; i < fruitArray.length;i++){
            if(fruitArray[i].src == currFruit.src){
                document.getElementById("feedback").innerHTML = "Correct!";
                document.body.style.backgroundColor= "green";
                if(i == 3){
                    document.getElementById("mainImage").src = fruitArray[0].src;
                    break;
                }
                document.getElementById("mainImage").src = fruitArray[i+1].src;
                break;
            } 
        }
    } else {
        document.body.style.backgroundColor= "red";
        document.getElementById("feedback").innerHTML = "Incorrect!";
    }
    
}

function restart() {
    document.body.style.backgroundColor= "white";
    document.getElementById("feedback").innerHTML = "";
    document.getElementById("mainImage").src = fruitArray[0].src;
}