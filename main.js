const textArea = document.querySelector("textarea.code"),
    output = document.querySelector("div.output-console");

function ToLine(text, style) {
    return `<div class="console-line" style="${style}">${text}</div>`;
}

function Log(text, style) {
    output.innerHTML += ToLine(text, style);

    output.scrollTop = output.scrollHeight;
}

function Error(text) {
    Log(text, `color: red; background: #ffa6a6;`);
}

function Init() {
    textArea.value = `햄스터는 귀엽다!\n\n고로 햄스터는 귀엽다!`;

    output.innerHTML = "";
    Log("햄스터는 귀엽죠!");
}

function Clear() {
    output.innerHTML = "";
    Log("햄스터는 귀엽죠!");
}

function Compile() {
    let text = textArea.value;

    let states = [],
        stack = [],
        memory = null;

    let st = text.indexOf("햄스터는 귀엽다!");

    if (st == -1) {
        Error("스크립트는 반드시 '햄스터는 귀엽다!'로 시작해야합니다.");
        return;
    }

    text = text.substr(st + "햄스터는 귀엽다!".length);

    let end = text.indexOf("고로 햄스터는 귀엽다!");

    if (end == -1) {
        Error("스크립트는 반드시 '고로 햄스터는 귀엽다!'로 끝나야 합니다.");
        return;
    }

    text = text.substr(0, end);

    text.replace(/\n|\t|\r/g, "");

    let tokens = Tokenize(text);

    // Log(tokens);
    
    Log(`---햄스터는 귀엽다!---`, "color: gray");

    for (let token of tokens) {
        try {
            if (token.length == 1) {
                switch (token) {
                    case "+":
                        memory += stack.pop();
                        break;
                        
                    case "-":
                        memory -= stack.pop();
                        break;
                        
                    case "*":
                        memory *= stack.pop();
                        break;
                        
                    case "/":
                        memory /= stack.pop();
                        break;
                        
                    case "!":
                        stack.push(memory);
                        break;
                        
                    case "~":
                        Log(String.fromCharCode(memory));
                        break;
                        
                    case ">":
                        Log(memory);
                        break;
                        
                    case "햄":
                        memory = stack.pop();
                        break;
                }
            } else {
                if (token == "엣햄") {
                    Log(stack.map(e => String.fromCharCode(e)).join(""));
                    stack = [];
                }
                
                if (token.startsWith("해")) {
                    let tk = token.split("앰");
                    memory = (tk[0].length + 1) * tk[1].length;
                }
            }
        } catch (e) {
            Error(e);
            break;
        }
    }
    
    Log("---고로 햄스터는 귀엽다!---", "color: gray")
}

function Tokenize(text) {
    let chars = text.split("");
    let tokens = [],
        temp = "";

    for (let ch of chars) {
        switch (ch) {
            case "*":
            case "+":
            case "-":
            case "/":
            case "!":
            case "~":
            case ">":
                if (temp != "") {
                    tokens.push(temp);
                    temp = "";
                }
                tokens.push(ch);
                break;

            case "해":
            case "엣":
                temp = ch;
                break;

            case "애":
            case "앰":
            case ".":
                temp += ch;
                break;

            case "햄":
                temp += ch;
                tokens.push(temp);
                temp = "";
                break;
        }
    }

    return tokens;
}

Init();