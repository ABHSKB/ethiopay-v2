const grossBtn = document.getElementById("grossBtn");
const netBtn = document.getElementById("netBtn");
const calculate = document.getElementById("calculate");
const clear = document.getElementById("clear");

const salaryLabel = document.getElementById("salaryLabel");
const input = document.getElementById("salaryInput");
const message = document.getElementById("message");

const grossSalary = document.getElementById("grossSalary");
const netSalary = document.getElementById("netSalary");
const taxRate = document.getElementById("taxRate");
const taxDeduction = document.getElementById("taxDeduction");
const incomeTax = document.getElementById("incomeTax");
const pension = document.getElementById("pension");
const totalDeduction = document.getElementById("totalDeduction");

const historyList = document.getElementById("historyList");
const historyMessage = document.getElementById("historyMessage");
const clearHistory = document.getElementById("clearHistory");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const pageNumber = document.getElementById("pageNumber");
const allHistory = document.getElementById("allHistory");
const grossHistory = document.getElementById("grossHistory");
const netHistory = document.getElementById("netHistory");

const historyUrl = "http://localhost:3000/api/salary/history";

let gross = true;
let currentPage = 1;
let historyType = "";
const limit = 10;


netBtn.addEventListener("click",function(){
    salaryLabel.textContent = "Net Salary (ETB)";
    gross = false;
});

grossBtn.addEventListener("click",function(){
    salaryLabel.textContent = "Gross Salary (ETB)";
    gross = true;
});

calculate.addEventListener("click", async function () {

    const value = Number(input.value);

    if (input.value === "") {
        showMessage("Enter salary first");
        return;
    }

    if (value <= 0) {
        showMessage("Salary must be greater than zero");
        return;
    }

    try {

        let url;
        let data;

        if (gross) {
            url = "http://localhost:3000/api/salary/calculate";

            data = {
                grossSalary: value
            };

        } else {
            url = "http://localhost:3000/api/salary/net-to-gross";

            data = {
                netSalary: value
            };
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            console.log("Backend error:", response.status, result);
            showMessage(result.message || result.error || "Calculation failed");
            return;
            }

        displayResult(result);

        await loadHistory();

    } catch (error) {

        showMessage("Unable to connect to the server");

        console.error(error);
    }
});

function displayResult(result){
    grossSalary.textContent = Number(result.grossSalary).toFixed(2);
    netSalary.textContent = Number(result.netSalary).toFixed(2);
    taxRate.textContent = Number(result.taxRate * 100).toFixed(0) + "%";
    taxDeduction.textContent = Number(result.taxDeduction).toFixed(2);
    incomeTax.textContent = Number(result.incomeTax).toFixed(2);
    pension.textContent = Number(result.pension).toFixed(2);

    const totalDeductionValue =
        Number(result.pension) + Number(result.incomeTax);

    totalDeduction.textContent = totalDeductionValue.toFixed(2);

}

clear.addEventListener("click", function () {

    input.value = "";

    salaryLabel.textContent = "Gross Salary (ETB)";
    gross = true;

    grossSalary.textContent = "-";
    netSalary.textContent = "-";
    taxRate.textContent = "-";
    taxDeduction.textContent = "-";
    incomeTax.textContent = "-";
    pension.textContent = "-";
    totalDeduction.textContent = "-";

    message.textContent = "";
});

function showMessage(text) {
    message.textContent = text;

    setTimeout(function () {
        message.textContent = "";
    }, 3000);
}

clearHistory.addEventListener("click", async () => {
    try {
        const response = await fetch(historyUrl, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Could not clear history");
        }

        await loadHistory();
        historyMessage.textContent = "History cleared successfully.";

    } catch (error) {
        historyMessage.textContent = error.message;
    }
});

async function loadHistory() {

    try {

        let url = `http://localhost:3000/api/salary/history?page=${currentPage}&limit=${limit}`;

        if (historyType) {
            url += `&type=${historyType}`;
        }

        const response = await fetch(url);

        const result = await response.json();

        if (!response.ok) {
            showMessage(result.error || "Unable to load history");
            return;
        }

        historyList.innerHTML = "";

        if (result.data.length === 0) {
            historyList.innerHTML = "<p>No history found.</p>";
        }

        result.data.forEach(history => {

            const item = document.createElement("div");

            item.className = "history-item";

            item.innerHTML = `
                <p><strong>Type:</strong> ${history.type}</p>
                <p><strong>Input:</strong> ${history.input}</p>
                <p><strong>Gross Salary:</strong> ${Number(history.result.grossSalary).toFixed(2)}</p>
                <p><strong>Net Salary:</strong> ${Number(history.result.netSalary).toFixed(2)}</p>
                <p><strong>Date:</strong> ${history.createdAt}</p>

                <div class="history-buttons">
                    <button onclick="viewHistory(${history.id})">
                        View
                    </button>

                    <button onclick="deleteHistory(${history.id})">
                        Delete
                    </button>
                </div>
            `;

            historyList.appendChild(item);
        });

        pageNumber.textContent = `Page ${result.page}`;

        previous.disabled = currentPage === 1;

        next.disabled = currentPage * limit >= result.total;

    } catch (error) {

        console.error(error);

        showMessage("Unable to connect to the server");
    }
}

async function viewHistory(id) {
    try {
        const response = await fetch(`${historyUrl}/${id}`);

        const result = await response.json();

        if (!response.ok) {
            showMessage(result.error || "History record not found");
            return;
        }

        displayResult(result.result);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {
        console.error(error);
        showMessage("Unable to connect to the server");
    }
}

async function deleteHistory(id) {

    try {

        const response = await fetch(
            `http://localhost:3000/api/salary/history/${id}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            showMessage(result.error || "Unable to delete history");
            return;
        }

        showMessage(result.message);

        loadHistory();

    } catch (error) {

        console.error(error);

        showMessage("Unable to connect to the server");
    }
}

previous.addEventListener("click", function () {

    if (currentPage > 1) {
        currentPage--;
        loadHistory();
    }

});

next.addEventListener("click", function () {

    currentPage++;
    loadHistory();

});

allHistory.addEventListener("click", function () {
    historyType = "";
    currentPage = 1;
    loadHistory();
});

grossHistory.addEventListener("click", function () {
    historyType = "gross-to-net";
    currentPage = 1;
    loadHistory();
});

netHistory.addEventListener("click", function () {
    historyType = "net-to-gross";
    currentPage = 1;
    loadHistory();
});

loadHistory();
