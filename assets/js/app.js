"use strict";

jQuery.ajaxSetup({async:false});

var incidents_endpoint = 'https://spreadsheets.google.com/feeds/list/19dZQg8tGtOs13eTS_XrpKgW8xVi4mBTGUOIDmRThpnI/od6/public/values?alt=json';
var legislation_endpoint = 'https://spreadsheets.google.com/feeds/list/1_uAgeN200-IUjXbRK4xkMhAHteqSMPs8kuJRh4wG-cQ/od6/public/values?alt=json';

var year;
var counter;

$.getJSON(incidents_endpoint, function(data) {

	counter = 1;

	$(data.feed.entry).each(function(){

		year = this.gsx$yearofincident.$t.split(' ');
		year = year[year.length - 1][0] + year[year.length - 1][1] + '<br>' + year[year.length - 1][2] + year[year.length - 1][3];
		$('#inci-con').append('<div id="i-anc-'+counter+'" class="col-xs-3 date" div-toggle="#incident-'+counter+'"><div>'+year+'</div></div>');
		$('#incidents').append('<div id="incident-'+counter+'" class="incident row hidden" style="margin-bottom:30px"> <div class="col-md-12" style="margin-top:15px; margin-bottom:15px;"> <div class="i-date">'+this.gsx$yearofincident.$t+'</div><div class="i-area">'+this.gsx$place.$t+'</div></div><div class="col-md-12"> <div class="i-row"> <div class="i-img"><img src="assets/img/victim-icon.png"/></div><div class="i-text"> <div class="i-tag">VICTIMS</div><div class="i-desc">'+this.gsx$victim.$t+'</div></div></div><div class="i-row"> <div class="i-img"><img src="assets/img/perpatrator-icon.png"/></div><div class="i-text"> <div class="i-tag">PERPATRATOR</div><div class="i-desc">'+this.gsx$perpetrator.$t+'</div></div></div><div class="i-row"> <div class="i-img"><img src="assets/img/crime-icon.png"/></div><div class="i-text"> <div class="i-tag">CRIME</div><div class="i-desc">'+this.gsx$crime.$t+'</div></div></div><div class="i-row"> <div class="i-img"><img src="assets/img/verdict-icon.png"/></div><div class="i-text"> <div class="i-tag">VERDICT</div><div class="i-desc">'+this.gsx$verdict.$t+'</div></div></div><div class="i-row"> <div class="i-img"><img src="assets/img/sentence-icon.png"/></div><div class="i-text"> <div class="i-tag">SENTENCE</div><div class="i-desc">'+this.gsx$sentence.$t+'</div></div></div></div></div>');
		counter++;
	});

	console.log('incidents populated');

});

$.getJSON(legislation_endpoint, function(data) {

	counter = 1;

	$(data.feed.entry).each(function(){

		year = this.gsx$yearofpromulgation.$t;
		year = year[0] + year[1] + '<br>' + year[2] + year[3];

		$('#legi-con').append('<div id="l-anc-'+counter+'" class="col-xs-3 date" div-toggle="#legislation-'+counter+'"><div>'+year+'</div></div>');
		$('#legislations').append('<div id="legislation-'+counter+'" class="legislation row hidden" style="margin-bottom:30px"> <div class="col-md-12"> <div class="l-row" style="border-top:1px solid #B70000; margin-top:20px;"> <div class="l-img"><img src="assets/img/law-icon.png"/></div><div class="l-text"> <div class="l-tag">LAW</div><div class="l-desc">'+this.gsx$law.$t+'</div></div></div><div class="l-row"> <div class="l-tag">REGIME</div><div class="l-desc">'+this.gsx$regime.$t+'</div></div><div class="l-row"> <div class="l-tag">KEY FEATURES</div><div class="l-desc">'+this.gsx$keyfeatures.$t+'</div></div></div></div>');
		counter++;
	});

	console.log('legislation populated');

});

$(document).ready(function(){

	console.log('document ready');

	$('#inci-con .date').click(function(){

		$('#inci-con .date').removeClass('red-text');
		$(this).addClass('red-text');
		
		$('#incidents .incident').addClass('hidden');
		var el = $(this).attr('div-toggle');
	    $(el).removeClass('hidden');

	});

	$('#legi-con .date').click(function(){

		$('#legi-con .date').removeClass('red-text');
		$(this).addClass('red-text');

		$('#legislations .legislation').addClass('hidden');
		var el = $(this).attr('div-toggle');
	    $(el).removeClass('hidden');

	});

});

