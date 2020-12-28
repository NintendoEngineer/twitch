var flaggedWordsDict = {
  "fuck": "fluff",
  "cancer": "happiness",
  "pussy": "feline",
  "cunt": "blob",
  "simp": "shrimp",
  "virgin": "pigeon",
  "incel": "nintendo"
}

var textTainted = false;

window.onload = function () {
  const targetNode = document.getElementsByClassName("chat-scrollable-area__message-container").item(0);
  
  const callback = function (mutationsList, observer) {
    var lastMessageSpans = targetNode.lastElementChild.getElementsByClassName("text-fragment");

    for (i = 0; i < lastMessageSpans.length; i++) {
      var currentMessageSpan = lastMessageSpans.item(i);
      var currentText = currentMessageSpan.textContent.toLocaleLowerCase();
      
      var flaggedWords = Object.keys(flaggedWordsDict);
      for (j = 0; j < flaggedWords.length; j++) {
        var currentFlaggedWord = flaggedWords[j];
        
        if (currentText.includes(currentFlaggedWord)) {
          textTainted = true;
          var friendlyWord = flaggedWordsDict[currentFlaggedWord];
          currentText = currentText.replace(currentFlaggedWord, friendlyWord)
        }
      }

      if (textTainted) currentMessageSpan.textContent = currentText;
      textTainted = false;
    }
  }

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, { childList: true });
};