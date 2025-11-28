"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Solution() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            containerRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
            }
        );
    }, []);

    return (
        <section ref={sectionRef} className="py-32 bg-stone-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <span className="text-amber-500 font-bold tracking-wider uppercase text-sm">Special Offer</span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 text-stone-800">
                        쏘뉴웨딩만의<br />특별한 제안
                    </h2>
                </div>

                <div ref={containerRef} className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                    {/* Standard Option */}
                    <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-stone-200 text-center opacity-70 scale-95 hover:opacity-100 transition-opacity">
                        <h3 className="text-xl font-bold text-stone-500 mb-4">일반 축가 섭외</h3>
                        <div className="text-3xl font-bold text-stone-400 line-through mb-2">250,000원</div>
                        <p className="text-stone-500 mb-6">평균 시세</p>
                        <ul className="text-left space-y-3 text-stone-500 text-sm">
                            <li className="flex items-center"><span className="mr-2">✓</span> 검증 어려운 실력</li>
                            <li className="flex items-center"><span className="mr-2">✓</span> 사회자와 별도 소통 필요</li>
                            <li className="flex items-center"><span className="mr-2">✓</span> 돌발 상황 대처 미흡</li>
                        </ul>
                    </div>

                    {/* Bundle Option */}
                    <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl border-2 border-amber-400 shadow-2xl text-center relative transform md:scale-105 z-10">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg tracking-wide">
                            BEST CHOICE
                        </div>
                        <h3 className="font-serif text-3xl font-bold text-stone-800 mb-4">전문 사회자 + 축가 번들</h3>
                        <div className="flex justify-center items-end gap-2 mb-2">
                            <span className="text-5xl font-bold text-red-500">200,000원</span>
                            <span className="text-sm text-stone-500 mb-2">(5만원 즉시 할인)</span>
                        </div>
                        <p className="text-amber-600 font-medium mb-8">쏘뉴가 검증한 실력파 가수</p>

                        <ul className="text-left space-y-4 text-stone-700 mb-8">
                            <li className="flex items-center"><span className="text-amber-500 mr-2 font-bold">✓</span> 쏘뉴 공식 인증 가수 섭외</li>
                            <li className="flex items-center"><span className="text-amber-500 mr-2 font-bold">✓</span> 사회자와 완벽한 호흡</li>
                            <li className="flex items-center"><span className="text-amber-500 mr-2 font-bold">✓</span> 식순 기획 무료 컨설팅</li>
                        </ul>

                        <button className="w-full bg-amber-400 text-white font-bold py-4 rounded-xl hover:bg-amber-500 transition-colors shadow-lg text-lg">
                            상담하고 할인받기
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
