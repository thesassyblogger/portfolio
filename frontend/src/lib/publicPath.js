const publicBase = (process.env.PUBLIC_URL || "").replace(/\/$/, "");

export function publicPath(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${publicBase}${normalizedPath}`;
}
