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
    this.left = this;
    this.right = this;
};

var SparseMatrix = function() {
    this.head = new Head(0);
};

SparseMatrix.prototype.chooseCol = function() {
    var col = this.head,
        maxSize = 0,
        maxCol = null;
    while(col.right != this.head) {
        col = col.right;
        if(col.size > maxSize) {
            maxCol = col;
        }
    }
    return maxCol;
};

SparseMatrix.prototype.createLinks = function(matrix) {
    var headItr = this.head,
        newHead = null;
    for(var i = 0; i < matrix[0].length; i++) {
        newHead = new Head(i+1);
        headItr.right = newHead;
        newHead.left = headItr;
        headItr = newHead;
    }
    headItr.right = this.head;
    this.head.left = headItr;

    var colHead = this.head,
        nodeItr = null,
        newNode = null,
        j,
        rowNodes = [];

    for(j = 0; j < matrix[0].length; j++) {
        colHead = colHead.right;
        nodeItr = colHead;
        for(i = 0; i < matrix.length; i++) {
            if(!rowNodes[i]) {
                rowNodes[i] = [];
            }
            if(matrix[i][j] === 1) {
                newNode = new Node(i+1, colHead);
                colHead.size++;
                rowNodes[i].push(newNode);
                nodeItr.down = newNode;
                newNode.up = nodeItr;
                nodeItr = newNode;
            }
        }
        nodeItr.down = colHead;
        colHead.up = nodeItr;
    }

    var nextNode = null;
    for(i=0; i < rowNodes.length; i++) {
        if(rowNodes[i].length === 0) {
            continue;
        }
        nodeItr = rowNodes[i][0];
        for(j = 1; j < rowNodes[i].length; j++) {
            nextNode = rowNodes[i][j];
            nextNode.left = nodeItr;
            nodeItr.right = nextNode;
            nodeItr = nextNode;
        }
        nodeItr.right = rowNodes[i][0];
        rowNodes[i][0].left = nodeItr;
    }
};

