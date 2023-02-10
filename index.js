const button = document.getElementById("addBtn");
const lists = document.getElementById("lists");

button.addEventListener("click", async function() {
    //データのやり取り
    const res = await fetch("https://api.sssapi.app/1O8qEuYW912CeC9O3epwg");
    const prefs = await res.json();

    //DOM
    prefs.forEach( function (pref) {
        const list = document.createElement("li");
        list.innerText = pref.pref_name;
        lists.appendChild(list);
    });
});