import React, { useCallback, useEffect, useRef, useState } from 'react';
import drumBgMusic from '../../assets/Audio/drum_s.mp3';
import { Link } from 'react-router-dom';
import { Palette, Paintbrush, BookOpen, Check } from 'lucide-react';
import './Home.css';

import logoImg from '../../assets/logo.png';
import bannerImg from '../../assets/banner.png';
import heroGif from '../../assets/Hero_vid.gif';
import nhaThoImg from '../../assets/nhatho.png';
import baoTangImg from '../../assets/baotang.png';
import diaDaoImg from '../../assets/diadao.png';
import benCangImg from '../../assets/bencang.png';
import designerImg from '../../assets/Designer.png';
import ceoImg from '../../assets/ceo.jpg';
import creativeHubImg from '../../assets/home.png';
import vanMieuAudio from '../../assets/Audio/vanmieu.mp3';

const FEATURED_ITEMS = [
  {
    id: 'nha-tho-duc-ba',
    title: 'NHÀ THỜ ĐỨC BÀ',
    description:
      'Nhà thờ Đức Bà Sài Gòn, tên chính thức là Vương cung thánh đường Chính tòa Đức Bà Sài Gòn, là một trong những công trình kiến trúc biểu tượng và lâu đời nhất tại Thành phố Hồ Chí Minh. Nằm ở trung tâm Quận 1, tại số 01 Công xã Paris, công trình này thu hút đông đảo du khách và người dân địa phương bởi vẻ đẹp cổ kính và giá trị lịch sử.',
    image: nhaThoImg,
    alt: 'Nhà thờ Đức Bà Sài Gòn',
    audioSrc: vanMieuAudio,
  },
  {
    id: 'bao-tang-chien-tranh',
    title: 'BẢO TÀNG CHIẾN TRANH',
    description:
      'Bảo tàng Chứng tích Chiến tranh là một trong những bảo tàng nổi tiếng và quan trọng nhất tại Thành phố Hồ Chí Minh, tọa lạc tại địa chỉ 28 Võ Văn Tần, Phường Võ Thị Sáu, Quận 3. Bảo tàng chuyên trưng bày những tư liệu, hình ảnh và hiện vật liên quan đến cuộc Chiến tranh Việt Nam và những hậu quả mà nó gây ra.',
    image: baoTangImg,
    alt: 'Bảo tàng Chứng tích Chiến tranh',
    audioSrc: vanMieuAudio,
  },
  {
    id: 'dia-dao-cu-chi',
    title: 'ĐỊA ĐẠO CỦ CHI',
    description:
      'Địa đạo Củ Chi là một hệ thống đường hầm ngầm khổng lồ nằm ở huyện Củ Chi, cách trung tâm Thành phố Hồ Chí Minh khoảng 70 km về phía Tây Bắc. Đây là một di tích lịch sử quốc gia đặc biệt, đóng vai trò quan trọng trong cuộc kháng chiến chống Mỹ của quân và dân Việt Nam.',
    image: diaDaoImg,
    alt: 'Địa đạo Củ Chi',
    audioSrc: vanMieuAudio,
  },
  {
    id: 'ben-cang-nha-rong',
    title: 'BẾN CẢNG NHÀ RỒNG',
    description:
      'Bến cảng Nhà Rồng, hay còn gọi là Bảo tàng Hồ Chí Minh – Chi nhánh Thành phố Hồ Chí Minh, là một di tích lịch sử quan trọng nằm tại số 1 Nguyễn Tất Thành, Phường 12, Quận 4, Thành phố Hồ Chí Minh.',
    image: benCangImg,
    alt: 'Bến cảng Nhà Rồng',
    audioSrc: vanMieuAudio,
  },
];

const COLLAB_SECTIONS = [
  {
    id: 'featured-projects',
    eyebrow: 'Dự án tiêu biểu',
    title: 'Những dự án tạo dấu ấn công nghệ & văn hóa',
    description:
      'Khám phá những hành trình tiêu biểu nơi AI đồng hành cùng các nhà nghiên cứu, nghệ sĩ và cộng đồng địa phương để tái hiện di sản Việt Nam bằng góc nhìn mới mẻ.',
    highlights: [
      'Chuỗi triển lãm ký ức Sài Gòn – kết hợp tư liệu lịch sử và thị giác AI',
      'Dự án “Âm vang di sản” với trải nghiệm âm thanh tương tác theo vùng địa lý',
      'Hợp tác cùng bảo tàng địa phương để số hóa hiện vật đặc sắc',
    ],
  ctaLabel: 'Xem dự án chi tiết',
  ctaHref: '#featured-projects',
    image: designerImg,
  },
  {
    id: 'community-programs',
    eyebrow: 'Cộng đồng sáng tạo',
    title: 'Nuôi dưỡng hệ sinh thái nhà sáng tạo trẻ',
    description:
      'Từ workshop thực hành, hackathon chủ đề di sản đến thư viện dữ liệu mở, chúng tôi xây dựng cộng đồng giúp thế hệ trẻ khám phá lịch sử theo cách rất riêng.',
    highlights: [
      'Workshop “AI kể chuyện di tích” dành cho học sinh – sinh viên',
      'Cuộc thi sáng tác poster số với sự cố vấn của nghệ sĩ trẻ',
      'Thư viện dữ liệu mở hóa dành cho nhà nghiên cứu độc lập',
    ],
  ctaLabel: 'Tham gia cộng đồng',
  ctaHref: '#community-programs',
    image: creativeHubImg,
  },
    {
    id: 'collaboration-contact',
    eyebrow: 'Liên hệ hợp tác',
    title: 'Kết nối để cùng lan tỏa giá trị di sản',
    description:
      'Chúng tôi mong muốn hợp tác cùng các tổ chức văn hoá, doanh nghiệp, đơn vị giáo dục và đối tác công nghệ để mở rộng tác động xã hội của triển lãm.',
    highlights: [
      'Đồng tổ chức sự kiện triển lãm lưu động tại địa phương',
      'Tư vấn triển khai không gian trải nghiệm AI – XR cho bảo tàng',
      'Xây dựng chương trình giáo dục lịch sử tương tác theo yêu cầu',
    ],
  ctaLabel: 'Đặt lịch trao đổi',
  ctaHref: '#lienhe',
    image: ceoImg,
  },
];

const Home = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [collabEmail, setCollabEmail] = useState('');
  const [collabError, setCollabError] = useState('');
  const [collabStatus, setCollabStatus] = useState('');
  const audioRef = useRef(null);
  const autoSlideRef = useRef(null);
  const isAudioPlayingRef = useRef(false);
  const isHoveringRef = useRef(false);
  const totalSlides = FEATURED_ITEMS.length;
  const activeItem = FEATURED_ITEMS[currentSlide] ?? null;

  // --- Background music state ---
  const BG_MUSIC_KEY = 'bgMusicEnabled';
  const bgAudioRef = useRef(null);
  const [isBgMusicPlaying, setIsBgMusicPlaying] = useState(true); // default true, persisted below

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
      if (p && typeof p.catch === 'function') {
        p.catch(() => {});
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === 'visible') attemptPlay();
    };

    // Retry on common user interactions to satisfy autoplay policies
    document.addEventListener('click', attemptPlay);
    document.addEventListener('keydown', attemptPlay);
    document.addEventListener('touchstart', attemptPlay, { passive: true });
    document.addEventListener('pointerdown', attemptPlay);
    document.addEventListener('visibilitychange', onVisibility);

    // Initial deferred attempt
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
  
  const startAutoSlide = useCallback(() => {
    if (autoSlideRef.current || totalSlides <= 1) {
      return;
    }

    autoSlideRef.current = setInterval(() => {
      if (totalSlides === 0 || isAudioPlayingRef.current) {
        return;
      }

      setCurrentSlide((previous) => (previous + 1) % totalSlides);
    }, 5000); // tốc độ chuyển: 3 giây
  }, [totalSlides]);

  const stopAutoSlide = useCallback(() => {
    if (!autoSlideRef.current) {
      return;
    }

    clearInterval(autoSlideRef.current);
    autoSlideRef.current = null;
  }, []);

  const goToSlide = useCallback(
    (index) => {
      if (totalSlides === 0) {
        return;
      }

      const normalizedIndex = ((index % totalSlides) + totalSlides) % totalSlides;
      setCurrentSlide(normalizedIndex);
    },
    [totalSlides],
  );

  const handleNext = useCallback(() => {
    if (totalSlides === 0) {
      return;
    }

    setCurrentSlide((previous) => (previous + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    if (totalSlides === 0) {
      return;
    }

    setCurrentSlide((previous) => (previous - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const getDescriptionSnippet = useCallback((description, maxLength = 120) => {
    if (!description) {
      return '';
    }

    return description.length > maxLength ? `${description.slice(0, maxLength - 1)}…` : description;
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const email = payload.email || 'Người dùng';
        setUserEmail(email);
      } catch (error) {
        console.error('Token không hợp lệ', error);
      }
    }
  }, []);

  useEffect(() => {
    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, [startAutoSlide, stopAutoSlide]);

  useEffect(() => {
    if (!audioRef.current) {
      return undefined;
    }

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsAudioPlaying(false);
    isAudioPlayingRef.current = false;

    return undefined;
  }, [currentSlide]);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (!audioElement) {
      return undefined;
    }

    const handleEnded = () => {
      setIsAudioPlaying(false);
      isAudioPlayingRef.current = false;
    };

    const handlePlay = () => {
      setIsAudioPlaying(true);
      isAudioPlayingRef.current = true;
    };

    const handlePause = () => {
      if (audioElement.currentTime === 0 || audioElement.ended) {
        setIsAudioPlaying(false);
        isAudioPlayingRef.current = false;
      }
    };

    audioElement.addEventListener('ended', handleEnded);
    audioElement.addEventListener('play', handlePlay);
    audioElement.addEventListener('pause', handlePause);

    return () => {
      audioElement.removeEventListener('ended', handleEnded);
      audioElement.removeEventListener('play', handlePlay);
      audioElement.removeEventListener('pause', handlePause);
    };
  }, [currentSlide]);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    setUserEmail(null);
  };

  const handleFeaturedMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
  }, []);

  const handleFeaturedMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
  }, []);

  const handleSlideSelect = useCallback(
    (index) => {
      if (index === currentSlide) {
        return;
      }

      goToSlide(index);
    },
    [currentSlide, goToSlide],
  );

  const handleAudioToggle = () => {
    const target = audioRef.current;

    if (!target) {
      return;
    }

    if (target.paused) {
      isAudioPlayingRef.current = true;
      setIsAudioPlaying(true);
      target
        .play()
        .catch(() => {
          isAudioPlayingRef.current = false;
          setIsAudioPlaying(false);
        });
    } else {
      target.pause();
      target.currentTime = 0;
      isAudioPlayingRef.current = false;
      setIsAudioPlaying(false);
    }
  };

  const handleCollabEmailChange = useCallback((event) => {
    setCollabEmail(event.target.value);
    setCollabError('');
    setCollabStatus('');
  }, []);

  const handleCollabSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!collabEmail.trim()) {
        setCollabError('Vui lòng nhập email của bạn.');
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(collabEmail.trim())) {
        setCollabError('Email chưa hợp lệ, vui lòng kiểm tra lại.');
        return;
      }

      setCollabError('');
      setCollabStatus('Cảm ơn bạn! Chúng tôi sẽ liên hệ trong thời gian sớm nhất.');
      setCollabEmail('');
    },
    [collabEmail],
  );

  return (
    <div className="home-page">
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

      <main className="hero">
        <img
          src={heroGif}
          alt="Hero background"
          className="background-video"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            minWidth: '100vw',
            minHeight: '100%',
            maxWidth: '100vw',
            maxHeight: '100%',
          }}
        />
        <div className="overlay" />
        <div className="content">
          <h1>Khám phá &amp; Bảo tồn văn hóa Việt bằng công nghệ AI</h1>
          <p className="subheading subheading-blur">
            Kết nối quá khứ, sáng tạo tương lai
          </p>
          <div className="cta-buttons">
            <Link className="btn-pill btn-gold" to="/gioithieu">
              Giới thiệu
            </Link>
            <Link className="btn-pill btn-gold" to="/gioithieu#lien-he">
              Liên hệ hợp tác
            </Link>
          </div>
        </div>
      </main>

      <img className="spacer-image" src={bannerImg} alt="Trang trí kết nối" />

      {/* Services Section */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-header">
            <span className="services-tag">Khám phá dịch vụ</span>
            <h2 className="services-title">Trải nghiệm đa chiều về di sản văn hóa</h2>
            <p className="services-subtitle">
              Hệ sinh thái công nghệ AI toàn diện giúp bạn khám phá, sáng tạo và kết nối với lịch sử Việt Nam
            </p>
          </div>

          <div className="services-grid">
            <article className="service-card experience-card">
              <div className="service-icon-wrapper">
                <div className="service-icon"><Palette size={40} /></div>
              </div>
              <div className="service-content">
                <h3 className="service-title">Trải nghiệm</h3>
                <p className="service-description">
                  Trang web triển lãm tranh AI về di tích lịch sử Việt Nam mang đến một hành trình thị giác độc đáo,
                  nơi người xem được đắm chìm trong những tác phẩm nghệ thuật số được tạo ra bởi trí tuệ nhân tạo.
                </p>
                <ul className="service-features">
                  <li>
                    <span className="feature-icon"><Check size={20} /></span>
                    <span>Bộ sưu tập tranh AI chất lượng cao</span>
                  </li>
                  <li>
                    <span className="feature-icon"><Check size={20} /></span>
                    <span>Trải nghiệm thực tế ảo tương tác</span>
                  </li>
                  <li>
                    <span className="feature-icon"><Check size={20} /></span>
                    <span>Thư viện di tích phong phú</span>
                  </li>
                </ul>
                <a href="trainghiem.html" className="service-btn">
                  <span>Khám phá ngay</span>
                  <span className="btn-arrow">→</span>
                </a>
              </div>
            </article>

            <article className="service-card create-card">
              <div className="service-icon-wrapper">
                <div className="service-icon"><Paintbrush size={40} /></div>
              </div>
              <div className="service-content">
                <h3 className="service-title">Tạo tranh</h3>
                <p className="service-description">
                  Không gian sáng tạo của Triển lãm Tranh AI cho phép bạn tự tay tạo ra những bức tranh mang phong cách cổ điển kết hợp hiện đại, lấy cảm hứng từ di tích Việt Nam.
                </p>
                <ul className="service-features">
                  <li>
                    <span className="feature-icon"><Check size={20} /></span>
                    <span>Công cụ AI tạo tranh mạnh mẽ</span>
                  </li>
                  <li>
                    <span className="feature-icon"><Check size={20} /></span>
                    <span>Đa dạng phong cách nghệ thuật</span>
                  </li>
                  <li>
                    <span className="feature-icon"><Check size={20} /></span>
                    <span>Lưu trữ & chia sẻ tác phẩm</span>
                  </li>
                </ul>
                <a href="taotranh.html" className="service-btn">
                  <span>Bắt đầu sáng tạo</span>
                  <span className="btn-arrow">→</span>
                </a>
              </div>
            </article>

            <article className="service-card education-card">
              <div className="service-icon-wrapper">
                <div className="service-icon"><BookOpen size={40} /></div>
              </div>
              <div className="service-content">
                <h3 className="service-title" >Giáo dục <br /> & Cộng đồng</h3>
                <p className="service-description">
                  Trang Giáo dục là cầu nối giữa truyền thống và hiện đại, giúp học sinh – sinh viên và giáo viên dễ dàng tiếp
                  cận kiến thức lịch sử thông qua các công cụ tương tác.
                </p>
                <ul className="service-features">
                  <li>
                    <span className="feature-icon"><Check size={20} /></span>
                    <span>Tài liệu giáo dục tương tác</span>
                  </li>
                  <li>
                    <span className="feature-icon"><Check size={20} /></span>
                    <span>Cộng đồng sáng tạo sôi động</span>
                  </li>
                  <li>
                    <span className="feature-icon"><Check size={20} /></span>
                    <span>Cuộc thi & sự kiện định kỳ</span>
                  </li>
                </ul>
                <a href="giaoduc.html" className="service-btn">
                  <span>Tham gia ngay</span>
                  <span className="btn-arrow">→</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <img className="spacer-image" src={bannerImg} alt="Trang trí kết nối" />

      <section className="featured-section">
        <div className="featured-inner">
          <div className="featured-header">
            <span className="featured-eyebrow">Bộ sưu tập nổi bật</span>
            <h1 className="featured-title">ẢNH NỔI BẬT</h1>
            <p className="featured-summary">
              Thưởng thức những góc nhìn giàu cảm xúc về các di tích lịch sử của Việt Nam, được tái hiện bằng công nghệ
              trí tuệ nhân tạo và cảm hứng nghệ thuật đương đại.
            </p>
          </div>

          <div className="featured-layout">
            {activeItem ? (
              <>
                <article className="featured-hero-card">
                  <div className="hero-media">
                    <img src={activeItem.image} alt={activeItem.alt} />
                    <div className="hero-meta-overlay">
                      <span className="hero-step">{String(currentSlide + 1).padStart(2, '0')}</span>
                      <span className="hero-total">/{String(totalSlides).padStart(2, '0')}</span>
                    </div>
                    {totalSlides > 1 && (
                      <div className="hero-controls">
                        <button type="button" className="hero-nav prev" onClick={handlePrev} aria-label="Ảnh trước">
                          ‹
                        </button>
                        <button type="button" className="hero-nav next" onClick={handleNext} aria-label="Ảnh tiếp theo">
                          ›
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="hero-body">
                    <div className="hero-body-header">
                      <span className="hero-tag">Di tích lịch sử</span>
                      <span className="hero-progress">{currentSlide + 1} / {totalSlides}</span>
                    </div>
                    <h3 className="hero-title">{activeItem.title}</h3>
                    <p className="hero-description">{activeItem.description}</p>
                    <div className="hero-actions">
                      {totalSlides > 1 && (
                        <div className="hero-nav-actions">
                          <button
                            type="button"
                            className="btn-hero"
                            onClick={handlePrev}
                            aria-label="Ảnh trước"
                          >
                            ← Trước
                          </button>
                          <button
                            type="button"
                            className="btn-hero"
                            onClick={handleNext}
                            aria-label="Ảnh tiếp theo"
                          >
                            Tiếp →
                          </button>
                        </div>
                      )}
                      <button
                        type="button"
                        className={`btn-audio${isAudioPlaying ? ' is-playing' : ''}`}
                        onClick={handleAudioToggle}
                        disabled={!activeItem.audioSrc}
                      >
                        {isAudioPlaying ? '⏹ Dừng mô tả' : '🔊 Nghe mô tả'}
                      </button>
                    </div>
                  </div>
                  {activeItem.audioSrc && (
                    <audio
                      src={activeItem.audioSrc}
                      ref={(element) => {
                        audioRef.current = element;
                      }}
                    />
                  )}
                </article>

                <div className="featured-thumbs">
                  {FEATURED_ITEMS.map((item, index) => {
                    const isActive = index === currentSlide;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`featured-thumb${isActive ? ' active' : ''}`}
                        onClick={() => handleSlideSelect(index)}
                        aria-label={`Xem ${item.title}`}
                      >
                        <div className="thumb-image">
                          <img src={item.image} alt={item.alt} />
                        </div>
                        <div className="thumb-content">
                          <span className="thumb-index">{String(index + 1).padStart(2, '0')}</span>
                          <h4>{item.title}</h4>
                          <p>{getDescriptionSnippet(item.description)}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="empty-state">Chưa có ảnh nổi bật để hiển thị.</p>
            )}
          </div>
        </div>
      </section>

      <img className="spacer-image" src={bannerImg} alt="Trang trí kết nối" />

      {/* Section 1: Featured Projects */}
      <section className="collab-section featured-projects-section" id="featured-projects">
        <div className="section-header">
          <span className="section-tag">Dự án tiêu biểu</span>
          <h2 className="section-title">Những dự án tạo dấu ấn công nghệ & văn hóa</h2>
          <p className="section-subtitle">
            Khám phá những hành trình tiêu biểu nơi AI đồng hành cùng các nhà nghiên cứu, nghệ sĩ và cộng đồng địa phương để tái hiện di sản Việt Nam bằng góc nhìn mới mẻ.
          </p>
        </div>
        <div className="collab-content">
          <div className="collab-text-block">
            <div className="highlights-grid">
              {COLLAB_SECTIONS[0].highlights.map((highlight, idx) => (
                <div key={idx} className="highlight-card">
                  <span className="highlight-number">{String(idx + 1).padStart(2, '0')}</span>
                  <p>{highlight}</p>
                </div>
              ))}
            </div>
            <a className="btn-collab primary" href={COLLAB_SECTIONS[0].ctaHref}>
              <span>{COLLAB_SECTIONS[0].ctaLabel}</span>
              <span className="arrow">→</span>
            </a>
          </div>
          <div className="collab-media-block">
            <div className="media-frame-enhanced">
              <img src={COLLAB_SECTIONS[0].image} alt={`${COLLAB_SECTIONS[0].eyebrow} minh họa`} />
              <div className="media-overlay">
                <span className="overlay-tag">🎨 Dự án AI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <img className="spacer-image" src={bannerImg} alt="Trang trí kết nối" />

      {/* Section 2: Community Programs */}
      <section className="collab-section community-section" id="community-programs">
        <div className="section-header centered">
          <span className="section-tag">Cộng đồng sáng tạo</span>
          <h2 className="section-title">Nuôi dưỡng hệ sinh thái nhà sáng tạo trẻ</h2>
          <p className="section-subtitle">
            Từ workshop thực hành, hackathon chủ đề di sản đến thư viện dữ liệu mở, chúng tôi xây dựng cộng đồng giúp thế hệ trẻ khám phá lịch sử theo cách rất riêng.
          </p>
        </div>
        <div className="collab-content reversed">
          <div className="collab-media-block">
            <div className="media-frame-enhanced">
              <img src={COLLAB_SECTIONS[1].image} alt={`${COLLAB_SECTIONS[1].eyebrow} minh họa`} />
              <div className="media-overlay">
                <span className="overlay-tag">👥 Cộng đồng</span>
              </div>
            </div>
          </div>
          <div className="collab-text-block">
            <div className="highlights-grid">
              {COLLAB_SECTIONS[1].highlights.map((highlight, idx) => (
                <div key={idx} className="highlight-card">
                  <span className="highlight-number">{String(idx + 1).padStart(2, '0')}</span>
                  <p>{highlight}</p>
                </div>
              ))}
            </div>
            <a className="btn-collab secondary" href={COLLAB_SECTIONS[1].ctaHref}>
              <span>{COLLAB_SECTIONS[1].ctaLabel}</span>
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      <img className="spacer-image" src={bannerImg} alt="Trang trí kết nối" />

      {/* Section 3: Collaboration Contact */}
      <section className="collab-section contact-section" id="collaboration-contact">
        <div className="section-header">
          <span className="section-tag">Liên hệ hợp tác</span>
          <h2 className="section-title">Kết nối để cùng lan tỏa giá trị di sản</h2>
          <p className="section-subtitle">
            Chúng tôi mong muốn hợp tác cùng các tổ chức văn hoá, doanh nghiệp, đơn vị giáo dục và đối tác công nghệ để mở rộng tác động xã hội của triển lãm.
          </p>
        </div>
        <div className="collab-content contact-layout">
          <div className="collab-text-block">
            <div className="highlights-grid">
              {COLLAB_SECTIONS[2].highlights.map((highlight, idx) => (
                <div key={idx} className="highlight-card">
                  <span className="highlight-number">{String(idx + 1).padStart(2, '0')}</span>
                  <p>{highlight}</p>
                </div>
              ))}
            </div>
            <div className="contact-form-wrapper">
              <h3 className="form-title">Đăng ký nhận tư vấn</h3>
              <form className="collab-form enhanced" onSubmit={handleCollabSubmit} noValidate>
                <label className="sr-only" htmlFor="collab-email">
                  Email liên hệ
                </label>
                <div className="collab-form-row">
                  <input
                    id="collab-email"
                    type="email"
                    name="email"
                    placeholder="Nhập email của bạn"
                    value={collabEmail}
                    onChange={handleCollabEmailChange}
                    autoComplete="email"
                    aria-describedby="collab-email-help"
                    aria-invalid={collabError ? 'true' : 'false'}
                    required
                  />
                  <button type="submit" className="btn-collab submit">
                    <span>Gửi liên hệ</span>
                    <span className="arrow">✉</span>
                  </button>
                </div>
                <div className="collab-form-feedback" id="collab-email-help" aria-live="polite">
                  {collabError && <span className="error-message">⚠ {collabError}</span>}
                  {!collabError && collabStatus && <span className="success-message">✓ {collabStatus}</span>}
                </div>
              </form>
            </div>
          </div>
          <div className="collab-media-block">
            <div className="media-frame-enhanced">
              <img src={COLLAB_SECTIONS[2].image} alt={`${COLLAB_SECTIONS[2].eyebrow} minh họa`} />
              <div className="media-overlay">
                <span className="overlay-tag">🤝 Hợp tác</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <img className="spacer-image" src={bannerImg} alt="Trang trí kết nối" />
    </div>
  );
};

export default Home;
