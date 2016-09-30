/*
OPTIMISED VERSION - 3 loops
*/

var numbers = [3,2,1,4,6,5,10,0,8];
var sorted = false;

while(!sorted){
	sorted = true;
	lastUnsorted = numbers.length - 1;

	for (var i = 0; i < lastUnsorted; i++) {
		if (numbers[i] > numbers[i + 1]) {
			var numToSwap = numbers[i];

			numbers[i] = numbers[i + 1];
			numbers[i + 1] = numToSwap;

			sorted = false;
		}

		lastUnsorted--;
	}

	console.log(numbers);
}


/*
ORIGINAL VERSION NOT OPTIMISED - 8 loops

var numbers = [3,2,1,4,6,5,10,0,8];
var sorted = false;

while(!sorted){
	sorted = true;

	for (var i = 0; i < numbers.length - 1; i++) {
		if (numbers[i] > numbers[i + 1]) {
			var numToSwap = numbers[i];

			numbers[i] = numbers[i + 1];
			numbers[i + 1] = numToSwap;

			sorted = false;
		}
	}

	console.log(numbers);
}
*/
