import { supabase } from "./supabase.js";


const container =
document.getElementById(
"investigatorList"
);



async function loadInvestigators(){


const {data,error} =
await supabase
.from("investigators")
.select("*")
.order("id",{ascending:true});



if(error){

console.log(error);

container.innerHTML =
"Database Error";

return;

}



container.innerHTML="";



data.forEach(inv=>{


const card =
document.createElement("div");


card.className =
"investigator-card";



card.innerHTML = `

<img src="${inv.photo || 'default.png'}">


<h2>
${inv.name}
</h2>


<p>
🆔 ID:
${inv.id}
</p>


<p>
⭐ Rank:
${inv.rank}
</p>


<p>
🏢 Department:
${inv.department}
</p>


<p>
📧 Email:
${inv.email}
</p>


`;



container.appendChild(card);



});


}



///  loadInvestigators();









async function loadInvestigators(){

console.log("Loading investigators...");


const {data,error} = await supabase
.from("investigators")
.select("*");


console.log("DATA:",data);
console.log("ERROR:",error);



const container =
document.getElementById("investigatorList");


if(error){

container.innerHTML =
"Database Error";

return;

}


if(!data || data.length === 0){

container.innerHTML =
"No investigators found";

return;

}



container.innerHTML="";


data.forEach((investigator)=>{


container.innerHTML += `

<div class="investigator-card">

<img src="${investigator.photo}">

<h3>${investigator.name}</h3>

<p>ID: ${investigator.id}</p>

<p>Rank: ${investigator.rank}</p>

<p>Department: ${investigator.department}</p>

<p>${investigator.email}</p>

</div>

`;


});


}