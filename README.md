# Web interface for GiveMeSomeArtBaby

This web interface allow users to watch every generated Pictures by GMSAB.
The first version was displaying every pics but DOM bloating began to start (Around 20k elements in DOM).
This version now use Virtual Scrolling and progressive data fetching (from an API) so it prevent DOM Bloating.
