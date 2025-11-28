"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Problem() {
    const sectionRef = useRef(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.fromTo(
            cardsRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
            }
        );
    }, []);

    const problems = [
        {
            title: "지인 부탁의 부담",
            desc: "혹시 실수하지 않을까?\n사례비는 얼마나 줘야 할까?\n지인에게 부탁하기 미안하셨죠?"
        },
        {
            title: "검증되지 않은 실력",
            desc: "영상만 보고 믿을 수 있을까?\n현장 분위기를 망치면 어떡하지?\n불안한 마음, 이제 내려놓으세요."
        },
        {
            title: "만만치 않은 비용",
            desc: "사회자 따로, 축가 따로...\n각각 섭외하니 예산이 초과되나요?\n합리적인 가격으로 해결해드립니다."
        },
    ];

    return (
        <section ref={sectionRef} className="py-32 bg-stone-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <span className="text-amber-500 font-bold tracking-wider uppercase text-sm">Pain Points</span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 text-stone-800 leading-tight">
                        결혼식 준비,<br />이런 고민 해보셨나요?
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {problems.map((prob, i) => (
                        <div
                            key={i}
                            ref={(el) => { cardsRef.current[i] = el }}
                            className="bg-white/60 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-2"
                        >
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 text-3xl">
                                🤔
                            </div>
                            <h3 className="font-serif text-2xl font-bold mb-4 text-stone-800">{prob.title}</h3>
                            <p className="text-stone-600 whitespace-pre-line leading-relaxed">{prob.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
