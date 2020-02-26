var section = document.querySelector("section");
/*
GIANT API SECTION THATS NOT NEEDED ANYMORE
to request a token blizzard uses a CURL request and responds with the access token
something to look into later. temporailly going to manually put in my validated token
APItoken = "USca7oChNeizHjuF8waacn9FIPkUtZ4frg";
API1 = "https://us.api.blizzard.com/data/wow/media/item/";
API2 = "?namespace=static-classic-us&locale=en_US&access_token=";

console.log(API1 + String(19018) + API2 + APItoken);

function itemIcon(iconID) {
    var iconLink = "";
    var APIrequest = new XMLHttpRequest();
    APIrequest.open("GET", API1 + String(iconID) + API2 + APItoken);
    APIrequest.responseType = "json";
    APIrequest.send();

APIrequest.onload = function() {
    var tempBody = APIrequest.response;
    iconLink = tempBody.assets[0].value;
    iconLink = String(iconLink);
    console.log("this is inside the onload");
    console.log(iconLink);
};
console.log("this is at the end of itemicon");
return iconLink;
}
*/

// grab json file in my static folder using FileResponse in views.py
var request = new XMLHttpRequest();
request.open("GET", "/json");
request.responseType = "json";
request.send();
request.onload = function() {
    var raiders = request.response;
    populateHeader(raiders);
    showRaiders(raiders);
    filterByClass();
    checkMode();
};

function populateHeader(jsonObj) {
    document.getElementById("lastUpdated").innerHTML += jsonObj["dateModified"];
    document.getElementById("lastUpdated").innerHTML += " @ " + jsonObj["timeModified"];
}

function showRaiders(jsonObj) {
    var tntRaiders = jsonObj["raiders"];

    for (var i = 0; i < tntRaiders.length; i++) {
        var myList2 = document.createElement("ol");
        var myList3 = document.createElement("ol");

        var myCharName = document.createElement("div");
        myCharName.setAttribute("class", "raider-name");
        var myCharClass = document.createElement("div");
        myCharClass.setAttribute("class", "raider-class");
        var myCharRank = document.createElement("div");
        myCharRank.setAttribute("class", "raider-rank");

        myCharName.textContent = tntRaiders[i].name;
        myCharClass.innerHTML =
            tntRaiders[i].class +
            " <span class='display-sm'>&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;" +
            tntRaiders[i].Rank +
            "<span>";
        myCharRank.innerHTML = tntRaiders[i].Rank;

        var prio = tntRaiders[i].PriorityConfig;
        for (var j = 0; j < prio.length; j++) {
            var listItem2 = document.createElement("li");
            listItem2.innerHTML =
                '<a href="https://classic.wowhead.com/item=' +
                prio[j].ItemID +
                '" target="_blank" rel="noopener">' +
                prio[j].ItemName +
                "</a>";
            myList2.appendChild(listItem2);
        }

        var lott = tntRaiders[i].LotteryConfig;
        for (var j = 0; j < lott.length; j++) {
            var listItem3 = document.createElement("li");
            listItem3.innerHTML =
                '<a href="https://classic.wowhead.com/item=' +
                lott[j].ItemID +
                '" target="_blank" rel="noopener">' +
                lott[j].ItemName +
                "</a>";
            myList3.appendChild(listItem3);
        }

        //template
        var template = $("#hidden-template").html();
        var item = $(template).clone();

        //changing stuff in the template
        $(item)
            .find(".priority-dkp-value")
            .html(tntRaiders[i].PriorityDKP);
        $(item)
            .find(".lottery-dkp-value")
            .html(tntRaiders[i].LotteryDKP);
        $(item)
            .find(".prio-list")
            .html(myList2);
        $(item)
            .find(".lott-list")
            .html(myList3);
        $(item)
            .find(".tnt-raider")
            .addClass(tntRaiders[i].class);
        $(item)
            .find(".card-raider")
            .addClass(tntRaiders[i].class);
        $(item)
            .find(".raider-info")
            .append(myCharName);
        $(item)
            .find(".raider-info")
            .append(myCharClass);
        $(item)
            .find(".raider-info")
            .append(myCharRank);
        $(item)
            .find(".raider-info")
            .addClass(tntRaiders[i].class);

        //Append to the source
        $("#raider-list").append(item);
    }
}

// Saving Check Box Status w/o session
$(document).ready(function() {
    $('a[href="#uncheck"]').click(function() {
        $(".filter-class-warrior").prop("checked", false);
        $(".filter-class-priest").prop("checked", false);
        $(".filter-class-mage").prop("checked", false);
        $(".filter-class-rogue").prop("checked", false);
        $(".filter-class-hunter").prop("checked", false);
        $(".filter-class-paladin").prop("checked", false);
        $(".filter-class-warlock").prop("checked", false);
        $(".filter-class-druid").prop("checked", false);

        $(".card-raider.Warrior").hide();
        $(".card-raider.Priest").hide();
        $(".card-raider.Mage").hide();
        $(".card-raider.Rogue").hide();
        $(".card-raider.Hunter").hide();
        $(".card-raider.Paladin").hide();
        $(".card-raider.Warlock").hide();
        $(".card-raider.Druid").hide();

        updateStorage();
    });

    $('a[href="#check"]').click(function() {
        $(".filter-class-warrior").prop("checked", true);
        $(".filter-class-priest").prop("checked", true);
        $(".filter-class-mage").prop("checked", true);
        $(".filter-class-rogue").prop("checked", true);
        $(".filter-class-hunter").prop("checked", true);
        $(".filter-class-paladin").prop("checked", true);
        $(".filter-class-warlock").prop("checked", true);
        $(".filter-class-druid").prop("checked", true);

        $(".card-raider.Warrior").show();
        $(".card-raider.Priest").show();
        $(".card-raider.Mage").show();
        $(".card-raider.Rogue").show();
        $(".card-raider.Hunter").show();
        $(".card-raider.Paladin").show();
        $(".card-raider.Warlock").show();
        $(".card-raider.Druid").show();

        updateStorage();
    });
});

var formValues = JSON.parse(localStorage.getItem("formValues")) || {};
var $checkboxes = $("#filter-by-class :checkbox");
var $button = $("#filter-by-class button");

function allChecked() {
    return $checkboxes.length === $checkboxes.filter(":checked").length;
}

function updateButtonStatus() {
    $button.text(allChecked() ? "Uncheck all" : "Check all");
}

function handleButtonClick() {
    $checkboxes.prop("checked", allChecked() ? false : true);
}

function updateStorage() {
    $checkboxes.each(function() {
        formValues[this.id] = this.checked;
    });
    formValues["buttonText"] = $button.text();
    localStorage.setItem("formValues", JSON.stringify(formValues));
}

$(function() {
    initChecks();
});

function initChecks() {
    // On page load
    $.each(formValues, function(key, value) {
        $("#" + key).prop("checked", value);
    });
}

$button.on("click", function() {
    handleButtonClick();
    updateButtonStatus();
});

$checkboxes.on("change", function() {
    updateButtonStatus();
    updateStorage();
});

function filterByClass() {
    if ($(".filter-class-warrior").is(":checked")) $(".card-raider.Warrior").show();
    else $(".card-raider.Warrior").hide();

    if ($(".filter-class-priest").is(":checked")) $(".card-raider.Priest").show();
    else $(".card-raider.Priest").hide();

    if ($(".filter-class-mage").is(":checked")) $(".card-raider.Mage").show();
    else $(".card-raider.Mage").hide();

    if ($(".filter-class-rogue").is(":checked")) $(".card-raider.Rogue").show();
    else $(".card-raider.Rogue").hide();

    if ($(".filter-class-hunter").is(":checked")) $(".card-raider.Hunter").show();
    else $(".card-raider.Hunter").hide();

    if ($(".filter-class-paladin").is(":checked")) $(".card-raider.Paladin").show();
    else $(".card-raider.Paladin").hide();

    if ($(".filter-class-warlock").is(":checked")) $(".card-raider.Warlock").show();
    else $(".card-raider.Warlock").hide();

    if ($(".filter-class-druid").is(":checked")) $(".card-raider.Druid").show();
    else $(".card-raider.Druid").hide();
}
