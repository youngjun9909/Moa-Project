import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OAUTH_EXCHANGE_API } from "../../../apis";

export default function SnsSuccess() {
  const [, setCookies] = useCookies(["token"]);

  const [queryParam] = useSearchParams();
  const code = queryParam.get("code");

  const navigator = useNavigate();
  // A login code works once, so StrictMode's second effect run must reuse the same request.
  const exchange = useRef<{ code: string; request: Promise<any> } | null>(null);

  useEffect(() => {
    if (!code) {
      navigator("/signUp");
      return;
    }

    if (exchange.current?.code !== code) {
      exchange.current = { code, request: axios.post(OAUTH_EXCHANGE_API, { code }) };
    }

    let cancelled = false;
    exchange.current.request
      .then((response) => {
        if (cancelled) return;
        const { token, expiration } = response.data.data;
        setCookies("token", token, {
          path: "/",
          expires: new Date(Date.now() + Number(expiration)),
        });
        navigator("/main", { replace: true });
      })
      .catch(() => {
        if (!cancelled) navigator("/signIn", { replace: true });
      });

    return () => {
      cancelled = true;
    };
  }, [code, navigator, setCookies]);

  return <></>;
}
