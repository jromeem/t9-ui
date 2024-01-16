import LetterNode from '../LetterNode';

class Trie {
    constructor() {
        this.root = new LetterNode();
        this.pointer = this.root;
    }

    // function to print the entire Trie
    printTrie() {
        let output = ['Root'];
        const childrenLetters = Object.keys(this.root.potentia);
        childrenLetters.forEach((letter, index) => {
            const lastChild = index === childrenLetters.length - 1;
            this.root.potentia[letter].printNode('', lastChild, output);
        });
        return output.join('\n');
    }

    // converting the tree to JSON structure
    toJSON() {
        function nodeToObj(node) {
            let obj = { name: node.letter || 'Root', children: [] };
            for (const letter in node.potentia) {
                obj.children.push(nodeToObj(node.potentia[letter]));
            }
            if (obj.children.length === 0) {
                delete obj.children;
            }
            return obj;
        }
        return nodeToObj(this.root);
    }

    // saveToFile(filename) {
    //     const trieJson = JSON.stringify(this.toJSON(), null, 2);
    //     fs.writeFileSync(filename, trieJson, 'utf8');
    // }

    // function to populate the trie with words
    addWord(word) {
        const letterArray = word.split('');

        for (let i = 0; i < letterArray.length; i++) {
            const letter = letterArray[i];
            
            // if this letter doesn't exist in the trie then add it
            if (!this.pointer.hasNextLetter(letter)) {
                const newLetter = new LetterNode(letter);
                this.pointer.potentia[letter] = newLetter;
                this.pointer = newLetter;

            // move our pointer to the current letter available
            } else {
                this.pointer = this.pointer.potentia[letter];
            }
        }
        
        // we have reached the end of the word-- set the flag to be true
        // and reset back to the root
        this.pointer.isWord = true;
        this.pointer = this.root;
    }
}

export default Trie;