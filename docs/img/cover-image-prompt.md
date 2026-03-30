# Ecology Textbook Cover Image — AI Generation Prompt

## Specifications

- **Aspect ratio:** 1.91:1 (1910x1000 pixels)
- **Format:** PNG
- **Title text:** centered "Ecology" in a bright text over a darker background 
- **Mascot:** Bailey the Beaver welcome pose occupies the left ~1/5 of the image

## Prompt

```
Please generate an image.
A wide landscape book cover image (1.91:1 aspect ratio, 1910x1000 pixels) for
"Ecology", an interactive high school ecology textbook.

LEFT SIDE (approximately left 1/5 of the image): Bailey the Beaver, a friendly
cartoon mascot — a round-bodied beaver with warm brown fur, lighter tan underbelly,
broad flat tail, bright curious dark eyes, friendly buck-toothed smile, wearing a
small green hard hat. Bailey is in a welcoming pose with one arm raised in a wave
and the other arm extended outward in a welcoming gesture. Bailey's hands/paws are
completely free — no tools or props. Style: modern flat vector, bold outlines, warm
earthy colors. Bailey should be clearly visible and standing on the ground level of
the scene.

CENTER AND RIGHT (approximately 4/5 of the image): A rich montage of ecology and
nature elements forming a vibrant, interconnected scene:
- A lush forest with deciduous and coniferous trees in greens and autumn colors
- A flowing river or stream with clear blue water winding through the landscape
- Mountains or rolling hills in the background with a sunrise/sunset sky
- A coral reef section visible in a water cutaway showing marine biodiversity
- Wildlife silhouettes: a deer, hawk soaring, fish in the stream, a bee near flowers
- A food web visualization with glowing connected nodes and arrows (subtle, ethereal)
- Biogeochemical cycle arrows (carbon, water, nitrogen) shown as subtle glowing loops
- A beaver dam in the river (connecting to the mascot's species)
- Wildflowers and grasses in the foreground
- A wind turbine and solar panel subtly placed on a distant hillside (sustainability theme)
- Atmospheric layers suggested by color gradients in the sky
- A city skyline faintly visible on the far horizon (human-nature connection)

STYLE: Modern, vibrant, educational illustration. Not photorealistic — stylized
and colorful like a high-quality textbook illustration. The ecology elements should
feel interconnected and alive, emphasizing the "everything is connected" systems
thinking theme. Use a rich color palette: forest greens (#2e7d32, #4caf50),
sky blues (#0277bd, #42a5f5), warm earth browns (#795548), sunset oranges and
golds (#ff9800, #ffc107), and water teals (#00897b).

COMPOSITION: The left 1/5 is reserved for Bailey the Beaver mascot, standing at
ground level. The center and right 4/5 contains the ecology montage. A subtle
semi-transparent dark gradient band runs horizontally across the center of the
image (approximately 30% opacity) to provide contrast for white title that
is placed directly in the center of the book cover. The montage elements should be slightly dimmer/softer behind this center band for readability of the title.

Generate the image now.
```

## After Generation

1. Save to `docs/img/cover.png`
2. If not 1910x1000, resize: `python3 -c "from PIL import Image; img=Image.open('docs/img/cover.png').resize((1910,1000)); img.save('docs/img/cover.png')"`
3. The home page (docs/index.md) will display the cover with a CSS title overlay
