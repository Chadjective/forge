# Forge — Roadmap

## Status Snapshot (2026-03-22)

### Completed

**Phase 1: Core App**
- [x] Single-file fitness tracker (index.html) with dark moody UI
- [x] 5 sections: Today, Lift, Activities, Stretch, History
- [x] localStorage persistence
- [x] Bottom nav (mobile) / top nav (desktop)
- [x] Today: timeline view with time-ordered activities, colored pill summary with details
- [x] Lift: Workout A/B auto-alternation, 5x5 set tracking, rest timer with audio dings (1:30 single, 3:00 double)
- [x] Activities: Swimming, Cycling, Walking, Yoga, Sauna — each with duration/distance/effort/notes, last 5 entries shown
- [x] Stretch: 3 sub-sections (Back, Low Back, Neck) with guided timers, rep counters, side tracking
- [x] Pull-ups: quick-tap circles (3/4/5 reps) + custom set input
- [x] History: GitHub-style heatmap (6 months), streak counter, weekly minutes, top activity
- [x] Weights in lbs, weight history per exercise

**Phase 2: UX Improvements (RICE-prioritized)**
- [x] GitHub Pages deploy — live at chadjective.github.io/forge
- [x] PWA support — manifest.json + service worker, installable on tablet home screen
- [x] Export/Import JSON backup
- [x] Auto-advance stretch timers — left > right > next rep > next exercise, hands-free flow
- [x] Failed sets tracking — long-press to mark failed, affects weight bump suggestion
- [x] Undo/delete — remove timeline entries and individual pull-up sets
- [x] Weekly summary card — daily bar chart + 4-week comparison
- [x] Weight progression sparklines — inline SVG charts on each lift exercise
- [x] Heatmap filtering — clickable legend to filter by activity type
- [x] Toast confirmations on all actions
- [x] Activity logging returns to Today tab

---

## Upcoming

### Phase 3: Planning Mode & Smart Recovery
- [ ] Weekly planner view — drag/assign activities to days
- [ ] Recovery-aware suggestions (e.g., yoga/swim after heavy lift days)
- [ ] Rest day recommendations based on activity intensity
- [ ] Visual weekly calendar with color-coded activity slots

### Phase 4: Device Sync
- [ ] Manual sync via export/import (done)
- [ ] QR code sync — generate a QR on one device, scan on the other to transfer data
- [ ] Cloud sync option (GitHub Gist or similar free backend)
- [ ] Conflict resolution when merging data from two devices
- [ ] Last-synced timestamp display

### Phase 5: Insights & Progress
- [ ] Monthly progress report — auto-generated summary card
- [ ] Personal records tracking (heaviest lift, longest swim, etc.)
- [ ] Volume trends — total sets/reps per week over time
- [ ] Consistency score — how well you stuck to planned activities
- [ ] Body weight tracking (optional, with sparkline)

### Phase 6: Polish & UX
- [ ] Onboarding flow for first-time setup
- [ ] Dark/light theme toggle
- [ ] Haptic feedback on mobile (vibration API)
- [ ] Offline PWA improvements (cache all assets)
- [ ] Accessibility audit (screen reader, contrast)
- [ ] Custom activity types (add your own beyond the defaults)

### Phase 7: Social & Accountability
- [ ] Share workout summaries (generate shareable image/card)
- [ ] Workout templates — save and reuse custom routines
- [ ] Notes/journal per day — how you felt, energy level, sleep quality
