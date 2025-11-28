"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, animate, useInView } from "framer-motion";
import { Play, Check, Music, Star, ChevronRight, Handshake, Calculator, Calendar, Users, Youtube, CheckCircle2, Video, Film, Camera, Mic2, PlayCircle, Info, Zap, Heart, Crown, Sparkles, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// --- [데이터 1] 뮤지컬 웨딩 데이터 (영상 + 레퍼토리) ---
const musicalData = {
    2: {
        videos: [
            { id: 1, title: "2인 오프닝: A Whole New World", img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920&auto=format&fit=crop" },
            { id: 2, title: "2인 행진: Can't Stop the Feeling", img: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1920&auto=format&fit=crop" },
            { id: 3, title: "2인 축가: 사랑의 서약", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1920&auto=format&fit=crop" },
            { id: 4, title: "2인 신랑입장: 위대한 쇼맨", img: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1920&auto=format&fit=crop" },
        ],
        repertoire: {
            "오프닝": [
                { title: "A Whole New World (알라딘)", url: "https://www.youtube.com/results?search_query=축가+A+Whole+New+World" },
                { title: "Love is an Open Door (겨울왕국)", url: "https://www.youtube.com/results?search_query=축가+Love+is+an+Open+Door" }
            ],
            "신랑입장": [
                { title: "The Greatest Show (위대한 쇼맨)", url: "https://www.youtube.com/results?search_query=신랑입장+The+Greatest+Show" },
                { title: "Viva La Vida (콜드플레이)", url: "https://www.youtube.com/results?search_query=신랑입장+Viva+La+Vida" }
            ],
            "신부입장": [
                { title: "Beauty and the Beast (미녀와 야수)", url: "https://www.youtube.com/results?search_query=신부입장+Beauty+and+the+Beast" },
                { title: "Part of Your World (인어공주)", url: "https://www.youtube.com/results?search_query=신부입장+Part+of+Your+World" }
            ],
            "축가": [
                { title: "사랑의 서약", url: "https://www.youtube.com/results?search_query=뮤지컬축가+사랑의서약" },
                { title: "지금 이 순간 (지킬 앤 하이드)", url: "https://www.youtube.com/results?search_query=뮤지컬축가+지금이순간" }
            ],
            "행진": [
                { title: "Can't Stop the Feeling (트롤)", url: "https://www.youtube.com/results?search_query=결혼식행진+Cant+Stop+the+Feeling" },
                { title: "10월의 어느 멋진 날에", url: "https://www.youtube.com/results?search_query=축가+10월의어느멋진날에" }
            ]
        }
    },
    4: {
        videos: [
            { id: 1, title: "4인 오프닝: Seasons of Love", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1920&auto=format&fit=crop" },
            { id: 2, title: "4인 웅장한 행진: This is Me", img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1920&auto=format&fit=crop" },
            { id: 3, title: "4인 축가: 지금 이 순간", img: "https://images.unsplash.com/photo-1459749411177-287ce328810e?q=80&w=1920&auto=format&fit=crop" },
            { id: 4, title: "4인 플라워 샤워 연출", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" },
        ],
        repertoire: {
            "오프닝": [
                { title: "Seasons of Love (렌트)", url: "https://www.youtube.com/results?search_query=뮤지컬웨딩+Seasons+of+Love" },
                { title: "One Day More (레미제라블)", url: "https://www.youtube.com/results?search_query=뮤지컬웨딩+One+Day+More" }
            ],
            "신랑입장": [
                { title: "This Is Me (위대한 쇼맨)", url: "https://www.youtube.com/results?search_query=신랑입장+This+Is+Me" },
                { title: "Believer (이매진 드래곤스)", url: "https://www.youtube.com/results?search_query=신랑입장+Believer" }
            ],
            "신부입장": [
                { title: "Can't Help Falling in Love (올슉업)", url: "https://www.youtube.com/results?search_query=신부입장+Can%27t+Help+Falling+in+Love" },
                { title: "A Thousand Years (트와일라잇)", url: "https://www.youtube.com/results?search_query=신부입장+A+Thousand+Years" }
            ],
            "축가": [
                { title: "지금 이 순간 (지킬 앤 하이드)", url: "https://www.youtube.com/results?search_query=뮤지컬축가+지금이순간+4인" },
                { title: "You Raise Me Up", url: "https://www.youtube.com/results?search_query=뮤지컬축가+You+Raise+Me+Up" }
            ],
            "행진": [
                { title: "Dancing Queen (맘마미아)", url: "https://www.youtube.com/results?search_query=결혼식행진+Dancing+Queen" },
                { title: "Waterloo", url: "https://www.youtube.com/results?search_query=결혼식행진+Waterloo" }
            ]
        }
    }
};

// --- [데이터 2] 추천 구성 레시피 ---
const RECOMMENDED_PLANS = [
    {
        id: 1,
        badge: "가성비 BEST",
        title: "임팩트 구성",
        items: ["오프닝", "행진"],
        desc: "예식의 시작과 끝을 웅장하게 책임집니다. 합리적인 비용으로 뮤지컬 웨딩의 맛을 살리고 싶은 분께 추천합니다.",
        icon: Zap,
        color: "text-yellow-400"
    },
    {
        id: 2,
        badge: "감동 추천",
        title: "감동 구성",
        items: ["오프닝", "축가"],
        desc: "분위기를 띄우는 오프닝과 감동적인 축가의 조화. 식순 중간에 루즈해질 틈 없이 한편의 공연 같은 흐름을 만듭니다.",
        icon: Heart,
        color: "text-pink-400"
    },
    {
        id: 3,
        badge: "강력 추천",
        title: "주인공 구성",
        items: ["오프닝", "신랑입장", "신부입장"],
        desc: "오직 두 분만을 위한 스포트라이트. 웅장한 오프닝에 이어지는 드라마틱한 입장 퍼포먼스로 영화 속 주인공이 되어보세요.",
        icon: Star,
        color: "text-amber-400"
    },
    {
        id: 4,
        badge: "쏘뉴 시그니처",
        title: "스토리텔링 구성",
        items: ["오프닝", "신랑입장", "신부입장", "행진"],
        desc: "기승전결이 완벽한 한 편의 영화. 예식의 시작부터 마지막 행진까지, 끊김 없이 이어지는 음악과 연출을 경험하세요.",
        icon: Crown,
        color: "text-purple-400"
    }
];

export default function MusicalWeddingPage() {
    const [memberCount, setMemberCount] = useState<2 | 4>(2);
    const [selectedScenes, setSelectedScenes] = useState<string[]>(["오프닝", "행진"]);

    const scenes = ["오프닝", "신랑입장", "신부입장", "축가", "행진"];

    // --- 가격 계산 로직 ---
    const calculateTotal = () => {
        const count = selectedScenes.length;
        if (count === 0) return { original: 0, final: 0 };

        let original = 0;
        let final = 0;

        if (memberCount === 2) {
            if (count <= 2) { original = 600000; final = 450000; }
            else if (count <= 3) { original = 700000; final = 500000; }
            else { original = 800000; final = 550000; }
        }
        else if (memberCount === 4) {
            if (count <= 2) { original = 1200000; final = 650000; }
            else if (count <= 3) { original = 1400000; final = 750000; }
            else { original = 1600000; final = 800000; }
        }
        return { original, final };
    };

    const { original, final } = calculateTotal();

    // --- 카운트업 애니메이션을 위한 Ref 및 State ---
    const priceRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(priceRef, { once: false }); // 뷰포트에 들어올 때마다 애니메이션 실행

    useEffect(() => {
        const node = priceRef.current;
        if (node && isInView) {
            const controls = animate(0, final, {
                duration: 1.2, // 애니메이션 지속 시간
                ease: "easeOut", // 부드러운 감속 효과
                onUpdate: (value) => {
                    node.textContent = new Intl.NumberFormat('ko-KR').format(Math.floor(value));
                },
            });
            return () => controls.stop();
        } else if (node && !isInView) {
            // 뷰포트에서 벗어나면 0으로 초기화 (다시 들어올 때 처음부터 시작)
            node.textContent = "0";
        }
    }, [final, isInView]); // final 값이 바뀌거나 뷰포트에 들어올 때 실행

    const toggleScene = (scene: string) => {
        setSelectedScenes(prev =>
            prev.includes(scene) ? prev.filter(s => s !== scene) : [...prev, scene]
        );
    };

    const applyRecommendedPlan = (count: 2 | 4, items: string[]) => {
        setMemberCount(count);
        setSelectedScenes(items);
        const calculatorSection = document.getElementById("calculator-section");
        if (calculatorSection) {
            calculatorSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-[#111111] text-[#f5f5f5] font-sans selection:bg-amber-500/30">

            {/* 1. Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop"
                        alt="Musical Wedding"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#111111]" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-amber-400 font-medium tracking-[0.2em] mb-6 text-sm md:text-base uppercase"
                    >
                        SoNew Cinematic Wedding
                    </motion.p>

                    {/* 샤인 이펙트 적용된 타이틀 */}
                    <div className="relative inline-block mb-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight font-serif relative z-10"
                        >
                            영화 속 주인공처럼,<br />
                            <span className="text-amber-400 italic">Musical Wedding</span>
                        </motion.h1>
                        {/* 빛이 지나가는 효과 (Shine Effect) */}
                        <motion.div
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={{ x: "100%", opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 z-20 pointer-events-none h-full w-full"
                        />
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="text-gray-300 text-lg md:text-xl font-light"
                    >
                        평생 잊지 못할 오프닝부터 행진까지. 쏘뉴웨딩 시그니처 연출.
                    </motion.p>
                </div>
            </section>

            {/* 2. Storytelling Sections */}
            <section className="py-24 px-4 bg-[#111111]">
                <div className="max-w-6xl mx-auto space-y-32">

                    {/* Section 2-1: The Protagonist */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <div className="flex items-center gap-2 text-amber-400 mb-4">
                                <Film className="w-5 h-5" />
                                <span className="text-sm font-bold tracking-widest uppercase">The Protagonist</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-snug">
                                오늘, 당신의 인생은<br />
                                <span className="text-amber-400">한 편의 영화</span>가 됩니다.
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                조명이 켜지고 음악이 흐르면, 버진로드는 무대가 됩니다.<br />
                                평범한 입장이 아닌, 가장 드라마틱한 등장을 연출하세요.
                            </p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[400px] rounded-2xl overflow-hidden border border-gray-800">
                            <img
                                src="https://images.unsplash.com/photo-1481653125770-b78c206c59d4?q=80&w=2070&auto=format&fit=crop"
                                alt="Cinematic Wedding"
                                className="absolute inset-0 w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-60"></div>
                        </motion.div>
                    </div>

                    {/* Section 2-2: Guest Experience */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[400px] rounded-2xl overflow-hidden border border-gray-800 order-2 md:order-1">
                            <img
                                src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
                                alt="Happy Guests"
                                className="absolute inset-0 w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-black/20"></div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 md:order-2">
                            <div className="flex items-center gap-2 text-amber-400 mb-4">
                                <Camera className="w-5 h-5" />
                                <span className="text-sm font-bold tracking-widest uppercase">Guest Experience</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-snug">
                                하객들이 시계를 보는 예식<br />
                                <span className="text-gray-500 text-2xl align-middle mx-2">vs</span><br />
                                <span className="text-amber-400">카메라를 꺼내는 예식</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                남들과 똑같은 결혼식은 기억되지 않습니다.<br />
                                4명의 배우가 만드는 웅장한 하모니와 플라워 샤워.<br />
                                하객들에게 지루한 순서 대신 '브로드웨이 티켓'을 선물하세요.
                            </p>
                        </motion.div>
                    </div>

                    {/* Section 2-3: The Perfect Team (이미지 확실하게 교체!) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <div className="flex items-center gap-2 text-amber-400 mb-4">
                                <Mic2 className="w-5 h-5" />
                                <span className="text-sm font-bold tracking-widest uppercase">The Perfect Team</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-snug">
                                완벽한 공연에는,<br />
                                완벽한 <span className="text-amber-400">'지휘자'</span>가 필요합니다.
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                배우들의 동선, 음악 타이밍, 호응 유도까지.<br />
                                쏘뉴웨딩 전문 사회자는 뮤지컬 팀을 지휘하는 연출가입니다.
                            </p>
                            <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2">
                                    <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                                </div>
                                <p className="text-amber-200 font-medium">
                                    "쏘뉴 사회자와 함께 섭외하시면,<br />
                                    완벽한 호흡은 더하고 <span className="text-amber-400 font-bold underline decoration-wavy underline-offset-4">비용은 5만원 더 가볍게</span> 해드립니다."
                                </p>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[400px] rounded-2xl overflow-hidden border border-gray-800">
                            {/* 마이크 잡은 손 이미지 (안정적인 img 태그 사용) */}
                            <img
                                src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                                alt="Director Microphone"
                                className="absolute inset-0 w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-black/20"></div>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* 3. Repertoire: 5개 구성 + 3곡 추천 멘트 */}
            <section className="py-24 px-4 bg-[#161616]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-amber-400 text-sm font-bold tracking-widest mb-3 uppercase">Repertoire</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">뮤지컬 웨딩 5대 레퍼토리</h3>

                        {/* 3곡 추천 멘트 */}
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 max-w-2xl mx-auto mt-6 flex items-start gap-3 text-left">
                            <Info className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                            <div>
                                <p className="text-amber-200 font-bold mb-1">💡 쏘뉴의 Tip: "과유불급(過猶不及)"</p>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    식순 전체를 뮤지컬로 채우기보다, <span className="text-white font-bold underline">가장 임팩트 있는 3가지 순서</span>를 선택하는 것이 하객들의 몰입도에 가장 좋습니다.<br />
                                    (예: 오프닝 + 축가 + 행진) 지루하지 않은, 완벽한 호흡을 선물하세요.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 mb-16">
                        <button onClick={() => setMemberCount(2)} className={`px-6 py-3 rounded-full text-lg font-bold transition-all ${memberCount === 2 ? "bg-amber-500 text-black" : "bg-[#222] text-gray-500"}`}>2인 (실속형)</button>
                        <button onClick={() => setMemberCount(4)} className={`px-6 py-3 rounded-full text-lg font-bold transition-all ${memberCount === 4 ? "bg-amber-500 text-black" : "bg-[#222] text-gray-500"}`}>4인 (웅장형)</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {["오프닝", "신랑입장", "신부입장", "축가", "행진"].map((category, index) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-amber-500/50 transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                                    <Music className="w-5 h-5" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-4">{category}</h4>
                                <ul className="space-y-3">
                                    {/* 수정됨: repertoire 데이터 구조에 맞게 접근 */}
                                    {musicalData[memberCount].repertoire[category as keyof typeof musicalData[2]['repertoire']].map((song, i) => (
                                        <li key={i} className="text-gray-400 text-sm">
                                            <Link href={song.url} target="_blank" className="flex items-start gap-2 hover:text-amber-400 transition-colors group/link">
                                                <PlayCircle className="w-4 h-4 mt-0.5 shrink-0 text-amber-500 group-hover/link:scale-110 transition-transform" />
                                                <span>{song.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Recommendation (NEW): 추천 레시피 섹션 (듀얼 버튼) */}
            <section className="py-24 px-4 bg-[#111111] border-b border-gray-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-amber-400 text-sm font-bold tracking-widest mb-3 uppercase">SoNew Recipe</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">
                            어떤 <span className="text-amber-400">구성</span>을 선택할지 <span className="text-amber-400">고민</span>되시나요?
                        </h3>
                        <p className="text-gray-400">수많은 신랑신부님이 선택한, 실패 없는 쏘뉴의 추천 조합을 만나보세요.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {RECOMMENDED_PLANS.map((plan, index) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 flex flex-col hover:border-amber-500/50 transition-all group"
                            >
                                <div className="mb-4">
                                    <span className={`text-xs font-bold px-2 py-1 rounded bg-gray-800 ${plan.color} border border-gray-700`}>
                                        {plan.badge}
                                    </span>
                                </div>
                                <div className={`w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${plan.color}`}>
                                    <plan.icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">{plan.title}</h4>
                                <p className="text-sm text-amber-500 font-medium mb-4">{plan.items.join(" + ")}</p>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                                    {plan.desc}
                                </p>
                                <div className="flex flex-col gap-2 mt-auto">
                                    <button
                                        onClick={() => applyRecommendedPlan(2, plan.items)}
                                        className="w-full py-3 rounded-lg bg-[#222] text-cyan-400 font-bold text-sm hover:bg-cyan-400 hover:text-black transition-all flex items-center justify-center gap-2 border border-cyan-900 hover:border-cyan-400"
                                    >
                                        <Users className="w-4 h-4" /> 2인(실속) 견적보기
                                    </button>
                                    <button
                                        onClick={() => applyRecommendedPlan(4, plan.items)}
                                        className="w-full py-3 rounded-lg bg-[#222] text-amber-400 font-bold text-sm hover:bg-amber-500 hover:text-black transition-all flex items-center justify-center gap-2 border border-amber-900 hover:border-amber-500"
                                    >
                                        <Users className="w-4 h-4" /> 4인(웅장) 견적보기
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Pricing Calculator: 투명한 실시간 견적 */}
            <section id="calculator-section" className="py-32 px-4 bg-[#1a1a1a]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4 text-amber-400">투명한 실시간 견적</h2>
                        <p className="text-gray-400">투명한 정찰제, 쏘뉴 사회자와 함께라면 더 합리적입니다.</p>
                    </div>

                    <div className="bg-[#111] rounded-3xl border border-gray-800 p-6 md:p-10 shadow-2xl relative overflow-hidden">
                        {/* 배경 장식 */}
                        <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-20">
                            <Calculator className="w-32 h-32 text-gray-800" />
                        </div>

                        {/* Step 1: 인원 선택 */}
                        <div className="mb-10 relative z-10">
                            <h3 className="text-amber-400 font-bold text-sm tracking-widest uppercase mb-4">STEP 1. 인원 구성 선택</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => { setMemberCount(2); }}
                                    className={`p-6 rounded-xl border transition-all relative text-left ${memberCount === 2
                                        ? "bg-cyan-900/20 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                                        : "bg-[#222] border-transparent text-gray-400 hover:bg-[#2a2a2a] hover:border-gray-700"
                                        }`}
                                >
                                    {memberCount === 2 && <div className="absolute top-4 right-4"><CheckCircle2 className="w-5 h-5" /></div>}
                                    <span className="block text-xl font-bold mb-2">2인 (실속형)</span>
                                    <span className="text-sm opacity-70 block">가성비 최고의 구성 (45만원~)</span>
                                </button>

                                <button
                                    onClick={() => { setMemberCount(4); }}
                                    className={`p-6 rounded-xl border transition-all relative text-left ${memberCount === 4
                                        ? "bg-amber-900/20 border-amber-500 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                                        : "bg-[#222] border-transparent text-gray-400 hover:bg-[#2a2a2a] hover:border-gray-700"
                                        }`}
                                >
                                    {memberCount === 4 && <div className="absolute top-4 right-4"><CheckCircle2 className="w-5 h-5" /></div>}
                                    <span className="block text-xl font-bold mb-2">4인 (웅장형)</span>
                                    <span className="text-sm opacity-70 block">압도적인 스케일과 사운드 (65만원~)</span>
                                </button>
                            </div>
                        </div>

                        {/* Step 2: 식순 선택 */}
                        <div className="mb-10 relative z-10">
                            <h3 className="text-amber-400 font-bold text-sm tracking-widest uppercase mb-4">STEP 2. 식순 선택 (복수 선택 가능)</h3>
                            <div className="flex flex-wrap gap-3">
                                {scenes.map((scene) => (
                                    <button
                                        key={scene}
                                        onClick={() => toggleScene(scene)}
                                        className={`px-5 py-3 rounded-full border text-sm font-medium transition-all ${selectedScenes.includes(scene)
                                            ? `bg-white text-black border-white shadow-lg ${memberCount === 2 ? 'shadow-cyan-200/20' : 'shadow-amber-200/20'}`
                                            : "bg-[#222] text-gray-400 border-gray-700 hover:border-gray-500"
                                            }`}
                                    >
                                        {scene}
                                    </button>
                                ))}
                            </div>
                            <p className="mt-4 text-xs text-gray-500">
                                * 현재 선택된 식순: <span className="text-white font-bold">{selectedScenes.length}개</span>
                            </p>
                        </div>

                        {/* Total Price & Benefit */}
                        <div className="border-t border-gray-700 pt-8 flex flex-col items-center gap-6 relative z-10">
                            <p className="text-gray-400 text-sm mb-1">예상 견적 (사회자 포함 할인가)</p>

                            <div className="flex items-end gap-4 justify-center">
                                {/* 정가 표시 (커짐) */}
                                <span className="text-2xl text-gray-600 line-through decoration-red-500 decoration-2 mb-2">
                                    {original.toLocaleString()}원
                                </span>
                                {/* 할인가 표시 (빛나는 효과 + 카운트업 애니메이션) */}
                                <div className={`text-6xl md:text-7xl font-bold font-serif ${memberCount === 2 ? 'text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]' : 'text-amber-400 drop-shadow-[0_0_25px_rgba(251,191,36,0.6)]'}`}>
                                    <span ref={priceRef}>{final.toLocaleString()}</span> <span className="text-3xl font-normal text-gray-500">원</span>
                                </div>
                            </div>

                            {/* 할인 혜택 강조 & 사회자 버튼 */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="bg-red-500/10 border border-red-500/50 rounded-full px-6 py-2 flex items-center gap-2 animate-pulse">
                                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">추천!</span>
                                    <p className="text-sm text-red-200">
                                        쏘뉴웨딩 전문사회자 함께 섭외 시 <span className="font-bold text-white">5만원 추가 할인</span> 됩니다.
                                    </p>
                                </div>

                                {/* 사회자 보러가기 버튼 (크게 강조) */}
                                <Link href="#" className={`flex items-center justify-center gap-2 text-base font-bold px-8 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 ${memberCount === 2 ? 'bg-cyan-400 text-black hover:bg-cyan-300 shadow-cyan-400/20' : 'bg-amber-400 text-black hover:bg-amber-300 shadow-amber-400/20'}`}>
                                    <Mic2 className="w-5 h-5" /> 🎙️ 쏘뉴웨딩 전문 사회자 보러가기 <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 6. CTA Section */}
            <section className="py-32 px-4 bg-gradient-to-t from-black to-[#161616] text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6 leading-tight">
                        당신의 결혼식이<br />
                        <span className="text-amber-400">한 편의 영화</span>가 되는 순간
                    </h2>
                    <p className="text-gray-400 text-lg mb-10">
                        쏘뉴웨딩 뮤지컬 팀과 함께 당신만의 장면을 만드세요.
                    </p>

                    <Link
                        href="#"
                        className="inline-flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#FEE500]/90 text-[#3c1e1e] font-bold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-amber-400/10"
                    >
                        <Calendar className="w-5 h-5" />
                        스케줄 및 견적 문의하기
                    </Link>
                </div>
            </section>

            {/* Cinematic Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50">
                <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            </div>
        </div>
    );
}
// 파일 끝