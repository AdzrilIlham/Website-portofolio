import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const sectionScrollPositions = new Map<string, number>();

export function getSectionScrollPosition(id: string): number | undefined {
  return sectionScrollPositions.get(id);
}

export function scrollToSection(id: string, onComplete?: () => void) {
  const targetPos = getSectionScrollPosition(id);

  if (targetPos === undefined) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    if (onComplete) onComplete();
    return;
  }

  const currentScroll = window.scrollY;
  const distance = Math.abs(targetPos - currentScroll);

  // Smooth, dynamic duration:
  // Short hop (Skills -> Projects, ~1100px): ~0.75s
  // Long glide (About -> Contact, ~5000px): ~1.15s
  const duration = Math.min(1.2, Math.max(0.65, 0.55 + (distance / 5000) * 0.65));

  gsap.to(window, {
    scrollTo: { y: targetPos, autoKill: false },
    duration,
    ease: 'power2.inOut',
    overwrite: 'auto',
    onComplete: () => {
      ScrollTrigger.update();
      if (onComplete) onComplete();
    },
  });
}
