export function getSafeReturnUrl(
  value: string | string[] | undefined,
  basePath: `/${string}`,
): string {
  const returnUrl = Array.isArray(value) ? value[0] : value;
  return returnUrl?.startsWith(basePath) && !returnUrl.startsWith("//") ? returnUrl : basePath;
}
