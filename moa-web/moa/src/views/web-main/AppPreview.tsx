/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { IoHomeOutline, IoGridOutline, IoCalendarOutline, IoChatbubbleOutline, IoSearchOutline } from "react-icons/io5";

const shell = css`
  border:1px solid var(--moa-line); border-radius:20px; background:white; overflow:hidden; box-shadow:0 28px 70px rgba(31,43,61,.12); text-align:left;
  .preview-top{height:42px;display:flex;align-items:center;gap:6px;padding:0 16px;border-bottom:1px solid var(--moa-line);background:#fcfcfd;}
  .preview-dot{width:7px;height:7px;border-radius:50%;background:#e3e8ed;}
  .preview-address{margin:auto;color:var(--moa-muted);font-size:10px;letter-spacing:.04em;}
  .preview-body{display:grid;grid-template-columns:130px minmax(0,1fr);min-height:400px;}
  aside{padding:20px 12px;border-right:1px solid var(--moa-line);background:#fbfcfd;}
  aside strong{font-size:19px;display:block;margin:0 8px 3px;}
  aside small{display:block;font-size:9px;color:var(--moa-muted);margin:0 8px 24px;}
  .preview-nav{display:flex;align-items:center;gap:8px;padding:11px 10px;font-size:11px;font-weight:700;border-radius:9px;margin-bottom:4px;color:var(--moa-ink-subtle);}
  .preview-nav.active{background:var(--moa-primary-soft);color:var(--moa-primary-dark);}
  .preview-caption{font-size:9px;color:var(--moa-muted);margin:20px 10px 6px;}
  .preview-content{min-width:0;}
  .preview-toolbar{height:52px;padding:10px 16px;border-bottom:1px solid var(--moa-line);display:flex;gap:8px;align-items:center;}
  .preview-search{display:flex;align-items:center;gap:6px;flex:1;padding:8px;background:var(--moa-surface-muted);border-radius:7px;font-size:9px;color:var(--moa-muted);}
  .preview-create{font-size:9px;color:white;background:var(--moa-primary);padding:8px;border-radius:7px;white-space:nowrap;}
  .preview-main{padding:22px 18px;}
  .preview-eyebrow{color:var(--moa-primary-dark);font-size:9px;font-weight:800;letter-spacing:.08em;}
  h2{font-size:22px;letter-spacing:-.05em;margin:7px 0;}
  .preview-description{font-size:10px;color:var(--moa-muted);margin:0 0 18px;}
  .preview-filters{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 20px;}
  .preview-filters span{font-size:10px;border:1px solid var(--moa-chip-line);border-radius:7px;padding:6px 9px;color:var(--moa-chip-ink);}
  .preview-filters span:first-of-type{background:var(--moa-primary);color:white;border-color:var(--moa-primary);}
  .preview-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;}
  article{min-width:0;overflow:hidden;border:1px solid var(--moa-line);border-radius:10px;}
  .preview-art{height:90px;display:grid;place-items:center;font-size:32px;background:#fff0e4;}
  article:nth-of-type(2) .preview-art{background:#edf4ef;} article:nth-of-type(3) .preview-art{background:#f1eff9;}
  .preview-card-text{padding:10px;} .preview-card-text small{font-size:8px;color:var(--moa-primary-dark);}
  h3{font-size:11px;margin:6px 0;line-height:1.5;} article p{font-size:8px;color:var(--moa-muted);margin:0;}
  @media(max-width:600px){.preview-body{grid-template-columns:80px 1fr;min-height:0;}aside{padding:16px 5px;}.preview-nav{font-size:9px;padding:10px 5px;gap:4px;}aside small{display:none;}aside strong{margin-bottom:18px;}.preview-main{padding:18px 12px;}.preview-grid{grid-template-columns:repeat(2,minmax(0,1fr));}article:last-child{display:none;}.preview-create{display:none;}h2{font-size:19px;}}
`;

export function AppPreview() {
  return <section css={shell} aria-label="MOA 웹앱 화면 예시">
    <div className="preview-top"><i className="preview-dot" /><i className="preview-dot" /><i className="preview-dot" /><span className="preview-address">MOA · 함께하는 취향 생활</span></div>
    <div className="preview-body"><aside><strong>MOA</strong><small>함께하는 취향 생활</small><div className="preview-nav active"><IoHomeOutline />홈</div><div className="preview-nav"><IoGridOutline />카테고리</div><p className="preview-caption">내 활동</p><div className="preview-nav"><IoCalendarOutline />참여 일정</div><div className="preview-nav"><IoChatbubbleOutline />후기 게시판</div></aside>
    <div className="preview-content"><div className="preview-toolbar"><span className="preview-search"><IoSearchOutline />어떤 모임을 찾고 있나요?</span><span className="preview-create">＋ 모임 만들기</span></div>
    <div className="preview-main"><span className="preview-eyebrow">FIND YOUR PEOPLE</span><h2>오늘, 어떤 만남을 해볼까요?</h2><p className="preview-description">같은 취향, 새로운 사람들. 나에게 맞는 모임을 발견해요.</p><div className="preview-filters"><span>전체</span><span>취미</span><span>스포츠</span><span>문화·예술</span></div>
    <div className="preview-grid">{[{icon:"☕",tag:"단기 모임 · 취미",title:"커피 한 잔과 주말 수다",place:"서울 · 오프라인"},{icon:"🌿",tag:"정기 모임 · 힐링",title:"같이 걷는 초록빛 산책",place:"경기 · 오프라인"},{icon:"📚",tag:"정기 모임 · 문화",title:"한 달에 한 권, 독서 모임",place:"전국 · 온라인"}].map(card => <article key={card.title}><div className="preview-art" aria-hidden="true">{card.icon}</div><div className="preview-card-text"><small>{card.tag}</small><h3>{card.title}</h3><p>{card.place}</p></div></article>)}</div></div></div></div>
  </section>;
}
