import { Brand } from "./brand";
import { NavLinks } from "./nav-links";
import { StoreProfile } from "./store-profile";

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-card px-4 py-5 lg:flex lg:flex-col">
      <div className="px-2"><Brand /></div>
      <div className="mt-8 flex min-h-0 flex-1 flex-col">
        <NavLinks />
        <StoreProfile />
      </div>
    </aside>
  );
}
