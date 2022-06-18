async function runGame(){
let word = await axios.get("https://random-words-api.vercel.app/word");
word=[...word.data[0].word.toLowerCase()]
console.log(word);
let wordDiv=document.querySelector(".word")
let image = document.querySelector("img")

word.forEach((item, i) => {
  const letter = document.createElement("div");
  letter.classList.add(item,"letter");
  letter.innerHTML="<h1>_</h1>"
  wordDiv.appendChild(letter)
});


let guessed=[];
let wrong=0;
let allDivs = [...document.querySelectorAll(".letter")];
console.log(typeof(allDivs));
document.addEventListener("keypress",press);
function press(e){
  let key = e.key;
  for (let i = 0; i < allDivs.length; i++) {
    if(key===allDivs[i].classList[0]){
      guessed.push(key);
      allDivs[i].innerHTML=`<h1>${key}</h1>`
      allDivs.splice(i,1)
      if(guessed.length === word.length){
        console.log(guessed.length,word.length,guessed);
        dismiss(true);
        return null;
      }
    }
    if(i === allDivs.length-1 && guessed.indexOf(key)===-1) {
      wrong+=1;
      image.src = `./image/${wrong}.jpg`
      if(wrong===7){
        dismiss(false);
        return null;
      }
    }
  }
}

function dismiss(isWinner){
  if (isWinner){
    image.src = `./image/winner.jpg`
    let win=document.getElementsByClassName("result")[0]
    win.innerHTML=`<h1>"You Won"</h1>`
    win.classList.add("win")
    document.getElementsByClassName("fword")[0].innerHTML=`The Word Was`
  }else{
    image.src = `./image/looser.jpg`
    let lose= document.getElementsByClassName("result")[0]
    lose.innerHTML=`<h1>"You Lose"</h1>`
    lose.classList.add("lose")
    document.getElementsByClassName("fword")[0].innerHTML=`<h2>The Word Was</h2>`
    for (let i = 0; i < allDivs.length; i++) {
        allDivs[i].innerHTML=`<h1>${allDivs[i].classList[0]}</h1>`
  }
  document.removeEventListener("keypress",press)
}
}
}
runGame();
