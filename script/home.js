// button toggling
// const allFilteredBtn = document.getElementById("all-filtered-btn");
// const openFilteredBtn = document.getElementById("open-filtered-btn");
// const closedFilteredBtn = document.getElementById("closed-filtered-btn");

// allFilteredBtn.addEventListener("click", function() {
//     toggleStyle("all-filtered-btn");
// });

// openFilteredBtn.addEventListener("click", function() {
//     toggleStyle("open-filtered-btn");
// });
// closedFilteredBtn.addEventListener("click", function() {
//     toggleStyle("closed-filtered-btn");
// });


// function toggleStyle(id) {
//     // console.log("Button clicked:", id);
//     allFilteredBtn.classList.remove("bg-blue-700", "text-white");
//     openFilteredBtn.classList.remove("bg-blue-700", "text-white");
//     closedFilteredBtn.classList.remove("bg-blue-700", "text-white");

//     allFilteredBtn.classList.add("bg-white", "text-black");
//     openFilteredBtn.classList.add("bg-white", "text-black");
//     closedFilteredBtn.classList.add("bg-white", "text-black");

//     let selected = document.getElementById(id);
//     selected.classList.remove("bg-white", "text-black");
//     selected.classList.add("bg-blue-700", "text-white");
// ...fetchIssues.apply.apply.
//     console.log(id);

//     const selected = document.getElementById(id);
//     console.log(selected);
//     selected.classList.remove("bg-white", "text-black");
//     selected.classList.add("bg-blue-700", "text-white");

// }
// }


const allFilteredBtn = document.getElementById("all-filtered-btn");
const openFilteredBtn = document.getElementById("open-filtered-btn");
const closedFilteredBtn = document.getElementById("closed-filtered-btn");

const issueCardContainer = document.getElementById("issue-card-container");
const singleIssueDetails = document.getElementById("single-issue-details");
const detailsContent = document.getElementById("details-content");
const closeDetailsBtn = document.getElementById("close-details-btn");
// const searchInput = document.getElementById("search-input");
// let currentFilter = "all";

// searchInput.addEventListener("input", function () {
//     applyFilters();



const ALL_ISSUES_API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const SINGLE_ISSUE_API = "https://phi-lab-server.vercel.app/api/v1/lab/issue";

let allIssues = [];

allFilteredBtn.addEventListener("click", function () {
    toggleStyle("all-filtered-btn");
    renderIssues(allIssues);
    // applyFilters();
});

openFilteredBtn.addEventListener("click", function () {
    toggleStyle("open-filtered-btn");
    // applyFilters();

    const openIssues = allIssues.filter(function (issue) {
        return String(issue.status).toLowerCase() === "open";
    });

    renderIssues(openIssues);
    
});

closedFilteredBtn.addEventListener("click", function () {
    toggleStyle("closed-filtered-btn");
    // applyFilters();
    


    const closedIssues = allIssues.filter(function (issue) {
        return String(issue.status).toLowerCase() === "closed";
    });

    renderIssues(closedIssues);
});

if (closeDetailsBtn) {
    closeDetailsBtn.addEventListener("click", function () {
        singleIssueDetails.classList.add("hidden");
    });
}

if (singleIssueDetails) {
    singleIssueDetails.addEventListener("click", function (e) {
        if (e.target === singleIssueDetails) {
            singleIssueDetails.classList.add("hidden");
        }
    });
}

function toggleStyle(id) {
    allFilteredBtn.classList.remove("bg-blue-700", "text-white");
    openFilteredBtn.classList.remove("bg-blue-700", "text-white");
    closedFilteredBtn.classList.remove("bg-blue-700", "text-white");

    allFilteredBtn.classList.add("bg-white", "text-black");
    openFilteredBtn.classList.add("bg-white", "text-black");
    closedFilteredBtn.classList.add("bg-white", "text-black");

    const selected = document.getElementById(id);
    selected.classList.remove("bg-white", "text-black");
    selected.classList.add("bg-blue-700", "text-white");
}

async function loadIssues() {
    try {
        const response = await fetch(ALL_ISSUES_API);
        const result = await response.json();

        allIssues = result.data || [];

        toggleStyle("all-filtered-btn");
        renderIssues(allIssues);
    } catch (error) {
        console.log("Failed to load issues:", error);
        issueCardContainer.innerHTML = `
            <p class="col-span-full text-center text-red-500 font-semibold">
                Failed to load issues
            </p>
        `;
    }
}

function renderIssues(issues) {
    issueCardContainer.innerHTML = "";

    if (!issues.length) {
        issueCardContainer.innerHTML = `
            <p class="col-span-full text-center text-slate-500 font-semibold">
                No issues found
            </p>
        `;
        return;
    }

    issues.forEach(function (issue) {
        const labels = issue.labels || [];

        let labelsHTML = "";
        labels.forEach(function (label) {
            labelsHTML += `
                <span class="${getTagClass(label)} inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold">
                    ${label}
                </span>
            `;
        });

        const card = document.createElement("div");
        card.className = "card max-w-sm bg-white border border-gray-200 rounded-xl shadow-sm p-6 font-sans cursor-pointer";

        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div class="w-8 h-8 border-2 border-dashed ${getStatusBorderColor(issue.status)} rounded-full flex items-center justify-center">
                    <div class="w-4 h-4 rounded-full ${getStatusDotColor(issue.status)}"></div>
                </div>

                <span class="${getPriorityClass(issue.priority)} text-xs font-bold px-4 py-1.5 rounded-full tracking-wider">
                    ${String(issue.priority || "low").toUpperCase()}
                </span>
            </div>

            <div class="mb-5">
                <h3 class="text-xl font-bold text-slate-800 leading-tight mb-2">
                    ${issue.title || "No title"}
                </h3>
                <p class="text-slate-500 text-sm leading-relaxed">
                    ${issue.description || "No description available"}
                </p>
            </div>

            <div class="flex gap-2 mb-6 flex-wrap">
                ${labelsHTML}
            </div>

            <div class="border-t border-gray-100 pt-4">
                <div class="text-slate-500 text-sm space-y-1">
                    <p>#${issue.id} by <span class="hover:underline cursor-pointer">${issue.author || "unknown"}</span></p>
                    <p class="text-slate-400">${formatDate(issue.createdAt)}</p>
                </div>
            </div>
        `;

        card.addEventListener("click", function () {
            loadSingleIssue(issue.id);
        });

        issueCardContainer.appendChild(card);
    });
}

async function loadSingleIssue(id) {
    try {
        const response = await fetch(`${SINGLE_ISSUE_API}/${id}`);
        const result = await response.json();

        const issue = result.data || result;

        if (detailsContent && singleIssueDetails) {
            detailsContent.innerHTML = `
                <div>
                    <h2 class="text-3xl font-bold text-slate-800 mb-3">
                        ${issue.title || "N/A"}
                    </h2>

                    <div class="flex items-center gap-3 flex-wrap mb-5 text-sm text-slate-500">
                        <span class="px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(issue.status)}">
                            ${issue.status || "N/A"}
                        </span>
                        <span>Opened by ${issue.author || "Unknown"}</span>
                        <span>${formatDate(issue.createdAt)}</span>
                    </div>

                    <div class="flex gap-2 mb-5 flex-wrap">
                        ${(issue.labels || []).map(function (label) {
                            return `
                                <span class="${getTagClass(label)} inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold">
                                    ${label}
                                </span>
                            `;
                        }).join("")}
                    </div>

                    <p class="text-slate-500 text-base leading-7 mb-6">
                        ${issue.description || "No description available"}
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl">
                        <div>
                            <p class="text-slate-500 text-sm mb-1">Assignee:</p>
                            <p class="font-bold text-slate-800">${issue.assignee || "Unassigned"}</p>
                        </div>

                        <div>
                            <p class="text-slate-500 text-sm mb-1">Priority:</p>
                            <span class="${getPriorityClass(issue.priority)} inline-block text-xs font-bold px-4 py-1.5 rounded-full tracking-wider">
                                ${String(issue.priority || "low").toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
            `;

            singleIssueDetails.classList.remove("hidden");
        }
    } catch (error) {
        console.log("Failed to load single issue:", error);
    }
}

function getPriorityClass(priority) {
    const value = String(priority || "").toLowerCase();

    if (value === "high") {
        return "bg-red-50 text-red-500";
    }

    if (value === "medium") {
        return "bg-yellow-50 text-yellow-600";
    }

    return "bg-gray-100 text-gray-500";
}

function getStatusBadgeClass(status) {
    const value = String(status || "").toLowerCase();

    if (value === "open") {
        return "bg-green-100 text-green-600";
    }

    if (value === "closed") {
        return "bg-purple-100 text-purple-600";
    }

    return "bg-gray-100 text-gray-500";
}

function getTagClass(tag) {
    const value = String(tag || "").toLowerCase();

    if (value === "bug") {
        return "bg-red-50 text-red-500 border border-red-100";
    }

    if (value === "help wanted") {
        return "bg-yellow-50 text-yellow-600 border border-yellow-100";
    }

    if (value === "enhancement") {
        return "bg-green-50 text-green-600 border border-green-100";
    }

    if (value === "documentation") {
        return "bg-blue-50 text-blue-600 border border-blue-100";
    }

    if (value === "good first issue") {
        return "bg-purple-50 text-purple-600 border border-purple-100";
    }

    return "bg-gray-100 text-gray-500 border border-gray-100";
}

function getStatusBorderColor(status) {
    const value = String(status || "").toLowerCase();

    if (value === "closed") {
        return "border-purple-500";
    }

    return "border-green-500";
}

function getStatusDotColor(status) {
    const value = String(status || "").toLowerCase();

    if (value === "closed") {
        return "bg-purple-100";
    }

    return "bg-green-100";
}

function formatDate(dateString) {
    if (!dateString) {
        return "No date";
    }

    return new Date(dateString).toLocaleDateString();
}

loadIssues();

