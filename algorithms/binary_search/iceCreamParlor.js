/*
https://www.hackerrank.com/challenges/ctci-ice-cream-parlor

For each trip to the ice cream parlor,
print the ID numbers for the two types
of ice cream that Sunny and Johnny purchase
as two space-separated integers on a new line.

variables:

m = total dollars
n = flavors
i = flavor {unique id from 1 to n, c cost}
t trips to ice cream parlor

sample input:

2 (t trips)
4 (m dollars)
5 (n flavors)
1 4 5 3 2 (c cost of each flavor)
4 (m dollars)
4 (n flavors)
2 2 4 3 (c cost of each flavor)

sample output:

 1 4
 1 2
*/

var input = {
  trips: [
    {
      dollars: 4,
      flavors: 5,
      costOfEachFlavor: [1,4,5,3,2]
    },
    {
      dollars: 4,
      flavors: 4,
      costOfEachFlavor: [2,2,4,3]
    }
  ]
}

var binarySearch = function(sortedArray, n, left, right) {
  var mid = Math.floor((left + right) / 2);

  if (left > right) {
    return mid;
  }

  if (sortedArray[mid].cost == n) {
    return mid - 1;
  } else if (n < sortedArray[mid].cost) {
    binarySearch(sortedArray, n, left, mid - 1);
  } else {
    binarySearch(sortedArray, n, mid + 1, right);
  }
}

var whichFlavors = function(input) {
  input.trips.forEach((trip) => {

    trip.icecreams = trip.costOfEachFlavor.map((f, i) => {
      return {
        id: i+1,
        cost: f
      }
    });

    trip.icecreams.sort(function(a,b){
      return a.cost-b.cost;
    });

    //why the F is upperIndex coming back undefined?!?!?
    var upperIndex = binarySearch(trip.icecreams, trip.dollars, 0, trip.icecreams.length - 1);
    console.log(upperIndex);

    var affordableIcecreams = trip.icecreams.slice(0, upperIndex + 1);
    console.log(affordableIcecreams);

    var pairs = [];

    affordableIcecreams.forEach((i) => {
      otherIcecreams = affordableIcecreams;
      otherIcecreams.splice(i,1);

      otherIcecreams.forEach((x) => {
        if (i.cost + x.cost == trip.dollars) {
          if(pairs.length == 0) {
            pairs.push([i.id, x.id]);
          }
        }
      })
    });

    console.log(pairs);

  });
}

whichFlavors(input);


/*
Binary search is a log n problem because...

We start off with a search space of n elements.

In a single comparison we cut it down to a search space of n/2.

Then in another compairson we cut it down to a search space of n/4.

We continue this until we are left with 1 element.

The total number of operations we will have to do is determined by
how many times can we diviide n by 2 until we get down to just 1.

This is what a log based 2 event expresses O(log2n).

Binary search can be implemented recursively or iteratively.
*/