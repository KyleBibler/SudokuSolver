function easyConstraintTest(file) {
	var f = files[0],
		reader = new FileReader(),
		seedData,
		choiceMatrix,
		finalMatrix,
		correctFinalMatrix;

	reader.readAsText(f);
	reader.onloadend = function () {
		seedData = parseInput(reader.result);

		choiceMatrix = generateMatrix(seedData.n);

		finalMatrix = reduceMatrix(seedData, choiceMatrix);
		DLX.matrix.createLinks(finalMatrix);
	};
}