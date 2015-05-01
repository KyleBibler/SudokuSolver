public class SparseMatrix {
    public SparseMatrix() {
        this.head = new Head(0);
    }
}

public class Head extends Node{
    public int size;
    public int col;

    public Head(col) {
        super();
        this.col = col;
        this.size = 0;
    }

}

public class RowNode extends Node {
    public String row;
    public Head col;
    public Node(String row, Head col) {
        super();
        this.row = row;
        this.col = col;
    }

    public void detach() {
        this.up.down = this.down;
        this.down.up = this.up;
    }
}

public abstract class Node {
    public Node up;
    public Node down;
    public Node left;
    public Node right;
    public Node() {
        this.up = null;
        this.down = null;
        this.right = null;
        this.left = null;
    }
    public void detach();
    public void attach();
}