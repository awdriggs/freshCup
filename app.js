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
    },
    //for function to have access to the event, then it needs a param passed in
    list: function(event){
      console.log('list called');
      console.log('this in list', this);
      console.log('event in list', event);
      this.flavorList.push(event);
      //add code here,
      // - check to see if the flavor is already in the list
      // - if yes remove, else add it in
    }
  },
  data: function() {
    return {
      current: "",
      flavorList: [],
    }
  },
  created() {
    console.log('what is this?', this);
    //never being called...
    this.$on('addFlavor', function(event) {
      console.log('nothing', event);
      // this.flavorList.push()
    })
  }
})

Vue.component('flavor', {
  props: ['note'],
  template: "#flavor-btn",
  methods: {
    addFlavor: function() {
      //emit the flavor..
      //what is this context?
      console.log('addFlavor called');
      console.log(this);
      console.log("event in add flavor", event.srcElement.textContent);
      //message can't be the same as function name, but why?
      //this works now! event is the flavor text
      this.$emit('add', event.srcElement.textContent);
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
