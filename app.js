// coffee data model
// this should be coming from the server
// right now a sample object to represent expected format

var apiData = {
  coffees: [
    {
      title: "Nyamasheke",
      orgin: "Rwanda",
      producer: "Nyungwe Cooperative",
      body: "Full",
      flavor: ["caramel", "cocoa", "mulling spice"],
      adjectives: ["balanced", "complex", "bright"],
      notes: "Good for espresso"
    },
    {
      title: "Agora",
      orgin: "Ethiopia",
      producer: "Duromina Cooperative",
      body: "syrupy",
      flavor: ["peach", "mango", "lemon", "caramel", "bergamot", "layered chocolate", "dark fruits"],
      adjectives: ["clean", "tart", "juicy"],
      notes: "Good for espresso"
    },
  ] // end of coffee array
}


// components
//coffee-item, view for showing each individual coffee item
Vue.component('coffee-item', {
  template: '<div> {{ coffee.title }}, {{ coffee.orgin }} </div>',
  props: ['coffee']
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
    message: 'Hello World!'
  }, 
})
