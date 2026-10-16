# What you still need to fill in

Visible placeholders are rendered as a dashed amber box (`<Todo>`), so none can ship unnoticed.

## Texts (all in `src/i18n/ui.ts`, key `sys`, per language EN / PT / ES)
| Placeholder | Where | What to write |
|---|---|---|
| `[CASO 1 · PROBLEMA]`, `[CASO 2 · PROBLEMA]`, `[CASO 3 · PROBLEMA]` | `sys.cases[n].problem` | The real problem, no client names or numbers you may not publish |
| `[CASO n · RESULTADO]` | `sys.cases[n].result` | A real, verifiable outcome. No invented metrics |
| `[DEPOIMENTO 1 · texto, nome, cargo]`, `[DEPOIMENTO 2 …]` | `sys.proof.t1`, `sys.proof.t2` | A real testimonial with permission |
| PT-BR and ES copy | whole `pt` and `es` blocks | Native-speaker review (written by an AI, not reviewed) |

## Files
| File | Status |
|---|---|
| `public/vinicius-silva-cv-en-us.pdf` | **Copy of the old PDF.** Replace with the real EN-US résumé |
| `public/vinicius-silva-cv-pt-br.pdf` | **Copy of the old PDF.** Replace with the real PT-BR résumé |
| `public/vinicius-silva-cv-es-es.pdf` | **Copy of the old PDF.** Replace with the real ES-ES résumé |
| `public/vinicius-silva-cv.pdf` | Legacy name, kept so old external links keep working. Delete when you no longer need it |

## Links and facts
- GitHub and LinkedIn: `src/lib/site.ts` (`socials`). Confirm both are correct and public.
- Contact e-mail (Hotmail): `src/lib/site.ts` (`contact.email`). Single place to change.
- Reply time: "48 business hours" (`sys.contactReply`).
- `site.location.relocation` and the `relocationConfirm` flag in About: confirm the public wording.

## Privacy check you must do
- `public/case/industrial/*.jpg` (three screenshots used on the case page): confirm they contain **only fictitious data**. If not, delete them and the `screenshots` entries in `src/content/cases/industrial-operations-platform.mdx`.
- Case 3 describes clients generically ("an international industrial group, a state court, a steelmaker and a state IT company"). Previous text named them; confirm you are comfortable with this level of detail.
- The case study page is English-only; `caseNotice` explains that on PT/ES.
