---
name: Saffron Chill
colors:
  surface: '#f8f9ff'
  surface-dim: '#d1dbec'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dfe9fa'
  surface-container-highest: '#d9e3f4'
  on-surface: '#121c28'
  on-surface-variant: '#4f4633'
  inverse-surface: '#27313e'
  inverse-on-surface: '#eaf1ff'
  outline: '#817661'
  outline-variant: '#d2c5ac'
  surface-tint: '#775a00'
  primary: '#775a00'
  on-primary: '#ffffff'
  primary-container: '#ffc82e'
  on-primary-container: '#705400'
  inverse-primary: '#f5bf23'
  secondary: '#405aab'
  on-secondary: '#ffffff'
  secondary-container: '#8fa7fe'
  on-secondary-container: '#1c3989'
  tertiary: '#5d5f5f'
  on-tertiary: '#ffffff'
  tertiary-container: '#cfd0d0'
  on-tertiary-container: '#575959'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdf98'
  primary-fixed-dim: '#f5bf23'
  on-primary-fixed: '#251a00'
  on-primary-fixed-variant: '#5a4300'
  secondary-fixed: '#dce1ff'
  secondary-fixed-dim: '#b5c4ff'
  on-secondary-fixed: '#00164e'
  on-secondary-fixed-variant: '#254191'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f8f9ff'
  on-background: '#121c28'
  surface-variant: '#d9e3f4'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system is built to evoke the refreshing, high-energy, and premium nature of the saffron milk drink. The brand personality is **vibrant, youthful, and energetic**, moving away from traditional dairy aesthetics toward a more modern, lifestyle-oriented "cool." 

The design style is a blend of **Corporate Modern** efficiency and **Glassmorphism**. It utilizes crisp white space to signify purity and "coldness," while integrating smooth, fluid gradients and translucent layers to mimic the texture and splash of the product. The goal is to create a digital experience that feels as invigorating as a chilled drink on a hot day.

## Colors

The palette is anchored by **Saffron Yellow** (#FFC82E), a high-energy primary color that represents the core flavor and warmth of saffron. This is balanced by a deep **Ocean Blue** (#1D3A8A), derived from the iconic Amul branding, providing a premium, professional contrast that symbolizes coldness and reliability.

**Crisp White** (#FFFFFF) serves as the primary canvas, ensuring the interface remains airy and refreshing. Gradients should be used sparingly but effectively to create a sense of liquid movement, particularly in primary actions and decorative hero elements.

## Typography

This design system utilizes **Sora** for headlines to project a bold, geometric, and futuristic energy. Its wide stance and high x-height make it perfect for short, impactful messaging that feels "fresh."

For body text and functional labels, **Plus Jakarta Sans** is employed. Its soft, rounded terminals complement the "friendly" aspect of the brand while maintaining exceptional readability across digital interfaces. Use heavier weights for labels to ensure they stand out against the vibrant background colors.

## Layout & Spacing

The layout follows a **Fluid Grid** model to maintain energy and movement across devices. We utilize a 12-column system for desktop and a 4-column system for mobile. 

Whitespace is treated as a functional element—generous margins (64px on desktop) help focus the user's attention on the product and key calls to action. Spacing follows an 8px base unit to ensure a consistent rhythm, with larger "breathing room" (48px+) used between major content sections to keep the UI feeling "uncluttered" and premium.

## Elevation & Depth

To achieve the "cool" and "premium" aesthetic, this design system avoids heavy, dark shadows. Instead, it utilizes:

1.  **Tonal Layers:** Using slight variations of light gray (#F9FAFB) against white to define different surface tiers.
2.  **Glassmorphism:** For overlays and navigation bars, use a backdrop blur (20px) with a semi-transparent white fill (opacity 70-80%). This creates a "chilled glass" effect.
3.  **Soft Ambient Glows:** Instead of black shadows, use low-opacity Saffron or Blue glows (10-15% opacity) to lift primary buttons and cards, making them appear integrated into the vibrant environment rather than floating above it.

## Shapes

The shape language is defined by **Rounded** corners. This softens the bold typography and high-contrast colors, making the interface feel approachable and "smooth," like the milk drink itself.

- **Standard Elements (Buttons, Inputs):** 0.5rem (8px) radius.
- **Large Elements (Cards, Containers):** 1rem (16px) radius.
- **Special Elements (Chips, Search Bars):** Pill-shaped (fully rounded) to emphasize the "cool" and modern feel.

## Components

### Buttons
Primary buttons use the Saffron-to-Amber gradient with white text for maximum energy. Secondary buttons use an Ocean Blue outline with a subtle glass effect on hover. All buttons should have a 0.5rem corner radius and generous horizontal padding.

### Cards
Cards should be crisp white with a very thin (1px) neutral-200 border. Use a "Soft" elevation (5-10% blue-tinted shadow) to give them depth. On hover, cards can slightly lift and increase shadow intensity to signal interactivity.

### Input Fields
Inputs use a soft light-gray background (#F3F4F6) with no border until focused. On focus, they transition to a 2px Ocean Blue border with a soft blue outer glow.

### Chips & Badges
Used for flavor tags or categories. These should always be pill-shaped. Use Saffron background with Ocean Blue text for high-energy tags, and soft Blue backgrounds for functional tags.

### Progress Bars & Sliders
Reflect the "liquid" nature of the brand by using rounded caps and the Saffron primary color. Track backgrounds should be a very light semi-transparent blue.