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
  - Quarter turn faces
  - mobile (tap/double tap?)
  - refactor :S
  - cache highlighted letter/face index
  - add a game model to abstract over lower-level models?
  - add faces collection?
  - game.loop
  - clean-up index/object references in letters model
  - clean-up error messaging in word submission, maybe word.isValid, word.error?

How to Play
---

Score points for each unique, English word with more than two letters submitted
before time expires.  Build words by selecting contiguous letters without
backtracking.  _Spacebar_ selects a letter; _return_ submits words.

TODO:
The faces of the cube may be turned.  When no letters are selected,
_return_ cycles through faces, and arrow keys turn
selected faces 90°.

A word's score is the square of its letter count.

> Copyright (c) 2019 Nathaniel Wroblewski
> I am making my contributions/submissions to this project solely in my personal
> capacity and am not conveying any rights to any intellectual property of any
> third parties.
