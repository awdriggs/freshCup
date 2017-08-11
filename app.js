// coffee data model
// this should be coming from the server
// right now a sample object to represent expected format

var apiData = {
  coffees: [{
    title: "Nyamasheke",
    origin: "Rwanda",
    producer: "Nyungwe Cooperative",
    body: "Full",
    flavor: ["caramel", "cocoa", "mulling spice"],
    adjectives: ["balanced", "complex", "bright"],
    notes: "Good for espresso"
  }, {
    title: "Agora",
    origin: "Ethiopia",
    producer: "Duromina Cooperative",
    body: "syrupy",
    flavor: ["peach", "mango", "lemon", "caramel", "bergamot", "layered chocolate", "dark fruits"],
    adjectives: ["clean", "tart", "juicy"],
    notes: "Good for espresso"
  }, ], // end of coffee array
  flavors: [{
      category: "fruit",
      notes: ['lemon', 'lime', 'grapefruit', 'clementine', 'tangerine', 'mandarin orange', 'orange', ]
    }, {
      category: "chocolate",
      notes: ['cacao nibs', 'dark chocolate', 'bakers chocalate', 'bitterwsweet chocolate', 'cocoa powder', 'milk chocolate']
    },

  ]
}


// components
//coffee-item, view for showing each individual coffee item
Vue.component('coffeeItem', {
  template: "#coffee-item",
  props: ['coffee']
})

// new coffee
Vue.component('newCoffee', {
  props: ['flavors', ],
  template: "#new-coffee",
  methods: {
    reveal: function(flavor) {
      this.current = flavor.notes;
    }
  },
  data: function() {
    return {
      current: "",
      flavorList: [],
    }
  }
})

Vue.component('flavor', {
  props: ['note'],
  template: "#flavor-btn",
  methods: {
    addFlavor: function(event) {
      //emit the flavor..
      //what is this context?
      console.log('event', event);
      console.log(this);
    }
  }
})

// all, show all coffees in the list

// new, create a new coffee
//  sub components
//  add body
//    add flavors
//    add intesifiers
//    add notes

var vm = new Vue({
  el: '#main',
  data: {
    coffees: apiData.coffees,
    flavors: apiData.flavors
  },

})
