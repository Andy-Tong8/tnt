// Old Dark Mode Button
// $("#darkmode").change(function() {
//     if ($(this).prop("checked")) {
//         $("body").addClass("dark-mode");
//         $(".section").addClass("dark-mode");
//         $(".section-header").attr("class", "section dark-header");
//         $(".card-stacked").addClass("dark-mode");
//         $(".loot-config-list").addClass("dark-mode");
//         $(".dkp-count").addClass("dark-mode");
//     } else {
//         $("body").removeClass("dark-mode");
//         $(".section").removeClass("dark-mode");
//         $(".dark-header").attr("class", "section section-header");
//         $(".card-stacked").removeClass("dark-mode");
//         $(".loot-config-list").removeClass("dark-mode");
//         $(".dkp-count").removeClass("dark-mode");
//     }
// });

$("#darkmode").change(function() {
    checkMode();
});

function checkMode() {
    if ($(".filter-darkmode").is(":checked")) {
        darkmode();
        $.ajax({
            url: "/darkmode",
            method: "get",
            data: { val: "checked" }
        });
    } else {
        lightmode();
        $.ajax({
            url: "/darkmode",
            method: "get",
            data: { val: "" }
        });
    }
}

// Dark Mode
function darkmode() {
    $("body").addClass("dark-mode");
    $(".section").addClass("dark-mode");
    $(".section-header").attr("class", "section dark-header");
    $(".card-stacked").addClass("dark-mode");
    $(".loot-config-list").addClass("dark-mode");
    $(".dkp-count").addClass("dark-mode");
}
// Light Mode
function lightmode() {
    $("body").removeClass("dark-mode");
    $(".section").removeClass("dark-mode");
    $(".dark-header").attr("class", "section section-header");
    $(".card-stacked").removeClass("dark-mode");
    $(".loot-config-list").removeClass("dark-mode");
    $(".dkp-count").removeClass("dark-mode");
}
//check the mode on page load
checkMode();

