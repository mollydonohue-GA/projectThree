/////////////////  Maoz
var Maoz = new Restaurant({
  name: "Maoz",
  foodType: "Vegetarian",
  phone: "212-260-1988",
  urlRestaurant: "http://www.maozusa.com/",
  urlMenu: "http://www.maozusa.com/menus/maoz-sandwich",
  urlOnline: "https://www.grubhub.com/restaurant/maoz-vegetarian-38-union-sq-e-new-york/315431?classicAffiliateId=%2Fr%2Fw%2F33213%2Fnyc%2Fmaoz-vegetarian-union-sq-e%2F",
  crossStreet: "38 Union Square East (Between 16th and 17th St)",
  position: {
    lat: "40.736320",
    lng: "-73.989081"
  },
  orderOnline: true,
  seating: true,
  whosGoing: []
});

Maoz.save(function(err)
{
    if(err) console.log(err);
    console.log(Maoz.name + "created");
});

/////////////////  Pret a Manger
var Pret = new Restaurant({
  name: "Pret A Manger",
  foodType: "Sandwiches, Salads, Coffee, & more",
  phone: "212-260-1988",
  urlRestaurant: "https://www.pret.com/en-us",
  urlMenu: "https://www.pret.com/en-us/our-menu/134-our-full-menu.aspx",
  urlOnline: "",
  crossStreet: "23RD AND 5TH",
  position: {
    lat: "40.741942",
    lng: "-73.990779"
  },
  orderOnline: false,
  seating: true,
  whosGoing: []
});

Pret.save(function(err)
{
    if(err) console.log(err);
    console.log(Pret.name + "created");
});

/////////////////  Burger and Lobster
var burgerLobster = new Restaurant({
  name: "Burger and Lobster",
  foodType: "Sandwiches, Salads, Coffee, & more",
  phone: "212-260-1988",
  urlRestaurant: "https://www.pret.com/en-us",
  urlMenu: "https://www.pret.com/en-us/our-menu/134-our-full-menu.aspx",
  urlOnline: "",
  crossStreet: "23RD AND 5TH",
  position: {
    lat: "40.741942",
    lng: "-73.990779"
  },
  orderOnline: false,
  seating: true,
  whosGoing: []
});

Pret.save(function(err)
{
    if(err) console.log(err);
    console.log(Pret.name + "created");
});