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
  }, ],
  body: [{
    category: "light",
    descriptions: ['watery', 'tea-like', 'silky', 'juicy']
  }, {
    category: "medium",
    descriptions: ['smooth', '2% milk', 'syrupy', 'round', 'creamy'],
  }, {
    category: "heavy",
    descriptions: ['full', 'velvety', 'big', 'chewy', 'coating']
  }],
  adjectives: ['bright', 'muted', 'unbalanced', 'balanced', 'complex', 'delicate', 'juicy', 'dry', 'dirty', 'clean'],
}

// components
//coffee-item, view for showing each individual coffee item
Vue.component('coffeeItem', {
  template: "#coffee-item",
  props: ['coffee'],
  data: function() {
    return {
      showing: false
    }
  },
  methods: {
    expand: function() {
      this.showing = !this.showing;
      console.log(this.showing);
    }
  }

})

// new coffee
Vue.component('newCoffee', {
  props: ['flavors', ],
  template: "#new-coffee",
  methods: {
    reveal: function(flavor) {
      this.current = flavor.notes;
    },
    clearCurrent: function() {
      this.current = "";
    },
    //for function to have access to the event, then it needs a param passed in
    updateList: function(_flavor) {
      // console.log('list called');
      // console.log('this in list', this);
      // console.log('event in list', event);

      //get the index of the event, if -1, remove flavor, else add
      var index = this.coffee.flavor.indexOf(_flavor);

      if (index != -1) {
        this.coffee.flavor.splice(index, 1);
      } else this.coffee.flavor.push(_flavor);
    },
    submit: function() {
      //console.log(this.coffee);
      //no camel case in the emit message!
      this.$emit('new-coffee', this.coffee);
    }
  },
  data: function() {
    return {
      current: "",
      flavorList: [],
      coffee: {
        title: "new coffee",
        origin: "",
        producer: "",
        body: "",
        flavor: [],
        adjectives: [],
        notes: ""
      }
    }
  },
})

Vue.component('flavor', {
  props: ['note'],
  template: "#flavor-btn",
  methods: {
    addFlavor: function() {
      // console.log('addFlavor called');
      // console.log('addFlavor event', event);
      // console.log('adddFlavor this:', this);

      //emit message can't be the same as function name, but why?, probably just the issue with camel casing
      //this works now! event is the flavor text
      this.$emit('add-flavor', event.srcElement.textContent);
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
  methods: {
    addNewCoffee: function(coffee) {
      console.log('adding new coffee');
      this.coffees.push(coffee);
    }

  }

})
