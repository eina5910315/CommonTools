class Controller {
    constructor() {
    }

    init() {
        this.view = new View();
    }

    async fileInToTemplate() {
        try {
            const f = await this.view.getFileText();
            const data = this.convertData(f, this.view.getSeparator());
            const template = this.view.getTemplate();
            const result = this.dataInToTemplate(template, data.header, data.value)
            this.view.printResult(result);
        } catch (error) {
            console.log(error);
        }
    }

    convertData(data = "", separator = "") {
        const spData = data.replace(/\r?\n|\r\n?/g, "\n").split("\n");
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

    dataInToTemplate(template = "", header = [""], valueList = [""]) {
        const result = [];
        valueList.forEach(value => {
            let t = template;
            header.forEach(h => {
                t = t.replaceAll(`{!${h}}`, value[h] || "");
            });
            result.push(t);
        });
        return result;
    }
}

class View {
    constructor() {
        this.file = new HTMLFileReader("file");
        this.template = document.getElementById("template");
        this.template.append(`{
    id: "{!id}",
    name: "{!name}",
    age: {!age}
}`);
        this.separator = document.getElementById("separator");
        this.separator.value = ",";
    }

    async getFileText() {
        return this.file.readAsText();
    }

    getSeparator() {
        return this.separator.value;
    }

    getTemplate() {
        return this.template.value;
    }

    printResult(resultList = [""]) {
        const div = document.getElementById("result");
        div.innerHTML = "";
        resultList.forEach(result => {
            const textarea = document.createElement("textarea");
            textarea.append(result);
            textarea.setAttribute("rows", "10");
            textarea.setAttribute("cols", "50");
            div.append(textarea);
            const button = document.createElement("button");
            button.addEventListener("click", () => {
                textarea.select();
                document.execCommand("copy");
            });
            button.append("copy")
            div.append(button);
            const hr = document.createElement("hr");
            div.append(hr);
        });
    }
}

function init() {
    con.init();
}

function convert() {
    con.fileInToTemplate();
}

const con = new Controller();