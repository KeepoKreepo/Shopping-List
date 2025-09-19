// Array
let list = [{ name: "Apple", cost: 1.22, amount: 2 }];

function addItemToList() {
    let item = $("nameInput").value;
    let count = parseInt($("amountInput").value);
    let price = parseFloat($("costInput").value).toFixed(2);
    if (!isNaN(count) && !isNaN(price) && isNaN(item)) {
        list.push({ name: item, cost: price, amount: count });
        loadAndDisplay();
        console.log(list);
        resetInter();
    } else {
        alert(
            "Please enter a valid name and a valid number for cost and item amount!"
        );
    }
}

// Loads and displays the list and total cost. Updates automatically.
function loadAndDisplay() {
    let n = "<ol>";
    for (let i = 0; i < list.length; i++) {
        n += "<li>" + list[i].name + "</li>";
    }
    n += "<ol>";
    $("nameList").innerHTML = n;

    let c = "<ol>";
    for (let i = 0; i < list.length; i++) {
        c += "<li>" + "&euro;" + list[i].cost + "</li>";
    }
    c += "<ol/>";
    $("costList").innerHTML = c;

    let a = "<ol>";
    for (let i = 0; i < list.length; i++) {
        a += "<li>" + "" + "x" + list[i].amount + "</li>";
    }
    a += "<ol>";
    $("amountList").innerHTML = a;

    totalCost();
}

// Reset input fields on pushing or splicing 
function resetInter() {
    $("nameInput").value = ""
    $("costInput").value = ""
    $("amountInput").value = ""
    $("removeInput").value = ""
}

// Choses which sort function to apply depending on the dropdown.
function sort() {
    if ($("nAsc").selected == true) {
        nameAsc();
    }
    if ($("nDsc").selected == true) {
        nameDsc();
    }
    if ($("cAsc").selected == true) {
        costAsc();
    }
    if ($("cDsc").selected == true) {
        costDsc();
    }
}

function nameAsc() {
    for (i = 0; i < list.length; i++) {
        list.sort((a, b) => (a.name > b.name ? 1 : -1));
    }
    loadAndDisplay();
    console.log(list);
}

// Sorts by descending alphabetically
function nameDsc() {
    for (i = 0; i < list.length; i++) {
        list.sort((a, b) => (b.name > a.name ? 1 : -1));
    }
    loadAndDisplay();
    console.log(list);
}

// Sorts by ascdeing numerical
function costAsc() {
    list.sort((a, b) => a.cost - b.cost);
    loadAndDisplay();
    console.log(list);
}

// Sorts by descending numerical
function costDsc() {
    list.sort((a, b) => b.cost - a.cost);
    loadAndDisplay();
    console.log(list);
}

// Removes a items and duplicates.
function remove() {
    let gone = $("removeInput").value
    if (isNaN(gone)) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].name == gone) {
                list.splice(i, 1);
                i--;
            }
        }
        loadAndDisplay();
        resetInter();
    }
    else {
        alert("Please enter a valid Item Name to remove! Case Sensitive!")
    }
}

// Calculates the total cost of the list
function totalCost() {
    let total = 0;
    for (let i = 0; i < list.length; i++) {
        total += list[i].cost * list[i].amount;
    }
    $("totalP").innerHTML = "Total: " + "&euro;" + total.toFixed(2);
    console.log(total);
    return total;
}

// QOL
function $(id) {
    return document.getElementById(id);
}

// When the page loads do and prepare this
window.onload = function () {
    $("addItem").onclick = function () {
        addItemToList();
    };
    $("sortList").onclick = function () {
        sort();
    };
    $("removeBu").onclick = function () {
        remove();
    }
    loadAndDisplay();
};