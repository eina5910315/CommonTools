class Controller {
    constructor() {
    }

    init() {
        this.view = new View();
    }

    calc() {
        const left = Number(this.view.getLeft());
        const right = Number(this.view.getRight());
        switch (this.view.getOp()) {
            case 'add':
                this.view.printResult(left + right);
                break;
            case 'sub':
                this.view.printResult(left - right);
                break;
            case 'mul':
                this.view.printResult(left * right);
                break;
            case 'div':
                this.view.printResult(left / right);
                break;
            default:
                this.view.printResult(0)
        }
    }
}

class View {
    constructor() {
        this.left = document.getElementById("left");
        this.right = document.getElementById("right");
        this.op = document.getElementById("op");
        this.left.addEventListener("change", () => {
            calc();
        });
        this.right.addEventListener("change", () => {
            calc();
        });
        this.op.addEventListener("change", () => {
            calc();
        });
        this.left.addEventListener("focus", (e) => {
            e.target.select();
        });
        this.op.addEventListener("focus", (e) => {
            e.target.select();
        });
        this.left.addEventListener("click", (e) => {
            e.target.select();
        });
        this.op.addEventListener("click", (e) => {
            e.target.select();
        });
    }

    getLeft() {
        return this.left.value;
    }

    getRight() {
        return this.right.value;
    }

    getOp() {
        return this.op.value;
    }

    printResult(result) {
        const div = document.getElementById("result");
        div.innerHTML = "";
        div.append(result);
    }
}

function init() {
    con.init();
}

function calc() {
    con.calc();
}

const con = new Controller();