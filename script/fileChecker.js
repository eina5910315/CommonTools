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
            const data = this.convertData(f, this.view.getSeparator());
            const result = this.dataInToTemplate(data.header, data.value);
            this.view.printResult(result);
        } catch (error) {
            console.log(error);
        }
    }

    convertData(data = "", separator = "") {
        const spData = data.replace(/\r?\n|\r/g, "\n").split("\n");
        const result = {};
        result["header"] = spData[0].split(separator);
        result["value"] = spData.slice(1).filter(v => v).map(v => {
            const value = v.split(separator);
            const o = {};
            for (let i in result["header"]) {
                o[result["header"][i]] = value[i];
            }
            return o;
        });
        return result;
    }


    dataInToTemplate(header = [""], valueList = [""]) {
        const template = `${header[0]}:{!${header[0]}}`;
        const result = [];
        valueList.forEach(value => {
            let t = template;
            header.forEach(h => {
                t = t.replace(`{!${h}}`, value[h] || "");
            });
            result.push(t);
        });
        return result;
    }
}

class View {
    constructor() {
        this.file = new HTMLFileReader("file");
        this.separator = document.getElementById("separator");
        this.separator.value = ",";
    }

    async getFileText() {
        return this.file.readAsText();
    }

    getSeparator() {
        return this.separator.value;
    }

    resetCheck() {
        const checks = document.querySelectorAll("input[type='checkbox']");
        checks.forEach(c => {
            c.checked = false;
            c.closest(".item").classList.remove("checked");
        });
    }

    printResult(resultList = [""]) {
        const div = document.getElementById("result");
        div.innerHTML = "";
        resultList.forEach((result, i) => {
            const id = String(i);

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
            });
            label.append(checkbox);
            label.append(result);

            item.append(label);
            div.append(item);
        });
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