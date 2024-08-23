const API_key = "{INSERT API KEY HERE}";

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
        this.side_panel.addEventListener("click", this.panel_switch);
        const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_key + "&units=imperial";
        // Async/Await API call
        const load_data = async () =>
        {
            const res = await fetch(queryURL);
            this.data = await res.json();
            document.getElementById("current-temp" + city_arr.length + 1).textContent = this.data.main.temp;
            document.getElementById("min-temp" + city_arr.length + 1).textContent = this.data.main.temp_min;
            document.getElementById("max-temp" + city_arr.length + 1).textContent = this.data.main.temp_max;

            document.getElementById("speed" + city_arr.length + 1).textContent = this.data.wind.speed;
            document.getElementById("deg" + city_arr.length + 1).textContent = this.data.wind.deg;

            document.getElementById("pressure" + city_arr.length + 1).textContent = this.data.main.pressure;
            document.getElementById("humidity" + city_arr.length + 1).textContent = this.data.main.humidity;

            city_arr.push(this);
            add_switch(city_arr);
        }
        load_data();

        // Then/Catch API call
/*      fetch(queryURL)
            .then(res => res.json())
            .then(data => this.data = data)
            .catch(() => console.error("Error")); */
    }

    switch_state = () =>
    {
        this.main_block.style.display = "none";
        this.hidden = true;
    }

    panel_switch = () =>
    {
        for(let i = 0; i < city_arr.length; i++)
        {
            if (city_arr[i].side_panel == this.side_panel)
            {
                city_arr[i].main_block.style.display = "flex";
                city_arr[i].hidden = false;
            }
            else
            {
                city_arr[i].main_block.style.display = "none";
                city_arr[i].hidden = true;
            }
        }
    }
};

var city_arr = [];

add_city = () =>
{
    const new_main = document.createElement("div");
    new_main.className = "main-panel";
    new_main.id = city_arr.length + 1;
    main_section.appendChild(new_main);

    // header
    const h2_main = document.createElement("h2");
    h2_main.textContent = input.value;
    new_main.appendChild(h2_main);

    // weather container
    const weather_container = document.createElement("div");
    weather_container.className = "weather-container";
    const weather_text = document.createTextNode("Weather Information");
    new_main.appendChild(weather_container);
    weather_container.appendChild(weather_text);

    // weather container contents
    const new_container = document.createElement("div");
    new_container.className = "container";
    weather_container.appendChild(new_container);

    const new_box1 = document.createElement("div");
    new_box1.className = "box";
    new_container.appendChild(new_box1);
    const new_h4_1 = document.createElement("h4");
    new_h4_1.textContent = "Temperature";
    new_box1.appendChild(new_h4_1);

    const new_box2 = document.createElement("div");
    new_box2.className = "box";
    new_container.appendChild(new_box2);
    const new_h4_2 = document.createElement("h4");
    new_h4_2.textContent = "Winds";
    new_box2.appendChild(new_h4_2);

    const new_box3 = document.createElement("div");
    new_box3.className = "box";
    new_container.appendChild(new_box3);
    const new_h4_3 = document.createElement("h4");
    new_h4_3.textContent = "Other";
    new_box3.appendChild(new_h4_3);

    // weather box contents
    const curr_temp = document.createElement("p");
    curr_temp.id = "current-temp" + city_arr.length + 1;
    new_box1.appendChild(curr_temp);
    const min_temp = document.createElement("p");
    min_temp.id = "min-temp" + city_arr.length + 1;
    new_box1.appendChild(min_temp);
    const max_temp = document.createElement("p");
    max_temp.id = "max-temp" + city_arr.length + 1;
    new_box1.appendChild(max_temp);

    const speed = document.createElement("p");
    speed.id = "speed" + city_arr.length + 1;
    new_box2.appendChild(speed);
    const deg = document.createElement("p");
    deg.id = "deg" + city_arr.length + 1;
    new_box2.appendChild(deg);

    const pressure = document.createElement("p");
    pressure.id = "pressure" + city_arr.length + 1;
    new_box3.appendChild(pressure);
    const humidity = document.createElement("p");
    humidity.id = "humidity" + city_arr.length + 1;
    new_box3.appendChild(humidity);

    // city container
    const city_container = document.createElement("div");
    city_container.className = "city-container";
    const city_text = document.createTextNode("City Information");
    new_main.appendChild(city_container);
    city_container.appendChild(city_text);

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
}

add_switch = () =>
{
    if(city_arr.length == 1) { return; }
    city_arr[city_arr.length - 2].switch_state();
}

button.addEventListener("click", add_city);
