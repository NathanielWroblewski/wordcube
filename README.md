wordcube
===

![Screenshot](https://raw.githubusercontent.com/NathanielWroblewski/wordcube/master/public/images/screenshot.png)

Running locally
---

On a mac, clone the repo, and run a server:

```
$ git clone https://github.com/NathanielWroblewski/wordcube.git
$ cd wordcube
$ open http://localhost:8000 && python -m SimpleHTTPServer
```

TODO:
  - Loading states
  - Add social tag descriptions
  - History, derive Points
  - Times up screen
  - Turn face
  - mobile (tap/double tap?)
  - clean up code :/
  - cache highlighted letter/face index
  - maybe add a game model to abstract over lower-level models?
  - maybe add faces collection?
  - game.loop
  - clean-up index/object references in letters model
  - clean-up error messaging in word submission, maybe word.isValid, word.error?

How to Play
---

Score points for each unique, English word with more than three letters submitted
before time expires.  A word's point value is the square of the word's letter
count. Build a word by selecting individual contiguous letters without
backtracking.  The A button selects a letter; the B button submits a word.

The faces of the cube may also be turned.  When no letters have been selected,
press the B button to toggle available faces, and use the arrow keys to rotate
the selected face ninety degrees.
