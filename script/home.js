// button toggling
const allFilteredBtn = document.getElementById("all-filtered-btn");
const openFilteredBtn = document.getElementById("open-filtered-btn");
const closedFilteredBtn = document.getElementById("closed-filtered-btn");

allFilteredBtn.addEventListener("click", function() {
    toggleStyle("all-filtered-btn");
});

openFilteredBtn.addEventListener("click", function() {
    toggleStyle("open-filtered-btn");
});
closedFilteredBtn.addEventListener("click", function() {
    toggleStyle("closed-filtered-btn");
});


function toggleStyle(id) {
    // console.log("Button clicked:", id);
    allFilteredBtn.classList.remove("bg-blue-700", "text-white");
    openFilteredBtn.classList.remove("bg-blue-700", "text-white");
    closedFilteredBtn.classList.remove("bg-blue-700", "text-white");

    allFilteredBtn.classList.add("bg-white", "text-black");
    openFilteredBtn.classList.add("bg-white", "text-black");
    closedFilteredBtn.classList.add("bg-white", "text-black");
    
    let selected = document.getElementById(id);
    selected.classList.remove("bg-white", "text-black");
    selected.classList.add("bg-blue-700", "text-white");
    
//     console.log(id);

//     const selected = document.getElementById(id);
//     console.log(selected);
//     selected.classList.remove("bg-white", "text-black");
//     selected.classList.add("bg-blue-700", "text-white");

// }
}