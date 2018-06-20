$(document).ready(function() {
    $("input").click(function()
    {
        var numberOfListItem = $("#choices li").length;
        var randomChildNumber = Math.floor(Math.random()*numberOfListItem);
        
        $("H1").text($("#choices li").eq(randomChildNumber).text())
    });
});