console.log("loaded");

$(function() 
{

	// var mongoose = require('mongoose');

	// mongoose.connect('mongodb://localhost/lunchapp');

	// var User = require('./models/user');
	// var Restaurant = require('./models/restaurant');

	//make the buttons clicky
	$('#signup-button').click(function(){ renderNewUserForm() });

  $('#logInAndOut').html("Log In").click(function(){ renderLogInForm() });



//////////////////////////////////////////////////////////////////
////////////////////SIGN UP///////////////////////////////////////
//////////////////////////////////////////////////////////////////

	//render the sign up form when the signup button is clicked
	var renderNewUserForm = function()
	{

		var $formDiv = $('#login-div');

		$formDiv.show();
		$('.form').empty();
		$('#signup-button').hide();
		var template = Handlebars.compile($('#user-form').html());

		$formDiv.append(template);

		$('#user-submit').click(function() {
			console.log('app.js renderNewUserForm user-submit.click');
			createUser();
		})
		.html("Sign Me Up!");

	};

	// creates new user via POST route
	var createUser = function()
	{

		console.log('app.js createUser');

		var first_name = $('#first_name-input').val();
		var last_name = $('#last_name-input').val();
    	var email = $('#email-input').val();
		var password = $('#password-input').val();

		var user = 
		{
	      	first_name: first_name,
	      	last_name: last_name,
			email: email,
			password: password
		}
		$.post('/users', user)
			.done(newUser);

	};

	//welcome a new user after creation
	var newUser = function(data)
	{

    	$('#login-div').hide();
    	$('#pre-login').hide();
    	$('#logInAndOut').html("Log Out").click(function()
    	{ 
    		Cookies.remove('loggedinId');
    		$('#logInAndOut').html("Log In");
    		$('#loggedInUser').html("No one");
    	});


		$('#login-div').hide();

    	$.get('/restaurants', data)
			.done(function(data)
			{

    			var template = Handlebars.compile($('#main-template').html());

    			$('#main-div').append(template(data))

	   		})
   };

//////////////////////////////////////////////////////////////////
////////////////////LOG IN////////////////////////////////////////
//////////////////////////////////////////////////////////////////

	//render the log in form when the log in button is clicked
	var renderLogInForm = function()
	{

		console.log("app.js renderLogInForm");

		var $formDiv = $('#login-div');

		$("#first-div").empty();
		$("#second-div").empty();

		$formDiv.show();

		$('.form').empty();
    	$('#blurb').hide();
		$('#signup-button').html("Wait, I need to sign up first!").show();


		var template = Handlebars.compile($('#user-form').html());
		$formDiv.append(template);

    	$('#names-row').hide();

    	$('#user-submit').click(function() 
    	{
			console.log('app.js user-submit.click');
			loginUser();
		}).html("Log Me In!");

	};

	// log in via POST route
	var loginUser = function()
	{

		console.log('app.js loginUser');

    	var email = $('#email-input').val();
		var password = $('#password-input').val();

    	var user = 
    	{
			email: email,
			password: password
		}
		$.post('/login', user)
			.done(function(data)
			{
        		returningUser(user);
			})
			.fail(function()
			{
				alert("app.js loginUser login failed " + user.username)
			})

	};

	//welcome a user after logging in
	var returningUser = function(data)
	{

	    $('#login-div').hide();
	    $('#pre-login').hide();

	    $('#logInAndOut').html("Log Out").click(function()
	    { 
		Cookies.remove('loggedinId');
	    	$('#logInAndOut').html("Log In");
	    	$('#loggedInUser').html("No one");
		});

	    if($('#logInAndOut').html() === "Log Out")
	    {
	    	// console.log("It is now Log out");
	  //   	$('#second-div').show();
			// $('#first-div').show();
	    }
	    // console.log(data.email);

	    // var name = "";

	    $.get('/users/' + data.email, data)
	    	.done(function(data)
	    	{
	    		$('#loggedInUser').html(data.first_name);
	    		// console.log(data.first_name);
	    		// name = data.first_name;
	    	})

			//get dat cookie
			// var user = getCookie();
			// console.log(name);

	    $.get('/restaurants', data)
			.done(function(data)
			{
				console.log(data);

	    		var templateRest = Handlebars.compile($('#second-template').html());

	    		$('#second-div').append(templateRest(data[0]));

	    		// console.log(data[0][1]._id);

          		var templateChosen = Handlebars.compile($('#first-template').html());

          		$('#first-div').append(templateChosen(data[1]));

          		console.log(data[0].id);

			    // var li = "<li>"+data[0].name+"- "+$.each(data[0].whosGoing, function(index, value){ (data[0].whosGoing[index] + ", ") })+" is going</li>";

			    var ul = $('#stuff');
			    var count = 0;
			    for(key in data[1])
			    {
			    	if (data[1][key].length > 0) 
			    	{
    					// alert(key + " -> " + p[key]);
    					// console.log(data[1][key].length);
    					var li = "<li id=\""+data[0][count]._id+"\">"+key+":- ";
    					for(var i = 0; i < data[1][key].length; i++)
    					{
    						// console.log(data[1][key][i]);
    						if(i === data[1][key].length - 1)
    						{
    							li += data[1][key][i] ;
    						}
    						else
    						{
    							li += data[1][key][i] + ", ";
    						}
    					}

    					li += " is going!</li>";

    					ul.append(li);

    					count++;
  					}
			    }

        		// let's try to put some maps on this site//////////////////////////
        		var initialize = function()
        		{

			        var map = new google.maps.Map(document.getElementById('rest-map'), 
			        {
			          zoom: 16,
			          streetViewControl: false,
			          mapTypeControl: false,
			          center: new google.maps.LatLng(40.741921, -73.988999),
			          mapTypeId: google.maps.MapTypeId.ROADMAP
			        })

			        data.forEach( function (r)
			        {
			          var marker = new google.maps.Marker(
			          {
			            map: map,
			            // position: {lat: r.position.lat, lng: r.position.lng},
			            title: r.name
			          })
			        })
			    }
			       

	        		// google.maps.event.addDomListener(window, 'load', initialize)

			        initialize();

			    	$('.order').click(function()
			    	{
			    		// console.log($(this).attr("data_id"));

			    		$.get('/restaurants/' + $(this).attr("data_id"), data)
			    			.done(function(data)
			    			{
		            		    // $('#stuff').empty();

			    				// console.log(data);
			    				var ul = $('#stuff');

			    				$("#"+data[0]._id).remove()

			    				var li = "<li>"+data[0].name+"- "+$.each(data[0].whosGoing, function(index, value){ (data[0].whosGoing[index] + ", ") })+" is going</li>";

			    				ul.append(li);


			    			})
			    	});
				

			})
	}

}); //end of everything
