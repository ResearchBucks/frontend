export const capitalizeFirstLetter = (
  str: string,
  addSpaces: boolean = false
) => {
  if (addSpaces) {
    const withSpaces = str.replace(/([A-Z])/g, " $1").trim();
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
