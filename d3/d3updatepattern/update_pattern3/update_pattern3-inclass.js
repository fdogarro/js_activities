//create our data (the alphabet)
var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

//set height and width of our container
var width = 960,
    height = 500;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(32," + (height / 2) + ")");

function update(data) {

  // DATA JOIN
  // join new data with old elements, if any.
  //text is our Update variable
  var text = svg.selectAll("text")
    .data(data, function(d) { return d; });

  //UPDATE
  //update old elements as needed
  text.attr("class", 'update')
    .transition()
      .duration(750)
      .attr("x", function(d, i) { return i * 32; });  

  //ENTER
  //create new elements as needed
  text.enter().append("text")
    .attr("class", "enter")
      .attr("dy", ".35em")
      .attr("y", -60)
      .attr("x", function(d, i) { return i * 32; })
      .style("fill-opacity", 1e-6)
      .text(function(d) { return d; })
    .transition()
      .duration(750)
      .attr("y", 0)
      .style("fill-opacity", 1);

  //EXIT
  //remove old elements as needed
  text.exit()
      .attr("class", "exit")
    .transition()
      .duration(750)
      .attr("y", 60)
      .style("fill-opacity", 1e-6)
      .remove();
}

//initial display
update(alphabet);

//grab random sample of letters
setInterval(function() {
  update(shuffle(alphabet)
      .slice(0, Math.floor(Math.random() * 26))
      .sort());
}, 1500);

// Shuffles the input array.
function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m], array[m] = array[i], array[i] = t;
  }
  return array;
} 