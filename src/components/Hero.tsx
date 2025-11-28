"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
    const textRef = useRef(null);
    const subTextRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Background Zoom In
        gsap.fromTo(bgRef.current,
            { scale: 1.0 },
            { scale: 1.1, duration: 10, ease: "none" }
        );

        // Text Fade Up
        tl.fromTo(
            textRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 }
        ).fromTo(
            subTextRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            "-=1"
        );
    }, []);

    return (
        <section className="h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Image with Zoom Effect */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    ref={bgRef}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop')" }}
                />
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            <div className="relative z-20 text-center text-white p-4">
                <h1 ref={textRef} className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight text-amber-400 drop-shadow-lg">
                    당신의 결혼식을 완성하는<br />
                    <span className="text-white">마지막 감동</span>
                </h1>
                <p ref={subTextRef} className="text-xl md:text-2xl font-light tracking-wide text-gray-100 drop-shadow-md">
                    쏘뉴웨딩 전문 사회자 + 고품격 축가 패키지
                </p>
            </div>
        </section>
    );
}
