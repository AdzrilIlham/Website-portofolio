'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const sectionScrollPositions = new Map<string, number>();

export function getSectionScrollPosition(id: string): number | undefined {
  return sectionScrollPositions.get(id);
}

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

export interface FlowSectionProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  'aria-label'?: string;
  id?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  className,
  style = {},
  children,
  'aria-label': ariaLabel,
  id,
}) => {
  const isFirstSection = id === 'about';

  return (
    <section
      id={id}
      data-flow-section
      aria-label={ariaLabel}
      className={cx(
        'relative min-h-screen w-full overflow-hidden',
        className
      )}
    >
      <div
        data-flow-inner
        className={cx(
          'flow-art-container relative flex min-h-screen w-full flex-col justify-between overflow-hidden',
          !isFirstSection && 'rounded-t-[2rem] sm:rounded-t-[2.75rem] md:rounded-t-[3.5rem]',
          'will-change-transform',
        )}
        style={style}
      >
        {children}
      </div>
    </section>
  );
};

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const childCount = (children: React.ReactNode) => React.Children.count(children);

export const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  'aria-label': ariaLabel = 'Story scroll',
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || reducedMotion) return;

      const sections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>('[data-flow-section]'),
      );
      if (sections.length === 0) return;

      const isMobile = window.innerWidth < 768;
      const triggers: ScrollTrigger[] = [];
      const sectionTriggers = new Map<string, ScrollTrigger>();

      // Distinct, stylish 3D rotation angle for both mobile and desktop (non-flat, dynamic card-flow)
      const initialRotation = isMobile ? 5 : 4;

      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 1 });

        const inner = section.querySelector<HTMLElement>('.flow-art-container');
        if (!inner) return;

        if (i > 0) {
          const isOdd = i % 2 === 1;
          const origin = isOdd ? 'bottom left' : 'bottom right';
          const rotationAngle = isOdd ? initialRotation : -initialRotation;

          gsap.set(inner, { rotation: rotationAngle, transformOrigin: origin });
          const tween = gsap.to(inner, {
            rotation: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top 14%',
              scrub: 0.6, // Smooth interpolated scrub eliminates mobile touch stutter
            },
          });
          if (tween.scrollTrigger) {
            triggers.push(tween.scrollTrigger);
            if (section.id) {
              sectionTriggers.set(section.id, tween.scrollTrigger);
            }
          }
        }

        if (i < sections.length - 1) {
          triggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: 'bottom bottom',
              end: 'bottom top',
              pin: true,
              pinSpacing: false,
              anticipatePin: 1,
            }),
          );
        }
      });

      const updatePositions = () => {
        sections.forEach((section, i) => {
          const id = section.id;
          if (!id) return;
          if (i === 0) {
            sectionScrollPositions.set(id, 0);
          } else {
            const st = sectionTriggers.get(id);
            if (st && typeof st.end === 'number') {
              sectionScrollPositions.set(id, Math.round(st.end));
            } else {
              const rect = section.getBoundingClientRect();
              sectionScrollPositions.set(id, Math.round(rect.top + window.scrollY));
            }
          }
        });
      };

      ScrollTrigger.addEventListener('refresh', updatePositions);

      // Give browser time to settle DOM layout before refreshing ScrollTrigger
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        updatePositions();
      }, 200);

      return () => {
        clearTimeout(refreshTimer);
        ScrollTrigger.removeEventListener('refresh', updatePositions);
        triggers.forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [childCount(children), reducedMotion] },
  );

  return (
    <main
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx('w-full overflow-x-hidden', className)}
    >
      {children}
    </main>
  );
};

export default FlowArt;
