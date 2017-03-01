$(function() {
    var url = 'https://restcountries.eu/rest/v2/name/',
        $countriesList = $('#countries'),
        map,
        view;
    
    initMap(0, 0, 1);

    $('#search').click(searchCountries);
    
    $('body').keypress(function (e) {
        if (e.keyCode == 13){
            e.preventDefault();
            searchCountries();
        }
    });
        
    var x = 0;

    $(window).scroll(function() {
        if (this.pageYOffset >= 205 && $('#countries').height() > $('.panelMap').height()) {
            $('.panelMap').addClass('fixed');
        } else {
            $('.panelMap').removeClass('fixed');            
        }
    });
    
    
    
    function searchCountries() {
        var countryName = $('#country-name').val();
        if(!countryName.length) countryName = 'Poland';

        $.getJSON(url + countryName, showCountriesList);
    }
        
    function showCountriesList(resp) {
        $('#countCountries').text(resp.length);
        $countriesList.empty();
        resp.forEach(function(item) {
            var area = item.area + " km2";
            var population = item.population;
            var languages = '';
            item.languages.forEach(function(it) {
               languages += it.name + ', ';
            });
            languages = languages.substr(0, languages.length - 2);
            var currencies = '';
            item.currencies.forEach(function(it) {
               currencies += it.name + ', ';
            });
            currencies = currencies.substr(0, currencies.length - 2);       
            
            $countriesList.append($('<div>').addClass('panel panel-default country').append($('<div>').addClass('panel-heading').attr('role', 'tab').attr('id','heading'+item.alpha2Code).append($('<h4>').addClass('panel-title').append($('<a>').addClass('countryHeader').attr('data-lat',item.latlng[0]).attr('data-lng',item.latlng[1]).attr('role','button').attr('data-toggle','collapse').attr('data-parent','#countries').attr('href', '#collapse'+item.alpha2Code).append($('<img>').addClass('flag').attr('src','http://www.geonames.org/flags/x/'+item.alpha2Code.toLowerCase() +'.gif').attr('alt','flaga ' + item.name)).append($('<span>').addClass('name').text(item.name))))).append($('<div>').addClass('panel-collapse collapse countryDetails').attr('id','collapse'+item.alpha2Code).attr('role','tabpanel').append($('<div>').addClass('panel-body').append($('<table>').addClass('table table-hover table-condensed').append($('<tbody>').append($('<tr>').append($('<td>').addClass('noborder').text('Stolica')).append($('<td>').addClass('noborder').text(item.capital))).append($('<tr>').append($('<td>').text('Obszar')).append($('<td>').text(area))).append($('<tr>').append($('<td>').text('Ludność')).append($('<td>').text(population))).append($('<tr>').append($('<td>').text('Języki')).append($('<td>').text(languages))).append($('<tr>').append($('<td>').text('Waluta')).append($('<td>').text(currencies))))))))
        });  
        $('.countryHeader').click(function(e) {
            changeMap(parseInt($(this).attr('data-lat')), parseInt($(this).attr('data-lng')));
        });
        
        $('.countryHeader:first').click();

    }
    
    function initMap(lat, lng, zoom) {
        var zoomL = zoom || 4;
        view = new ol.View({
                center: ol.proj.fromLonLat([lng, lat]),
                zoom: zoomL
            });
        map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            loadTilesWhileAnimating: true,
            view: view
        });
    }

    function changeMap(lat, lng, zoom) {
        var zoomL = zoom || 6;
        
        view.animate({
            duration: 2000,
            center: ol.proj.fromLonLat([lng, lat]),
            zoom: zoomL
        });
            
    }

    
});