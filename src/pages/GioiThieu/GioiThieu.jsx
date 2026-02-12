import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';

import imgFeatureArt from '../../assets/0-1.jpg';
import imgFeatureHeritage from '../../assets/vanmieu.webp';
import imgFeatureExperience from '../../assets/123.jpg';
import imgMockupVertical from '../../assets/dacd0d7a-ad6e-4650-80fd-ebf4302abb9a.png';
import imgOverviewHero from '../../assets/hinh-nen-powerpoint-lich-su-viet-nam-43.jpg';
import { 
  Palette, 
  Archive, 
  Sparkles, 
  Star, 
  Sprout, 
  Building2, 
  Theater, 
  Users, 
  Target, 
  Landmark,
  Heart,
  GraduationCap
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GioiThieu.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);


// Dữ liệu cho trang Giới thiệu
const GT_MISSION_POINTS = [
  {
    icon: <Palette size={48} />,
    title: 'Truyền cảm hứng khám phá di sản qua công nghệ',
    description: 'Tạo ra các công cụ hỗ trợ học tập, triển lãm số, và giao diện tương tác sử dụng AI để mọi người dễ dàng tiếp cận và cảm nhận lịch sử Việt Nam một cách sống động.',
  },
  {
    icon: <Archive size={48} />,
    title: 'Bảo tồn ký ức văn hóa dân tộc',
    description: 'Bảo tồn và tái hiện ký ức văn hóa dân tộc bằng công nghệ AI và kỹ thuật số.',
  },
  {
    icon: <Sparkles size={48} />,
    title: 'Trải nghiệm nghệ thuật số sống động',
    description: 'Tạo ra trải nghiệm nghệ thuật số sống động, giúp người xem không chỉ "thấy" mà còn "cảm" được chiều sâu văn hóa.',
  },
  {
    icon: <Star size={48} />,
    title: 'Nâng cao nhận thức cộng đồng',
    description: 'Nâng cao nhận thức cộng đồng về tầm quan trọng của việc giữ gìn và phát huy di sản văn hóa.',
  },
  {
    icon: <Sprout size={48} />,
    title: 'Truyền cảm hứng cho thế hệ trẻ',
    description: 'Truyền cảm hứng cho thế hệ trẻ, để họ trân trọng và tiếp nối những giá trị truyền thống quý báu.',
  },
];

const MISSION_SLIDE_IMAGES = [imgFeatureExperience, imgFeatureHeritage, imgFeatureExperience, imgFeatureArt, imgFeatureHeritage];
const GT_MISSION_SLIDES = GT_MISSION_POINTS.map((point, i) => ({
  ...point,
  image: MISSION_SLIDE_IMAGES[i],
}));

const GT_VISION_HIGHLIGHTS = [
  {
    icon: <Building2 size={48} />,
    title: 'Cầu nối quá khứ - hiện tại',
    description: 'Trở thành cầu nối giữa quá khứ và hiện tại',
  },
  {
    icon: <Theater size={48} />,
    title: 'Không gian nghệ thuật số',
    description: 'Tạo nên không gian nghệ thuật kỹ thuật số',
  },
  {
    icon: <Users size={48} />,
    title: 'Gần gũi với thế hệ trẻ',
    description: 'Đưa văn hóa đến gần hơn với thế hệ trẻ',
  },
  // {
  //   icon: '🌏',
  //   title: 'Lan tỏa toàn cầu',
  //   description: 'Lan tỏa giá trị truyền thống đến cộng đồng toàn cầu',
  // },
];

const GT_STATISTICS = [
  { value: '2024', label: 'Năm khởi động' },
  { value: '100+', label: 'Di sản số hóa' },
  { value: 'AI', label: 'Công nghệ cốt lõi' },
  { value: '∞', label: 'Khả năng sáng tạo' },
];

// Overview section: 3 feature cards (text theo mẫu)
const GT_OVERVIEW_FEATURES = [
  {
    icon: <Heart size={28} className="gt-overview-feature-icon gt-overview-feature-icon--pink" />,
    text: 'Nghệ Thuật Ký Ức 4.0 kết hợp nghệ thuật truyền thống với công nghệ hiện đại, đặc biệt là AI.',
  },
  {
    icon: <GraduationCap size={28} className="gt-overview-feature-icon gt-overview-feature-icon--brown" />,
    text: 'Dự án tái hiện di sản văn hóa Việt Nam trên nền tảng số bằng hình thức sinh động, dễ tiếp cận.',
  },
  {
    icon: <Sparkles size={28} className="gt-overview-feature-icon gt-overview-feature-icon--gold" />,
    text: 'Công nghệ trí tuệ giúp thế hệ trẻ hiểu và yêu di sản theo cách thức riêng mình.',
  },
];

// 3 thẻ full-bleed image (Nghệ thuật & AI, Di sản số hóa, Trải nghiệm mới)
const GT_FEATURE_IMAGE_CARDS = [
  {
    title: 'Nghệ thuật & AI',
    description: 'Mô hình ứng dụng trí tuệ nhân tạo (AI) giúp chúng tôi tạo ra những trải nghiệm độc đáo, khác biệt.',
    image: imgFeatureArt,
  },
  {
    title: 'Di sản số hóa',
    description: 'Tái hiện và lưu giữ di sản văn hóa Việt Nam dưới dạng kỹ thuật số một cách chân thực.',
    image: imgFeatureHeritage,
  },
  {
    title: 'Trải nghiệm mới',
    description: 'Mang đến cách tiếp cận văn hóa và nghệ thuật mới mẻ, dễ hiểu, phù hợp với mọi đối tượng.',
    image: imgFeatureExperience,
  },
];

// Hero description text for typing effect
const HERO_DESCRIPTION_TEXT = "Một sáng kiến sáng tạo kết hợp nghệ thuật truyền thống với trí tuệ nhân tạo, tái hiện di sản văn hóa Việt Nam dưới góc nhìn mới mẻ và sinh động.";

const GioiThieu = () => {
  const [userEmail, setUserEmail] = useState(null);

  const [missionSlideIndex, setMissionSlideIndex] = useState(0);

  // Refs for GSAP animations
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const heroActionsRef = useRef(null);
  const statsRef = useRef(null);
  const gtStatsTitleRef = useRef(null);
  const overviewRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const ctaRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => {
      setMissionSlideIndex((prev) => (prev + 1) % GT_MISSION_SLIDES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  // GSAP Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // === HERO SECTION ANIMATIONS ===

      // Hero Badge - Blur Text Effect (fade in from blur)
      if (heroBadgeRef.current) {
        gsap.fromTo(heroBadgeRef.current,
          {
            opacity: 0,
            filter: 'blur(20px)',
            y: -30,
            scale: 0.8
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3
          }
        );
      }

      // Hero Title - Split Text Effect (character by character)
      if (heroTitleRef.current) {
        const title = heroTitleRef.current;
        const text = title.textContent;
        title.innerHTML = '';

        // Split text into characters
        text.split('').forEach((char, i) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.classList.add('split-char');
          title.appendChild(span);
        });

        // Animate each character
        gsap.to('.split-char', {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.03,
          ease: 'power2.out',
          delay: 0.5,
          onStart: function () {
            gsap.set('.split-char', { y: 50 });
          }
        });
      }

      // Hero Description - Blur Reveal Effect (word by word)
      if (heroDescRef.current) {
        const desc = heroDescRef.current;
        const words = HERO_DESCRIPTION_TEXT.split(' ');
        desc.innerHTML = words.map(word =>
          `<span class="desc-word">${word}</span>`
        ).join(' ');

        gsap.fromTo(desc.querySelectorAll('.desc-word'),
          {
            opacity: 0,
            filter: 'blur(10px)',
            y: 20
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.out',
            delay: 1.8
          }
        );
      }

      // Hero Actions - Scroll Float Effect
      if (heroActionsRef.current) {
        gsap.fromTo(heroActionsRef.current.children,
          {
            opacity: 0,
            y: 40,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            delay: 2.5
          }
        );
      }

      // === STATISTICS SECTION - Scroll Reveal ===
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.querySelectorAll('.gt-stats-card'),
          {
            opacity: 0,
            y: 40,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 95%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Stats header blur text effect
        const statsHeader = statsRef.current.querySelector('.gt-stats-header');
        if (statsHeader) {
          gsap.fromTo(statsHeader,
            { opacity: 0, filter: 'blur(8px)', y: 20 },
            {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: statsRef.current,
                start: 'top 95%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        // Stats hero image: fade + scale khi xuất hiện (animate inner để hover scale cả div không bị ghi đè)
        const statsImageInner = statsRef.current.querySelector('.gt-stats-image-inner');
        if (statsImageInner) {
          gsap.fromTo(statsImageInner,
            { opacity: 0, scale: 0.92, x: 24 },
            {
              opacity: 1,
              scale: 1,
              x: 0,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: statsRef.current,
                start: 'top 95%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      }

      // === OVERVIEW SECTION - Scroll Reveal + Float ===
      if (overviewRef.current) {
        // Section heading with blur effect
        const overviewHeading = overviewRef.current.querySelector('.gt-section-heading');
        if (overviewHeading) {
          gsap.fromTo(overviewHeading,
            { opacity: 0, filter: 'blur(8px)', y: 30 },
            {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: overviewRef.current,
                start: 'top 95%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        // Overview visual (mockup) - slide and fade
        const overviewVisual = overviewRef.current.querySelector('.gt-overview-visual');
        if (overviewVisual) {
          gsap.fromTo(overviewVisual,
            { opacity: 0, x: -50, filter: 'blur(5px)' },
            {
              opacity: 1,
              x: 0,
              filter: 'blur(0px)',
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: overviewVisual,
                start: 'top 95%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        // Feature items - Smooth staggered reveal (like impact items)
        const featureItems = overviewRef.current.querySelectorAll('.gt-feature-item');
        gsap.fromTo(featureItems,
          {
            opacity: 0,
            y: 30,
            scale: 0.98
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: featureItems[0],
              start: 'top 95%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Floating animation for feature icons
        featureItems.forEach((item, index) => {
          const icon = item.querySelector('.gt-feature-icon');
          if (icon) {
            gsap.to(icon, {
              y: -10,
              duration: 2 + index * 0.3,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: index * 0.5
            });
          }
        });
      }

      // === MISSION SECTION - Scroll Reveal ===
      if (missionRef.current) {
        const missionSlideshow = missionRef.current.querySelector('.gt-mission-slideshow');
        if (missionSlideshow) {
          gsap.fromTo(missionSlideshow,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: missionSlideshow,
                start: 'top 92%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        // Mission summary - Blur reveal
        const missionSummary = missionRef.current.querySelector('.gt-mission-summary');
        if (missionSummary) {
          gsap.fromTo(missionSummary,
            { opacity: 0, filter: 'blur(8px)', scale: 0.98 },
            {
              opacity: 1,
              filter: 'blur(0px)',
              scale: 1,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: missionSummary,
                start: 'top 95%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      }

      // === VISION SECTION - Scroll Float + Blur Text ===
      if (visionRef.current) {
        // Vision heading with blur effect
        const visionHeading = visionRef.current.querySelector('.gt-section-heading');
        if (visionHeading) {
          gsap.fromTo(visionHeading,
            { opacity: 0, filter: 'blur(8px)', y: 30 },
            {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: visionRef.current,
                start: 'top 95%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        // Vision main content
        const visionMain = visionRef.current.querySelector('.gt-vision-main');
        if (visionMain) {
          gsap.fromTo(visionMain,
            { opacity: 0, x: 50, filter: 'blur(5px)' },
            {
              opacity: 1,
              x: 0,
              filter: 'blur(0px)',
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: visionMain,
                start: 'top 95%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        // Vision cards - Smooth staggered reveal (like impact items)
        const visionCards = visionRef.current.querySelectorAll('.gt-vision-card');
        gsap.fromTo(visionCards,
          {
            opacity: 0,
            y: 30,
            scale: 0.98
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: visionCards[0],
              start: 'top 95%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Floating animation for vision icons
        visionCards.forEach((card, index) => {
          const icon = card.querySelector('.gt-vision-icon');
          if (icon) {
            gsap.to(icon, {
              y: -8,
              rotation: 5,
              duration: 2.5 + index * 0.4,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: index * 0.3
            });
          }
        });

        // Quote - Special text type effect
        const quoteElement = visionRef.current.querySelector('.gt-vision-quote blockquote p');
        if (quoteElement) {
          gsap.fromTo(quoteElement,
            { opacity: 0, filter: 'blur(8px)', y: 20 },
            {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: quoteElement,
                start: 'top 95%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        // Impact items - Staggered reveal
        const impactItems = visionRef.current.querySelectorAll('.gt-impact-item');
        gsap.fromTo(impactItems,
          {
            opacity: 0,
            y: 30,
            scale: 0.98
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: impactItems[0],
              start: 'top 95%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // === CTA SECTION - Final Reveal ===
      if (ctaRef.current) {
        const ctaContent = ctaRef.current.querySelector('.gt-cta-content');
        if (ctaContent) {
          // CTA heading - Blur text reveal
          const ctaHeading = ctaContent.querySelector('h2');
          if (ctaHeading) {
            gsap.fromTo(ctaHeading,
              { opacity: 0, filter: 'blur(8px)', y: 30, scale: 0.98 },
              {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: ctaRef.current,
                  start: 'top 95%',
                  toggleActions: 'play none none reverse'
                }
              }
            );
          }

          // CTA description
          const ctaDesc = ctaContent.querySelector('p');
          if (ctaDesc) {
            gsap.fromTo(ctaDesc,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: ctaRef.current,
                  start: 'top 95%',
                  toggleActions: 'play none none reverse'
                }
              }
            );
          }

          // CTA buttons - Float in
          const ctaButtons = ctaContent.querySelectorAll('.gt-cta-button');
          gsap.fromTo(ctaButtons,
            { opacity: 0, y: 20, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ctaRef.current,
                start: 'top 95%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      }

      // === PARALLAX SCROLL EFFECTS ===
      // (Bỏ animate .gioithieu-page::before vì GSAP không tìm thấy pseudo-element, tránh warning)

    });

    return () => ctx.revert(); // Cleanup
  }, []);



  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUserEmail(null);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const email = payload.email || 'Người dùng';
      setUserEmail(email);
    } catch (error) {
      console.error('Token không hợp lệ', error);
      setUserEmail(null);
    }
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    setUserEmail(null);
  };

  const FONT_BE_VIETNAM = "'Be Vietnam Pro', sans-serif";

  // Ép font với !important qua setProperty (inline style + important)
  useEffect(() => {
    if (!gtStatsTitleRef.current) return;
    const el = gtStatsTitleRef.current;
    el.style.setProperty('font-family', FONT_BE_VIETNAM, 'important');
    const h2 = el.querySelector('h2');
    const p = el.querySelector('p');
    if (h2) h2.style.setProperty('font-family', FONT_BE_VIETNAM, 'important');
    if (p) p.style.setProperty('font-family', FONT_BE_VIETNAM, 'important');
  }, []);

  return (
    <div id="gioithieu-page" className="gioithieu-page">
      {/* Ép font Be Vietnam Pro cho block "Thành tựu nổi bật" - style inject để ghi đè Roboto toàn cục */}
      <style dangerouslySetInnerHTML={{
        __html: `
        #gt-stats-title-block,
        #gt-stats-title-block *,
        #gt-stats-title-block h2,
        #gt-stats-title-block p {
          font-family: ${FONT_BE_VIETNAM} !important;
        }
      `}} />


      <main className="gioithieu-main">
        {/* Hero Section */}
        <section className="gioithieu-hero" aria-labelledby="hero-title">
          <div className="gioithieu-hero__content">
            <span ref={heroBadgeRef} className="gt-hero-badge">Nghệ Thuật Ký Ức 4.0</span>
            <h1 ref={heroTitleRef} id="hero-title" className="hero-title-gsap">Kết nối di sản văn hóa với công nghệ hiện đại</h1>
            <p ref={heroDescRef} className="gt-hero-description"></p>
            <div ref={heroActionsRef} className="gioithieu-hero__actions">
              <a className="gt-hero-action gt-hero-action--primary" href="#gioi-thieu">
                Khám phá ngay
              </a>
              <a className="gt-hero-action gt-hero-action--ghost" href="#su-menh">
                Tìm hiểu thêm
              </a>
            </div>
          </div>
        </section>

        {/* Statistics Section: title giữa trên, 4 cards trái + 1 ảnh lớn phải */}
        <section ref={statsRef} className="gioithieu-stats-section" aria-label="Số liệu nổi bật">
          <div className="gt-stats-container gt-stats-layout">
            <div
              ref={gtStatsTitleRef}
              id="gt-stats-title-block"
              className="gt-stats-header gt-stats-header--top"
              style={{ fontFamily: FONT_BE_VIETNAM }}
            >
              <h2 style={{ fontFamily: FONT_BE_VIETNAM }}>Thành tựu nổi bật</h2>
              <p style={{ fontFamily: FONT_BE_VIETNAM }}>Những con số ấn tượng của dự án Nghệ Thuật Ký Ức 4.0</p>
            </div>
            <div className="gt-stats-left">
              <div className="gioithieu-stats gioithieu-stats-grid">
                {GT_STATISTICS.map((stat) => (
                  <article key={stat.label} className="gt-stats-card">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </article>
                ))}
              </div>
            </div>
            <div className="gt-stats-right">
              <div className="gt-stats-image-wrap">
                <div className="gt-stats-image-inner">
                  <img src={imgFeatureArt} alt="Nghệ thuật AI - Di sản văn hóa" className="gt-stats-hero-image" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Một section: Giới thiệu tổng quan (heading + mockup & 3 thẻ phải + 3 thẻ ảnh dưới) */}
        <section ref={overviewRef} className="gioithieu-section gt-overview gt-overview-unified" id="gioi-thieu" aria-labelledby="overview-title">
          <div className="gt-section-container gt-overview-container">
            <div className="gt-section-heading">
              <span className="gt-section-eyebrow">VỀ DỰ ÁN</span>
              <h2 id="overview-title">Giới thiệu tổng quan</h2>
            </div>

            <div className="gt-overview-content gt-overview-layout">
              <div className="gt-overview-visual">
                {/* Wrapper: mép phải = mép phải ảnh dọc, tránh lòi ra ngoài khi responsive */}
                <div className="gt-overview-mockup-wrap">
                  <div className="gt-overview-mockup">
                    <div className="gt-mockup-screen gt-mockup-desktop">
                      <img src={imgOverviewHero} alt="Di sản văn hóa Việt Nam" />
                    </div>
                    <div className="gt-mockup-screen gt-mockup-mobile">
                      <img src={imgMockupVertical} alt="Di sản văn hóa" />
                    </div>
                  </div>
                  <div className="gt-mockup-spacer" aria-hidden="true" />
                </div>
              </div>
              <div className="gt-overview-features gt-overview-cards">
                {GT_OVERVIEW_FEATURES.map((item, index) => (
                  <div key={index} className="gt-feature-item gt-overview-card">
                    <span className="gt-feature-icon">{item.icon}</span>
                    <p className="gt-overview-card-text">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="gt-feature-cards">
              {GT_FEATURE_IMAGE_CARDS.map((card, index) => (
                <article key={index} className="gt-feature-image-card">
                  <div className="gt-feature-image-card-inner" style={{ backgroundImage: `url(${card.image})` }}>
                    <div className="gt-feature-image-card-overlay" />
                    <div className="gt-feature-image-card-content">
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Sứ mệnh */}
        <section ref={missionRef} className="gioithieu-section gt-mission" id="su-menh" aria-labelledby="gt-mission-title">
          <div className="gt-section-container">
            <div className="gt-section-heading">
              <span className="gt-section-eyebrow">Sứ mệnh</span>
              <h2 id="gt-mission-title">Những gì chúng tôi cam kết</h2>
              <p className="gt-section-intro">
                Sứ mệnh của "Nghệ Thuật Ký Ức 4.0" là tạo ra những công cụ và trải nghiệm
                giúp mọi người kết nối sâu sắc hơn với di sản văn hóa Việt Nam.
              </p>
            </div>

            <div className="gt-mission-slideshow">
              <div className="gt-mission-slideshow-inner">
                {GT_MISSION_SLIDES.map((slide, index) => (
                  <div
                    key={index}
                    className={`gt-mission-slide ${index === missionSlideIndex ? 'gt-mission-slide--active' : ''}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                    aria-hidden={index !== missionSlideIndex}
                  >
                    <div className="gt-mission-slide-overlay" />
                    <div className="gt-mission-slide-content">
                      <span className="gt-mission-slide-number">{String(index + 1).padStart(2, '0')}</span>
                      <h3 className="gt-mission-slide-title">{slide.title}</h3>
                      <p className="gt-mission-slide-desc">{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="gt-mission-slideshow-dots" role="tablist" aria-label="Chọn slide cam kết">
                {GT_MISSION_SLIDES.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    aria-selected={index === missionSlideIndex}
                    aria-label={`Cam kết ${index + 1}`}
                    className={`gt-mission-slide-dot ${index === missionSlideIndex ? 'gt-mission-slide-dot--active' : ''}`}
                    onClick={() => setMissionSlideIndex(index)}
                  />
                ))}
              </div>
            </div>

            <div className="gt-mission-summary">
              <div className="gt-summary-box">
                <h3><Target size={24} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} /> Mục tiêu cốt lõi</h3>
                <p>
                  Chúng tôi không chỉ đơn thuần số hóa di sản, mà tạo ra những trải nghiệm
                  có khả năng chạm đến cảm xúc, khơi gợi niềm tự hào và truyền cảm hứng
                  hành động bảo vệ văn hóa cho thế hệ hiện tại và tương lai.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tầm nhìn */}
        <section ref={visionRef} className="gioithieu-section gt-vision" id="tam-nhin" aria-labelledby="vision-title">
          <div className="gt-section-container">
            <div className="gt-section-heading">
              <span className="gt-section-eyebrow">Tầm nhìn</span>
              <h2 id="vision-title">Hướng tới tương lai</h2>
            </div>

            <div className="gt-vision-content">
              <div className="gt-vision-main">
                <p className="gt-vision-lead">
                  Dự án hướng đến việc trở thành <strong>cầu nối giữa quá khứ và hiện tại</strong>,
                  tạo nên một không gian nghệ thuật kỹ thuật số nơi di sản văn hóa truyền thống
                  được truyền tải bằng ngôn ngữ công nghệ.
                </p>
                <p>
                  Đây là một bước tiến nhằm đưa văn hóa dân tộc đến gần hơn với thế hệ trẻ,
                  lan tỏa giá trị truyền thống đến cộng đồng toàn cầu thông qua trải nghiệm
                  tương tác hiện đại.
                </p>
              </div>

              <div className="gt-vision-highlights-grid">
                {GT_VISION_HIGHLIGHTS.map((highlight, index) => (
                  <article key={index} className="gt-vision-card">
                    <span className="gt-vision-icon">{highlight.icon}</span>
                    <h3>{highlight.title}</h3>
                    <p>{highlight.description}</p>
                  </article>
                ))}
              </div>

              <div className="gt-vision-quote">
                <blockquote>
                  <p>
                    "Khi công nghệ gặp gỡ văn hóa, chúng ta không chỉ bảo tồn quá khứ,
                    mà còn tạo ra tương lai nơi di sản được sống lại mỗi ngày."
                  </p>
                  <cite>— Đội ngũ Nghệ Thuật Ký Ức 4.0</cite>
                </blockquote>
              </div>

              <div className="gt-vision-impact">
                <h3><Star size={24} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} /> Tác động mong đợi</h3>
                <div className="gt-impact-grid">
                  <div className="gt-impact-item">
                    <strong>Giáo dục</strong>
                    <p>Nâng cao chất lượng giáo dục văn hóa thông qua công nghệ tương tác</p>
                  </div>
                  <div className="gt-impact-item">
                    <strong>Bảo tồn</strong>
                    <p>Lưu giữ di sản dưới dạng số, bảo vệ khỏi nguy cơ mai một</p>
                  </div>
                  <div className="gt-impact-item">
                    <strong>Lan tỏa</strong>
                    <p>Đưa văn hóa Việt Nam đến với công chúng quốc tế</p>
                  </div>
                  <div className="gt-impact-item">
                    <strong>Kết nối</strong>
                    <p>Tạo cộng đồng yêu văn hóa từ nhiều thế hệ khác nhau</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section ref={ctaRef} className="gioithieu-cta" id="lien-he">
          <div className="gt-cta-content">
            <h2>Cùng chúng tôi bảo vệ di sản</h2>
            <p>
              Tham gia hành trình kết nối quá khứ và hiện tại,
              góp phần bảo tồn và lan tỏa văn hóa Việt Nam
            </p>
            <div className="gt-cta-actions">
              <a href="/" className="gt-cta-button gt-cta-button--primary">
                Trải nghiệm ngay
              </a>
              <a href="#lien-he" className="gt-cta-button gt-cta-button--secondary">
                Liên hệ hợp tác
              </a>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default GioiThieu;
