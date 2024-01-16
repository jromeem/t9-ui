
class LetterNode {
    constructor(letter = '') {
        this.letter = letter;
        this.potentia = {}; // dictionary containing all potential next characters
        this.isWord = false; // determines if, at this node, this node is a word
    }

    // function that returns true if the given letter is contained in the character map (potentia)
    hasNextLetter(letter) {
        return letter in this.potentia;
    }

    // function to recursively print the node and its children
    printNode(prefix = '', isLast = true, output = []) {
        // print the current node
        output.push(prefix + (isLast ? '└─ ' : '├─ ') + this.letter + (this.isWord ? '✅' : ''));

        // get all children letters
        const childrenLetters = Object.keys(this.potentia);
        childrenLetters.forEach((letter, index) => {
            // check if this is the last child
            const lastChild = index === childrenLetters.length - 1;
            const newPrefix = prefix + (isLast ? '    ' : '│   ');
            this.potentia[letter].printNode(newPrefix, lastChild, output);
        });

        return output;
    }
}

export default LetterNode;