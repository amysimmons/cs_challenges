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

/*
whoaaaaa need a break from this
*/
var binarySearch = function(array, n, left, right) {

  var midIndex = Math.floor((left + right) / 2);

  if (array[midIndex] == n) {
    return midIndex;
  } else if (n < array[midIndex]) {
    binarySearch(array, n, left, midIndex - 1);
  } else {
    binarySearch(array, n, midIndex + 1, right);
  }
}

var whichFlavors = function(input) {
  input.trips.forEach((trip) => {


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