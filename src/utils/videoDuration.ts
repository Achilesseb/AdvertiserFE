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

export const secondsToHms = (seconds: number) => {
  if (seconds === 0) return "0 seconds";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
  const mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
  const sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";

  return hDisplay + mDisplay + sDisplay;
};
