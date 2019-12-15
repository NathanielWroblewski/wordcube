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
  - licensing/ownership blurb
  - wordbank could be a trie/hash

  - jazz prints
  - sheet music
  - jazz graph

How to Play
---

Score points for each unique, English word with more than two letters submitted
before time expires.  Build words by selecting contiguous letters without
backtracking.  _Spacebar_ selects a letter; _return_ submits words.

The faces of the cube may be turned.  When no letters are selected,
_return_ cycles through faces, and arrow keys turn
selected faces 90°.

A word's score is the square of its letter count.
