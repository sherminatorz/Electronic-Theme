
# 📱 THEME SPECIFICATION: "ELECTRONIC" for SokoKart

---

### 1️⃣ THEME OVERVIEW
- **Theme Name:** Electronic
- **Design Inspiration:** High-end global tech retailers (Apple, Samsung) blended with the high-velocity, deal-driven UX of major African marketplaces (Jumia, Takealot).
- **Visual Tone:** **Tech / Modern / Bold**. The interface uses sharp corners, high-contrast text, and generous whitespace to evoke a sense of precision and premium quality.

---

### 2️⃣ COLOR SYSTEM
| Role | Hex/Value | Reason for Choice |
| :--- | :--- | :--- |
| **Primary** | #0047FF (Electric Blue) | Blue represents reliability and connectivity—critical for high-ticket electronic items. |
| **Secondary** | #0F172A (Deep Slate) | Provides a premium, "pro" tech feel for headers and navigation. |
| **Accent** | #FF6B00 (Vibrant Orange) | High-visibility for "Sale" and "Buy Now" triggers; feels energetic and urgent. |
| **Success** | #10B981 | Standard tech-safe green for "In Stock" and "Payment Confirmed." |
| **Error** | #EF4444 | Clear indication for "Out of Stock" or entry errors. |
| **Background (Light)** | #F8FAFC | Soft off-white to reduce eye strain on mobile screens. |
| **Divider** | #E2E8F0 | Subtle separator that keeps the UI clean without adding visual noise. |

---

### 3️⃣ TYPOGRAPHY
- **Font Family:** **'Plus Jakarta Sans'** (Google Fonts). It is a geometric sans-serif that looks modern and remains highly legible at small sizes.
- **Heading Weights:** 
    - H1/H2: 700 (Bold) - for impact.
    - H3/H4: 600 (Semi-bold) - for product names.
- **Body Text Size:** 16px base (Desktop), 14px base (Mobile) to ensure no squinting on smaller African smartphone screens.
- **Button Text Style:** Uppercase + 600 Weight + 0.5px letter spacing (emphasizes action).

---

### 4️⃣ LAYOUT SYSTEM
- **Page Width:** Full-width container with a max-width of **1280px** for desktop to accommodate large product grids.
- **Grid System:**
    - **Mobile:** 2 columns for product lists (maximize inventory visibility); 1 column for banners.
    - **Tablet:** 3 columns.
    - **Desktop:** 4-5 columns depending on sidebar presence.
- **Spacing Rules:** Multiples of 4px (4, 8, 16, 24, 32, 64). 
- **Section Rhythm:** Large 64px vertical padding between homepage sections to prevent "clutter fatigue."

---

### 5️⃣ CORE COMPONENTS

#### Header / Navbar
- **Purpose:** Brand identity and primary navigation.
- **Layout:** Sticky on scroll. On mobile: Logo (Left), Search Trigger (Center-Right), Cart (Far Right).
- **UX Rule:** Search must be accessible in one tap via a prominent magnifying glass or a ghost-input field.

#### Category Menu
- **Purpose:** Quick access to Departments (Phones, Laptops, etc.).
- **Layout:** Horizontal scrollable pill-shaped buttons on mobile.
- **UX Rule:** Active category must be visually highlighted with the Primary Blue background.

#### Hero Section
- **Purpose:** High-impact promotions.
- **Layout:** Single-card slider with high-res imagery.
- **UX Rule:** Text must be overlaid on a semi-transparent dark gradient if the image is busy to ensure readability.

#### Product Card
- **Purpose:** The fundamental unit of the store.
- **Layout:** Image top, Info bottom. 
- **UX Rule:** On mobile, the "Add to Cart" icon should be a floating action button on the bottom-right of the card.

#### Product Details Page (PDP)
- **Purpose:** Final decision-making area.
- **Layout:** Image gallery (Top/Center), Pricing/Specs (Middle), Sticky Footer (Bottom).
- **UX Rule:** Specification table must use alternating row colors for easier reading of technical data.

#### Price Display
- **Purpose:** Clarity on savings.
- **Layout (Mobile):** 
    - Base Price (e.g., $500) rendered in Grey, Strikethrough, Small.
    - **Promo Price (e.g., $450) rendered BELOW the Base Price in Accent Orange, Bold, Large.**
- **Key Rule:** Never place promo and base prices side-by-side on mobile to avoid line-wrapping issues.

#### Add to Cart Button
- **Purpose:** Conversion.
- **Layout:** High-contrast button. 
- **UX Rule:** Must feature a "loading" state (spinner) after tapping to prevent double-clicks on slow 3G/4G connections.

#### Cart Drawer
- **Purpose:** Non-disruptive shopping check.
- **Layout:** Slides in from the right.
- **UX Rule:** Must show a "Progress Bar" for free shipping or minimum order value.

---

### 6️⃣ PRODUCT CARD — DETAILED SPEC
- **Image Ratio:** 1:1 (Square). Ensures consistency across different brand assets.
- **Title:** Max 2 lines. Use `ellipsis` truncation after the second line.
- **Price Position:** Bottom-left of the info area.
- **Promo Price Position:** Directly below the original price.
- **Badge Rules:** 
    - *Top-Left:* "New" (Blue) or "-20%" (Orange).
    - *Bottom-Left:* "Free Delivery" (Subtle Green text).
- **CTA Placement:** Small "+" icon button in the bottom-right corner.
- **Hover/Tap:** Card lifts slightly (2px shadow) on hover/tap.

---

### 7️⃣ MOBILE UX RULES
1. **The 44px Rule:** Every interactive element must be at least 44x44px for easy thumb tapping.
2. **Sticky Call-to-Action:** The "Add to Cart" button on the product page must remain stuck to the bottom of the screen.
3. **Optimized Images:** Lazy-load all images below the fold to save user data.
4. **Thumb Zone Design:** Primary navigation (Cart/Menu) must be reachable with the thumb when holding the phone one-handed.
5. **Progressive Disclosure:** Hide secondary technical specs behind a "Show More" accordion to keep pages short.
6. **Input Optimization:** Trigger the numeric keypad automatically for quantity selectors.
7. **No Hover Dependency:** All information hidden behind hovers (e.g., quick view) must be accessible via direct tap.
8. **Instant Feedback:** Haptic-style visual feedback (color change) when a button is pressed.

---

### 8️⃣ EMPTY STATES & TRUST SIGNALS
- **Empty Cart:** Show an icon of an empty shopping bag + a "Start Shopping" button that leads to Top Categories.
- **No Products Found:** Provide a "Need Help?" link to WhatsApp or Live Chat.
- **Low Stock:** Display "Only [X] left!" in red text near the price to create urgency.
- **Payment Reassurance:** A persistent footer row showing official logos for:
    - **Wave / Orange Money / MTN MoMo** (Crucial for the African market).
    - **Visa / Mastercard.**
    - **SSL Secure Connection Badge.**

---

### 9️⃣ DO & DON’T LIST

✅ **DO:**
- Use high-contrast text for pricing.
- Keep the search bar visible as much as possible.
- Use clear "In Stock" indicators to build trust.
- Group technical specs into logical categories (Battery, Camera, Storage).

❌ **DON’T:**
- Use multi-level dropdown menus on mobile (use drill-down lists instead).
- Hide the price until the user adds to cart.
- Allow product titles to overflow or push content down (truncate them).
- Use generic icons; use tech-centric iconography (e.g., a thunderbolt for fast charging).
