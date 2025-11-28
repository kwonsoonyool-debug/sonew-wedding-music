"use client";

export default function CTA() {
    return (
        <section className="py-32 bg-stone-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="container mx-auto px-4 max-w-2xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-amber-400">
                        지금 바로 상담하세요
                    </h2>
                    <p className="text-stone-300 text-lg font-light">
                        원하시는 예식 날짜와 장소를 알려주시면<br />
                        가능한 사회자/축가 리스트와 견적을 보내드립니다.
                    </p>
                </div>

                <form className="space-y-6 bg-white/5 p-10 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-stone-300 mb-2">이름</label>
                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all" placeholder="홍길동" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-stone-300 mb-2">연락처</label>
                            <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all" placeholder="010-0000-0000" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-stone-300 mb-2">예식일</label>
                            <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-stone-300 mb-2">예식 장소</label>
                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all" placeholder="서울 강남구 OOO웨딩홀" />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-amber-400 text-stone-900 font-bold py-4 rounded-xl hover:bg-amber-500 transition-colors mt-8 text-lg shadow-lg">
                        무료 상담 신청하기
                    </button>
                </form>
            </div>
        </section>
    );
}
