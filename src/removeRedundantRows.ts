export function removeRedundantRows(text: string) {
  // All lines end with \r for some reason? removed here
  var lines = text.split("\r\n");
  // Remove the first 6 lines of boilerplate
  lines = lines.slice(6);
  // Remove empty rows
  lines = lines.filter((line) => !line.endsWith(",,,"));
  return lines.join("\n");
}
