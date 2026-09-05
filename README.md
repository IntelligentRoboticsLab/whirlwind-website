# whIRLwind Amsterdam

The website of whIRLwind, the humanoid robotics team of the Intelligent Robotics Lab at the University of Amsterdam. Next.js, TypeScript, no CSS framework.

Read `DESIGN.md` before changing anything visual. It is the design system and the reason behind every rule; section 14 maps it to the code.

## Develop

```sh
pnpm install
pnpm dev
```

`pnpm build` produces the production build. Lint with `pnpm lint`.

## Everyday edits

- **A match result:** add the competition and its matches to `src/lib/seasons.ts`. The home page, the season lists and the results block on the match report pick it up.
- **A news post:** add a markdown file to `content/news` (see the existing ones for the frontmatter), map its cover and gallery photos in `src/lib/news`. Optional frontmatter: `coverCredit`, `coverCaption`.
- **A publication:** add it to `src/lib/publications/publications.ts` and the PDF to `public/publications/<year>`.
- **A sponsor:** add the white logo file to `src/assets/sponsors` and an entry in `src/lib/site-content.ts`. The footer masks it to the page ink.
- **Photos:** file names must not contain `@`; the image optimizer rejects them.

## Artwork

The rendered robot and mark images in `src/assets/artwork` are made by `tools/artwork` from the Booster K1 model, recorded poses and the match ball. `tools/artwork/set.sh` renders the whole set; `poses.py` extracts new poses from recordings. Needs Blender, Python with numpy and Pillow, the `booster_assets` repo and the ball's `.blend`.
