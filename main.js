var input = document.querySelector("input");
var button = document.querySelector("button");
var side_section = document.querySelector("#side-bar");
var side_header = document.querySelector("#side-header");
var main_section = document.querySelector("#main-content");
var current_main = document.querySelector("#current");

const City = class {
    constructor (city, hidden)
    {
        this.city = city;
        this.hidden = hidden;
        this.main_block = document.getElementById(city_arr.length + 1);
        this.side_panel = document.getElementById("side-" + city_arr.length + 1);
        this.side_panel.addEventListener("click", panel_switch);
    }

    switch_state = () =>
    {
        this.main_block.style.display = "none";
        this.hidden = true;
    }
};

var city_arr = [];

add_city = () =>
{
    const new_main = document.createElement("div");
    new_main.className = "main-panel";
    new_main.id = city_arr.length + 1;

    const h2_main = document.createElement("h2");
    h2_main.textContent = input.value;

    const day_container = document.createElement("div");
    day_container.className = "day-container";
    const day_text = document.createTextNode("Day Forcast");
    day_container.appendChild(day_text);

    const week_container = document.createElement("div");
    week_container.className = "weekly-container";
    const week_text = document.createTextNode("Weekly Forcast");
    week_container.appendChild(week_text);

    main_section.appendChild(new_main);
    new_main.appendChild(h2_main);
    new_main.appendChild(day_container);
    new_main.appendChild(week_container);

    // Main Section
    // ---------------------------------
    // Side Section

    const new_side = document.createElement("div");
    new_side.className = "side-panel";
    new_side.id = "side-" + city_arr.length + 1;
    
    const h2_side = document.createElement("h2");
    h2_side.textContent = input.value;

    side_section.appendChild(new_side);
    new_side.appendChild(h2_side);

    // ----------------------------------

    const new_city = new City(input.value, false);
    city_arr.push(new_city);
    add_switch(city_arr);
}

add_switch = () =>
{
    if(city_arr.length == 1) { return; }
    city_arr[city_arr.length - 2].switch_state();
}

panel_switch = () =>
{
    for(let i = 0; i < city_arr.length; i++)
    {
        if (city_arr[i].side_panel == this.side_panel) { continue; }
        city_arr[i].main_block.style.display = "none";
        city_arr[i].hidden = true;
    }
}

button.addEventListener("click", add_city);
