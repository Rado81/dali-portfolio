@AGENTS.md

# Dali Sandic Portfolio Website

Next.js project for cinematographer Dali Sandic (sandicfilm.com). Dark cinematic theme with gold accents.

## Key Decisions

### Animation Pattern for Filtered Grids
When using `AnimatePresence` with filtered/toggled lists of items, **always wrap the entire grid in a single `motion.div` keyed by the filter value**, not individual items:

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={filter}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    className="grid ..."
  >
    {filtered.map((item, i) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: i * 0.05 }}
      >
        ...
      </motion.div>
    ))}
  </motion.div>
</AnimatePresence>
```

**DO NOT** use `AnimatePresence` with `mode="popLayout"`, `mode="sync"`, or `mode="wait"` wrapping multiple children directly. This causes warnings and janky animations.

### Page Hero Sections
Use `pt-32 pb-16` padding for page hero/title sections. Do NOT use fixed viewport heights like `h-[40vh]` or `h-[50vh]` — they waste space and push content below the fold.

### Footer
Footer must always stay at bottom. Layout uses `min-h-screen flex flex-col` on body and `flex-1` on main (see `layout.tsx`). Keep footer padding compact (`py-6 md:py-8`).

### Images
- Use `loading="eager"` for above-the-fold images
- Always add `sizes` prop when using `fill` on Next.js `Image`
- Profile picture: `/images/dali-profile.jpg` (sourced from YouTube channel)

### Social Links
- YouTube: https://www.youtube.com/@daliborsandic4938
- LinkedIn: https://www.linkedin.com/in/dalibor-sandic-955204139/
- Instagram: https://instagram.com/dalisandic
- No Vimeo — all video is on YouTube
