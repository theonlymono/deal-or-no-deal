# Game Theory Terminal: Deal or No Deal

**Author:** Htet Myet Zaw (University of Information Technology, Yangon)

## Abstract

This project transforms the television game show "Deal or No Deal" into a rigorous mathematical dashboard for analyzing decision-making under uncertainty. The system serves as an advanced analytical engine for 1-player games against nature, implementing multiple Game Theory models based on Philip D. Straffin's "Game Theory and Strategy". Through real-time processing of board states and Banker offers, the application provides quantitative insights into risk aversion, regret minimization, and theoretical outcome bounds, presenting complex mathematical analysis through a brutalist "Retro Financial Dashboard" interface reminiscent of Bloomberg Terminal aesthetics.

## Mathematical Framework & Game Theory

### ► A. Games Against Nature (Baseline Theoretical Bounds)

The system establishes fundamental decision boundaries through classical decision theory:

**Wald Method (Maximin)**
The pessimistic approach providing an absolute floor for decision-making:
$$\text{Wald} = \min(\text{remaining\_cases})$$

**Maximax Method**
The optimistic approach establishing theoretical ceiling:
$$\text{Maximax} = \max(\text{remaining\_cases})$$

**Laplace Method (Expected Value)**
The rational approach assuming equal probability distribution:
$$\text{EV} = \frac{\sum_{i=1}^{n} x_i}{n}$$

### ► B. Utility Theory & Risk Aversion

The system models human risk aversion through logarithmic utility functions, reflecting diminishing marginal utility of wealth:

**Expected Utility (EU)**
$$\text{EU} = \frac{\sum_{i=1}^{n} \ln(x_i + 1)}{n}$$

**Certainty Equivalent (CE)**
The guaranteed cash value equivalent to the risky board state:
$$\text{CE} = e^{\text{EU}} - 1$$

This transformation allows for direct comparison between probabilistic outcomes and certain cash amounts, accounting for psychological factors in decision-making.

### ► C. The Savage Minimax Regret Matrix

The system implements Leonard Savage's regret minimization framework to evaluate opportunity costs:

**Regret Calculation**
- $\text{Regret}_{\text{Deal}} = \max(0, \text{Maximax} - \text{Offer})$
- $\text{Regret}_{\text{No Deal}} = \max(0, \text{Offer} - \text{Wald})$

**Objective Function**
Select the action that minimizes maximum potential regret:
$$\min \{\max(\text{Regret}_{\text{Deal}}), \max(\text{Regret}_{\text{No Deal}})\}$$

This framework ensures decisions are made based on minimizing worst-case opportunity loss rather than maximizing expected value alone.

### ► D. Hurwicz Criterion of Optimism (Implied Alpha)

The system reverse-engineers the Banker's algorithmic offers to extract the implied coefficient of optimism (α):

**Implied Alpha Calculation**
$$\alpha = \frac{\text{Offer} - \text{Wald}}{\text{Maximax} - \text{Wald}}$$

**Decision Interpretation**
- α ∈ [0, 1] represents the Banker's assessment of optimal risk tolerance
- Players with personal α > implied α should reject offers
- Players with personal α < implied α should accept offers

This metric provides a personalized decision framework based on individual risk profiles.

## System Architecture & Technical Stack

### Frontend Framework
- **Next.js 16** (App Router): Modern React framework with server-side rendering capabilities
- **React 19**: Latest React version with enhanced concurrent features
- **TypeScript**: Static typing for mathematical precision and code reliability

### Styling & Design System
- **Tailwind CSS 4**: Utility-first CSS framework for rapid UI development
- **Design Philosophy**: "Bloomberg Terminal" aesthetic featuring:
  - Amber/Orange phosphor colors on dark paper backgrounds
  - Brutalist grid layouts with geometric precision
  - CRT scanline effects for retro computing authenticity
  - Financial dashboard typography and spacing

### State Management
- **React Hooks**: Pure React state management using `useState` and `useEffect`
- **No External Mutators**: Eliminates complexity and ensures predictable state transitions
- **Immutable Updates**: Functional approach to state modifications for mathematical accuracy

## Installation & Local Development

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Setup Instructions

```bash
# Clone the repository
git clone <repository-url>
cd deal-or-no-deal

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

## Future Research & Enhancements

### Dynamic Banker AI
- Implementation of adaptive Banker algorithms that adjust risk factors based on player decision history
- Machine learning models for personalized offer generation
- Real-time calibration of implied alpha based on observed player behavior

### Advanced Game Theory Models
- Integration of Prospect Theory for more accurate modeling of human decision biases
- Implementation of Bayesian updating for dynamic probability assessments
- Multi-criteria decision analysis incorporating temporal preferences

### Enhanced Analytics
- Monte Carlo simulation for outcome distribution visualization
- Real-time sensitivity analysis for parameter variations
- Historical performance tracking and pattern recognition

### Technical Enhancements
- WebSocket implementation for real-time multiplayer scenarios
- Advanced visualization using D3.js for mathematical function plotting
- Export capabilities for academic research and analysis

---

**Academic Context:** This implementation serves as both an educational tool for Game Theory concepts and a practical demonstration of mathematical modeling in web applications. The system bridges theoretical decision science with interactive user experience, making complex analytical frameworks accessible through intuitive interface design.

**Technical Note:** All mathematical calculations are performed with IEEE 754 double-precision floating-point arithmetic, ensuring numerical stability for financial computations. The logarithmic utility functions include domain protection to prevent mathematical errors in edge cases.
