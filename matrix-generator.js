//Generate solution matrix for sudoku
function generateMatrix (n) {
	var nSq = Math.pow(n, 2),
		nFr = Math.pow(n, 4),
		matrix = [];

	for (var r=1; r<=nSq; r++) {
		for (var c=1; c<=nSq; c++) {
			for (var e=1; e<=nSq; e++) {
				var row = Array.apply(null, new Array(4*Math.pow(n, 4))).map(Number.prototype.valueOf,0),
					index,
					box;

				// RC constraint
				index = nSq*(r-1)+c-1;
				row[index] = 1; 

				// RN constraint
				index = nFr + nSq*(r-1)+e-1;
				row[index] = 1;

				//CN constraint
				index = 2*nFr + nSq*(c-1)+e-1;
				row[index]=1;

				//BN constraint
				index = 3*nFr + n*Math.floor((r-1)/n) + Math.ceil(c/n)+e-2;
				row[index] = 1;

				//add to matrix
				matrix.push(row);
			}
		}
	}

	return matrix;
}