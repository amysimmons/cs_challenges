//https://www.hackerrank.com/challenges/ctci-array-left-rotation

(function() {
	var n = 5;
	var d = 4;
	var a = [1,2,3,4,5];

	var rotateLeft = function(array, rotations) {
		var x = array.shift();
		array.push(x);
	};

	var count = 0;

	while(count < d) {
		rotateLeft(a, d);
		count++;
	}

	console.log(a.join(' '));
})();

/*
ARRAYS VS RESIZABLE ARRAYS / ARRAY LISTS

Some languages distinguish between an array and a resizable array.
In Java when you create an array it is fixed size. You create an
array with 10 elements and you can't add any further elements.

Sometimes we need an array to grow in size, when we dont know how
many elements we want. So we use a resizable array.

Python and some other languages give us resizable arrays - they
don't even have a concept of a fixed array.

We want to use resizable arrays whenever we dont know how many
elements we will need upfront. It allows use to grow as
necessary.

But how do we implement a resizable array?

Sometimes the underlying array will get full, so
we create a new array that's double the size of the old
array, and copy the elements over.

public class ResizableArray {
	private int[] items = new int[8];
	private int size = 0;

	public int size() {
	 	return size;
	}

	public void set(int index, int item){
		if (index < 0 || index >= size){
			throw new ArrayIndexOutOfBoundsException(index);
		}
		items[index] = item;
	}

	public void append(int item){
		ensureExtraCapacity();
		items[size] = item;
		size++
	}

	public ensureExtraCapacity(){
		if (size == items.length) {
			//create new array at 2 x capacity
			int[] copy = new int[size *2];

			//copy elements
			System.arraycopy(items, 0, copy, 0, size);

			//reassign the original array to the copy
			items = copy;
		}
	}

	void get(int index) {
		if (index < 0 || index >= size){
			throw new ArrayIndexOutOfBoundsException(index);
		}
		return items[index];
	}
}

Yes it is slow to copy all the elements over, but the majority of
the time when we add an element, the array has enough space.
It happens so rarely that we hit capacity.

In Java, the above is a resizable array or an arrayList.
*/

