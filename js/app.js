App = Ember.Application.create();

//  DATA MODELS
  //  TEST GENERIC MODELS

App.ItineraryItem = Ember.Object.extend({
  store: {},

  find: function(id) {
    return this.store[id];
  }
});

App.ItineraryDay = Ember.Object.extend({
  loaded: false,

  getData: function () {
    if (this.get('loaded')) return;

    var url = "http://captain-planner-dev.herokuapp.com/mvp/itineraries/2/1";
    var itinerary = this;

    $.ajax({
    url: 'http://captain-planner-dev.herokuapp.com/mvp/itinerary/2/1',
    dataType: 'json',
    crossDomain: true,
    }).then(function (response) {
    var items = Em.A();
    for (var i=0;i<response.length;i++) {
      var item = App.ItineraryItem.create(response[i]).setProperties({id: i});
      items.push(item);
    }
    itinerary.setProperties({items: items, loaded: true});
    });
  }
});

App.ItineraryDay.reopenClass({
  store: {},

  find: function(id) {
    if (!this.store[id]) {
      this.store[id] = App.ItineraryDay.create({itinerary_id: id});
    }
    return this.store[id];
  }
});

App.ItineraryItem.reopenClass({
  store: {},

  find: function(id) {
    if (!this.store[id]) {
      this.store[id] = App.ItineraryItem.create({item_id: id});
    }
    return this.store[id];
  }
});

//  ROUTER

App.Router.map(function() {
  this.resource("itinerary");
  this.resource("itinerary", { path: "itinerary/:itinerary_id" }, function() {
    this.resource("item", { path: '/:item_id'} );
  });
});

//  ROUTE HOOKS

App.ItineraryRoute = Ember.Route.extend({
    serialize: function(model) {
      return {itinerary_id: model.get('itinerary_id')};
    },

    model: function(params) {
      return App.ItineraryDay.find(params.itinerary_id);
    },
    
    setupController: function(controller, model) {
      model.getData();
    }
});

App.ItemRoute = Ember.Route.extend({
    serialize: function(model) {
      return {item_id: model.get('item_id')};
    },

    model: function(params) {
      return App.ItineraryItem.find(params.item_id);
    },
    
    setupController: function(controller, model) {
      return model;
    }
});

