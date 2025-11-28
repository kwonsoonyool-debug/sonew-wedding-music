"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Check, Music, Star, ChevronRight, Handshake, Heart, Sparkles, Calculator, Calendar, Mic2, Users, Youtube, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// --- [데이터 1] 1인 가수 (링크 + 레퍼토리 통합) ---
const singers = [
  {
    id: 1,
    name: "보컬 어민",
    role: "감성 발라더",
    image: "/singer_igo.png",
    tags: ["#성시경_스타일", "#감미로운", "#고막남친"],
    songs: [
      { title: "너의 모든 순간", url: "https://www.youtube.com/results?search_query=너의모든순간+축가" },
      { title: "내게 사랑이 뭐냐고 물으신다면", url: "https://www.youtube.com/results?search_query=내게사랑이뭐냐고물으신다면+축가" }
    ],
    repertoire: [
      "너의 모든 순간 (성시경)",
      "내게 사랑이 뭐냐고 물으신다면 (로이킴)",
      "좋겠다 (스윗소로우)",
      "감사 (김동률)",
      "이젠 나만 믿어요 (임영웅)",
      "아로하 (쿨)",
      "오르막길 (윤종신)",
      "두사람 (성시경)",
      "라라라 (SG워너비)",
      "지금 이 순간 (지킬앤하이드)",
      "그대를 사랑하는 10가지 이유 (이석준)"
    ]
  },
  {
    id: 2,
    name: "Coming Soon",
    role: "New Artist",
    image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop",
    tags: ["#공개예정", "#새로운_목소리", "#기대해주세요"],
    songs: [],
    repertoire: ["공개 예정입니다."]
  },
  {
    id: 3,
    name: "Coming Soon",
    role: "New Artist",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    tags: ["#공개예정", "#새로운_목소리", "#기대해주세요"],
    songs: [],
    repertoire: ["공개 예정입니다."]
  },
];

// --- [데이터 2] 뮤지컬 데이터 ---
const musicalScenes = [
  { id: 1, scene: "오프닝", title: "Seasons of Love", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1920&auto=format&fit=crop" },
  { id: 2, scene: "신랑입장", title: "The Greatest Show", img: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1920&auto=format&fit=crop" },
  { id: 3, scene: "신부입장", title: "Beauty and the Beast", img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop" },
  { id: 4, scene: "축가", title: "지금 이 순간", img: "https://images.unsplash.com/photo-1459749411177-287ce328810e?q=80&w=1920&auto=format&fit=crop" },
  { id: 5, scene: "행진", title: "Can't Stop the Feeling", img: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1920&auto=format&fit=crop" }
];

const musicalRepertoires = [
  {
    category: "뮤지컬 오프닝",
    mainSongs: [
      { title: "Seasons of Love", url: "https://www.youtube.com/results?search_query=Seasons+of+Love+축가" },
      { title: "A Whole New World", url: "https://www.youtube.com/results?search_query=A+Whole+New+World+축가" }
    ],
    songs: ["Seasons of Love", "A Whole New World", "Love is an Open Door", "One Day More", "좋다"]
  },
  {
    category: "뮤지컬 신랑입장",
    mainSongs: [
      { title: "The Greatest Show", url: "https://www.youtube.com/results?search_query=The+Greatest+Show+신랑입장" },
      { title: "Viva La Vida", url: "https://www.youtube.com/results?search_query=Viva+La+Vida+신랑입장" }
    ],
    songs: ["The Greatest Show", "Viva La Vida", "Believer", "Sky Full of Stars", "Good Old Days"]
  },
  {
    category: "뮤지컬 신부입장",
    mainSongs: [
      { title: "Beauty and the Beast", url: "https://www.youtube.com/results?search_query=Beauty+and+the+Beast+신부입장" },
      { title: "Part of Your World", url: "https://www.youtube.com/results?search_query=Part+of+Your+World+신부입장" }
    ],
    songs: ["Beauty and the Beast", "Part of Your World", "Reflection", "A Thousand Years", "She"]
  },
  {
    category: "뮤지컬 축가",
    mainSongs: [
      { title: "지금 이 순간", url: "https://www.youtube.com/results?search_query=지금이순간+축가" },
      { title: "사랑의 서약", url: "https://www.youtube.com/results?search_query=사랑의서약+축가" }
    ],
    songs: ["지금 이 순간", "사랑의 서약", "The Prayer", "All I Ask of You", "10월의 어느 멋진 날에"]
  },
  {
    category: "뮤지컬 행진",
    mainSongs: [
      { title: "Can't Stop the Feeling", url: "https://www.youtube.com/results?search_query=Cant+Stop+the+Feeling+행진" },
      { title: "This Is Me", url: "https://www.youtube.com/results?search_query=This+Is+Me+행진" }
    ],
    songs: ["Can't Stop the Feeling", "This Is Me", "Sugar", "Uptown Funk", "Happy"]
  }
];

export default function SoNewWeddingSingerPage() {
  const [memberCount, setMemberCount] = useState<1 | 2 | 4>(1);

  const [selectedScenes, setSelectedScenes] = useState<string[]>(["축가"]);

  const scenes = ["오프닝", "신랑입장", "신부입장", "축가", "행진"];

  // --- [가격 계산 로직] ---
  const calculateTotal = () => {
    const count = selectedScenes.length;
    if (count === 0) return { original: 0, final: 0 };

    let original = 0;
    let final = 0;

    if (memberCount === 1) {
      // 1인: 1곡 25만 (정가 30만), 추가 시 +10만
      original = 300000 + (count - 1) * 100000;
      final = 250000 + (count - 1) * 100000;
    }
    else if (memberCount === 2) {
      // 2인 뮤지컬
      if (count <= 2) {
        original = 600000; final = 450000;
      } else if (count <= 3) {
        original = 700000; final = 500000;
      } else {
        original = 800000; final = 550000;
      }
    }
    else if (memberCount === 4) {
      // 4인 뮤지컬
      if (count <= 2) {
        original = 1200000; final = 650000;
      } else if (count <= 3) {
        original = 1400000; final = 750000;
      } else {
        original = 1600000; final = 800000;
      }
    }

    return { original, final };
  };

  const { original, final } = calculateTotal();

  const toggleScene = (scene: string) => {
    setSelectedScenes(prev =>
      prev.includes(scene) ? prev.filter(s => s !== scene) : [...prev, scene]
    );
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#f5f5f5] font-sans selection:bg-amber-500/30">

      {/* 1. Hero Section: (대표님 요청 문구 복구) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
            alt="Wedding Hall"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#111111]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-amber-400 font-medium tracking-[0.2em] mb-6 text-sm md:text-base uppercase"
          >
            THE LAST PIECE OF PERFECTION
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 font-serif"
          >
            당신의 결혼식을 완성하는<br />
            마지막 감동, <span className="text-amber-400">쏘뉴웨딩 축가</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-gray-300 text-lg md:text-xl font-light"
          >
            가장 아름다운 순간, 그 깊이를 더해줄 쏘뉴웨딩만의 보이스.
          </motion.p>


        </div>

        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 z-20"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-widest uppercase">Scroll</span>
            <ChevronRight className="w-6 h-6 rotate-90" />
          </div>
        </motion.div>
      </section>

      {/* 1.5. Hook Section: Reality Check */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/professional_mic.png"
            alt="Professional Microphone"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="w-full max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-amber-500/20 border border-amber-500/50 rounded-full px-4 py-1 mb-6">
                <span className="text-amber-400 text-sm font-bold tracking-wider uppercase">Premium Wedding Vocal</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6 font-serif">
                결혼식 축가는 <span className="text-amber-500 italic">장기자랑</span>이<br />
                아닙니다.
              </h2>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 font-light">
                평생에 한 번뿐인 소중한 순간,<br />
                <span className="text-white font-bold">검증되지 않은 실력</span>으로 불안해하지 마세요.<br /><br />
                아마추어의 장기자랑이 아니라,<br />
                하객에게 <span className="text-amber-400 font-bold underline underline-offset-4">감동을 선물 드리는 자리</span>로 만들어 드립니다.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Storytelling: 친구 사례비 비교 & 불안감 해소 (이전 서사 유지) */}
      <section className="py-20 px-4 bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-12 items-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6 font-serif">
                친구에게 <span className="text-gray-500">부담</span> 대신<br />
                <span className="text-amber-400">하객석의 편안함</span>을 선물하세요.
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                불안정한 음정, 가사 실수, 썰렁해지는 분위기...<br />
                한 번뿐인 결혼식을 '도박'에 걸 수는 없습니다.<br /><br />
                축가는 아마추어의 장기자랑이 아닌,<br />
                <span className="text-white font-bold">아티스트의 무대</span>로 예식의 격조를 높여야 합니다.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#1a1a1a] border border-gray-800 rounded-3xl p-8 relative overflow-hidden w-full"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Calculator className="w-32 h-32 text-white" />
              </div>

              <div className="space-y-4">
                {/* 지인 섭외의 숨겨진 비용 (Exaggerated) */}
                <div className="bg-[#222] rounded-2xl border border-gray-800 p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <AlertTriangle className="w-40 h-40 text-red-500" />
                  </div>

                  <h4 className="text-xl font-bold text-gray-300 mb-6 flex items-center gap-2">
                    <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded">WARNING</span>
                    지인에게 축가 부탁 시
                  </h4>

                  <div className="space-y-4 mb-8 relative z-10">
                    <div className="flex justify-between items-center border-b border-gray-700/50 pb-3">
                      <span className="text-gray-400">현금 사례비 (국룰)</span>
                      <span className="text-white font-bold">300,000원</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-700/50 pb-3">
                      <span className="text-gray-400">식사/술자리 대접</span>
                      <span className="text-white font-bold">150,000원 + α</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-700/50 pb-3">
                      <span className="text-gray-400">정장/헤어메이크업 지원?</span>
                      <span className="text-white font-bold">100,000원?</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-700/50 pb-3">
                      <span className="text-red-400 font-bold">혹시 모를 실수에 대한 불안감</span>
                      <span className="text-red-500 font-black text-lg">측정 불가 😰</span>
                    </div>
                  </div>

                  <div className="bg-black/30 rounded-xl p-4 text-right relative z-10 border border-red-500/30">
                    <p className="text-xs text-gray-500 mb-1">예상 지출 합계</p>
                    <p className="text-3xl md:text-4xl font-black text-red-500">
                      550,000원 <span className="text-xl">+ α</span>
                    </p>
                    <p className="text-xs text-red-400 mt-2 font-bold">
                      + 평생 남을 결혼식 영상에 박제될 리스크
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. The Voices & Custom Service (대표님 요청 문구 반영) */}
      <section className="py-24 px-4 bg-[#161616]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-amber-400 text-sm font-bold tracking-widest mb-3 uppercase">Solo Artists</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white font-serif">오직 목소리 <span className="text-amber-400">톤(Tone)</span>만 보고 결정하세요.</h3>
          </div>

          {/* 커스텀 서비스 배너 (요청하신 감성적 박스) */}
          <div className="max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#222] to-[#1a1a1a] border border-amber-500/20 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Music className="w-32 h-32 text-amber-500" />
              </div>
              <div className="p-4 bg-amber-500/10 rounded-full text-amber-400 z-10">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="text-center md:text-left flex-1 z-10">
                <h4 className="text-xl font-bold text-white mb-2">"원하는 노래가 리스트에 없나요?"</h4>
                <p className="text-gray-300">
                  걱정 마세요. 쏘뉴웨딩에선 당신만을 위해<br />
                  <span className="text-amber-400 font-medium underline underline-offset-4">직접 연습하고 준비합니다.</span>
                </p>
              </div>
              <div className="px-5 py-2 bg-amber-500 text-[#111] font-bold rounded-full z-10 text-sm">
                Free Custom Service
              </div>
            </motion.div>
          </div>

          {/* 1인 가수 리스트 (링크 2개 + 레퍼토리 5개 복구) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {singers.map((singer, index) => (
              <motion.div
                key={singer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800 hover:border-amber-500/30 transition-all"
              >
                {/* 사진 */}
                <div className="relative h-72 overflow-hidden">
                  <Image src={singer.image} alt={singer.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-amber-400 text-xs font-bold mb-1">{singer.role}</p>
                    <h4 className="text-xl font-bold text-white">{singer.name}</h4>
                  </div>
                </div>

                {/* 내용 */}
                <div className="p-6">
                  {/* 태그 */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {singer.tags.map(tag => (
                      <span key={tag} className="text-[10px] text-gray-400 bg-[#222] px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 곡 바로 듣기 (링크 부활) */}
                  <div className="mb-6 space-y-2">
                    <p className="text-xs text-gray-500 font-bold uppercase">대표 곡 듣기</p>
                    {singer.songs.map((song, i) => (
                      <Link
                        key={i}
                        href={song.url}
                        target="_blank"
                        className="flex items-center gap-2 p-2 rounded-lg bg-[#222] hover:bg-[#333] transition-colors text-sm text-gray-300"
                      >
                        <Play className="w-3 h-3 text-amber-500" /> {song.title}
                      </Link>
                    ))}
                  </div>

                  {/* 레퍼토리 5개 (리스트 복구) */}
                  <div>
                    <p className="text-xs text-gray-500 font-bold mb-2 uppercase">Best 레파토리</p>
                    <ul className="grid grid-cols-1 gap-1">
                      {singer.repertoire.map((rep, i) => (
                        <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                          <Music className="w-3 h-3 text-gray-600" /> {rep}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>





      {/* 5. Pricing (Simple) */}
      <section className="py-24 px-4 bg-[#111111]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-amber-400 text-sm font-bold tracking-widest mb-3 uppercase">Pricing</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white font-serif">투명한 정찰제</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1인 (Solo) */}
            <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-gray-800 hover:border-amber-500/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Mic2 className="w-24 h-24 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">1인 (Solo)</h4>
              <p className="text-gray-400 text-sm mb-8">감동적인 축가 (1곡 기준)</p>

              <div className="flex items-end gap-3 mb-6">
                <span className="text-lg text-gray-500 line-through decoration-red-500 decoration-2">300,000원</span>
                <span className="text-4xl font-bold text-amber-400">250,000원</span>
              </div>

              <ul className="space-y-3 text-gray-300 text-sm border-t border-gray-800 pt-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <span>검증된 전문 싱어 1인</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <span>MR 준비 및 리허설 포함</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <span>곡 추가 시 +10만원</span>
                </li>
              </ul>
            </div>

            {/* 2인 (Duet) */}
            <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-gray-800 hover:border-amber-500/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Users className="w-24 h-24 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">2인 (Duet)</h4>
              <p className="text-gray-400 text-sm mb-8">풍성한 하모니 (남녀 듀엣 등)</p>

              <div className="flex items-end gap-3 mb-6">
                <span className="text-lg text-gray-500 line-through decoration-red-500 decoration-2">450,000원</span>
                <span className="text-4xl font-bold text-amber-400">350,000원</span>
              </div>

              <ul className="space-y-3 text-gray-300 text-sm border-t border-gray-800 pt-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <span>남녀 듀엣 / 남남 듀엣 선택 가능</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <span>화려한 퍼포먼스와 하모니</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <span>곡 추가 시 +15만원</span>
                </li>
              </ul>
            </div>
          </div>

          {/* MC Discount Notice */}
          <div className="mt-12 bg-gradient-to-r from-amber-600/20 to-amber-900/20 border border-amber-500/50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center gap-4 animate-pulse shadow-[0_0_20px_rgba(245,158,11,0.15)] text-center md:text-left">
            <div className="bg-amber-500 rounded-full p-2 shadow-lg shadow-amber-500/30 animate-bounce">
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <div>
              <p className="text-amber-400 font-bold text-lg md:text-xl">
                쏘뉴웨딩 전문 사회자와 함께 예약 시
              </p>
              <p className="text-white text-sm md:text-base mt-1">
                <span className="text-amber-300 font-bold underline underline-offset-4 decoration-amber-500 decoration-2 text-lg">5만원 추가 할인</span> 혜택을 드립니다!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-t from-black to-[#161616] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6 leading-tight">
            당신의 <span className="text-amber-400">결혼식</span>,<br />
            이제 완벽해질 시간입니다.
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            인기 있는 예식일과 시간대는 <span className="text-amber-400 font-bold">빠르게 마감됩니다.</span><br />
            내 예식일에 섭외 가능한 가수가 누구인지 지금 <span className="text-amber-400 font-bold">바로 확인하세요.</span>
          </p>

          <Link
            href="http://pf.kakao.com/_BxkaYG/chat"
            target="_blank"
            className="inline-flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#FEE500]/90 text-[#3c1e1e] font-bold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-amber-400/10 animate-pulse"
          >
            <Calendar className="w-5 h-5" />
            가능 여부 및 견적 확인하기
          </Link>
        </div>
      </section>
    </div>
  );
}
