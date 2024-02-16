function capitalizeWord(string){

    return string.charAt(0).toUpperCase() + string.slice(1, string.length)
}

function capitalizeEveryWord(sentence){
    const words = sentence.split(' ');
    
    const capitalizedWords = words.map((word) => {
        return capitalizeWord(word);
    });

    const capitalizedSentence = capitalizedWords.join(' ');

    return capitalizedSentence;
}

export {
    capitalizeWord,
    capitalizeEveryWord
}