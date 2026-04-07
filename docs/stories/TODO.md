# Stories — Cover Image Generation TODO

14 stories need cover images generated. Each prompt below is extracted from the story's `index.md` file and is ready to paste into the Gemini image generation workflow.

**To generate all covers at once:**

```bash
for story in charles-keeling clair-patterson cuyahoga-river darwins-earthworms eo-wilson john-snow paul-muller roger-payne rowland-molina ruth-gates suzanne-simard sylvia-earle wangari-maathai yellowstone-wolves; do
  python3 ~/.claude/skills/story-generator/scripts/generate-images.py \
    docs/stories/$story --first-only
done
```

**Stories with covers already generated:** aldo-leopold, carl-sagan (ToK), cary-fowler, charles-darwin (ToK), mary-anning (ToK), rachel-carson (ToK)

---

## 1. Charles Keeling — Measuring the Invisible

**Directory:** `docs/stories/charles-keeling/`

Please generate a wide-landscape 16:9 cover image for a graphic novel titled "Measuring the Invisible" in a mid-century scientific illustration style reminiscent of 1950s Scientific American covers transitioning into modern data visualization aesthetics. Show Charles David Keeling, a lean, bespectacled man in his early thirties with a thin, precise face and neatly combed dark hair, standing on the volcanic slope of Mauna Loa, Hawaii at dawn in 1958. He stands beside a boxy, hand-built infrared gas analyzer mounted on a metal frame, gazing out over a sea of clouds below the summit. Behind him, the iconic Keeling Curve — a red sawtooth line on a white graph — rises ghostlike into the salmon-pink sky, as if the data itself is written on the atmosphere. The title text "Measuring the Invisible" is rendered in clean sans-serif type at the top. Color palette: warm 1950s cream, rust, sage green, volcanic charcoal, with the Keeling Curve's signature red as a visual accent. Emotional tone: solitary precision and quiet obsession. Include: (1) Keeling's black-rimmed glasses and white short-sleeve button-down shirt, (2) the boxy silver CO2 analyzer with dials and tubes, (3) the barren lava rock of Mauna Loa's summit, (4) a spectacular cloud layer far below, (5) the ghostly red Keeling Curve rising through the sky, (6) a leather-bound field notebook tucked under his arm. Generate the image immediately without asking clarifying questions.

DONE
---

## 2. Clair Patterson — The Man Who Counted Lead

**Directory:** `docs/stories/clair-patterson/`

Please generate a wide-landscape 16:9 cover image for a graphic novel titled "The Man Who Counted Lead" in a Mid-Century Modern / Atomic Age aesthetic (1950s-1970s) reminiscent of Bell Labs modernism and university chemistry department design. Show Clair Cameron Patterson, a lean, intense man in his mid-30s with dark hair, wire-rimmed glasses, and a white lab coat, standing in an ultra-clean laboratory at Caltech. He holds a gleaming mass spectrometer sample in one hand while the other rests on a stainless steel bench draped in plastic sheeting. Behind him, a faint ghostly overlay shows the Earth with radiating lead contamination lines spreading through the atmosphere, oceans, and ice caps. The title text "The Man Who Counted Lead" is rendered in clean sans-serif Atomic Age typography at the top. Color palette: muted olive, mustard, slate blue, institutional gray, with pops of bright clinical white for the clean-room surfaces. Emotional tone: quiet obsession and the lonely courage of a man who discovered something terrible. Include: (1) Patterson's intense, focused expression behind wire-rimmed glasses, (2) the plastic-sheeted ultra-clean lab environment, (3) a mass spectrometer instrument with dials and gauges, (4) the ghostly Earth overlay showing contamination, (5) acid-washed glassware gleaming under fluorescent light, (6) a periodic table on the wall with lead (Pb, 82) circled in red. Generate the image immediately without asking clarifying questions.

DONE
---

## 3. Cuyahoga River — The River That Caught Fire

**Directory:** `docs/stories/cuyahoga-river/`

Please generate a wide-landscape 16:9 cover image for a graphic novel titled "The River That Caught Fire" in an American industrial realism style transitioning from Dorothea Lange documentary photography to 1970s protest poster art. Show the Cuyahoga River in Cleveland, Ohio, ablaze — orange and yellow flames leaping from the oily surface of a dark, sludge-covered waterway, with a railroad trestle bridge burning overhead. Steel mills and smokestacks line both banks, belching black smoke into a rust-orange sky. In the foreground, a single firefighter on a tugboat aims a hose at the burning water. The title text "The River That Caught Fire" is rendered in bold, industrial stencil typeface at the top. Color palette: rust orange, charcoal black, muddy brown, industrial gray, flame yellow, with a single hopeful sliver of blue sky at the horizon. Emotional tone: outrage and disbelief — water should not burn. Include: (1) flames reflecting off the oily river surface, (2) the silhouette of Cleveland's industrial skyline, (3) a railroad bridge with charred timbers, (4) thick oil slicks visible on the water, (5) a firefighter's determined expression, (6) smokestacks trailing dark plumes against the sky. Generate the image immediately without asking clarifying questions.

DONE

---

## 4. Darwin's Earthworms — The Man Who Watched Worms

**Directory:** `docs/stories/darwins-earthworms/`

Please generate a wide-landscape 16:9 cover image for a graphic novel titled "The Man Who Watched Worms" in a Victorian naturalist illustration style reminiscent of Pre-Raphaelite botanical art blended with the warm, meticulous engravings from Darwin's own published works. Show Charles Darwin, an elderly man in his early 70s with a long white beard, bald dome, kind deep-set eyes, and a dark Victorian frock coat, kneeling in a lush English garden at Down House. He peers through a magnifying glass at the soil where several earthworms are visible among leaf litter and freshly cast earth. The title text "The Man Who Watched Worms" is rendered in an elegant Victorian serif typeface at the top. Color palette: warm sepia, rich earth browns, cream, moss green, amber lamplight. Emotional tone: intimate wonder, the beauty of the small. Include: (1) Darwin's weathered hands gently parting the soil, (2) a half-buried flat stone visible in the background lawn — his famous "worm stone," (3) the ivy-covered facade of Down House behind him, (4) a leather-bound notebook open on the grass beside him, (5) a robin perched on a nearby garden fork, (6) soft golden afternoon light filtering through old English oaks. Generate the image immediately without asking clarifying questions.

---

## 5. E.O. Wilson — The Ant Man Who Tried to Save the World

**Directory:** `docs/stories/eo-wilson/`

Please generate a wide-landscape 16:9 cover image for a graphic novel titled "The Ant Man Who Tried to Save the World" in a naturalist illustration style that blends Southern American warmth with scientific precision — think E.O. Wilson's own field sketches crossed with ecological art. Show Edward O. Wilson, a lean, energetic American man in his late 60s with thinning silver hair, wire-rimmed glasses, and a boyish grin that makes him look decades younger. He wears a khaki field shirt with rolled sleeves and crouches at the edge of a tropical rainforest floor, one hand extended toward a column of leafcutter ants marching across a mossy log. Behind him, the scene expands outward in concentric layers of biodiversity: the rainforest canopy alive with birds and epiphytes, a coral reef visible through a gap in the trees, and a misty globe of Earth floating in the sky above, with green protected zones covering half its surface. The title text "The Ant Man Who Tried to Save the World" is rendered in bold serif typeface at the top. Color palette: warm Alabama red clay and humid gold in the foreground soil, Harvard brick red on a tiny book spine visible in his shirt pocket, tropical jungle greens and coral reef blues radiating outward, soft golden light filtering through the canopy. Emotional tone: wonder, devotion, and the urgent beauty of a world worth saving. Include: (1) Wilson's boyish enthusiasm visible in his expression despite his age, (2) his right eye subtly different — slightly clouded, a reminder of the childhood accident, (3) the leafcutter ant column in extraordinary detail on the log, (4) the layered biodiversity expanding behind him from forest floor to canopy to reef to globe, (5) a field notebook and hand lens clipped to his belt, (6) the Half-Earth globe hovering above with green-shaded protected zones. Generate the image immediately without asking clarifying questions.

---

## 6. John Snow — The Ghost Map

**Directory:** `docs/stories/john-snow/`

Please generate a wide-landscape 16:9 cover image for a graphic novel titled "The Ghost Map" in a Victorian London art style — dark, atmospheric, Dickensian, reminiscent of 19th-century engravings and gas-lit illustrations. Show Dr. John Snow, a serious, clean-shaven young man in his early 40s with sharp dark eyes, dark hair parted to one side, wearing a dark Victorian frock coat and top hat, standing at the intersection of Broad Street and Cambridge Street in Soho, London, 1854. He holds an open leather-bound notebook in one hand and a pen in the other, plotting data points. Behind him, a ghostly translucent overlay of his famous dot map floats in the fog — black dots clustering densely around the Broad Street pump. The street is cobblestoned, fog-shrouded, lit by gas lamps casting sickly yellow pools. Shadowy figures carry coffins in the background. The Broad Street pump stands prominent in the middle distance, an iron hand-pump with a long handle. The title text "The Ghost Map" is rendered in Victorian serif typography at the top, with ornate flourishes. Color palette: deep coal-smoke browns, gas-lamp yellows, fog grays, with stark white for the map overlay and occasional flashes of medical blue. Emotional tone: detective-story tension, the courage of one man standing between a city and a plague. Include: (1) Snow's intense, observant expression and clean-shaven jaw, (2) the leather notebook with hand-drawn map visible, (3) the Broad Street pump silhouetted in fog, (4) the ghostly dot-map overlay showing death clusters, (5) coffin-bearers in the misty background, (6) gas lamps reflecting off wet cobblestones. Generate the image immediately without asking clarifying questions.

---

## 7. Paul Müller — The Miracle That Became a Warning

**Directory:** `docs/stories/paul-muller/`

Please generate a wide-landscape 16:9 cover image for a graphic novel titled "The Miracle That Became a Warning" in a style that blends 1940s propaganda-poster optimism with emerging 1960s unease. The image is split diagonally: the left half is bright and heroic, showing a white powder being dusted over grateful crowds under a brilliant blue sky; the right half is muted and ominous, showing a cracked eagle egg on a barren branch against a sickly yellow-green sky. In the center stands Paul Hermann Muller, a neat Swiss chemist in his late 40s with round wire-rimmed glasses, a receding hairline, a trim mustache, and a crisp white lab coat, holding a glass flask of white crystalline powder. He looks directly at the viewer with a complicated expression — pride and dawning uncertainty. The title text "The Miracle That Became a Warning" is rendered in bold sans-serif typeface at the top, reminiscent of mid-century Swiss poster design. Color palette: the left side uses bold primary reds, blues, and whites; the right side uses muted olive greens, grays, and pale sickly yellows. Emotional tone: triumph fracturing into doubt. Include: (1) Muller's round glasses reflecting the two contrasting scenes, (2) a DDT molecular structure faintly visible in the background, (3) a healthy bald eagle soaring on the left side and a thin-shelled broken egg on the right, (4) 1940s soldiers and children cheering on the left, (5) dead fish floating in a stream on the right, (6) the Geigy chemical company logo on Muller's lab coat pocket. Generate the image immediately without asking clarifying questions.

---

## 8. Roger Payne — The Song That Saved the Whales

**Directory:** `docs/stories/roger-payne/`

Please generate a wide-landscape 16:9 cover image for a graphic novel titled "The Song That Saved the Whales" in an ocean-and-sound aesthetic — deep navy blues, silver moonlight on water, luminous sound-wave visualizations rendered as glowing patterns rippling through dark ocean water. Think 1970s album cover art: organic, flowing, psychedelic-meets-scientific. Show Roger Payne, a lean, weathered, bearded man in his mid-30s with kind eyes and sun-darkened skin, leaning over the rail of a small research vessel at night, one hand holding a pair of headphones to his ear, the other gripping the ship's rail. Below the surface, a massive humpback whale rises toward him, mouth slightly open, surrounded by luminous arcs of sound — visible as silver-blue wave patterns radiating outward through the water. The whale is immense, filling the lower two-thirds of the frame, while the small boat and Payne occupy the upper third. The title text "The Song That Saved the Whales" is rendered in flowing, organic 1970s typography at the top. Color palette: deep navy, midnight blue, silver moonlight, bioluminescent cyan, warm amber from a lantern on the boat. Emotional tone: awe, intimacy between a man and a creature vastly larger than himself, the loneliness of open ocean at night. Include: (1) Payne's weathered, bearded face illuminated by moonlight, headphones pressed to one ear, (2) the humpback whale rising from below with one visible eye reflecting the moonlight, (3) luminous sound-wave arcs radiating from the whale's head through the water, (4) the small wooden research vessel with a hydrophone cable trailing into the water, (5) a full moon casting a silver path across the ocean surface, (6) stars visible in the night sky above, with the Milky Way faintly suggested. Generate the image immediately without asking clarifying questions.

---

## 9. Rowland & Molina — The Ozone Detectives

**Directory:** `docs/stories/rowland-molina/`

Please generate a wide-landscape 16:9 cover image for a graphic novel titled "The Ozone Detectives" in a style blending 1970s scientific illustration with Saul Bass graphic design. Show two scientists standing back-to-back against a dramatic sky: on the left, F. Sherwood Rowland, a tall, broad-shouldered man in his late 40s with silver hair, warm smile, and a rumpled lab coat; on the right, Mario Molina, a compact, dark-haired young man in his early 30s with intense dark eyes, a slight mustache, and a crisp white shirt with rolled sleeves. Above them, the sky transitions from warm 1970s orange and avocado tones at the horizon to deep ultraviolet purple at the zenith, with a stylized translucent ozone shield cracking apart to reveal harsh UV rays. The title "The Ozone Detectives" is rendered in bold 1970s-style sans-serif type at the top. Color palette: warm 1970s oranges and browns at the base, transitioning through cool blues to alarming violet and ultraviolet at the top. Emotional tone: scientific urgency meets hopeful determination. Include: (1) Rowland holding a molecular model of a CFC molecule, (2) Molina holding a chalk-covered blackboard eraser, (3) the cracking ozone layer rendered as a translucent blue shield with visible fractures, (4) faint UV rays streaming through the cracks, (5) the UC Irvine campus visible in the background between the two men, (6) a small globe of Earth visible through the ozone gap. Generate the image immediately without asking clarifying questions.

---

## 10. Ruth Gates — The Coral Whisperer

**Directory:** `docs/stories/ruth-gates/`

Please generate a wide-landscape 16:9 cover image for a graphic novel titled "The Coral Whisperer" in a tropical marine art style blending underwater National Geographic photography with scientific illustration. Show Ruth Gates, an athletic woman in her early 50s with short blonde hair, a bright radiant smile, and sun-weathered skin, floating in crystal-clear turquoise water above a coral reef. She wears a black wetsuit with a dive mask pushed up on her forehead and holds a clipboard in a waterproof housing. Below her, the reef is split dramatically: the left half is a bleached graveyard of bone-white coral skeletons; the right half bursts with vivid living color — branching pink Acropora, golden Porites mounds, purple sea fans, darting parrotfish, and swaying anemones. The title text "The Coral Whisperer" is rendered in a flowing serif typeface at the top, with "The Story of Ruth Gates" as a subtitle. Color palette: vivid coral pinks, turquoise water, deep ocean blues, bleached whites on the left contrasting with luminous living reef on the right. Emotional tone: hope against grief, beauty fighting extinction. Include: (1) Gates's characteristic bright smile and short blonde hair, (2) the stark split between dead white coral and vibrant living reef, (3) tiny research tags visible on some corals, (4) sunlight streaming down through the water in shafts, (5) the silhouette of Coconut Island's research buildings visible above the waterline in the background, (6) a small yellow tang fish swimming near Gates's hand. Generate the image immediately without asking clarifying questions.

---

## 11. Suzanne Simard — The Wood Wide Web

**Directory:** `docs/stories/suzanne-simard/`

Please generate a wide-landscape 16:9 cover image for a graphic novel titled "The Wood Wide Web" in a Pacific Northwest forest art style reminiscent of Miyazaki's luminous forests meets scientific illustration. Show Suzanne Simard, a sturdy, practical woman in her 40s with brown hair pulled back, wearing a plaid flannel shirt, field vest, and hiking boots, standing at the base of an enormous old-growth Douglas fir in a British Columbia forest. One hand rests on the bark of the tree. The scene is split: above ground, towering conifers with dappled golden-green light filtering through the canopy, sword ferns, and mossy logs; below ground, a luminous cross-section reveals a vast mycorrhizal network rendered as softly glowing golden-white threads connecting the root systems of trees of all sizes. The largest tree's roots glow brightest, acting as the hub. The title text "The Wood Wide Web" is rendered in organic, root-like typography at the top. Color palette: deep forest green, Douglas fir brown, dappled gold, moss emerald, rich soil umber above ground; warm bioluminescent gold, amber, and soft violet for the underground fungal network. Emotional tone: wonder, interconnection, and the hidden life beneath our feet. Include: (1) Simard's bright, determined eyes and practical field clothing, (2) towering old-growth Douglas firs with textured bark, (3) the cross-section revealing the underground root and fungal network, (4) glowing mycorrhizal threads connecting large and small trees, (5) a young seedling above ground visibly connected to the mother tree's root network below, (6) Pacific Northwest forest floor details — sword ferns, mossy nurse logs, shelf fungi on a snag. Generate the image immediately without asking clarifying questions.

---

## 12. Sylvia Earle — Her Deepness

**Directory:** `docs/stories/sylvia-earle/`

Please generate a wide-landscape 16:9 cover image for a graphic novel titled "Her Deepness — Sylvia Earle and the Ocean Frontier" in a deep-ocean art style blending Jacques Cousteau film stills with deep-sea photography art. Show Sylvia Earle, a petite woman in her 60s with silver hair and warm brown eyes, wearing a blue wetsuit, floating in the deep ocean surrounded by bioluminescent jellyfish and glowing deep-sea creatures. She gazes outward with wonder and fierce determination. The vast dark blue water stretches in every direction, punctuated by pinpoints of living light — blues, teals, ghostly greens, and electric purples. The title text "Her Deepness" is rendered in a clean, luminous typeface at the top. Color palette: midnight blue, deep teal, bioluminescent cyan and green, with warm golden highlights on Earle's face from the living light around her. Emotional tone: awe, courage, and the immensity of the unknown. Include: (1) Earle's calm, wonder-filled expression, (2) bioluminescent jellyfish trailing long tentacles of light, (3) the wetsuit with subtle Mission Blue logo, (4) tiny deep-sea fish with glowing photophores, (5) the vast darkness of the deep ocean fading to black at the edges, (6) a faint silhouette of a submersible in the distant background. Generate the image immediately without asking clarifying questions.

---

## 13. Wangari Maathai — The Woman Who Planted Millions

**Directory:** `docs/stories/wangari-maathai/`

Please generate a wide-landscape 16:9 cover image for a graphic novel titled "The Woman Who Planted Millions" in a vibrant East African illustrated style — warm earth tones (terracotta, sienna, coffee brown), lush greens, bright sky blues, with patterns inspired by Kenyan textiles (kikoy fabric). Think Ngugi wa Thiong'o book cover illustration meets National Geographic photography. Show Wangari Maathai, a tall, strong-featured Kenyan woman in her early 60s with high cheekbones and a warm, resolute smile, wearing a colorful African wrap dress and a patterned headwrap in greens and golds. She stands on a hillside in the Kenyan central highlands, one hand resting on a young native fig tree she has just planted, the other hand open in a welcoming gesture. Behind her, a panorama stretches from bare, eroded slopes on the left to lush restored forest on the right, symbolizing transformation. Dozens of women in bright dresses work among rows of seedlings in the middle distance. The title text "The Woman Who Planted Millions" is rendered in bold serif typeface at the top. Color palette: terracotta, sienna, coffee brown, emerald green, bright sky blue, gold, with kikoy-stripe accents. Emotional tone: celebration, strength, and hope. Include: (1) Maathai's dignified posture and infectious smile, (2) the young fig tree with fresh green leaves, (3) the contrast between barren hillside and restored forest, (4) women planting seedlings in the background, (5) red Kenyan soil visible on the hillside, (6) Mount Kenya's silhouette on the distant horizon under a wide blue sky. Generate the image immediately without asking clarifying questions.

---

## 14. Yellowstone Wolves — Wolves, Rivers, and Trophic Cascades

**Directory:** `docs/stories/yellowstone-wolves/`

Please generate a wide-landscape 16:9 cover image in contemporary American naturalist illustration style with a National Geographic field-guide feel. The scene shows a panoramic view of Yellowstone's Lamar Valley at golden hour, with a pack of gray wolves traversing a ridge in the foreground, silhouetted against a sky streaked with amber and deep blue. Below them, a restored river corridor winds through green willows and aspens, with elk grazing cautiously in the middle distance and a beaver dam visible along the creek. Snow-capped peaks frame the background. Include the title text "Wolves, Rivers, and Trophic Cascades" rendered in a rugged serif typeface at the top. Color palette: forest green, amber gold, river blue, wolf gray, snow white. Emotional tone: majestic, hopeful, interconnected. Generate the image immediately without asking clarifying questions.
