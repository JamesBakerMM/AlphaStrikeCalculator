const form = document.querySelector("form");

form.addEventListener("change", updateFooter);

form.addEventListener("submit", preventSubmit);

function selectRadios(queryId, queryName) {
    const query = `#${queryId} input[type='radio'][name='${queryName}']:checked`;
    let radios = document.querySelectorAll(query);
    return radios;
}

function selectChecks(queryId, queryName) {
    const query = `#${queryId} input[type='checkbox'][name='${queryName}']:checked`;
    let checks = document.querySelectorAll(query);
    return checks;
}

function calculateSubTotal(inputList) {
    let total = 0;
    for (let node of inputList) {
        total += parseInt(node.value);
    }
    return total;
}

function getSkill() {
    let inputs = selectRadios("skill", "pilotSkill");
    return calculateSubTotal(inputs);
}

function getAttack() {
    let inputs = selectRadios("attack", "attack");
    return calculateSubTotal(inputs);
}

function getRange() {
    let inputs = selectRadios("range", "range");
    return calculateSubTotal(inputs);
}

function getOther() {
    let inputs = document.querySelectorAll("input[type='number']");
    return calculateSubTotal(inputs);
}

function getTarget() {
    let radioInputs = selectRadios("target", "TMM");
    let checkInputs = selectChecks("target", "other");
    let total = 0;
    total += calculateSubTotal(radioInputs);
    total += calculateSubTotal(checkInputs);
    return total;
}

function updateFooter() {
    const footer = document.querySelector("footer");
    let bottomRow = footer.querySelector("table tbody tr");

    let total = footer.querySelector("#total");

    let calc = {
        s: getSkill(),
        a: getAttack(),
        t: getTarget(),
        o: getOther() || 0,
        r: getRange(),
    };

    //update table
    bottomRow.querySelector("#s").innerText = calc.s;
    bottomRow.querySelector("#a").innerText = calc.a;
    bottomRow.querySelector("#t").innerText = calc.t;
    bottomRow.querySelector("#o").innerText = calc.o;
    bottomRow.querySelector("#r").innerText = calc.r;

    //update total
    let totalVal = 0;
    for (const [key, value] of Object.entries(calc)) {
        totalVal += value;
    }
    total.innerText = totalVal;
}

function preventSubmit(event) {
    event.preventDefault();
    console.log("no");
    return false;
}
