// coffee data model
// this should be coming from the server
// right now a sample object to represent expected format

var apiData = {
  coffees: [{
    title: "Nyamasheke",
    origin: "Rwanda",
    producer: "Nyungwe Cooperative",
    body: "Full",
    flavors: ["caramel", "cocoa", "mulling spice"],
    adjectives: ["balanced", "complex", "bright"],
    notes: "Good for espresso"
  }, {
    title: "Agora",
    origin: "Ethiopia",
    producer: "Duromina Cooperative",
    body: "syrupy",
    flavors: ["peach", "mango", "lemon", "caramel", "bergamot", "layered chocolate", "dark fruits"],
    adjectives: ["clean", "tart", "juicy"],
    notes: "Good for espresso"
  }, ], // end of coffee array

  tastings: {
    flavors: [{
      category: "fruit",
      notes: ['lemon', 'lime', 'grapefruit', 'clementine', 'tangerine', 'mandarin orange', 'orange', ]
    }, {
      category: "chocolate",
      notes: ['cacao nibs', 'dark chocolate', 'bakers chocalate', 'bitterwsweet chocolate', 'cocoa powder', 'milk chocolate']
    }, ],
    body: [{
      category: "light",
      notes: ['watery', 'tea-like', 'silky', 'juicy']
    }, {
      category: "medium",
      notes: ['smooth', '2% milk', 'syrupy', 'round', 'creamy'],
    }, {
      category: "heavy",
      notes: ['full', 'velvety', 'big', 'chewy', 'coating']
    }],
    adjectives: ['bright', 'muted', 'unbalanced', 'balanced', 'complex', 'delicate', 'juicy', 'dry', 'dirty', 'clean'],
  }
}

// components
//coffee-item, view for showing each individual coffee item
Vue.component('coffeeItem', {
  template: "#coffee-item",
  props: ['coffee', 'display'],
  data: function() {
    return {
      showing: this.display
    }
  },
  methods: {
    expand: function() {
      this.showing = !this.showing;
      console.log(this.showing);
    },
  }
})

Vue.component('tasting', {
  props: ['type', 'info'],
  template: "#tasting",
  methods: {
    add: function(_note, _type) {
      var send = {
        type: _type,
        note: _note
      }
      this.$emit('add-flavor', send);
    },
  },
  // updated: function(){
  //   console.log(this.current);
  //   this.current = ''; //this just clears out the child container so a body can't get a flavor attribute
  // },

  data: function() {
    return {
      current: '',
    }
  }
});

// new coffee
Vue.component('newCoffee', {
  props: ['tastings', ],
  template: "#new-coffee",
  methods: {
    //for function to have access to the event, then it needs a param passed in
    updateFlavors: function(_flavor) {
      var type = _flavor.type;
      var note = _flavor.note;

      //if the flavor type is body, do a single
      if (type == "body") {
        this.coffee.body = note;
      } else {
        //if the trait is a flavor, then add it to an array...
        //get the index of the event, if -1, remove flavor, else add
        var index = this.coffee[type].indexOf(note);

        if (index != -1) {
          this.coffee[type].splice(index, 1);
        } else this.coffee[type].push(_flavor.note);
      }
    },
    submit: function() {
      //console.log(this.coffee);
      //no camel case in the emit message!
      this.$emit('new-coffee', this.coffee);
      this.reset();
    },
    reset: function() {
      this.coffee = {
        title: "",
        origin: "",
        producer: "",
        body: "",
        flavors: [],
        adjectives: [],
        notes: "",
      };
    }
  },
  data: function() {
    return {
      current: undefined,
      coffee: {
        title: "",
        origin: "",
        producer: "",
        body: "",
        flavors: [],
        adjectives: [],
        notes: "",
      }
    }
  },
})

Vue.component('flavor', {
  props: ['note'],
  template: "#flavor-btn",
  methods: {
    addFlavor: function() {
      //emit message can't be the same as function name, but why?, probably just the issue with camel casing
      //this works now! event is the flavor text
      debugger;
      this.$emit('add-flavor', event.srcElement.textContent);
    }
  }
})

Vue.component('adj', {
  props: ['adj'],
  template: "#adj-btn",
  methods: {
    addAdj: function() {

      this.$emit('add-flavor', {type: 'adjectives', note: event.srcElement.textContent});
    }
  }
});

// all, show all coffees in the list

//main vue instance
var vm = new Vue({
  el: '#main',
  data: {
    displayNew: false,
    coffees: apiData.coffees,
    tastings: apiData.tastings
  },
  methods: {
    addNewCoffee: function(coffee) {
      console.log('adding new coffee');
      this.coffees.push(coffee);
    }

  }

})
