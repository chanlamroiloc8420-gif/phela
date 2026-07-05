# Phê La Coffee

## Overview

**Product:** Phê La Coffee
**URL:** https://phela.vn/
**Surface type:** marketing
**Audience:** Business decision-makers and potential customers
**Brand character:** Conversion-focused marketing presence with a rich, diverse color palette and a complementary two-font typographic system.

> \*\*Note:\*\* Surface detection confidence is low. Verify the inferred audience and brand context before relying on this file.

### Design Principles

* Consistency over novelty — reuse existing patterns before inventing new ones.
* Token-driven — every visual decision references a token, not a magic number.
* Accessible by default — compliance is a baseline, not a feature.

## Colors

|Token|Value|Role|
|-|-|-|
|color-1|`#222222`|Text Primary|
|color-2|`#444444`|Text Primary|
|color-4|`#B7793A`|Accent|
|color-3|`#A17C59`|Border|
|color-5|`#BF9369`|Background Dark|
|color-6|`#FFFFFF`|Text Light|

## Typography

**Font stack:** Fira Sans, sans-serif

|Level|Size|Usage|
|-|-|-|
|text-xs|15px|Captions, metadata|
|text-sm|19px|Labels, secondary text|
|text-base|27px|Body text (default)|
|text-lg|29px|Subheadings, emphasis|
|text-xl|48px|Section headings|

**Weight scale:** 400 · 700
**Line heights:** 38.6667px · 40.5px · 24px · 18px · 28px · 22.5px · 15px

## Spacing

**Base unit:** 4px

`space-1: 5px` · `space-2: 6px` · `space-3: 10px` · `space-4: 12px` · `space-5: 13px` · `space-6: 15px` · `space-7: 23px` · `space-8: 25px` · `space-9: 30px` · `space-10: 40px` · `space-11: 43px` · `space-12: 45px` · `space-13: 70px` · `space-14: 84px` · `space-15: 486px` · `space-16: 532px`

## Shapes

**Border radius:** `radius-sm: 2px` · `radius-md: 5px`

## Elevation

* **shadow-sm:** `rgb(128, 128, 128) 0px 0px 5px 0px`

## Motion

* **duration-fast:** `all`
* **duration-fast:** `none`
* **duration-base:** `0.2s ease-in-out`
* **duration-base:** `box-shadow 0.2s`
* **duration-base:** `background-color 0.3s linear`
* **duration-base:** `color 0.3s ease-in, background-color 0.3s linear, border-color 0.3s linear`
* **duration-base:** `right 0.3s`
* **duration-slow:** `0.7s vce-o-animate--slideInUp`
* **duration-slow:** `0.7s vce-o-animate--slideInRight`
* **duration-slow:** `0.7s vce-o-animate--slideInDown`

## Components

* **Buttons:** 11 detected
* **Links:** 93 detected
* **Inputs:** 1 detected
* **Navigation:** 1 elements
* **Lists:** 17 detected
* **Images:** 36 detected

## Do's and Don'ts

### Do

* Reference tokens by name, not raw values — agents and developers should use `color.text.primary`, not `#171717`.
* Define all interactive states: default, hover, focus-visible, active, disabled.
* Use the spacing scale for all padding, margin, and gap values.
* Write content in sentence case. Reserve ALL CAPS for acronyms only.
* Test every component at the smallest and largest breakpoint before shipping.

### Don't

* Do not introduce colors outside the extracted palette.
* Do not use arbitrary spacing values — stick to the scale.
* Do not mix border-radius values. Pin to the detected set (2px, 5px).
* Do not use full-uppercase text for body or paragraph content.
* Do not nest interactive elements (e.g. buttons inside links).
* Do not ship components without defining hover, focus-visible, and disabled states.

## Writing Tone

Concise, confident, implementation-focused. Avoid filler preambles.

## Authoring Workflow

When creating or updating a component guideline for this system, follow this sequence:

1. **State the intent** — one sentence on what the component does and why it exists.
2. **Map tokens** — list every color, spacing, typography, and radius token the component uses. No raw values.
3. **Define anatomy** — break the component into named parts (container, label, icon, etc.) with their token assignments.
4. **Specify states** — document every state: default, hover, focus-visible, active, disabled, loading, error, empty.
5. **Describe interactions** — keyboard, pointer, and touch behavior, including edge cases (long content, overflow, truncation).
6. **Add accessibility criteria** — write testable pass/fail checks (e.g. "focus ring must be visible at 3:1 contrast").
7. **List anti-patterns** — concrete examples of misuse with a brief explanation of why each is wrong.
8. **Close with a QA checklist** — a mechanical list of verifiable items (see Definition of Done below).

## Required Output Structure

Every component guideline produced from this system must contain these sections, in order:

1. Overview — purpose, when to use, when not to use.
2. Tokens and foundations — all referenced tokens from the tables above.
3. Anatomy and variants — named parts, variant matrix, responsive behavior.
4. States and interactions — full state table, keyboard/pointer/touch behavior.
5. Accessibility — ARIA attributes, contrast requirements, focus management, screen reader behavior.
6. Content guidelines — copy length, tone, capitalisation, placeholder text rules.
7. Anti-patterns — explicit examples of what not to build, with reasoning.

## Component Requirements

Every component built against this system must:

* Reference only tokens defined in the tables above — no hardcoded hex, px, or font values.
* Define all interactive states: default, hover, focus-visible, active, disabled, loading, error.
* Specify responsive behavior at the smallest and largest supported breakpoint.
* Handle edge cases: empty state, overflow / truncation, maximum content length.
* Include keyboard navigation (Tab, Enter, Escape, Arrow keys where applicable).
* Document ARIA roles, labels, and live-region behavior where relevant.
* Include known page component density: - **Buttons:** 11 detected
* **Links:** 93 detected
* **Inputs:** 1 detected
* **Navigation:** 1 elements
* **Lists:** 17 detected
* **Images:** 36 detected

## Definition of Done

A component is not complete until every item below is checked:

* Renders correctly in its default state (smoke test).
* All states documented and visually verified (hover, focus, disabled, loading, error, empty).
* All visual values use design tokens — zero hardcoded values.
* Keyboard navigation works without a pointer.
* No critical accessibility violations (contrast, ARIA, focus order).
* Tested at smallest and largest breakpoint.
* Anti-patterns section lists at least one concrete misuse example.
* Documentation covers purpose, usage, props/API, and limitations.

