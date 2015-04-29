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

SparseMatrix.prototype.toString = function() {
    var result = '',
        header = this.head.right;
        while(header !== this.head) {
            result += '\t' + header.col + '\t';
        }
        result += '\n';
        header = this.head.right;
        var node = header.down;
        while(node != header) {
            result += node.left.col.col + '--';
            if(node.left.right === node) {
                result += '>';
            }
            result += 'N';
            if(node.right.left === node) {
                result += '<';
            }
            result += '--';
        }
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

    for(var i = 0; i < rowLength.length; i++) {
        newHead = new Head(i+1);
        headItr.right = newHead;
        newHead.left = headItr;
        headItr = newHead;
    }


    headItr = this.head.right;

    var newNode = null,
        colNodes = [],
        firstRowNode = null,
        nodeItr = null;
    i = 1;
    for(key in matrix) {
        if(matrix.hasOwnProperty(key)) {
            for(j = 0; j < matrix[key].length; j++) {
                if(matrix[key][j] !== "") {
                    newNode = new Node(i, headItr);
                    if(!colNodes[j]) {
                        colNodes[j] = [];
                        firstRowNode = newNode;
                    } else {
                        newNode.left = nodeItr;
                        nodeItr.right = newNode;
                    }
                    nodeItr = newNode;
                    colNodes[j].push(newNode);
                }
                headItr = headItr.right;
            }
        }
        nodeItr.right = firsNode;
        firstRowNode.left = nodeItr;
        i++;
    }

    var colHead = this.head;

    for(i=0; i < colNodes.length; i++) {
        colHead = colHead.right;
        if(colNodes[i].length === 0) {
            continue;
        }
        nodeItr = colNodes[i][0];
        for(j = 1; j < colNodes[i].length; j++) {
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

