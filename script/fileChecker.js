class Controller {
    constructor() {
    }

    init() {
        this.view = new View();
    }

    resetCheck() {
        this.view.resetCheck();
    }

    async fileInToTemplate() {
        try {
            const f = await this.view.getFileText();
            const data = this.convertData(f);
            const result = this.dataInToTemplate(data.header, data.value);
            this.view.printResult(result);
        } catch (error) {
            console.log(error);
        }
    }

    convertData(data = "") {
        const spData = data.replace(/\r?\n|\r/g, "\n").split("\n");
        const result = {};
        result["header"] = spData[0];
        result["value"] = spData.slice(1).filter(v => v).map(v => {
            return {
                [result["header"]]: v,
            };
        });
        return result;
    }


    dataInToTemplate(header = "", valueList = [{}]) {
        const template = `{!${header}}`;
        const result = [];
        valueList.forEach(value => {
            let t = template;
            t = t.replace(`{!${header}}`, value[header] || "");
            result.push(t);
        });
        return result;
    }
}

class View {
    constructor() {
        this.file = new HTMLFileReader("file");
    }

    async getFileText() {
        return this.file.readAsText();
    }

    resetCheck() {
        const checks = document.querySelectorAll("input[type='checkbox']");
        checks.forEach(c => {
            c.checked = false;
            c.closest(".item").classList.remove("checked");
        });
        this.countItem();
    }

    printResult(resultList = [""]) {
        const div = document.getElementById("result");
        div.innerHTML = "";
        const left = document.createElement("div");
        left.id = "left";
        const right = document.createElement("div");
        right.id = "right";
        resultList.forEach((result, i) => {
            const item = this.createItem(String(i), result);
            left.append(item);
        });
        div.append(left);
        div.append(right);
        this.countItem();
    }

    createItem(id, text) {
        const item = document.createElement("div");
        item.classList = ["item"];

        const label = document.createElement("label");
        label.for = id;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = id;
        checkbox.addEventListener("change", (e) => {
            if (e.target.checked) {
                e.target.closest(".item").classList.add("checked");
            } else {
                e.target.closest(".item").classList.remove("checked");
            }
            this.countItem();
        });
        label.append(checkbox);
        label.append(text);

        item.append(label);
        return item;
    }

    countItem() {
        const right = document.getElementById("right");
        right.innerHTML = "";

        const h2 = document.createElement("h2");
        const total = document.querySelectorAll("input[type='checkbox']").length;
        const now = document.querySelectorAll("input[type='checkbox']:checked").length;
        h2.append(`${now} / ${total}`);
        right.append(h2);
    }
}

function init() {
    con.init();
}

function convert() {
    con.fileInToTemplate();
}

function reset() {
    con.resetCheck();
}

const con = new Controller();