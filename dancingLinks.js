/**
 * Created by Kyle on 4/14/2015.
 */


var DLX = function() {

    var cover = function(col) {

    };

    var uncover = function(col) {

    };

    return {
        matrix: {},
        setMatrix: function(matrix) { this.matrix = matrix },
        search: function(depth) {

            this.search(depth+1);
        }
    };

}();