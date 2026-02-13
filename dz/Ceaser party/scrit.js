function makeSecure() {
    const input = document.getElementById("inputText").value;
    let result = "";

    for (let i = 0; i < input.length; i++) {
        let char = input[i];

        if (char >= 'a' && char <= 'z') {
            result += String.fromCharCode((char.charCodeAt(0) - 97 + 3) % 26 + 97);
        } 
        else if (char >= 'A' && char <= 'Z') {
            result += String.fromCharCode((char.charCodeAt(0) - 65 + 3) % 26 + 65);
        } 
        else {
            result += char;
        }
    }

    document.getElementById("outputText").value = result;
}