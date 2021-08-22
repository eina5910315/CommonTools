class HTMLFileReader {
    #input
    constructor(target = "file") {
        this.#input = document.getElementById(target);
    }

    readAsText() {
        return new Promise((resolve, reject) => {
            const f = this.#input.files[0];
            if (!f) {
                resolve("");
            }
            const fr = new FileReader();
            fr.onload = (() => {
                resolve(fr.result);
            });
            fr.onerror = (() => {
                reject(fr.error)
            });
            fr.readAsText(f);
        });
    }
}
