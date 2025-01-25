import Image from "next/image";
import gsap from "gsap";
import { useEffect } from "react";

const borderAnimation = `
  @keyframes borderAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const movingBorderAnimation = `
  @keyframes movingBorder {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 200% 0%;
    }
  }
`;

export default function HomeContainer() {
  const badgeColors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-green-500',
    'bg-orange-500',
    'bg-red-500',
  ];

  const getRandomColor = () => {
    return badgeColors[Math.floor(Math.random() * badgeColors.length)];
  };

  useEffect(() => {
    // Import and register ScrollTrigger only on client side
    const registerScrollTrigger = async () => {
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);

      // Initial animations timeline
      const tl = gsap.timeline();

      // Animasi navbar
      tl.from(".nav-item", {
        y: -50,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      });

      // Animasi foto dan badge
      tl.from(".profile-image", {
        scale: 0,
        autoAlpha: 0,
        rotation: 360,
        duration: 1,
        ease: "back.out(1.7)"
      })
      .from(".circular-badge", {
        autoAlpha: 0,
        scale: 0,
        rotation: 180,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.2)",
        clearProps: "all"
      }, "-=0.5");

      // Animasi nama
      tl.from(".name-title", {
        y: 50,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out"
      }, "-=0.3");

      // Animasi role
      tl.from(".role-title", {
        x: -50,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out"
      }, "-=0.4");

      // Animasi lokasi
      tl.from(".location-text", {
        x: 50,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out"
      }, "-=0.4");

      // Portfolio section animations
      gsap.utils.toArray('.project-card').forEach((card: any, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          },
          y: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.2
        });
      });

      // Experience cards animation
      gsap.utils.toArray('.experience-card').forEach((card: any, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          },
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });

      // Contact form animation
      gsap.from(".contact-form", {
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // Section headers animation
      gsap.utils.toArray('.section-header').forEach((header: any) => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });
    };

    registerScrollTrigger();
  }, []);

  return (
    <div className="w-full">
      <style jsx global>{`
        ${borderAnimation}
        ${movingBorderAnimation}
        
        .moving-border::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 2px solid transparent;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          background-size: 300% 300%;
          animation: movingBorder 4s linear infinite;
        }
      `}</style>

      {/* Navbar - Responsive */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-end">
            {['Portfolio', 'Experience', 'Contact'].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                className="nav-item relative px-3 sm:px-6 py-2 text-sm sm:text-base text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 group"
              >
                {item}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-[borderAnimation_3s_ease-in-out_infinite] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              </a>
            ))}
          </div>
        </div>
        {/* Bottom moving border */}
        <div className="h-[2px] bg-gradient-to-r from-blue-500 via-red-500 via-purple-500 via-red-500 to-blue-500 bg-[length:300%_100%] animate-[movingBorder_4s_linear_infinite]"></div>
      </nav>

      {/* Main Content - Responsive */}
      <div className="flex min-h-screen items-center justify-center w-full  pt-16">
        <div className="text-center relative">
          {/* Circular badges - Responsive */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px]">
            {[...Array(16)].map((_, index) => (
              <div
                key={index}
                className="circular-text absolute w-full h-full"
                style={{
                  transform: `rotate(${index * 22.5}deg)`
                }}
              >
                <span 
                  className={`
                    circular-badge
                    absolute 
                    left-1/2 
                    -translate-x-1/2 
                    -top-8 sm:-top-12 
                    ${getRandomColor()} 
                    text-white 
                    font-mono 
                    text-xs sm:text-sm 
                    px-2 sm:px-3 
                    py-0.5 sm:py-1 
                    rounded-full
                    shadow-md
                    hover:scale-110
                    transition-transform
                    duration-200
                  `}
                >
                  {['FULL', 'STACK', 'DEV', '★', 'WEB', 'EXPERT', '2025', '⚡', 'FULL', 'STACK', 'DEV', '★', 'WEB', 'EXPERT', '2024', '⚡'][index]}
                </span>
              </div>
            ))}
          </div>

          {/* Profile Image - Responsive */}
          <div className="relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] mx-auto mb-4">
            <Image
              src="/Azim.png"
              alt="Azim's photo"
              fill
              className="profile-image rounded-full object-cover border-4 border-blue-600 shadow-lg hover:shadow-2xl transition-shadow duration-300"
              priority
            />
          </div>

          {/* Name and Info - Responsive */}
          <h1 className="name-title text-center font-bold text-3xl sm:text-4xl text-blue-600 transition-colors duration-300 cursor-pointer">
            Azim
          </h1>
          <h2 className="role-title text-center text-xl sm:text-2xl text-gray-700 font-semibold mt-2">
            Software Engineer
          </h2>
          <h3 className="location-text text-center text-base sm:text-lg text-gray-500 mt-1">
            Bandung, Indonesia
          </h3>
        </div>
      </div>

      {/* Portfolio Section - Responsive */}
      <section id="portfolio" className="min-h-screen bg-gray-50 py-12 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-header text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
            Featured Projects
          </h2>
          <div className="space-y-8 sm:space-y-20">
            {[
              {
                title: "Dimedika",
                description: "Medical Record App",
                stacks: ["NestJS", "NextJS", "Mantine UI", "MongoDB"],
                image: "/dimedika.png",
                link: "https://dimedika.id",
                type: "web"
              },
              {
                title: "Triadhipa Logistic CMS",
                description: "Website for Profile Company Triadhipa Logistic",
                stacks: ["ExpressJS", "PostgreSQL", "AWS EC2", "Bootstrap"],
                image: "/trd.png",
                link: "https://trd.co.id",
                type: "web"
              },
              {
                title: "Eroses",
                description: "Web app for organization get funds from government",
                stacks: ["NextJS", "Typescript", "Material UI", "Refine UI"],
                image: "/eroses.png",
                type: "web"
              },
              {
                title: "Life by IFG",
                description: "Insurance App in IOS, Android PWA Platform for revenue and subscription product's insurance",
                stacks: ["NextJS", "Tailwind", "Redux Saga", "React Native"],
                image: "/lifeid.png",
                type: "mobile"
              },
              {
                title: "Tweakmove Pass",
                description: "Sandboxing Application for Check in gym room",
                stacks: ["ReactJS", "Redux", "Electron", "Firebase"],
                image: "/project-placeholder.jpg",
                type: "web"
              },
              {
                title: "Fishlog WMS",
                description: "Warehouse management system application for fish logistics",
                stacks: ["ReactJS", "Redux", "NodeJS", "PostgreSQL"],
                image: "/project-placeholder.jpg",
                type: "web"
              },
              {
                title: "Kata Konsumen",
                description: "CMS And blog web for internal",
                stacks: ["NextJS", "Tailwind", "Redux Saga", "MongoDB"],
                image: "/project-placeholder.jpg",
                type: "web"
              },
              {
                title: "Sherpa",
                description: "Application for sales forecasting",
                stacks: ["NestJS", "MongoDB", "VueJS", "Google Cloud"],
                image: "/project-placeholder.jpg",
                type: "web"
              }
            ].map((project, index) => (
              <div 
                key={index}
                className={`
                  project-card 
                  relative 
                  moving-border 
                  flex flex-col 
                  ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} 
                  gap-4 sm:gap-8 
                  items-center 
                  bg-white 
                  rounded-lg 
                  p-4 sm:p-6 
                  hover:shadow-xl 
                  transition-shadow 
                  duration-300
                `}
              >
                {/* Project Info */}
                <div className="flex-1 space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                    {project.link ? (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors duration-300"
                      >
                        {project.title} ↗
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stacks.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Image */}
                <div className="flex-1 w-full lg:w-auto">
                  {project.type === 'web' ? (
                    <div className="relative w-full aspect-[16/10] bg-gray-900 rounded-lg p-2">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-1 sm:h-1.5 bg-gray-800 rounded-b-lg"></div>
                      <div className="w-full h-full overflow-hidden rounded-md">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-48 sm:w-64 mx-auto aspect-[9/19] bg-gray-900 rounded-3xl p-2">
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-1 bg-gray-800 rounded-lg"></div>
                      <div className="w-full h-full overflow-hidden rounded-2xl">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Statistics Section - After Portfolio */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-header text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
            Development Impact
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                number: "8+",
                label: "Web Apps",
                description: "Production Ready",
                icon: (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                )
              },
              {
                number: "2+",
                label: "Mobile Apps",
                description: "Cross Platform",
                icon: (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                number: "3+",
                label: "Desktop Apps",
                description: "Electron Based",
                icon: (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                number: "5+",
                label: "CMS Apps",
                description: "Admin Dashboards",
                icon: (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                )
              }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center space-y-2 sm:space-y-3"
              >
                <div className="p-3 sm:p-4 bg-gray-50 rounded-full">
                  {stat.icon}
                </div>
                <span className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {stat.number}
                </span>
                <span className="font-medium text-sm sm:text-base text-gray-800">
                  {stat.label}
                </span>
                <span className="text-xs sm:text-sm text-gray-500">
                  {stat.description}
                </span>
              </div>
            ))}
          </div>

          {/* Additional Stats */}
          <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                number: "99.9%",
                label: "Uptime",
                color: "text-green-600"
              },
              {
                number: "50K+",
                label: "Active Users",
                color: "text-blue-600"
              },
              {
                number: "24/7",
                label: "Support",
                color: "text-purple-600"
              }
            ].map((metric, index) => (
              <div 
                key={index}
                className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className={`text-xl sm:text-2xl font-bold ${metric.color}`}>
                  {metric.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600 mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-header text-3xl font-bold text-center mb-12 text-gray-800">
            Work Experience
          </h2>
          <div className="space-y-8">
            {[
              {
                company: "Hanel Asia Indonesia",
                role: "Frontend Developer",
                period: "September 2024 - Jan 2025",
                responsibilities: [
                  "Slicing new design",
                  "Create Core Component",
                  "Integrate web frontend to REST API"
                ]
              },
              {
                company: "OBS Solution",
                role: "React Developer",
                period: "May - Aug 2024",
                responsibilities: [
                  "Create master data for FX Currency",
                  "Create layout multi project",
                  "Integrate service in frontend"
                ]
              },
              {
                company: "PT IFG Life (Life Insurance)",
                role: "Lead Frontend React Developer",
                period: "February 2023 - February 2024",
                responsibilities: [
                  "Review pull request for merge",
                  "Create helper, const and hooks for concrete function",
                  "Implementation animation for landing page",
                  "Build app to iOS and Android for SIT",
                  "Integrate appsflyer in web react application",
                  "Help tech lead for report to management"
                ]
              },
              {
                company: "PT Walden Global Service",
                role: "Fullstack Developer",
                period: "February 2022 - February 2023",
                responsibilities: [
                  "Analyze and fixing bug and issues in application",
                  "Slicing design figma into react app",
                  "Integrate to service backend and implementation business flow",
                  "Deploy application to staging or build react app to desktop",
                  "Build Rest API for provide frontend"
                ]
              }
            ].map((exp, index) => (
              <div 
                key={index}
                className="experience-card bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                      {exp.company}
                    </h3>
                    <p className="text-blue-600 font-medium text-lg">{exp.role}</p>
                  </div>
                  <span className="mt-2 md:mt-0 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-3">
                  {exp.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Responsive */}
      <section id="contact" className="min-h-screen bg-gray-50 py-12 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="section-header text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
            Contact Me
          </h2>
          <div className="contact-form bg-white rounded-lg shadow-lg p-4 sm:p-8 space-y-6 sm:space-y-8">
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Phone */}
              <div className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <a href="tel:+62895323496371" className="text-blue-600 hover:text-blue-700">
                      +62 895 3234 96371
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <a href="mailto:budazimbud@gmail.com" className="text-blue-600 hover:text-blue-700">
                      budazimbud@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Location</h3>
                    <p className="text-gray-600">Soreang Kab Bandung, Indonesia</p>
                  </div>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">LinkedIn</h3>
                    <a 
                      href="https://linkedin.com/in/azim-dot" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:text-blue-700"
                    >
                      linkedin.com/in/azim-dot
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="space-y-4 sm:space-y-6 mt-6 sm:mt-8">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm sm:text-base"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer - Responsive */}
      <footer className="bg-gray-50 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm sm:text-base text-gray-600">Built with</span>
              <div className="flex items-center px-2 sm:px-3 py-1 bg-blue-100 rounded-full">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="text-xs sm:text-sm text-blue-600 font-medium">Editor Cursor</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm sm:text-base text-gray-600">Powered by</span>
              <div className="flex items-center px-2 sm:px-3 py-1 bg-purple-100 rounded-full">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-xs sm:text-sm text-purple-600 font-medium">Claude-3.5</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
            © {new Date().getFullYear()} All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
}
