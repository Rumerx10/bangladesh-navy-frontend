"use client";
import MobileHeader from "./MobileHeader";
import DesktopNav from "./desktop-nav/DesktopNav";

interface HeaderTopBarProps {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
}

const HeaderTopBar = ({ menuOpen, setMenuOpen }: HeaderTopBarProps) => {
  return (
    <>
      {/* Desktop (lg+) */}
      <DesktopNav />

      {/* Mobile Header */}
      <div className="bg-(image:--nav-gradient) border-b border-nav-hairline lg:hidden">
        <MobileHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
    </>
  );
};

export default HeaderTopBar;
