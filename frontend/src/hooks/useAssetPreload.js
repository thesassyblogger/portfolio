import { useEffect, useState } from "react";

const CRITICAL_ASSETS = ["/models/mansi-power-suit.draco.glb"];

function loadAsset(url, onProgress) {
  return new Promise((resolve) => {
    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";
    req.onprogress = (event) => {
      if (event.lengthComputable) onProgress(event.loaded / event.total);
    };
    req.onload = () => resolve(req.status >= 200 && req.status < 400);
    req.onerror = () => resolve(false);
    req.onabort = () => resolve(false);
    req.send();
  });
}

export default function useAssetPreload(enabled = true) {
  const [progress, setProgress] = useState(enabled ? 0 : 100);
  const [ready, setReady] = useState(!enabled);

  useEffect(() => {
    if (!enabled) return undefined;

    let cancelled = false;
    const progressMap = new Map(CRITICAL_ASSETS.map((asset) => [asset, 0]));
    const update = () => {
      const total = [...progressMap.values()].reduce((sum, value) => sum + value, 0);
      const pct = Math.round((total / CRITICAL_ASSETS.length) * 100);
      if (!cancelled) setProgress(Math.min(100, Math.max(8, pct)));
    };

    const cap = window.setTimeout(() => {
      if (!cancelled) {
        setProgress(100);
        setReady(true);
      }
    }, 6500);

    Promise.all(
      CRITICAL_ASSETS.map((asset) =>
        loadAsset(asset, (assetProgress) => {
          progressMap.set(asset, assetProgress);
          update();
        }).then(() => {
          progressMap.set(asset, 1);
          update();
        })
      )
    ).then(() => {
      if (!cancelled) {
        window.clearTimeout(cap);
        setProgress(100);
        setReady(true);
      }
    });

    return () => {
      cancelled = true;
      window.clearTimeout(cap);
    };
  }, [enabled]);

  return { progress, ready };
}
