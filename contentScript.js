window.scriptIsInjected || (window.scriptIsInjected = !0, setTimeout(async function () {
  try {
    const e = await fetch(chrome.runtime.getURL("game.min.js")).then((e) => e.text());
    const t = [e.match(/window,function\((.)/)[1], e.match(/var (.)={}/)[1]];
    const n = [
      [/s\),this\._game=(.)/, `s),this._game=$1;window.priorLodash = window._;
        Object.defineProperty(window.priorLodash, "game", {get: () => this._game, enumerable: true, configurable: true});
        Object.defineProperty(window.priorLodash, "instance", {get: () => ${t[0]}.instance, enumerable: true, configurable: true});
        Object.defineProperty(window.priorLodash, "player", {get: () => window._.${e.match(/instance.prodigy.gameContainer.get\("...-...."\).player/)?.[0]}, enumerable: true, configurable: true});
        Object.defineProperty(window.priorLodash, "gameData", {get: () => ${t[0]}.instance.game.state.states.get("Boot")._gameData, enumerable: true, configurable: true});
        Object.defineProperty(window.priorLodash, "localizer", {get: () => ${t[0]}.instance.prodigy.gameContainer.get("LocalizationService"), enumerable: true, configurable: true});
        Object.defineProperty(window.priorLodash, "network", {get: () => window._.player.game.input.onDown._bindings[0].context, enumerable: true, configurable: true});
        setInterval(() => {if(window.priorLodash !== window._){window._=priorLodash;}}, 100);`],
      [/(.)\.constants=Object/, "window.priorLodash = window.priorLodash || window._, window.priorLodash.constants=$1, $1.constants=Object"]
    ].reduce((e, [t, n]) => e.replace(t, n), e);

    document.documentElement.setAttribute("onreset", `${n}\nSW.Load.decrementLoadSemaphore();`.replaceAll("new URL", "new window.URL"));
    document.documentElement.dispatchEvent(new CustomEvent("reset"));
    document.documentElement.removeAttribute("onreset");
  } catch (e) {
    alert("Failed to load hack\n" + e.message);
  }
}, 1e3), console.group("integrity patches"), [...document.getElementsByTagName("script"), ...document.getElementsByTagName("link")].forEach((e) => {
  e.integrity && (console.log(e.integrity), e.removeAttribute("integrity"));
}), console.groupEnd());
//# sourceMappingURL=contentScript.js.map
