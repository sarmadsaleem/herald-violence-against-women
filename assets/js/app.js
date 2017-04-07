"use strict";

var incidents_endpoint = 'https://spreadsheets.google.com/feeds/list/19dZQg8tGtOs13eTS_XrpKgW8xVi4mBTGUOIDmRThpnI/od6/public/values?alt=json';
var legislation_endpoint = 'https://spreadsheets.google.com/feeds/list/1_uAgeN200-IUjXbRK4xkMhAHteqSMPs8kuJRh4wG-cQ/od6/public/values?alt=json';
var writeup_endpoint = 'https://spreadsheets.google.com/feeds/cells/19dZQg8tGtOs13eTS_XrpKgW8xVi4mBTGUOIDmRThpnI/2/public/values?alt=json';

var year;
var counter;
var timeline;
var timeline_years = [];

//populate writeup
$.getJSON(writeup_endpoint, function(data){

	var heading = data.feed.entry[0].content.$t;
	var writeup = data.feed.entry[1].content.$t;

	writeup = writeup.replace(/\n/g, "<br>");

	$('.content h1').html(heading);
	$('.content p').html(writeup);

});

// populate incidents
$.getJSON(incidents_endpoint, function(data) {

	counter = 1;

	$(data.feed.entry).each(function(){

		year = this.gsx$yearofincident.$t.split(' ');
		year = year[year.length - 1][0] + year[year.length - 1][1] + year[year.length - 1][2] + year[year.length - 1][3];
		$('#inci-con').append('<div id="i-anc-'+counter+'" class="col-xs-3 col-md-3 date" div-toggle="#incident-'+counter+'"><div>'+year+'</div></div>');
		$('#inci-details').prepend('<div id="incident-'+counter+'" class="incident row hidden" style="margin-bottom:25px"> <div class="col-md-12" style="margin-top:15px; margin-bottom:15px;"> <div class="i-date">'+this.gsx$yearofincident.$t+'</div><div class="i-area">'+this.gsx$place.$t+'</div></div><div class="col-md-12"> <div class="i-row"> <div class="i-img"><img src="assets/img/victim-icon.png"/></div><div class="i-text"> <div class="i-tag">VICTIMS</div><div class="i-desc">'+this.gsx$victim.$t+'</div></div></div><div class="i-row"> <div class="i-img"><img src="assets/img/perpatrator-icon.png"/></div><div class="i-text"> <div class="i-tag">PERPETRATOR</div><div class="i-desc">'+this.gsx$perpetrator.$t+'</div></div></div><div class="i-row"> <div class="i-img"><img src="assets/img/crime-icon.png"/></div><div class="i-text"> <div class="i-tag">CRIME</div><div class="i-desc">'+this.gsx$crime.$t+'</div></div></div><div class="i-row"> <div class="i-img"><img src="assets/img/verdict-icon.png"/></div><div class="i-text"> <div class="i-tag">VERDICT</div><div class="i-desc">'+this.gsx$verdict.$t+'</div></div></div><div class="i-row"> <div class="i-img"><img src="assets/img/sentence-icon.png"/></div><div class="i-text"> <div class="i-tag">SENTENCE</div><div class="i-desc">'+this.gsx$sentence.$t+'</div></div></div></div></div>');
		counter++;
	});

	console.log('incidents populated');

	$(document).ready(function(){

		$('#inci-con .date').click(function(){


			var iyear = parseInt($(this).children('div').html());

			var closest = timeline_years.reduce(function (prev, curr) {
			  return (Math.abs(curr - iyear) < Math.abs(prev - iyear) ? curr : prev);
			});

			console.log(timeline_years.indexOf(closest));
			timeline.goTo(timeline_years.indexOf(closest));

			$('#inci-con .date').removeClass('red-text');
			$(this).addClass('red-text');
			
			$('#incidents .incident').addClass('hidden');
			var el = $(this).attr('div-toggle');
		    $(el).removeClass('hidden');

		    //$(window).scrollTop($(el).offset().top);
		    $('html, body').animate({
		        scrollTop: $(el).offset().top
		    }, 400);

		});

	});

});

//populate legislation
$.getJSON(legislation_endpoint, function(data) {

	counter = 1;

	//console.log(data.feed.entry);
	var timeline_events = [{
	        "media": {
	          "url": "",
	        },
	        "start_date": {
	          "year": 1978
	        },
	        "text": {
	        	"headline": 'Post Zia Era',
	          	"text": ''
	        },
	        
	      }];

	$(data.feed.entry).each(function(){

		year = this.gsx$yearofpromulgation.$t;
		year = year[0] + year[1] + year[2] + year[3];

		timeline_years.push(parseInt(year));

		timeline_events.push({
	        "media": {
	          "url": "",
	        },
	        "start_date": {
	          "year": year
	        },
	        "text": {
	        	"headline": this.gsx$law.$t,
	          	"text": '<div id="legislation-'+counter+'" class="legislation row" style="margin-bottom:10px"> <div class="col-md-12"> <div class="l-row" style="border-top:1px solid #B70000; margin-top:20px;"> <div class="l-img"><img src="assets/img/law-icon.png"/></div><div class="l-text"> <div class="l-tag">LAW</div><div class="l-desc">'+this.gsx$law.$t+'</div></div></div><div class="l-row"> <div class="l-tag">REGIME</div><div class="l-desc">'+this.gsx$regime.$t+'</div></div><div class="l-row"> <div class="l-tag">KEY FEATURES</div><div class="l-desc">'+this.gsx$keyfeatures.$t+'</div></div></div></div>'
	        },
	        "unique_id": counter,
	      });
		

		//$('#legi-con').append('<div id="l-anc-'+counter+'" class="col-xs-3 col-md-2 date" div-toggle="#legislation-'+counter+'"><div>'+year+'</div></div>');
		//$('#legislations').append('<div id="legislation-'+counter+'" class="legislation row hidden" style="margin-bottom:10px"> <div class="col-md-12"> <div class="l-row" style="border-top:1px solid #B70000; margin-top:20px;"> <div class="l-img"><img src="assets/img/law-icon.png"/></div><div class="l-text"> <div class="l-tag">LAW</div><div class="l-desc">'+this.gsx$law.$t+'</div></div></div><div class="l-row"> <div class="l-tag">REGIME</div><div class="l-desc">'+this.gsx$regime.$t+'</div></div><div class="l-row"> <div class="l-tag">KEY FEATURES</div><div class="l-desc">'+this.gsx$keyfeatures.$t+'</div></div></div></div>');
		counter++;
	});

	var timeline_options = {
	    timenav_position: 'top',

	}

	var timeline_data = {events:timeline_events};
	timeline = new TL.Timeline('timeline-embed', timeline_data, timeline_options);
	//console.log(timeline_events);
	$('#post-zia-era-marker').css('display','none');
	$('#post-zia-era').css('display', 'none');
	$('.tl-storyslider').addClass('hidden');

	console.log('legislation populated');



	$(document).ready(function(){

		$('#legi-con .date').click(function(){



			$('#legi-con .date').removeClass('red-text');
			$(this).addClass('red-text');

			$('#legislations .legislation').addClass('hidden');
			var el = $(this).attr('div-toggle');
		    $(el).removeClass('hidden');

		    //$(window).scrollTop($(el).offset().top);
		    $('html, body').animate({
		        scrollTop: $(el).offset().top
		    }, 400);

		});

		
		$( ".tl-timemarker" ).click(function(){
			$('.tl-storyslider').removeClass('hidden');
		});

		$( ".date" ).click(function(){
			$('.tl-storyslider').removeClass('hidden');
		});

	});

});







