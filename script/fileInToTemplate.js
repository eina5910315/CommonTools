fileInToTemplate();

function fileInToTemplate() {
    const file = getFile();
    const s = getSeparator();
    const t = getTemplate();

    const data = convertData(file, s);
    printResult(dataInToTemplate(t, data.header, data.value));
}

function getFile() {
    const file = `id,name,age
1,a,12
2,b
3,,23`;
    return file;
}

function getSeparator() {
    const s = ",";
    return s;
}

function getTemplate() {
    const t = "idは{!id}、名前は{!name}、年は{!age}";
    return t;
}

function convertData(data = "", separator = "") {
    const spData = data.split("\n");
    const result = {};
    result["header"] = spData[0].split(separator);
    result["value"] = spData.slice(1).filter(v => v).map(v => {
        const value = v.split(separator);
        const o = {};
        for (i in result["header"]) {
            o[result["header"][i]] = value[i];
        }
        return o;
    });
    return result;
}

function dataInToTemplate(template = "", header = [""], valueList = [""]) {
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

function printResult(resultList = [""]) {
    resultList.forEach(r => console.log(r));
}