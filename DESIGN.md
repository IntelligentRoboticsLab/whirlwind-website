# whIRLwind design guide

This file tells people and agents how to build pages for whIRLwind, the humanoid robotics team of the Intelligent Robotics Lab at the University of Amsterdam. Read it before touching any page, component or stylesheet. The mechanics it describes (colours, type roles, spacing) live in `src/styles/brand.css`. Use the tokens and role classes from that file; do not invent parallel ones.

The site is a field report, not a product launch. It shows what a group of students and their robots actually did, where, and when, with photographs and plain sentences. Everything on a page should be something we can point at and prove.

## 1. Who reads this and why

The primary reader is a visitor or journalist. They met us at an event (Science Park Science Day, Startup Village, the Princess of Orange visit, the European Commissioner visit), saw a result from RoboCup, or were sent a link. They want to know, in this order:

1. Who are you and what do you do, in one sentence.
2. What did you do recently, with pictures.
3. How do I contact you or get a logo and a photo I am allowed to use.

Secondary readers, in order: UvA students deciding whether to join, sponsors and the university, other RoboCup teams and researchers. Serve them with the same pages, not with separate marketing sections.

The site is organised like a club, by season. A season ends with the yearly RoboCup and the next one starts the day after, so "Season 2025/26" closed with RoboCup 2026 in Incheon and the World Humanoid Robot Games in August 2026 open Season 2026/27. A season takes its name from both calendar years it touches. Results, fixtures and news hang off the season, and the current season always shows what comes next, not only what has happened.

Design for two reading speeds. A skimmer should get the story from photographs, captions, headings and dates alone. A careful reader should find the full account, the credits, the PDF and the contact details without hunting.

## 2. Priority order

When rules conflict, protect them in this order:

1. Facts: names, dates, places, results, credits, who is in the picture. Never round a result up, drop a co-author, or invent a quote.
2. The reader's job from section 1.
3. Photographs as the primary material. Layout serves the pictures, not the other way round.
4. Recognisable whIRLwind authorship: the logo, TikTok Sans, indigo ink, orange used sparingly, the caption habit.
5. Composition specific to the material on that page. Two pages should not share a silhouette unless they carry the same kind of material.
6. Responsive behaviour and small details.

Ask the team a question only when the answer changes a fact, a credit, a legal claim or a call to action. Otherwise proceed and label uncertainty honestly ("date to be confirmed").

## 3. Brand assets

The name is written `whIRLwind`, with IRL in capitals, everywhere including headings, page titles and alt text. Long form: "whIRLwind Amsterdam". Never "Whirlwind", "WhIRLwind" or "WHIRLWIND" in running text. The IRL is always orange, in the wordmark and in every text role, from the display title to a caption. Mark it up as `wh<span class="irl">IRL</span>wind` wherever the name is rendered as text; alt text, `<title>` and metadata carry the plain string. The name is never written without the orange.

Two colours come from the logo and they are the only colours besides the paper and the two greys derived from them:

| Token | Value | Origin |
| --- | --- | --- |
| Orange | `#f26722` | Logo swirl and the IRL in the wordmark |
| Indigo | `#2c3086` | Logo swirl and wordmark on light backgrounds, as drawn in the official logo kit (adopted September 2026; the older files used `#040069`). The artwork tools, the noise field and its stills use the same value |

Logo files and where each belongs:

| File | Colours | Use on |
| --- | --- | --- |
| `src/assets/logo_light.svg` | White and orange | Dark canvas: header and footer in dark mode |
| `src/assets/sponsors/rerun-wordmark-white.svg` | White | Rerun's current wordmark, from their media kit; masked to `--ink-2` like the other sponsors |
| `src/assets/logo_dark_full.svg` | Indigo and orange | Light canvas: header and footer in light mode |
| `src/assets/logo_light_single.svg` | White and orange logo only | Dark canvas, small sizes |
| `src/assets/logo_single_dark.svg` | Indigo and orange logo only | Light canvas, small sizes |
| `public/favicon.svg` | Logo only, indigo blades turn white in dark mode via `prefers-color-scheme` inside the file, matching `logo_light.svg` | Browser tab icon; `favicon.ico` and `apple-touch-icon.png` are the fallbacks |
| `public/press/whirlwind-*.{svg,png,eps}` and `whirlwind-logo-kit.zip` | The official logo kit, verbatim: the full logo and the logo alone, each in both colourways, and the whole kit as one zip | Downloads on the Press page only. Never used as site assets: the kit's logo file is framed on the whole drawing, not on the circle |

The file names describe the logo's colours, not the background. Pick by the table above, not by the name. Words: the swirl alone is "the logo", the swirl with the wordmark is "the full logo"; never "mark" or "icon" on the site. The site's logo-only files were once cut from the full logo and carried a sliver of the W at the right edge; they are now the swirl alone.

The logo-only files (`favicon.svg` and the two `*_single*.svg`) are square, centred on the swirl's circle rather than on the whole drawing, so the two small triangles at the top left do not push the swirl off centre in a tab, a home-screen tile or the footer crest. Keep that box when exporting or re-rendering; `tools/artwork/render.py --mode logo` frames the circle the same way.

Rules for the logo: never recolour, rotate, stretch, outline, add a shadow or place it over a photograph. Minimum height for the full logo is 28px; in the header it is 3.4rem. Below 28px use the logo alone. Clear space around it equals the height of the W. The logo alone, never the wordmark, is the favicon; it follows the browser theme. The logo alone is also fine in the footer. The swirl is never used as a background pattern, a section divider or a loading spinner. Besides the 3D render in the artwork series (section 8) it has two further jobs, and only these:

- The crest: in the footer the logo sits large (26rem wide, 8rem of it beyond the right edge), cropped by the right and bottom page edges, in the strip the footer columns leave free on the right. Since September 2026 it is the 3D render of the logo (`mark-3d`, section 8), with white blades on the dark ground and indigo blades on paper, so both themes read the same. It sits beside the text, never under it. One per page, footer only.
- The interpunct: where a `.t-meta` line separates items with a dot (date, place, credit), the dot is the logo at x-height, via `.meta-dots` and `.dot`. Use the indigo logo on light and the white logo on dark.

The wordmark is set in TikTok Sans at its heaviest weight with a slant. That letterform is the only place the heavy slanted style appears by default; see section 5 for the one exception.

## 4. Colour

The site renders in light and dark following the visitor's system preference. There is no visible theme switch. Every component must be checked in both.

The canvas is off-white paper with indigo ink in light mode, and indigo-black with off-white text in dark mode. Colours are tokens in `brand.css`; page CSS reads them with `var()` and never redeclares them.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--orange` | `#f26722` | `#f26722` | The accent: bars, marker, bib, focus ring, score colon, the IRL in the name |
| `--indigo` | `#040069` | `#040069` | Text on orange, in both modes |
| `--paper` | `#faf9f6` | `#0d0c22` | Page background, the only surface |
| `--ink` | `#040069` | `#f2f0ea` | All text and all headings |
| `--ink-2` | `#55537a` | `#aeabc6` | Captions, dates, credits, labels, sponsor logos |
| `--rule` | `#e2e0ea` | `#2a2846` | 1px rules |

Six tokens. Two are the logo and never change; four follow the theme. In light mode the ink is the logo indigo, so text and logo are literally the same colour. There is no second surface, no separate heading colour and no separate button colours: a button is orange with indigo text in both modes.

Measured contrast against the canvas: ink 16.5:1 light and 16.9:1 dark, secondary text 6.9:1 light and 8.6:1 dark, orange 2.96:1 light and 6.2:1 dark, indigo on orange 5.6:1. That is why orange never carries small text in light mode, with one deliberate exception: the IRL inside the name is orange at every size, because it is the brand, and the letters around it carry the reading. Nothing else in orange goes below title size on the light canvas.

Rules:

- The page is one continuous canvas. Sections are separated by space and, where needed, one 1px `--rule`. Do not wrap sections, news items, publications or metrics in boxes.
- Orange marks position or state, never mood: the underline of a link, the rule under the active nav item, the focus ring, the next fixture in the season list, the colon in a score. If a screen contains more than a handful of orange marks, remove some.
- The orange line: every page opens with a 4px `--orange` bar across the full width, above the header, like the touchline or the stripe on the jersey. The same 4px bar marks the next fixture in the season list, placed in the left gutter outside the row so the row's columns stay aligned with the rows around it.
- Selected text is indigo on orange (`::selection`), the scrollbar thumb is orange, the text cursor in inputs is orange. These are set once in `brand.css`.
- Never use orange as a large fill (banner, section background, card). The exceptions are the bib button and the marker-pen link on hover, both indigo on orange at 5.6:1.
- No gradients, glows, blurs, translucency, glass, textures, grid backgrounds or vignettes in the page itself. Photographs and the artwork series (section 8) supply all the colour a page needs.
- No green, red or yellow for results. A third place is text that says "3rd place".
- Photographs are never tinted, darkened or overlaid with text.

## 5. Typography

One family: TikTok Sans, loaded from Google Fonts as a variable font with weight 300 to 900, optical size 12 to 36, width 75 to 150 and a slant axis. Load exactly:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=TikTok+Sans:ital,opsz,wght@0,12..36,300..900;1,12..36,300..900&display=swap" rel="stylesheet">
```

In Next.js use `next/font/google` with the same family, axes `["opsz"]`, weight `"variable"` and styles normal and italic, exposed as `--font-sans`. Set `font-optical-sizing: auto`. Fallback stack: `"TikTok Sans", "Helvetica Neue", Arial, sans-serif`.

Use only these ten roles. Each has a class in `brand.css`; do not create sizes or weights outside them.

| Role | Class | Size | Weight | Line height | Notes |
| --- | --- | --- | --- | --- | --- |
| Display | `.t-display` | clamp(2.5rem, 1.5rem + 3vw, 4rem) | 800 | 1.02 | Not used on the home page. Reserved for a single short line where a page has no image, such as the 404. Never a tagline. Tracking -0.02em |
| Title | `.t-title` | clamp(2rem, 1.4rem + 1.6vw, 2.75rem) | 700 | 1.1 | The h1 of every other page |
| Heading | `.t-heading` | 1.5rem | 650 | 1.2 | h2 |
| Subheading | `.t-subheading` | 1.125rem | 650 | 1.3 | h3, news card titles, publication titles |
| Lede | `.t-lede` | 1.25rem | 400 | 1.45 | First paragraph after a title, max one per page |
| Body | `.t-body` | 1.0625rem | 400 | 1.55 | Everything else, measure 60 to 70 characters |
| Caption | `.t-caption` | 0.9375rem | 400 | 1.4 | Under photographs, colour `--ink-2` |
| Meta | `.t-meta` | 0.875rem | 500 | 1.4 | Dates, places, credits, tags, colour `--ink-2`, tabular numerals |
| Result | `.t-result` | inherits | 900 | 1 | Slanted -6, only for finishing positions such as "3rd" |
| Score | `.t-score` | 1.125rem in tables, up to 3rem as a headline | 800 | 1 | Width 150, tabular, colon in `--orange`. Only for match scores |

Rules:

- Headings, buttons, nav items and labels are sentence case. No all-caps, no letter-spacing above 0, no tracked eyebrows or kickers.
- Weight 900 with slant is the wordmark's style. It is allowed in exactly one other place: the finishing position in a result ("3rd place"), via `.t-result`. Nowhere else, and never for a whole sentence.
- Italic is for titles of publications and for quotations. Never for emphasis inside a heading and never combined with orange, the IRL included.
- Keep the width axis at 100 everywhere except `.t-score`, which is the one extended setting on the site. Never condensed.
- A score is two numbers and a colon: ours, colon, theirs. Mark up the colon so it can take `--orange`. A shoot-out is written "1:0" with "after penalties" in `.t-meta` beside the opponent, never "1:0 (p)".
- Numbers that line up (dates in a list, years in the publications list, scores) use `font-variant-numeric: tabular-nums`.
- Body measure stays between 60 and 70 characters. On wide screens the text column is narrower than the photo column; never stretch a paragraph to the page width.
- Hierarchy comes from size, weight and space, in that order. Never from colour, boxes or icons. Every role is `--ink`. The one exception is a brand's own logo standing beside its name, as with the social channels on the Team page and the sponsors: single-colour, in `--ink`, no larger than the text it accompanies.
- Widows in titles and ledes are fixed by rewording, not by shrinking type.
- No em dashes anywhere in copy. Use a comma, a full stop or a colon.

## 6. Layout and spacing

Container: `min(72rem, 100% - 3rem)` centred. Twelve columns at 64rem and above, six from 40rem, four below. Column gutter is `--space-6` (1.5rem).

Photographs may leave the container. A lead photograph is full-bleed or spans all twelve columns; its caption sits under it inside the text column, left aligned to the text.

Text lives in a reading column of seven columns on desktop, starting at column one or column three, never centred. A caption or aside may use the remaining columns on the right.

Spacing scale, 4px base: `--space-1` 0.25rem, `--space-2` 0.5rem, `--space-3` 0.75rem, `--space-4` 1rem, `--space-6` 1.5rem, `--space-8` 2rem, `--space-12` 3rem, `--space-16` 4rem, `--space-24` 6rem, `--space-32` 8rem.

How gaps relate:

- Heading to its first paragraph: `--space-3`.
- Paragraph to paragraph: `--space-4`.
- Photograph to its caption: `--space-3`.
- Item to item in a list of news or publications: `--space-6` with a 1px rule between.
- Group to group inside a section: `--space-12`.
- Section to section: `--space-24` on desktop, `--space-16` below 40rem.
- `--space-32` only before the footer.

Give every gap one owner: the parent sets the gap; children do not add margins of their own. Do not repair one awkward transition with a one-off margin; fix the grouping.

The slant: the wordmark leans at about 6 degrees, and so do the two interactive shapes on the site. The bib button is a parallelogram skewed 6 degrees, and the marker-pen link's orange bar is skewed the same way. Nothing else is skewed, ever: not photographs, not headings, not rules.

Radius: photographs, figures and buttons 0. Inputs `--radius` 4px. Nothing is a pill.

No shadows. Depth is not part of this system.

## 7. Photography

Photographs are the main content. Treat them the way a newspaper photo desk would.

Selection:

- Only real photographs of the team, the robots, the venues and the visitors, from `src/assets/photos`, or a piece from the artwork series in section 8. No stock imagery, no generated imagery, no abstract shapes, no icons standing in for a photo.
- Prefer photographs with people and robots in a recognisable place over close-ups of hardware on a table.
- One lead photograph per page. Other photographs are supporting figures or a gallery.

Framing:

- Show photographs at their native 3:2 or 4:3 where possible. Allowed crops: 16:9 for a full-bleed lead, 1:1 and 4:5 in a gallery grid. Never crop out a face, a robot's feet or the ball.
- Object-fit cover is acceptable only inside a gallery grid where every cell shares one ratio.
- No rounded corners, borders, frames, shadows or hover zoom on photographs.
- Text is never placed on top of a photograph. Titles go above or below.

Captions and credits:

- Every photograph outside a uniform gallery grid has a visible caption in `.t-caption`: what is happening, where, and when. "Debugging a robot at pitch level during a match. RoboCup German Open, Cologne, March 2026."
- The photographer's credit follows the caption in `.t-meta` when known, formatted "Photo: Name". Credits already present in `site-content.ts` must be carried over, never dropped.
- The Press gallery is a plain image grid with equal gutters; the caption and credit live in the dialog a photograph opens. A news post's gallery keeps the caption and credit under each photo (`PhotoGrid` with `captions`), with the wider row gap that needs.
- Alt text describes the picture for someone who cannot see it and is not a copy of the caption.

Galleries: uniform grid of one aspect ratio, gutter `--space-2`, three columns at 64rem, two at 40rem, one below. Ordered by date, newest first. Every gallery photograph is a button that opens it in a native `<dialog>` at full size on the paper, with its caption and credit and a bib button "Download full resolution" that serves the original file; Escape, the "Close" link and a click outside close it, and focus returns to the photograph. No other lightbox.

## 8. Artwork

Besides photographs the site has one other kind of image: rendered artwork of our own robot and our own logo, in our own colours, in poses taken from our own motion data. Nothing in it is stock or generated; every pixel comes from the model files and the recordings.

How it is made, all in `tools/artwork`:

- `render.py` builds the Booster K1 from its MuJoCo model, poses it, adds the match ball from the Booster Blender file, shades everything through the brand ramp (indigo shadow, orange body, paper highlight, with the ball's panel pattern showing through) and renders with a transparent film. The ball is placed by pose type (waiting, on the boot, away, incoming, at the feet), nudged until it clears every part of the robot, and given motion blur along its path where it is moving. The robot itself is never blurred.
- The fallen pieces keep a recording's joint angles untouched and only tip the whole body onto the floor (`render.py --fallen front|back|left|right`), so they are still our robot in our own motion, just after the fall.
- `poses.py` extracts poses from recordings: the walk and kick policy rollouts and a goalkeeper sim log. It picks frames by what the body is doing (full stride, leg drawn back, boot on the ball, arms spread) and writes `poses.json`, joint angles keyed by MJCF joint name plus the trunk tilt. New poses come from new recordings through this script, never by hand.
- `grain.py` composites the render onto the page colour and adds monochrome film grain on the subject only.
- `set.sh` renders the whole set below, both grounds, into `src/assets/artwork`, plus a transparent cutout of each piece cropped to the subject in `src/assets/artwork/cut`, for the openers.
- `field.py` renders the two still frames of the noise field under the lineup (`field-light.jpg`, `field-dark.jpg`) with the same maths as the WebGL shader, so the still and the moving version match.

- The lineup cutouts in `src/assets/artwork/lineup` are transparent PNGs (`grain.py ... none`) of five poses rendered from the side with `--fixed-dist 3.4 --lens 60`, so they share one scale. The keeper cutout already faces left, toward the ball, so it is not mirrored. New figures must use the same distance and lens.

Every piece exists twice, on a paper ground (`#faf9f6`) and on the dark ground (`#0d0c22`), which are exactly `--paper` in the two themes. The ground carries no grain, so the image has no visible edge: the subject simply stands on the page. Pages load the version that matches the theme, the same way the logo swaps, and never show a light piece on the dark canvas or the reverse.

The set, each as `-light.jpg` and `-dark.jpg`:

| File | Subject | Use |
| --- | --- | --- |
| `k1-kick-windup` | Kick wind-up from the side, right leg back, ball waiting | Team, opener of "Follow along" |
| `k1-kick-contact` | Boot on the ball, from low on the pitch | Publications, opener of the newest year |
| `k1-kick-follow` | Follow-through, ball away | Home, opener of "News" |
| `k1-walk-stride` | Full stride, head on | Team, second robot in the opener of "Follow along" |
| `k1-walk-swing` | Knee at its highest, from the side | News index, opener of the newest season |
| `k1-dribble` | Ball at the feet, from above | Press, opener of "About whIRLwind" |
| `k1-keeper-arms` | Goalkeeper, arms spread, shot coming in | Publications, second robot in the opener of the newest year |
| `k1-keeper-crouch` | Goalkeeper, low ready stance | Contact, opener of "Where we are" |
| `k1-keeper-step` | Goalkeeper stepping across the line, ball arriving | Home, opener of the current season |
| `k1-body` | Standing, hand-posed, whole robot | Social share image; Sponsors, opener of "Supported by" |
| `k1-fallen-front` | Face down, arms out: the keeper-arms pose tipped onto the floor | Publications, opener of 2025 |
| `k1-fallen-back` | On its back, one leg up: the walk-stride pose tipped onto the floor | 404 |
| `k1-head` | The head and its two cameras | Where a square or tight crop is needed |
| `mark-3d` | The swirl logo as a solid object, rendered twice: orange and white blades for the dark ground, orange and indigo for paper. Transparent cutouts (`.png`), not framed pieces | The footer crest |

The assignments are a starting point. Any piece may stand on any page that section 8 allows; the home opening changes only deliberately, at most once a season.

Openers: besides a page's lead piece, renders stand in heading bands, an idea from the specimen ("Making the renders central"). An opener (`.opener`, `src/components/Opener.tsx`) is as tall as its robot plus 1.5rem of air above it (9.5rem for a standing robot of 8rem, 5rem for a fallen one of 3.5rem; below 40rem the robot shrinks to 0.6 of that and the band with it), with the heading at the bottom left, an optional link at the bottom right, and the piece's cutout standing on the rule underneath, its lowest point exactly on the line. The band never carries empty space above a short robot, and a section that starts with an opener sits 2rem closer to the section before it than the page gap alone (4rem instead of 6rem), since the band's air already separates them. Each opener places its robot at a different point along the rule (`at`, a percentage: 72 for the season, 38 for News, 56 on the news index, 80 and 30 on Team, 30 on Sponsors, 74 on Press, 60 on Contact, 66 and 32 for 2026 and 52 for 2025 on Publications), so across the site the robots read as playing along one line. An opener may hold two robots (`second`), which is how Team and Publications carry a second piece without a lead; below 40rem only the first is shown, since the narrow band has room for one. The band's rule replaces the top rule of the first row under it, so there is never a double line. Where prose or an address follows instead of rows (Team, Press, Contact), the text sits 1rem under the rule, a heading's distance: there the rule is only the ground the robot stands on. Openers use pieces the page does not already show as its lead, and a page has at most one lead and two openers. The edge piece tried on Publications was dropped: a robot beside the list, not on a line, looked stranded.

Rules:

- Artwork opens the home page, the 404 and the share image. Team, Publications, Press, Contact and Sponsors open with the title and lede alone and carry their robots in openers further down the page, so the title starts at the same height on every page and no text stands beside a column of empty space (a lead piece beside the text, centred and then top-aligned, and then a full-width lead under the text, were all tried and dropped). A news post or a competition page always leads with a photograph; artwork never stands in for a real event.
- At most one lead piece per page, plus openers as above. Because the ground is the page, artwork needs no frame, caption or full-bleed treatment: it sits directly in the layout. On the home page the K1 takes the right seven columns of the opening with the lede beside it; on the 404 the piece sits under the text at the full width of the container. Crop only by object-fit within the 16:9 file, keeping the whole subject in view.
- Text never sits on the subject. It may sit on the ground of the artwork, since that ground is the page.
- The ramp is fixed. Do not recolour, invert, tint or crop into a different ratio than 16:9 or 3:2. New pieces are rendered with the script, not edited from these.
- Artwork is not a background texture. It is never tiled, faded, blurred further, stretched behind a section or placed at low opacity. The grain in the file is the only grain on the site.

## 9. Page anatomy

Header: the logo at 3.4rem height on the left, six text links (Team, News, Publications, Sponsors, Press, Contact) on the right in `.t-body` weight 500. Nav items are plain at rest. The current page carries the marker bar, the same 2px orange bar skewed at the wordmark's slant that links use, and hovering any item fills it the way a link fills. Header background is `--paper`, one `--rule` below. No blur, no CTA button, no sticky behaviour beyond a plain fixed position if needed. On narrow screens the links collapse behind a menu button: three ink lines that turn into a cross while the menu is open, labelled "Menu" for assistive technology with `aria-expanded` carrying the state. The list opens full width under the header and unfolds rather than appearing (section 11); Escape and choosing a link close it.

Footer: three content-width columns with equal gaps between them, and the right 18rem of the container kept free for the crest. Left: the line "whIRLwind is the humanoid robotics team of the Intelligent Robotics Lab, University of Amsterdam." with the sponsor logos in a quiet row under a `.t-meta` label "Supported by". Middle: social channels as text links (LinkedIn, Instagram, GitHub). Right: the address and the email as a link. The crest (section 3) is the only mark in the footer; no small logo beside it. No columns of repeated navigation.

Sponsor logos are rendered as single-colour shapes in `--ink-2`, using the white logo files as a CSS mask, at 28px height, darkening to `--ink` on hover. They never appear in their own brand colours or in cards. In the footer they are 28px tall in `--ink-2`; on the Sponsors page they are 4rem tall in `--ink`, one per row. The label and the logos must not look alike: the label is text in `.t-meta`, the logos are shapes.

Home: the opening is the lineup, flush under the header and the full width of the viewport: the K1 in profile, left to right, walking, winding up, striking the ball, following through, and as goalkeeper taking it. Five cutouts from the artwork set rendered at one camera distance so they share a scale, feet on one line, standing on the noise field (section 8). About two thirds of the viewport tall on desktop. Under it, one sentence in `.t-lede` saying who we are and one link to the latest match report. No headline, no tagline, no slogan and no headline result. Below 64rem the wind-up and follow-through are dropped so three figures stay large. Then the seasons: the current season first ("Season 2026/27" as an opener with the keeper stepping across on its rule), every competition as a row: date in `.t-meta`, then "event, city" and nothing more (details belong to the news post), then the result in `.t-result`. Competitions still to be played come first in their season with the orange bar in the gutter and their dates ("23 to 25 Oct") in the result column, set like the word "place" beside a figure; a played competition without a recorded result reads "Result to be added". Then the previous season under its own heading. Older seasons live on the news index. Then "News" as an opener (the follow-through, ball away) with "All news" beside the heading, then the three most recent posts as photo, date, title, summary. Then "Supported by" logos. That is the whole page.

News index: title "News", posts grouped by season ("Season 2025/26", "Season 2024/25") with the season as `.t-heading`, then every post as a row: photo on the left at 3:2 spanning four columns, date in `.t-meta`, title in `.t-subheading`, summary in `.t-body`. Rows separated by a rule. No cards.

News post: title, then a meta line with date, place and author, then lead photograph with caption, then body in the reading column, then, for a competition, the results block, then gallery. Body headings use `.t-heading` and `.t-subheading`.

Results block: a semantic table headed "Results", one row per match in the order played. Columns: stage (Round 1, Play-in, Semi-final, Third place), opponent, score with ours first in `.t-score`. Every match is listed, wins and losses alike; a 0:9 sits in the same type as an 8:1. Nothing below the table: the placing is already in the season list on the home page, and the source is recorded here, not on the page. The block is also the material for the season list on the home page.

Publications: title, one sentence saying what is here, then a list grouped by year with the year as `.t-heading`. Each entry: title in `.t-subheading` italic, authors in `.t-body`, type and date in `.t-meta`, then "PDF" and "BibTeX" as text links. Tags in `.t-meta` separated by commas, not pills.

Press (serves the primary reader): a boilerplate paragraph that can be copied; the official logo kit for download, four tiles (full logo and logo, each for light and dark backgrounds) with a preview on its own ground and SVG, PNG and EPS as text links, plus one link to the whole kit as a zip; then "Gallery" (every photograph in `src/lib/photos.ts` not opted out, newest event first, no captions) where every photograph opens at full size with caption, credit and a download button; and the contact email. Nothing else.

Contact: the bib button "Email us" in the opening, then "Where we are" (the lab, the room, the address) as its own section under an opener with the crouching keeper, then "Joining" and "Sponsoring" together in a second section. The email appears once, in the opening. No form unless one exists on the backend.

Sponsors: title and one sentence saying what the sponsors do for us, with no lead piece. Then "Supported by": one row per sponsor, the masked logo at 4rem in `--ink` on the left (a link to the sponsor, like the name), the name as a link and the domain in `.t-meta` on the right, rows separated by rules. Then "Become a sponsor": a paragraph, the page's bib button "Email us", and under them the jersey photograph (the sponsor placements on the back), showing what a sponsor gets. No tiers, no logo cards, no amounts.

## 10. Copy

- Write in first person plural. "We finished 4th." Not "The team achieved a fourth-place finish."
- Write competitions as match reports: who we played, what the score was, what broke and what worked. A candid sentence about a failure ("the walking policy fell over in every match on the first day") is worth more than a paragraph of enthusiasm. Captions may be dry: "The ankle joint that broke twice in Cologne."
- Lead with the fact. Place, date, result, then the story.
- Dates: "6 July 2026". Months in full in prose, abbreviated to three letters only in tight tables.
- Places: city, then venue if useful. "Incheon, Songdo Convensia."
- Results: "3rd place", "4th place", "quarter-finals". Do not describe a result with adjectives.
- Competitions by their proper names: "RoboCup 2026", "RoboCup German Open 2026", "World Humanoid Robot Games 2025".
- The league is the "Humanoid Soccer League", or "HSL" after the first mention. It was formed in 2026 from the former Humanoid League and the Standard Platform League (SPL). Never shorten it to "Humanoid League". We came from the SPL side and were formerly the Dutch Nao Team; say so when history matters. We play in the Middle Division with Booster K1 robots.
- Match scores are written ours first, with a colon and no spaces: "8:1 against RedbackBots". A loss is still written ours first: "1:11 against B-Human". Scores come from hsl.robocup.org and are never rounded or omitted because they are unflattering.
- Existing news articles are not rewritten. Adding a results block to one is fine; changing its prose is not.
- Banned words and phrases: cutting-edge, innovative, passionate, world-class, state-of-the-art, journey, unleash, empower, elevate, seamless, revolutionise, next-generation, pushing the boundaries, excited to announce. Also any sentence that begins with "In today's".
- Link text says where the link goes: "Read about the German Open", not "Learn more" or "Click here".
- Headings state a fact or a topic in sentence case: "Latest results", "Publications from 2026". No questions, no puns.
- Buttons are verbs: "Email us", "Download the logo files". At most one bib button per page.
- Meta lines join items with the logo as interpunct, not with commas or slashes: date, place, credit.

## 11. Motion and interaction

The default is stillness. Nothing moves on scroll, nothing fades in, nothing lifts on hover, no parallax, no marquee, no counters. The transitions that exist are the 150ms link fill and the 250ms unfolding of the narrow-screen menu (the list grows from zero height while the three lines of its button turn into a cross), and all of them respect `prefers-reduced-motion`. The one animated surface on the site is the noise field under the home lineup (section 8): a WebGL shader, slow drifting noise and per-frame film grain in the brand colours. A still frame of the same field, one per theme (`src/assets/artwork/field-light.jpg` and `field-dark.jpg`, from `tools/artwork/field.py`), is always in the markup underneath it, so the view is complete before any script runs and stays complete without WebGL or under `prefers-reduced-motion`, when the canvas is removed. It stops drawing while off screen. No other shader, canvas or animation is added without a decision recorded here.

Links are marker-pen links: at rest a 2px orange bar under the word, skewed at the wordmark's slant; on hover the bar rises to fill the word and the text turns indigo on orange. This is the `a` default in `brand.css`. Nav links show the bar only on the current page and fill on hover like any other link. Links inside running text (paragraphs, list items, table cells, season rows) flow inline so they wrap with the sentence; they carry the same bar and fill, drawn as backgrounds so every line fragment gets its own, with the fill cut at the same slant.

The bib button: the robots wear an orange bib so everyone knows which one is ours, and the one primary button per page does the same. Solid `--orange`, indigo text, skewed 6 degrees, label counter-skewed inside a `span`. There is no secondary button style; a second action is a link.

Focus is visible: 2px `--orange` outline with 2px offset on every interactive element, in both modes. On the bib it follows the skew.

## 12. Patterns we never ship

These are the tells of a generated page. The previous version of this site had most of them. Reject them on sight:

- Dark navy gradient background with radial glows in the corners.
- Translucent, blurred "glass" header or cards.
- Pill-shaped buttons, pill tags, badges for ordinary metadata.
- Rounded cards with drop shadows, especially cards inside cards.
- A hero split into text on the left and a rounded photo on the right, with a stat card floating over the photo.
- An italic orange word inside a heading. The IRL in the name is upright, and it is the only coloured word.
- All-caps tracked eyebrow labels above headings.
- Rows of metric boxes ("3 competitions", "12 members", "2 robots").
- Three-column feature grids with an icon in a coloured tile above each.
- Logo rails where each sponsor logo sits in its own card.
- Text set over a darkened photograph.
- Section titles that ask a question or make a pun.
- Hover transforms that lift or scale elements.
- Scroll-triggered reveals, animated counters, typing effects.
- Space Grotesk, Inter, or any second typeface next to TikTok Sans.
- Identical section silhouettes repeated down a page.
- Emoji in headings or navigation.
- Arbitrary border radii (the old stylesheet had ten different values).
- The swirl anywhere other than the header, favicon, footer crest and interpunct. No watermarks behind sections, no spinning loaders, no swirl-shaped photo masks.
- Skew on anything other than the bib button and the marker bar.
- Em dashes.

Avoid sterile anti-design too. Restraint here means a good photograph given room, a caption that says something, clear type and honest gaps. It does not mean grey text on white with nothing to look at.

## 13. Review before shipping

Render the page in light and dark, at 1280px and at 390px wide, and check in this order:

1. First read. Does the first viewport show a real photograph with a caption and one sentence saying who we are? Would a journalist know what to write from the first screen?
2. Facts. Every date, place, result, name and credit matches `site-content.ts`, the news markdown or the publications data. IRL is capitalised and orange in every "whIRLwind".
3. Photographs. Native ratio or an allowed crop, nothing important cropped, caption present, credit present where known, no text on top, no rounded corners.
4. Type. Only the ten roles. Sentence case. No tracking. Body measure between 60 and 70 characters. Tabular numerals where numbers align.
5. Colour. Orange appears only as the top bar, the next-fixture bar, the marker bar under links, the bib, the current-page bar, the focus ring, the colon in `.t-score`, and the IRL in the name. Every rendered "whIRLwind" has its IRL in orange; no other small orange text in light mode. No gradients, shadows, blur. Both modes read with equal hierarchy.
6. Layout. Every gap comes from the scale and has one owner. No empty half of a split. No boxes standing in for hierarchy.
7. Copy. Fact first, first person plural, no banned words, link text says where it goes, no em dashes.
8. Access. One h1, ordered headings, alt text on every image, visible focus, keyboard-reachable menu and gallery, no information carried by colour alone.
9. The list in section 11. If any item is present, remove it before anything else.

Fix the most systemic problem first, render again, repeat. Deliver the page, not the checklist.

## 14. Where things live in the code

The site is Next.js with the app router. Everything below follows this guide; when the two disagree, fix the code.

- `src/styles/brand.css`: tokens, type roles, links, the bib, the top bar, sponsor masks, the crest. `src/app/globals.css`: page and component layout. No other stylesheet, no utility framework.
- `src/app/layout.tsx`: TikTok Sans through `next/font`, the top bar, header, footer, metadata, favicon and share image.
- `src/components/Name.tsx` renders the name with the orange IRL; `src/lib/name.tsx` does the same for strings and for rendered markdown. Never write the name as a bare string in JSX.
- `src/components/Artwork.tsx` picks the theme's version of a piece from `src/lib/artwork.ts`. Pieces are rendered by `tools/artwork`.
- `src/lib/seasons.ts`: seasons, competitions, placings and every match score. `SeasonList`, `ResultsBlock`, `Score` and `Placing` render it. A new result is a new entry here, nothing else.
- `content/news/*.md`: articles. Frontmatter may carry `coverCredit` and `coverCaption`; the prose is never edited for design reasons. Cover and gallery photos are mapped in `src/lib/news` by id from `src/lib/photos.ts`.
- `src/lib/site-content.ts`: sponsors, social channels and contact details. `src/lib/photos.ts`: every photograph with alt, credit and event date; news posts and the Press gallery draw from it.
- Old routes redirect in `next.config.ts`: `/socials` to `/team`. `/sponsors` is a page again.
