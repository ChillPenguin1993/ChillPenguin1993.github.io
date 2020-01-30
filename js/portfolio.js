var item_list = document.querySelectorAll("li.portfolio_item div");
//alert("found " + item_list.length + " items");

//var main_content = document.getElementsByTagName("main")[0];
//main_content.addEventListener("click", resizeItems);

window.addEventListener("resize", resizeItems);

function resizeItems()
{
    var widths = [];
    var i = 0;

    item_list.forEach(function(userItem)
    {
        userItem.style.width = "100px";
    });
    
    item_list.forEach(function(userItem)
    {
        var parent_width = userItem.parentElement.parentElement.clientWidth - 17;
        //console.log("Parent width: " + parent_width + ", my width: " + (userItem.clientWidth - 16));
        //userItem.style.width = parent_width.toString() + "px";
        widths.push(parent_width);
        //console.log("new width: " + userItem.style.width);
    });

    item_list.forEach(function(userItem)
    {
        userItem.style.width = widths[i].toString() + "px";
        i++;
    });
    //alert(item_list[0].style.width);
}

resizeItems();
//item_list[1].style.width = "100px";