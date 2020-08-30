$(document).ready(function(){
    var total_deaths = 0;
    var total_confirmed = 0;

    $(".sidebar_menu .sidebar_item").click(function(){
        if(!$($(this).attr("data-target")).hasClass('active')){
            $(".sidebar_menu .sidebar_item").removeClass('active');
            $(this).addClass('active');
            $(".main_content .content_item").slideUp(300);
            $(".main_content .content_item").removeClass("active");
            $($(this).attr("data-target")).slideDown(300);
            $($(this).attr("data-target")).addClass('active');
        }
    });

    /*---------GEN MAP START-----------*/
    mapboxgl.accessToken = 'pk.eyJ1IjoiYnhhY2s5MTEiLCJhIjoiY2tlZDRxcDZyMDJ6eDM2dDU3cXpwbzBodyJ9.yDyISIdkthze4GFd5IEqlg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/bxack911/cked4t9j80aeo19n36x338rd0',
        center: [32, 49],
        zoom: 5
    });

    var covid_data = function () {
        var tmp_data = null;
        $.ajax({
            'async': false,
            'type': "GET",
            'url': "https://corona-api.com/countries",
            'success': function (data) {
                tmp_data = data.data;
            }
        });
        return tmp_data;
    }();

    var chart_confirmed = [];
    var chart_deaths = [];

    covid_data.forEach(function(marker) {
        var el = document.createElement('div');
        el.className = 'marker';
        var coordinated;

        coordinated = [marker.coordinates.longitude, marker.coordinates.latitude];
        if(marker.code == "RU"){
            coordinated = [100.00, 60.00];
        }

        el.innerHTML = marker.latest_data.confirmed;

        new mapboxgl.Marker(el)
            .setLngLat(coordinated)
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML('<div class="marker_popup">' +
                    '<h3>Total</h3>' +
                    '<p><strong>Infected: </strong> ' + marker.latest_data.confirmed + '</p>' +
                    '<p><strong>Deaths: </strong> ' + marker.latest_data.deaths + '</p>' +
                    '<p><strong>Recovered: </strong> ' + marker.latest_data.recovered + '</p><br />' +
                    '<h3>Today</h3>' +
                    '<p><strong>Infected: </strong> ' + marker.today.confirmed + '</p>' +
                    '<p><strong>Deaths: </strong> ' + marker.today.deaths + '</p><br />' +
                    '<h3>About country</h3>' +
                    '<p><strong>Name: </strong> ' + marker.name + '</p>' +
                    '<p><strong>ISO 3166 Code: </strong> ' + marker.code + '<\p>' +
                    '<p><strong>Population: </strong> ' + marker.population + '</p>' +
                    '</div>'))
            .addTo(map);

        total_deaths += marker.latest_data.deaths;
        total_confirmed += marker.latest_data.confirmed;

        chart_confirmed.push([
            marker.name, marker.latest_data.confirmed
        ]);

        chart_deaths.push([
            marker.name, marker.latest_data.deaths
        ]);
    });

    $(".total_confirmed_html").html(total_confirmed);
    $(".total_disease_html").html(total_deaths);
    /*---------GEN MAP END-----------*/




    /*---------CHARTS START------------*/
    google.charts.load('current', {'packages':['corechart']});

    google.charts.setOnLoadCallback(drawChart);

    let pie_graph_size = ($(window).width() / 2) - 250;

    if($(window).width() < 768){
        pie_graph_size = $(window).width();
    }

    function drawChart() {

        // Create the data table.
        var confirmed_data = new google.visualization.DataTable();
        confirmed_data.addColumn('string', 'Topping');
        confirmed_data.addColumn('number', 'Slices');
        confirmed_data.addRows(chart_confirmed);

        // Set chart options
        var confirmed_options = {
            'title':'Infected by country',
            'backgroundColor' : '#1a2637',
            'backgroundColor.stroke' : '#fff',
            'backgroundColor.strokeWidth' : '1',
            'backgroundColor.fill' : '#fff',
            'pieSliceTextStyle': {color: '#fff'},
            'legend': {
                textStyle: {color: '#fff', fontSize: 16}
            },
            'titleTextStyle': {
                color: "#fff"
            },
            'width':pie_graph_size,
            'height':pie_graph_size
        };


        var deaths_data = new google.visualization.DataTable();
        deaths_data.addColumn('string', 'Topping');
        deaths_data.addColumn('number', 'Slices');
        deaths_data.addRows(chart_deaths);

        // Set chart options
        var deaths_options = {
            'title':'Deaths by country',
            'backgroundColor' : '#1a2637',
            'backgroundColor.stroke' : '#fff',
            'backgroundColor.strokeWidth' : '1',
            'backgroundColor.fill' : '#fff',
            'pieSliceTextStyle': {color: '#fff'},
            'legend': {
                textStyle: {color: '#fff', fontSize: 16}
            },
            'titleTextStyle': {
                color: "#fff"
            },
            'width':pie_graph_size,
            'height':pie_graph_size
        };

        var confirmed_chart = new google.visualization.PieChart(document.getElementById('confirmed_chart'));
        confirmed_chart.draw(confirmed_data, confirmed_options);
        var deaths_chart = new google.visualization.PieChart(document.getElementById('deaths_chart'));
        deaths_chart.draw(deaths_data, deaths_options);
    }
    /*---------CHARTS END------------*/
});
