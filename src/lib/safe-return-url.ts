export function getSafeReturnUrl(
  value: string | string[] | undefined,
  basePath: `/${string}`,
  allowedBasePaths: readonly `/${string}`[] = [basePath],
): string {
  const returnUrl = Array.isArray(value) ? value[0] : value;
  if (!returnUrl || returnUrl.startsWith("//")) return basePath;
  const isAllowed = allowedBasePaths.some((allowedPath) =>
    returnUrl === allowedPath || returnUrl.startsWith(`${allowedPath}/`) || returnUrl.startsWith(`${allowedPath}?`),
  );
  return isAllowed ? returnUrl : basePath;
}
