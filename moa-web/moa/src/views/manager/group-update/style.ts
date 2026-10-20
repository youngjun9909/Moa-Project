import { css } from "@emotion/react";
import { field } from "../../../styles/theme";

export {
  formSection,
  sectionDescription,
  fieldGroup,
  twoColumnFields,
  addressInputRow,
  addressSearchButton,
  AllBox,
  Tab,
  activeTab,
  previewImage,
  fileButton,
  hiddenFileInput,
  imageUpload,
  uploadAction,
} from "../../group-detail/create-group/style";

export const totalContainer = css`width:100%;display:flex;flex-direction:column;gap:18px;`;
export const intro = css`margin:0 0 2px;h2{margin:0 0 6px;font-size:22px;letter-spacing:-.04em;color:var(--moa-ink);}p{margin:0;color:var(--moa-muted);font-size:14px;line-height:1.7;}`;
export const input = css`${field};`;
export const textarea = css`${field};padding:12px 14px;line-height:1.7;resize:vertical;min-height:120px;`;
export const dateInput = css`${field};width:min(100%,260px);`;
export const actionBar = css`display:flex;justify-content:flex-end;gap:10px;padding-top:4px;@media(max-width:520px){flex-direction:column-reverse;>*{width:100%;}}`;
