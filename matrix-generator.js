var finalMatrix;

//Generate solution matrix for sudoku
function generateMatrix (n) {
	var nSq = Math.pow(n, 2),
		nFr = Math.pow(n, 4),
		matrix = {};

	for (var r=1; r<=nSq; r++) {
		for (var c=1; c<=nSq; c++) {
			for (var e=1; e<=nSq; e++) {
				var row = Array.apply(null, new Array(4*Math.pow(n, 4))).map(String.prototype.valueOf,''),
					index,
					box;

				// RC constraint
				index = nSq*(r-1)+c-1;
				row[index] = 'R' + r + 'C' + c; 

				// RN constraint
				index = nFr + nSq*(r-1)+e-1;
				row[index] = 'R' + r + '#' + e;

				//CN constraint
				index = 2*nFr + nSq*(c-1)+e-1;
				row[index] = 'C' + c + '#' + e;

				//BN constraint
				box = n*Math.floor((r-1)/n) + Math.ceil(c/n);
				index = 3*nFr + (box-1)*nSq + (e-1);
				row[index] = 'B' + box + '#' + e;

				//add to matrix
				matrix['R' + r + 'C' + c + '#' + e] = row;
			}
		}
	}

	return matrix;
}

function readFile(files) {
	var f = files[0],
		reader = new FileReader(),
		seedData,
		choiceMatrix;

	reader.readAsText(f);
	reader.onloadend = function () {
		seedData = parseInput(reader.result);

		choiceMatrix = generateMatrix(seedData.n);

		finalMatrix = reduceMatrix(seedData, choiceMatrix);		
	};

}

function parseInput(text) {
	var rows = text.split('\n'),
		rowNum = 0,
		seedData = {
			entries: [],
			n: 0
		};


	for (var i = 0; i < rows.length; i++) {
		var row = rows[i],
			boxes = (row.trim() === '') ? [] : row.split('   '),
			rowNum = (boxes.length > 0) ? rowNum+1 : rowNum,
			col = 1;

		for (var j = 0; j < boxes.length; j++) {
			var box = boxes[j],
				numbers = box.split(' ');

			//n = numbers.length
			if (seedData.n === 0) 
				seedData.n = numbers.length;
			
			for (var n = 0; n < numbers.length; n++) {
				var number = numbers[n];

				if (number !== '0') {
					seedData.entries.push('R' + (rowNum) + 'C' + col + '#' + number);
				}
				col++;
			}
			

		}
		col = 1;
	}
	return seedData;
}

function reduceMatrix(seedData, choiceMatrix) {
	var constraintTags = [];
	console.log(choiceMatrix);
	//remove rows that match seed tags
	seedData.entries.forEach(function (tag) {
		var row = tag.substring(1, tag.indexOf('C')),
			column = tag.substring(tag.indexOf('C')+1, tag.indexOf('#')),
			number = tag.substring(tag.indexOf('#')+1),
			box = seedData.n*Math.floor((Number(row)-1)/seedData.n) + Math.ceil(Number(column)/seedData.n);

		delete choiceMatrix[tag];

		//generate constraint tags from seed tags
		constraintTags.push('R' + row + 'C' + column);
		constraintTags.push('R' + row + '#' + number);
		constraintTags.push('C' + column + '#' + number);
		constraintTags.push('B' + box + '#' + number);		
	});

	//remove generated tags from rows in choiceMatrix
	//change col restriction tags to '' in remaining rows

	for (var key in choiceMatrix) {
		var row = choiceMatrix[key];

		for (var i = 0; i < row.length; i++) {
			var element = row[i];

			constraintTags.forEach(function (tag) {
				if (element === tag) {
					row[i] = '';
				}
			});

		}
	};

	return choiceMatrix;
}