/**
 * Created by Kyle on 4/12/2015.
 */

var LinkedListNode = function() {
    this.next = null;
    this.prev = null;
    this.value = (arguments.length > 0) ? arguments[0] : null;
};

LinkedListNode.prototype.setNext = function(node) {
    this.next = node;
};

LinkedListNode.prototype.setPrev = function(node) {
    this.prev = node;
};

LinkedListNode.prototype.getValue = function() {
    return this.value;
};

LinkedListNode.prototype.setValue = function(value) {
    this.value = value;
};

var LinkedList = function() {
    this.head = new LinkedListNode();
    this.tail = new LinkedListNode();
    this.head.setNext(this.tail);
    this.tail.setPrev(this.head);
    this.size = 0;
    if(arguments.length > 0 && arguments[0].constructor === Array) {
        this.fromArray(arguments[0]);
    }
    return this;
};

LinkedList.prototype.peek = function() {
    return this.tail.prev;
};

LinkedList.prototype.insertAfter = function(node, insert) {
    if(node.constructor !== LinkedListNode || node.next === null || insert === null || insert.constructor !== LinkedListNode) {
        return false;
    } else {
        insert.next = node.next;
        insert.prev = node;
        node.next.prev = insert;
        node.next = insert;
        this.size++;
        return true;
    }
};

LinkedList.prototype.insertEnd = function(insert) {
    return this.insertBefore(this.tail, insert);
};

LinkedList.prototype.insertBefore = function(node, insert) {
    if(node.constructor !== LinkedListNode || node.prev === null || insert === null  || insert.constructor !== LinkedListNode) {
        return false;
    } else {
        insert.next = node;
        insert.prev = node.prev;
        node.prev.next = insert;
        node.prev = insert;
        this.size++;
        return true;
    }
};

LinkedList.prototype.delete = function(node) {
    if(node.next === null || node.prev === null) {
        return null;
    } else {
        this.size--;
        node.next.prev = node.prev;
        node.prev.next = node.next;
        return node;
    }
};

LinkedList.prototype.push = function(insert) {
    return this.insertBefore(this.tail, insert);
};

LinkedList.prototype.insertAt = function(index, insert) {
    if(index >= this.size || this.size === 0 || index < 0 || insert.constructor !== LinkedListNode) {
        return false;
    }
    var node = this.at(index);
    return this.insertBefore(node, insert);
};

LinkedList.prototype.at = function(index) {
    if(index > this.size || this.size === 0 || index < 0) {
        return null;
    }
    var node = this.head.next,
        i = 0;
    while(i < index && node.next != null) {
        node = node.next;
        i++;
    }
    return node;
};

LinkedList.prototype.shift = function() {
    if(this.size === 0) {
        return null;
    } else {
        var node = this.head.next;
        return this.delete(node);
    }
};

LinkedList.prototype.unshift = function(node) {
    this.insertAfter(this.head, node);
};

LinkedList.prototype.pop = function() {
  if(this.size === 0) {
      return null;
  } else {
      var node = this.tail.prev;
      return this.delete(node);
  }
};

LinkedList.prototype.toArray = function() {
    if(this.size === 0) {
        return [];
    }
    var result = [],
        i = 0,
        node = this.head.next;
    while(i < this.size && node.next != null) {
        result.push(node.getValue());
        node = node.next;
        i++;
    }
    return result;
};

/* Populates an empty linked list from an array */
LinkedList.prototype.fromArray = function(myArray) {
    if(this.size > 0) {
        return false;
    } else {
        var myList = this;
        myArray.forEach(function(item) {
           myList.push(new LinkedListNode(item));
        });
        return true;
    }
};

/* Restores a deleted nodes position in the list */
LinkedList.prototype.restore = function(node) {
    if(node === null || node.constructor !== LinkedListNode) {
        return false;
    }
    if(node.next !== null && node.prev !== null) {
        node.next.prev = node;
        node.prev.next = node;
        return true;
    }
    else {
        return false;
    }
};

LinkedList.prototype.length = function() {
    return this.size;
};

LinkedList.prototype.isEmpty = function() {
  return this.size === 0;
};

