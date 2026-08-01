# Azura.finance — Color System

`CONNECT. TRADE.`

The identity is a **four-stop gradient** (teal → cyan → blue → violet) on true black — not a single accent. Type pairing: **Inter Tight** (display / UI) + **IBM Plex Mono** (data / labels). Radius 4px; hairlines 1px rendered as gaps in a 1px grid.

---

## Core gradient

| Token | Hex | RGB | HSL | Role |
|---|---|---|---|---|
| `--teal` | `#22E0C8` | 34 224 200 | 172° 74% 51% | Left edge of A · up · CTA start · primary accent |
| `--cyan` | `#2FC8E8` | 47 200 232 | 190° 79% 55% | Mid · live · links |
| `--blue` | `#3E7BF0` | 62 123 240 | 220° 85% 59% | Inner swoosh · CTA end |
| `--violet` | `#7B5BE0` | 123 91 224 | 254° 68% 62% | Right foot of A · VOL legend |

**Identity gradient:** `linear-gradient(120deg, #22E0C8 0%, #2FC8E8 40%, #3E7BF0 72%, #7B5BE0 100%)`

---

## Field (dark → light)

| Token | Hex | Role |
|---|---|---|
| `--base` | `#050708` | True-black field — page background |
| `--surface` | `#0E1113` | Ticker tape / raised panels |
| `--surface-2` | `#151A1D` | Row hover |
| `--line` | `#1F262A` | Hairlines, 1px grid gaps |

## State & text

| Token | Hex | Role |
|---|---|---|
| `--coral` | `#FF5C4D` | Down / sell |
| `--text` | `#E8EEF0` | Primary text |
| `--muted` | `#647079` | Labels, secondary text |

---

## Contrast on `--base` (#050708)

| Color | Hex | Ratio | Normal text (4.5:1) | Large / UI (3:1) |
|---|---|---|---|---|
| `--teal` | #22E0C8 | 12.1:1 | PASS AA | PASS |
| `--cyan` | #2FC8E8 | 10.1:1 | PASS AA | PASS |
| `--blue` | #3E7BF0 | 5.1:1 | PASS AA | PASS |
| `--violet` | #7B5BE0 | 4.2:1 | fail | PASS |
| `--coral` | #FF5C4D | 6.6:1 | PASS AA | PASS |
| `--text` | #E8EEF0 | 17.2:1 | PASS AA | PASS |
| `--muted` | #647079 | 4.0:1 | fail | PASS |

> `--violet` and `--muted` fall below 4.5:1 — use them for large text, icons, borders and fills, not body copy.

---

## Accent scales (50 – 900)

Base sits at **500**. Lighter steps mix toward white; darker steps toward `#0A0C0D`.

| Scale | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|
| teal | #E0FBF7 | #C1F6F0 | #99F1E6 | #72EBDC | #4AE6D2 | **#22E0C8** | #1EBEAA | #1A9888 | #167267 | #125049 |
| cyan | #E2F7FC | #C5F0F9 | #9FE6F4 | #7ADCF0 | #54D2EC | **#2FC8E8** | #29AAC5 | #22889E | #1C6676 | #164853 |
| blue | #E4EDFD | #C9DAFB | #A6C2F8 | #83ABF5 | #6193F3 | **#3E7BF0** | #3669CC | #2C55A3 | #23417A | #1B3056 |
| violet | #EDE8FB | #DAD1F6 | #C2B4F1 | #AB96EB | #9379E6 | **#7B5BE0** | #694EBE | #554098 | #403272 | #2E2551 |

Typical mapping: **50–100** subtle fills / badge backgrounds · **200–300** borders · **400–600** text & icons · **700–900** pressed states on light surfaces.

---

## Gradients

| Use | Spec |
|---|---|
| A mark / hero headline | `120deg · #22E0C8 → #2FC8E8 → #3E7BF0 → #7B5BE0` |
| CTA / connect button | `120deg · #22E0C8 → #3E7BF0` |
| Score gauge arc | `90deg · #22E0C8 → #7B5BE0` |
| Inner swoosh | `0deg · #2FC8E8 → #3E7BF0` |

---

## Usage rules

- **Teal is the workhorse** — up-moves, live dots, primary CTA start, link hover.
- **Reserve the full 4-stop gradient** for identity moments: logo, hero headline, gauge. Don't spray it across every element.
- **Violet is an accent, not a UI text colour** — it fails AA on `--base` (4.2:1).
- **Loss states stay coral** `#FF5C4D` — never recolour down / sell into the brand gradient.
- **Neutrals carry the layout**; accents punctuate it.

---

## CSS tokens

```css
:root{
  --base:#050708; --surface:#0E1113; --surface-2:#151A1D; --line:#1F262A;
  --teal:#22E0C8; --cyan:#2FC8E8; --blue:#3E7BF0; --violet:#7B5BE0;
  --coral:#FF5C4D; --text:#E8EEF0; --muted:#647079;

  --grad-identity:linear-gradient(120deg,#22E0C8 0%,#2FC8E8 40%,#3E7BF0 72%,#7B5BE0 100%);
  --grad-cta:linear-gradient(120deg,#22E0C8,#3E7BF0);
}
```
