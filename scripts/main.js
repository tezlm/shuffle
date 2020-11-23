const secondsPerShuffle = 30; /*seconds per reshuffle. warning: setting it to 0 will crash mindustry*/
var loaded = false;
function shufArr(array) {  var currentIndex = array.length, temporaryValue, randomIndex;  while (0 !== currentIndex) { randomIndex = Math.floor(Math.random() * currentIndex);    currentIndex -= 1;       temporaryValue = array[currentIndex];    array[currentIndex] = array[randomIndex];    array[randomIndex] = temporaryValue;  }  return array;}
Events.on(WorldLoadEvent, () => {
  if(loaded)return;
  loaded = true;
  function shuffle() {
	  var keys = [], values = [];Core.bundle.keys.forEach(i=>keys.push(i));values = keys.map(i=>Core.bundle.get(i));
	  keys = shufArr(keys);
	  keys.forEach((i,x)=>Core.bundle.properties.put(i,values[x]));
    var categories = [];
    for (var i in Category)
      if (typeof Category[i] === "object" && i !== "all")
        categories.push(Category[i]);
    const random = (type) =>
      type.get(Math.floor(Math.random() * type.count(() => true)));
    function insertAfter(type, index, obj) {
      type.filter((i) => i != obj);
      type.insert((type.indexOf(index) || 0) + 1, obj);
      if (type == Vars.content.blocks())
        obj.category =
          categories[Math.floor(Math.random() * categories.length)];
    }
    for (var i = 0; i < 100; i++) {
      insertAfter(
        Vars.content.units(),
        random(Vars.content.units()),
        random(Vars.content.units())
      );
      insertAfter(
        Vars.content.liquids(),
        random(Vars.content.liquids()),
        random(Vars.content.liquids())
      );
      insertAfter(
        Vars.content.items(),
        random(Vars.content.items()),
        random(Vars.content.items())
      );
      insertAfter(
        Vars.content.blocks(),
        random(Vars.content.blocks()),
        random(Vars.content.blocks())
      );
    }
  }
  var t = -1;
  function showUI() {
    Vars.ui.showInfoPopup(
      "Reshuffling in [accent]" + t + "[] seconds",
      1,
      100,
      0,
      0,
      0,
      0
    );
    t--;
    if (t < 0) {
      shuffle();
      t = secondsPerShuffle;
    }
  }
  Timer.schedule(
    showUI,
    1,
    1
  );
});
