# Hero Copy — Paste-Ready Handoff

Use in **pages/Home.tsx** hero (lines 37–68). Replace only the four copy slots. Keep `to` props (`/contact`, `/#work`), `className`, and structure unchanged.

---

## 1. Industry-agnostic systems

### System 1 *(currently applied)*

| Slot | Copy |
|------|------|
| **BlurText** `text=` | `"Websites that get you more clients."` |
| **motion.p** | `I design and build websites for service businesses and small teams. Clear, easy to use, and a process that fits you.` |
| **Primary CTA** | `Get a Site Audit` |
| **Secondary CTA** | `View Work` |

---

### System 2

| Slot | Copy |
|------|------|
| **BlurText** `text=` | `"A website that fits how you actually work."` |
| **motion.p** | `I design and build sites for service businesses and small teams. Clarity and ease of use, without the agency runaround.` |
| **Primary CTA** | `Get a Site Audit` |
| **Secondary CTA** | `View Work` |

---

### System 3

| Slot | Copy |
|------|------|
| **BlurText** `text=` | `"Websites built for service businesses that win work."` |
| **motion.p** | `I design and build clear, easy-to-use sites for small teams. A straightforward process that fits you.` |
| **Primary CTA** | `Get a Site Audit` |
| **Secondary CTA** | `View Work` |

---

## 2. Tailored variants

### A) Architecture firms

#### Variant A1

| Slot | Copy |
|------|------|
| **BlurText** `text=` | `"Websites that win more projects for design firms."` |
| **motion.p** | `I design and build websites for architecture and design practices. Your portfolio and process, clear and easy to navigate—so potential clients choose you.` |
| **Primary CTA** | `Get a Site Audit` |
| **Secondary CTA** | `View Work` |

#### Variant A2

| Slot | Copy |
|------|------|
| **BlurText** `text=` | `"A website that matches how your practice works."` |
| **motion.p** | `I build sites for architecture firms and design studios. Clear structure, strong project presentation, and a process that respects your time.` |
| **Primary CTA** | `Get a Site Audit` |
| **Secondary CTA** | `View Work` |

---

### B) Schools / education

#### Variant B1

| Slot | Copy |
|------|------|
| **BlurText** `text=` | `"Websites that help schools and families connect."` |
| **motion.p** | `I design and build websites for schools and education organisations. Easy for parents to find what they need and for you to keep it up to date.` |
| **Primary CTA** | `Get a Site Audit` |
| **Secondary CTA** | `View Work` |

#### Variant B2

| Slot | Copy |
|------|------|
| **BlurText** `text=` | `"Clear, helpful websites for schools and trusts."` |
| **motion.p** | `I build sites for schools, academies, and education bodies. Simple to use, easy to update, and built so families and staff can find what matters.` |
| **Primary CTA** | `Get a Site Audit` |
| **Secondary CTA** | `View Work` |

---

## 3. Word bank

**Use instead of jargon**

| Instead of | Prefer |
|------------|--------|
| **UI** | website design, digital design, user-friendly website, easy-to-use site, clear layout, well-designed website |
| **UX** | easy to use, easy to find what they need, clear to navigate |
| **Usability** | easy to use, straightforward, simple to navigate |

**Prefer:** clarity / clear, easy to use, fits you / fits how you work, straightforward, process that fits you

**Avoid**

- **Jargon:** UI, UX, IA, wireframes, design systems (unless briefly explained)
- **Buzzwords:** synergy, leverage, disrupt, best-in-class, world-class, cutting-edge, scalable (vague), solutions (overused)
- **Unsupported claims:** award-winning, high-converting, #1, leading
- **Agency “we”:** use **I** (solo studio)

---

## 4. Paste reference (Home.tsx)

To switch the hero to another system, replace only these:

```tsx
// BlurText
text="[Headline from system]"

// motion.p
[Subheadline from system]

// Buttons (labels only)
[Primary CTA]
[Secondary CTA]
```

`to` props (`/contact`, `/#work`) stay the same for all systems.
