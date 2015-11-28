console.log("loaded");

var initialize = function(){

  $(function() {

//make the buttons clicky
  	$('#signup-button').click(function(){ renderNewUserForm() });

    $('#logInAndOut').click(function(){ renderLogInForm() });



//////////////////////////////////////////////////////////////////
////////////////////SIGN UP///////////////////////////////////////
//////////////////////////////////////////////////////////////////

//render the sign up form when the signup button is clicked
  	var renderNewUserForm = function(){

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
  	var createUser = function(){

  		console.log('app.js createUser');

  		var first_name = $('#first_name-input').val();
  		var last_name = $('#last_name-input').val();
      var email = $('#email-input').val();
  		var password = $('#password-input').val();

  		var user = {
        first_name: first_name,
        last_name: last_name,
  			email: email,
  			password: password
  		}
  		$.post('/users', user)
  			.done(newUser);

  	};

//welcome a new user after creation
  	var newUser = function(data){

      $('#login-div').hide();
      $('#pre-login').hide();
      $('#logInAndOut').html("Log Out").click(function(){ Cookies.remove('loggedinId') });

  		$('#login-div').hide();

      $.get('/restaurants', data)
  			.done(function(data){

      		var template = Handlebars.compile($('#main-template').html());

      		$('#main-div').append(template(data))

  	   })
     };

//////////////////////////////////////////////////////////////////
////////////////////LOG IN////////////////////////////////////////
//////////////////////////////////////////////////////////////////

//render the log in form when the log in button is clicked
  	var renderLogInForm = function(){

  		console.log("app.js renderLogInForm");

  		var $formDiv = $('#login-div');

  		$formDiv.show();

  		$('.form').empty();
      $('#blurb').hide();
  		$('#signup-button').html("Wait, I need to sign up first!").show();


  		var template = Handlebars.compile($('#user-form').html());
  		$formDiv.append(template);

      $('#names-row').hide();

      $('#user-submit').click(function() {
  			console.log('app.js user-submit.click');
  			loginUser();
  			})
  			.html("Log Me In!");

  	};

// log in via POST route
  	var loginUser = function(){

  		console.log('app.js loginUser');

      var email = $('#email-input').val();
  	var password = $('#password-input').val();

      var user = {
  			email: email,
  			password: password
  		}
  		$.post('/login', user)
  			.done(function(data){
          returningUser(user);
  			})
  			.fail(function(){
  				alert("app.js loginUser login failed " + user.username)
  			})

  	};

//welcome a user after logging in
  	var returningUser = function(data){

      $('#login-div').hide();
      $('#pre-login').hide();
      $('#logInAndOut').html("Log Out").click(function(){ Cookies.remove('loggedinId') });

      // console.log(data.email);

  	    // var name = "";

  	    $.get('/users/' + data.email, data)
  	    	.done(function(data){
  	    		$('#loggedInUser').html(data.first_name);
  	    		// console.log(data.first_name);
  	    		// name = data.first_name;
  	    	})

  			//get dat cookie
  			// var user = getCookie();
  			// console.log(name);

    		var template = Handlebars.compile($('#first-template').html());

    		$('#first-div').append(template(data));

    		$('.order').click(function(){
          console.log("ORDER!");

    				console.log($(this).attr("data_id"));

    				$.get('/restaurants/' + $(this).attr("data_id"), data)
    					.done(function(data){
    						console.log(data);
    						var ul = $('#stuff');
    						var li = "<li>"+data[0].name+"- "+data[1].first_name+" is going</li>";

    						ul.append(li);

    					});
    			});
          
  			console.log("app.js - returningUser - /get - " + data);

  	    $.get('/restaurants', data)
  			.done(function(data){
  				console.log(data);


  	    		var template = Handlebars.compile($('#second-template').html());

  	    		$('#second-div').append(template(data));


            data.forEach( function (r){

              var map_id = ("'" + r._id + "-rest-map'");

              // let's try to put some maps on this site//////////////////////////
              var map = new google.maps.Map(document.getElementById(map_id), {
                log: console.log(r.position.lat, r.position.lng),
                zoom: 16,
                streetViewControl: false,
                mapTypeControl: false,
                center: new google.maps.LatLng(r.position.lat, r.position.lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP
              })

              var marker = new google.maps.Marker({
                map: map,
                position: {lat: r.position.lat, lng: r.position.lat},
                title: r.name
              });

          })

  	   })


///// adding restaurants to the top div

    } ///returningUser

  }); //end of everything

}

google.maps.event.addDomListener(window, 'load', initialize) //jk
