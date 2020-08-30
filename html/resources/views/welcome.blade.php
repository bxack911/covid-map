<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Covid map</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
        <!-- Styles -->
        <link rel="stylesheet" href="/css/style.css">

        <script src="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js"></script>
        <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
    </head>
    <body>
    <div class="body_wrapper">
        <div class="sidebar_menu">
            <div class="sidebar_item active" data-target="#map"><i class="fa fa-globe" aria-hidden="true"></i> <span>Map</span></div>
            <div class="sidebar_item" data-target="#graphics"><i class="fa fa-bar-chart" aria-hidden="true"></i> <span>Graphics</span></div>

            <div class="total_data">
                <h3>Total:</h3>
                <p><strong>Infected: </strong><span class="total_confirmed_html"></span></p>
                <p><strong>Deaths: </strong><span class="total_disease_html"></span></p>
            </div>
        </div>
        <div class="main_content">
            <div id="map" class="content_item active" style="display: block;"></div>
            <div id="graphics" class="content_item">
                <div id="confirmed_chart"></div>
                <div id="deaths_chart"></div>
                <div id="deaths_chart"></div>
            </div>
        </div>
    </div>
        <script src="/js/lib/jquery.js"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>


        <script src="/js/app.js?v=1.0"></script>
    </body>
</html>
