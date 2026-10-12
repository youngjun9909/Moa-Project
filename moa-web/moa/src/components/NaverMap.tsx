import React from "react";

type Address = {
  address: string;
};

// Keep existing location sections usable while external map calls are disabled.
const NaverMapComponent: React.FC<Address> = ({ address }) => (
  <div aria-label="모임 장소">
    <p style={{ overflowWrap: "anywhere" }}>{address || "주소가 존재하지 않습니다."}</p>
    {address && <p>지도는 현재 제공하지 않습니다.</p>}
  </div>
);

export default NaverMapComponent;
