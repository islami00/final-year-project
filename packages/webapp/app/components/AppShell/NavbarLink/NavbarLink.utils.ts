interface DefineNavbarLinkVarsReturns {
  '--navlink-offset': string;
}
export type NavbarLinkVars = keyof DefineNavbarLinkVarsReturns;

export function defineNavbarLinkVars(
  level: number
): DefineNavbarLinkVarsReturns {
  return {
    ['--navlink-offset']: `${level * 20}px`,
  };
}
