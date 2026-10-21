/** Shared two-colour title treatment for inner pages. */
export function BrandHeading({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  const split = Math.max(1, Math.ceil(words.length * 0.55));
  return <>{words.slice(0, split).join(" ")}{words.length > 1 && <> <span>{words.slice(split).join(" ")}</span></>}</>;
}
