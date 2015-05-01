/**
 * Created by Kyle on 4/14/2015.
 */
var solutionSets = [];

var DLX = function() {

    var getRowNodes = function(rowNode) {
        var result = [rowNode],
            node = rowNode;
        while(node.right != rowNode) {
            result.push(node.right);
            node = node.right;
        }
        return result;
    };

    var getColNodesSize0 = function(matrixHead) {
        var node = matrixHead.right;
        while(node != matrixHead) {
            if(node.size = 0) {
                return true;
            }
            node = node.right;
        }
        return false;
    };

    var cover = function(col) {
        col.detach();
        var rowNode = col.down,
            rowNeighbor;
        while(rowNode !== col) {
            rowNeighbor = rowNode.right;
            while(rowNeighbor !== rowNode) {
                rowNeighbor.detach(); //Up Down detach from column
                rowNeighbor = rowNeighbor.right;
            }
            rowNode = rowNode.down;
        }
    };

    var uncover = function(col) {
        var rowNode = col.up,
            rowNeighbor;
        while(rowNode !== col) {
            rowNeighbor = rowNode.left;
            while(rowNeighbor !== rowNode) {
                rowNeighbor.attach();
                rowNeighbor = rowNeighbor.left;
            }
            rowNode = rowNode.up;
        }
        col.attach();
    };

    return {
        matrix: new SparseMatrix(),
        solutionSet: [],
        setMatrix: function(matrix) { this.matrix = matrix },
        search: function(depth) {
            // if(depth > 10) {
            //     return;
            // }
            var matrixHead = this.matrix.head;
            // if no columns
            if(matrixHead.right === matrixHead) {
                //return this.solutionSet; //Return solution rows
                var mySolution = [], i = 0;
                for(i; i < depth; i++) {
                    mySolution[i] = this.solutionSet[i];
                }
                solutionSets.push(mySolution);
                console.log(mySolution);
                return;
            }
            var col = this.matrix.chooseCol(),
                rowNode = col.down,
                rowNeighbor;
            cover(col);
            while(rowNode !== col) {
                rowNeighbor = rowNode.right;
                this.solutionSet[depth] = rowNode.row;
                while(rowNeighbor !== rowNode) {
                    cover(rowNeighbor.col);
                    rowNeighbor = rowNeighbor.right;
                }
                this.search(depth+1);
                rowNeighbor = rowNode.left;
                while(rowNeighbor !== rowNode) {
                    uncover(rowNeighbor.col);
                    rowNeighbor = rowNeighbor.left;
                }
                rowNode = rowNode.down;
            }
            uncover(col);
            return;
        }
    };

}();