"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Horizontal scroll effect could be added here if needed
        // For now, just simple fade in
    }, []);

    const videos = [1, 2, 3, 4]; // Placeholders

    return (
        <section className="py-32 bg-stone-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-amber-500 font-bold tracking-wider uppercase text-sm">Portfolio</span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold mt-3 text-stone-800">
                        감동의 순간을 미리 확인하세요
                    </h2>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible"
                >
                    {videos.map((v) => (
                        <div key={v} className="min-w-[280px] snap-center bg-stone-200 rounded-xl overflow-hidden aspect-[9/16] relative group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform">
                                    <span className="text-amber-500 text-2xl">▶</span>
                                </div>
                            </div>
                            <img
                                src={`https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&random=${v}`}
                                alt="Wedding Singer"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
