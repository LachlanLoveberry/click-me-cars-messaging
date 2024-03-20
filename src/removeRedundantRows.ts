export function removeRedundantRows(text: string) {
  // All lines end with \r for some reason? removed here
  var lines = text.split("\r\n");
  // Remove empty rows
  lines = lines.filter((line) => !line.endsWith(",,,"));
  return lines.join("\n");
}
