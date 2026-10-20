/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { IoLocationOutline, IoLinkOutline } from "react-icons/io5";

type Address = {
  address: string;
  showAddress?: boolean;
};

const wrap = css`display:flex;flex-direction:column;gap:12px;width:100%;min-width:0;`;
const addressRow = css`display:flex;align-items:flex-start;gap:8px;color:var(--moa-ink);font-weight:700;line-height:1.5;svg{flex-shrink:0;margin-top:3px;color:var(--moa-primary-dark);font-size:18px;}span,a{min-width:0;overflow-wrap:anywhere;}a{color:var(--moa-primary-dark);text-decoration:underline;text-underline-offset:3px;}`;
const mapFrame = css`width:100%;height:clamp(240px,32vw,320px);border-radius:var(--moa-radius-md);overflow:hidden;background:var(--moa-surface-muted);`;
const notice = css`margin:0;padding:14px 16px;border-radius:var(--moa-radius-sm);background:var(--moa-surface-muted);color:var(--moa-muted);font-size:14px;line-height:1.6;`;

const isWebLink = (value: string) => /^https?:\/\/\S+$/i.test(value.trim());

const SCRIPT_ID = "naver-maps-sdk";
let sdkPromise: Promise<void> | null = null;

// ncpKeyId is the current key parameter (formerly ncpClientId).
const loadNaverMaps = (keyId: string): Promise<void> => {
  if (window.naver?.maps?.Service) return Promise.resolve();
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise<void>((resolve, reject) => {
    (window as any).navermap_authFailure = () => {
      sdkPromise = null;
      reject(new Error("naver maps auth failure"));
    };
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(
      keyId
    )}&submodules=geocoder`;
    script.async = true;
    // The geocoder submodule is attached shortly after the main script loads.
    script.onload = () => {
      if (window.naver?.maps?.Service) return resolve();
      const timer = window.setTimeout(() => {
        sdkPromise = null;
        reject(new Error("naver maps geocoder submodule timeout"));
      }, 5000);
      window.naver.maps.onJSContentLoaded = () => {
        window.clearTimeout(timer);
        resolve();
      };
    };
    script.onerror = () => {
      sdkPromise = null;
      script.remove();
      reject(new Error("naver maps script load failed"));
    };
    document.head.appendChild(script);
  });
  return sdkPromise;
};

const NaverMapComponent: React.FC<Address> = ({ address, showAddress = true }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const keyId = process.env.REACT_APP_NAVER_API;
  const onlineLink = isWebLink(address);

  useEffect(() => {
    setFailed(false);
    if (!address || !keyId || onlineLink) return;

    let cancelled = false;
    loadNaverMaps(keyId)
      .then(() => {
        if (cancelled) return;
        window.naver.maps.Service.geocode({ query: address }, (status, response) => {
          if (cancelled || !mapRef.current) return;
          const result = response?.v2?.addresses?.[0];
          if (status !== window.naver.maps.Service.Status.OK || !result) {
            setFailed(true);
            return;
          }
          const position = new window.naver.maps.LatLng(Number(result.y), Number(result.x));
          const map = new window.naver.maps.Map(mapRef.current, { center: position, zoom: 16 });
          new window.naver.maps.Marker({ position, map });
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [address, keyId, onlineLink]);

  if (!address) {
    return <p css={notice}>주소가 존재하지 않습니다.</p>;
  }

  if (onlineLink) {
    return (
      <div css={wrap} aria-label="모임 장소">
        <div css={addressRow}>
          <IoLinkOutline aria-hidden="true" />
          <a href={address.trim()} target="_blank" rel="noopener noreferrer">{address.trim()}</a>
        </div>
        <p css={notice}>온라인으로 진행되는 모임이에요. 위 링크로 접속해주세요.</p>
      </div>
    );
  }

  return (
    <div css={wrap} aria-label="모임 장소">
      {showAddress && (
        <div css={addressRow}>
          <IoLocationOutline aria-hidden="true" />
          <span>{address}</span>
        </div>
      )}
      {keyId && !failed ? (
        <div ref={mapRef} css={mapFrame} />
      ) : (
        <p css={notice}>지도를 불러오지 못했어요. 위 주소를 참고해주세요.</p>
      )}
    </div>
  );
};

export default NaverMapComponent;
