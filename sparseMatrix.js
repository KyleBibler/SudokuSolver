/**
 * Created by Kyle on 4/14/2015.
 */

var Node = function(row, col) {
    this.row = row;
    this.col = col; //Head object
    this.up = null;
    this.down = null;
    this.left = null;
    this.right = null;
};

Node.prototype.detach = function() {
    this.up.down = this.down;
    this.down.up = this.up;
    this.col.size--;
};

Node.prototype.attach = function() {
    this.col.size++;
    this.down.up = this;
    this.up.down = this;
};

var Head = function(col) {
    this.col = col;
    this.size = 0;
    this.left = null;
    this.right = null;
    this.up = null;
    this.down = null;
};

Head.prototype.detach = function() {
    this.left.right = this.right;
    this.right.left = this.left;
};

Head.prototype.attach = function() {
    this.left.right = this;
    this.right.left = this;
};

var SparseMatrix = function() {
    this.head = new Head(0);
};

SparseMatrix.prototype.chooseCol = function() {
    var col = this.head.right,
        minSize = col.size+1,
        minCol = null;
    while(col !== this.head) {
        if(col.size < minSize) {
            minCol = col;
            minSize = col.size;
        }
        col = col.right;
    }
    return minCol;
};

SparseMatrix.prototype.createLinks = function(matrix) {
    var headItr = this.head,
        newHead = null,
        colLength = Object.keys(matrix).length,
        rowLength = 0;
    for(var key in matrix) {
        if (matrix.hasOwnProperty(key)) {
            rowLength = matrix[key].length;
            break;
        }
    }

    for(var i = 0; i < rowLength; i++) {
        newHead = new Head(i+1);
        headItr.right = newHead;
        newHead.left = headItr;
        headItr = newHead;
    }
    headItr.right = this.head;
    this.head.left = headItr;

    headItr = this.head.right;

    var newNode = null,
        colNodes = [],
        firstRowNode = null,
        nodeItr = null;
        nodesInRow = 0;
    i = 1;
    for(key in matrix) {
        if(matrix.hasOwnProperty(key)) {
            for(j = 0; j < matrix[key].length; j++) {
                if(matrix[key][j] !== "") {
                    newNode = new Node(i, headItr);
                    if(!colNodes[j]) {
                        colNodes[j] = [];
                    }
                    if(nodesInRow === 0) {
                        firstRowNode = newNode;
                    } else {
                        newNode.left = nodeItr;
                        nodeItr.right = newNode;
                    }
                    nodeItr = newNode;

                    colNodes[j].push(newNode);
                    nodesInRow++;
                }
                headItr = headItr.right;
            }
            if(nodesInRow > 0) {
                nodeItr.right = firstRowNode;
                firstRowNode.left = nodeItr;
            }
            nodesInRow = 0;
            i++;
            headItr = this.head.right;
        }

    }

    var colHead = this.head;

    for(i=0; i < colNodes.length; i++) {
        colHead = colHead.right;
        if(colNodes[i].length === 0) {
            continue;
        }
        nodeItr = colHead;
        for(j = 0; j < colNodes[i].length; j++) {
            nextNode = colNodes[i][j];
            nextNode.up = nodeItr;
            nodeItr.down = nextNode;
            nodeItr = nextNode;
            colHead.size++;
        }
        colHead.up = nodeItr;
        nodeItr.down = colHead;
    }
};

