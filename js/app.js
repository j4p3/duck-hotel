App = Ember.Application.create();

//  DATA MODELS
  //  TEST GENERIC MODELS

App.ItineraryItem = Ember.Object.extend({
  name: function () {
    var name = this.place.get('name');
    return (name);
  }.property('name')
});

App.ItineraryDay = Ember.Object.extend({
  init: function () {
    console.log("initializing an itinerary day");
    var url = "http://captain-planner-dev.herokuapp.com/mvp/itineraries/2/1";
    var itinerary = this;

    $.ajax({
    url: 'http://captain-planner-dev.herokuapp.com/mvp/itinerary/2/1',
    dataType: 'json',
    crossDomain: true,
    }).then(function (response) {

    console.log("received itinerary day data");
    var items = Em.A();
    response.forEach(function (child) {
      console.dir(child);
      var item = App.ItineraryItem.create({
        name: child.place.name
      });
      items.push(item);
    });
    itinerary.setProperties({items: items});
    });
  }
});

//  ROUTER

App.Router.map(function () {
  this.resource('itinerary');
});
// App.Router.map(function() {
//   this.resource("itinerary", { path: "/:itinerary_id" }, function() {
//     this.resource('link', { path: '/:itinerary_id'} );
//   });
// });

//  ROUTE HOOKS

App.ItineraryRoute = Ember.Route.extend({
  activate: function (controller, model) {
    console.log("itinerary day setup active");
    App.ItineraryDay.create({});
  }
});

