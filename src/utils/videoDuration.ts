export const getDuration = function (url: string, next: Function) {
  const player = new Audio(url);
  player.addEventListener(
    "durationchange",
    function (e) {
      if (this.duration != Infinity) {
        var duration = this.duration;
        player.remove();
        next(duration);
      }
    },
    false
  );
  player.load();
  player.currentTime = 24 * 60 * 60;
  player.volume = 0;
  player.play();
};
