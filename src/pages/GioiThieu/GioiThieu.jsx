import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import drumBgMusic from '../../assets/Audio/drum_s.mp3';
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
  Landmark 
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

// Hero description text for typing effect
const HERO_DESCRIPTION_TEXT = "Một sáng kiến sáng tạo kết hợp nghệ thuật truyền thống với trí tuệ nhân tạo, tái hiện di sản văn hóa Việt Nam dưới góc nhìn mới mẻ và sinh động.";

const GioiThieu = () => {
  const [userEmail, setUserEmail] = useState(null);
  // --- Background music state ---
  const BG_MUSIC_KEY = 'bgMusicEnabled';
  const bgAudioRef = useRef(null);
  const [isBgMusicPlaying, setIsBgMusicPlaying] = useState(true); // default true, will be persisted

  // Refs for GSAP animations
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const heroActionsRef = useRef(null);
  const statsRef = useRef(null);
  const overviewRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const ctaRef = useRef(null);
  const quoteRef = useRef(null);

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
          onStart: function() {
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

        // Overview main content - slide and fade
        const overviewMain = overviewRef.current.querySelector('.gt-overview-main');
        if (overviewMain) {
          gsap.fromTo(overviewMain,
            { opacity: 0, x: -50, filter: 'blur(5px)' },
            {
              opacity: 1,
              x: 0,
              filter: 'blur(0px)',
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: overviewMain,
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
        // Mission cards - Smooth staggered reveal (like impact items)
        const missionCards = missionRef.current.querySelectorAll('.gt-mission-card');
        gsap.fromTo(missionCards,
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
              trigger: missionCards[0],
              start: 'top 95%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Mission titles - Simple fade slide up effect
        const missionTitles = missionRef.current.querySelectorAll('.gt-mission-title');
        gsap.fromTo(missionTitles,
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: missionCards[0] || missionRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );

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
      // Subtle parallax for decorative elements
      gsap.to('.gioithieu-page::before', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.gioithieu-page',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        }
      });

    });

    return () => ctx.revert(); // Cleanup
  }, []);

  // Handle background music play/pause
  useEffect(() => {
    const bgAudio = bgAudioRef.current;
    if (!bgAudio) return;
    if (isBgMusicPlaying) {
      bgAudio.volume = 0.5;
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      bgAudio.pause();
    }
  }, [isBgMusicPlaying]);

  // Initialize from localStorage and setup interaction-based autoplay retries
  useEffect(() => {
    try {
      const saved = localStorage.getItem(BG_MUSIC_KEY);
      if (saved !== null) {
        setIsBgMusicPlaying(saved === 'true');
      }
    } catch {}

    const attemptPlay = () => {
      if (!isBgMusicPlaying) return;
      const el = bgAudioRef.current;
      if (!el) return;
      el.volume = 0.5;
      const p = el.play();
      if (p && p.catch) p.catch(() => {});
    };

    const onVisibility = () => {
      if (document.visibilityState === 'visible') attemptPlay();
    };

    document.addEventListener('click', attemptPlay);
    document.addEventListener('keydown', attemptPlay);
    document.addEventListener('touchstart', attemptPlay, { passive: true });
    document.addEventListener('pointerdown', attemptPlay);
    document.addEventListener('visibilitychange', onVisibility);
    const t = setTimeout(attemptPlay, 0);

    return () => {
      clearTimeout(t);
      document.removeEventListener('click', attemptPlay);
      document.removeEventListener('keydown', attemptPlay);
      document.removeEventListener('touchstart', attemptPlay);
      document.removeEventListener('pointerdown', attemptPlay);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [isBgMusicPlaying]);

  const handleBgMusicToggle = () => {
    setIsBgMusicPlaying((prev) => {
      const next = !prev;
      try { localStorage.setItem(BG_MUSIC_KEY, String(next)); } catch {}
      return next;
    });
  };

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

  return (
    <div className="gioithieu-page">
      {/* Background music audio element and toggle button */}
      <audio
        ref={bgAudioRef}
        src={drumBgMusic}
        loop
        autoPlay
        style={{ display: 'none' }}
      />
      <button
        className={`btn-bg-music-toggle${isBgMusicPlaying ? ' is-playing' : ''}`}
        onClick={handleBgMusicToggle}
        style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}
        aria-label={isBgMusicPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
      >
        {isBgMusicPlaying ? '🔊 Đang phát nhạc nền' : '🔇 Bật nhạc nền'}
      </button>

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

        {/* Statistics Section */}
        <section ref={statsRef} className="gioithieu-stats-section" aria-label="Số liệu nổi bật">
          <div className="gt-stats-container">
            <div className="gt-stats-header">
              <h2>Thành tựu nổi bật</h2>
              <p>Những con số ấn tượng của dự án Nghệ Thuật Ký Ức 4.0</p>
            </div>
            <div className="gioithieu-stats">
              {GT_STATISTICS.map((stat) => (
                <article key={stat.label} className="gt-stats-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Giới thiệu tổng quan */}
        <section ref={overviewRef} className="gioithieu-section gt-overview" id="gioi-thieu" aria-labelledby="overview-title">
          <div className="gt-section-container">
            <div className="gt-section-heading">
              <span className="gt-section-eyebrow">Về dự án</span>
              <h2 id="overview-title">Giới thiệu tổng quan</h2>
            </div>
            
            <div className="gt-overview-content">
              <div className="gt-overview-main">
                <p className="gt-overview-lead">
                  Dự án <strong>"Nghệ Thuật Ký Ức 4.0"</strong> là một sáng kiến sáng tạo kết hợp 
                  nghệ thuật truyền thống với công nghệ hiện đại, đặc biệt là trí tuệ nhân tạo (AI).
                </p>
                <p>
                  Thông qua nền tảng số, dự án tái hiện các di sản văn hóa Việt Nam dưới góc nhìn 
                  mới mẻ, sinh động, giúp công chúng tiếp cận các giá trị văn hóa một cách gần gũi 
                  và hấp dẫn hơn.
                </p>
                <p>
                  Chúng tôi tin rằng công nghệ không chỉ là công cụ bảo tồn, mà còn là cầu nối 
                  giúp thế hệ trẻ hiểu và yêu mến di sản văn hóa của dân tộc theo cách riêng của họ.
                </p>
              </div>

              <div className="gt-overview-features">
                <div className="gt-feature-item">
                  <div className="gt-feature-icon"><Palette size={48} /></div>
                  <h3>Nghệ thuật & AI</h3>
                  <p>Kết hợp sáng tạo truyền thống với công nghệ trí tuệ nhân tạo tiên tiến</p>
                </div>
                <div className="gt-feature-item">
                  <div className="gt-feature-icon"><Landmark size={48} /></div>
                  <h3>Di sản số hóa</h3>
                  <p>Tái hiện các di sản văn hóa Việt Nam dưới dạng trải nghiệm tương tác</p>
                </div>
                <div className="gt-feature-item">
                  <div className="gt-feature-icon"><Sparkles size={48} /></div>
                  <h3>Trải nghiệm mới</h3>
                  <p>Mang đến cách tiếp cận văn hóa gần gũi và hấp dẫn cho mọi thế hệ</p>
                </div>
              </div>
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

            <div className="gt-mission-grid">
              {GT_MISSION_POINTS.map((mission, index) => (
                <article key={index} className="gt-mission-card">
                  <div className="gt-mission-card__header">
                    <span className="gt-mission-icon">{mission.icon}</span>
                    <div className="gt-mission-number">{String(index + 1).padStart(2, '0')}</div>
                  </div>
                  <h3 className="gt-mission-title">{mission.title}</h3>
                  <p className="gt-mission-description">{mission.description}</p>
                </article>
              ))}
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
