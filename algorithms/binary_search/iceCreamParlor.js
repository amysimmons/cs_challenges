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
    },
    {
      dollars: 5,
      flavors: 7,
      costOfEachFlavor: [1.5,7,5,3.5,2.2,1,1]
    }
  ]
}

var binarySearch = function(sortedArray, n, left, right){
  var midIndex = Math.floor((left + right) / 2); //finds the mid point of the array

  if (left > right) {
    return false;
  }

  if (sortedArray[midIndex].cost == n) {
       return sortedArray[midIndex];
  } else if (n < sortedArray[midIndex].cost) {
       return binarySearch(sortedArray, n, left, midIndex - 1);
  } else {
       return binarySearch(sortedArray, n, midIndex + 1, right);
  }
}

input.trips.forEach((trip) => {
  //return if the number of icecreams and provided costs dont match
  if (trip.flavors != trip.costOfEachFlavor.length){
    return 'Something went wrong'
  }

  //map the ice cream cost and ids
  trip.icecreams = trip.costOfEachFlavor.map((f, i) => {
    return {
      id: i + 1,
      cost: f
    }
  });

  //sort the icecreams before binary searching
  trip.icecreams.sort((a,b) => {
    return a.cost-b.cost;
  });

  //find a pair of ice creams that equal the total trip dollars
  for (var i = 0; i < trip.icecreams.length; i++) {
    var icecreamA = trip.icecreams[i];
    var difference = trip.dollars - icecreamA.cost;
    var icecreamB = binarySearch(trip.icecreams, difference, i + 1, trip.icecreams.length - 1);

    if (icecreamB) {
      trip.iceCreamsToBuy = [icecreamA.id, icecreamB.id].sort();
      break;
    }
   }

  //log out the ids of the icreams that can be bought
  console.log(trip.iceCreamsToBuy)
});

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