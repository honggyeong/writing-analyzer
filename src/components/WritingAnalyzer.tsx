import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileText, Brain, Zap, Target, BookOpen, CheckCircle } from 'lucide-react';

interface AnalysisResult {
  vocabDiversity: number;
  sentenceLength: number;
  expressiveness: number;
  logicalStructure: number;
  creativity: number;
  totalScore: number;
  totalWords: number;
  totalSentences: number;
  avgSentenceLength: number;
}

const WritingAnalyzer = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  // 어휘 다양성 분석 (어려운 단어 얼마나 다양하게 썼는지)
  const analyzeVocabularyDiversity = (text: string): number => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words);
    return words.length > 0 ? uniqueWords.size / words.length : 0;
  };

  // 문장 길이 분석 (너무 짧거나 길지 않은지)
  const analyzeSentenceLength = (text: string): number => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    if (sentences.length === 0) return 0;
    
    const avgLength = sentences.reduce((sum, sentence) => 
      sum + sentence.trim().split(/\s+/).length, 0) / sentences.length;
    
    // 8-15단어가 적절한 길이
    if (avgLength >= 8 && avgLength <= 15) return 1.0;
    if (avgLength >= 5 && avgLength <= 20) return 0.7;
    return 0.4;
  };

  // 표현력 분석 (감정이나 비유적 표현 사용)
  const analyzeExpressiveness = (text: string): number => {
    // 감정 표현 단어
    const emotionWords = (text.match(/(기쁘다|슬프다|화나다|놀랍다|감동|흥미롭다|아름답다|멋지다|훌륭하다|대단하다)/g) || []).length;
    
    // 비유적 표현
    const metaphors = (text.match(/(같다|마치|처럼|듯이|비슷하다|흡사하다)/g) || []).length;
    
    // 강조 표현
    const emphasis = (text.match(/(정말|매우|아주|너무|엄청|굉장히|특히|바로|바로|완전히)/g) || []).length;
    
    const totalWords = text.split(/\s+/).length;
    const score = totalWords > 0 ? (emotionWords + metaphors + emphasis) / totalWords * 100 : 0;
    
    return Math.min(score, 20) / 20; // 0-1 범위로 정규화
  };

  // 논리성 분석 (접속사나 논리적 연결 표현 사용)
  const analyzeLogicalStructure = (text: string): number => {
    // 논리적 접속사
    const logicalWords = (text.match(/(그러나|하지만|따라서|그러므로|왜냐하면|예를 들어|첫째|둘째|셋째|마지막으로|결론적으로|그런데|또한|더불어|반면에)/g) || []).length;
    
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    
    // 문장 대비 논리적 연결어 비율
    return sentences > 0 ? Math.min(logicalWords / sentences, 0.5) * 2 : 0;
  };

  // 창의성 분석 (독창적이고 참신한 표현)
  const analyzeCreativity = (text: string): number => {
    // 창의적 표현 단어
    const creativeWords = (text.match(/(독특한|새로운|신선한|참신한|혁신적인|창의적인|독창적인|색다른|특별한|유일한)/g) || []).length;
    
    // 의문문 사용 (독자와의 소통)
    const questions = (text.match(/\?/g) || []).length;
    
    // 감탄문 사용
    const exclamations = (text.match(/!/g) || []).length;
    
    const totalWords = text.split(/\s+/).length;
    const score = totalWords > 0 ? (creativeWords * 2 + questions + exclamations) / totalWords * 100 : 0;
    
    return Math.min(score, 15) / 15; // 0-1 범위로 정규화
  };

  // 종합 분석 실행
  const analyzeText = () => {
    if (!text.trim()) return;

    const vocabDiversity = analyzeVocabularyDiversity(text);
    const sentenceLength = analyzeSentenceLength(text);
    const expressiveness = analyzeExpressiveness(text);
    const logicalStructure = analyzeLogicalStructure(text);
    const creativity = analyzeCreativity(text);

    // 전체 점수 계산 (각 항목별 가중치 적용)
    const totalScore = (vocabDiversity * 20 + sentenceLength * 25 + expressiveness * 20 + logicalStructure * 20 + creativity * 15);

    setAnalysis({
      vocabDiversity,
      sentenceLength,
      expressiveness,
      logicalStructure,
      creativity,
      totalScore,
      totalWords: text.split(/\s+/).length,
      totalSentences: text.split(/[.!?]+/).filter(s => s.trim()).length,
      avgSentenceLength: text.split(/[.!?]+/).filter(s => s.trim()).length > 0 ? 
        text.split(/\s+/).length / text.split(/[.!?]+/).filter(s => s.trim()).length : 0
    });
  };

  // 차트 데이터 준비
  const getChartData = () => {
    if (!analysis) return [];
    
    return [
      {
        name: '어휘 다양성',
        score: analysis.vocabDiversity * 100,
        color: '#3B82F6'
      },
      {
        name: '문장 길이',
        score: analysis.sentenceLength * 100,
        color: '#10B981'
      },
      {
        name: '표현력',
        score: analysis.expressiveness * 100,
        color: '#F59E0B'
      },
      {
        name: '논리성',
        score: analysis.logicalStructure * 100,
        color: '#EF4444'
      },
      {
        name: '창의성',
        score: analysis.creativity * 100,
        color: '#8B5CF6'
      }
    ];
  };

  // 등급 계산
  const getGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'text-green-600', message: '뛰어남' };
    if (score >= 80) return { grade: 'A', color: 'text-green-500', message: '우수함' };
    if (score >= 70) return { grade: 'B+', color: 'text-blue-500', message: '양호함' };
    if (score >= 60) return { grade: 'B', color: 'text-blue-400', message: '보통' };
    if (score >= 50) return { grade: 'C', color: 'text-yellow-500', message: '미흡함' };
    return { grade: 'D', color: 'text-red-500', message: '많이 부족함' };
  };

  // 맞춤 조언 생성
  const getAdvice = () => {
    if (!analysis) return [];
    
    const advice: string[] = [];
    
    if (analysis.vocabDiversity < 0.5) {
      advice.push("💡 같은 단어를 반복하지 말고 다양한 어휘를 사용해보세요.");
    }
    
    if (analysis.sentenceLength < 0.6) {
      advice.push("📝 문장이 너무 짧거나 길어요. 8-15단어 정도가 적당해요.");
    }
    
    if (analysis.expressiveness < 0.4) {
      advice.push("🎨 감정이나 느낌을 더 생생하게 표현해보세요.");
    }
    
    if (analysis.logicalStructure < 0.4) {
      advice.push("🔗 '그러나', '따라서', '예를 들어' 같은 연결어를 사용해보세요.");
    }
    
    if (analysis.creativity < 0.3) {
      advice.push("✨ 독창적인 표현이나 질문을 써서 글을 더 재미있게 만들어보세요.");
    }
    
    if (advice.length === 0) {
      advice.push("🎉 모든 항목이 우수합니다! 계속 이런 수준을 유지해보세요.");
    }
    
    return advice;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📝 나만의 글쓰기 분석기
          </h1>
          <p className="text-gray-600">
            내가 쓴 글이 어떤 수준인지 확인하고 더 좋은 글쓰기 팁을 받아보세요!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 입력 영역 */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <FileText className="inline w-4 h-4 mr-2" />
                여기에 분석하고 싶은 글을 써보세요
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="예: 오늘 학교에서 있었던 일, 내가 좋아하는 것, 장래희망 등 자유롭게 써보세요..."
                className="w-full h-64 p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              />
              <div className="text-right text-sm text-gray-500 mt-2">
                {text.split(/\s+/).length}단어 | {text.split(/[.!?]+/).filter(s => s.trim()).length}문장
              </div>
            </div>

            <button
              onClick={analyzeText}
              disabled={!text.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-medium py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:scale-100"
            >
              <Brain className="inline w-5 h-5 mr-2" />
              내 글 분석하기
            </button>
          </div>

          {/* 점수 영역 */}
          <div className="space-y-6">
            {analysis && (
              <>
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
                    <Target className="inline w-5 h-5 mr-2" />
                    종합 점수
                  </h3>
                  <div className="text-center">
                    <div className={`text-5xl font-bold mb-2 ${getGrade(analysis.totalScore).color}`}>
                      {getGrade(analysis.totalScore).grade}
                    </div>
                    <div className="text-2xl font-semibold text-gray-700 mb-1">
                      {analysis.totalScore.toFixed(1)}점
                    </div>
                    <div className="text-sm text-gray-600">
                      {getGrade(analysis.totalScore).message}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3 text-gray-800">
                    <BookOpen className="inline w-4 h-4 mr-2" />
                    글의 기본 정보
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>📊 전체 단어: <span className="font-medium">{analysis.totalWords}개</span></div>
                    <div>📝 전체 문장: <span className="font-medium">{analysis.totalSentences}개</span></div>
                    <div>📏 평균 문장 길이: <span className="font-medium">{analysis.avgSentenceLength.toFixed(1)}단어</span></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 차트 영역 */}
        {analysis && (
          <div className="mt-8 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
                📊 세부 점수 분석
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value: any) => [`${value.toFixed(1)}점`, '']}
                    labelFormatter={(label: string) => `${label}`}
                  />
                  <Bar dataKey="score" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  <CheckCircle className="inline w-5 h-5 mr-2" />
                  맞춤 조언
                </h3>
                <div className="space-y-3">
                  {getAdvice().map((tip, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-purple-400">
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  <Zap className="inline w-5 h-5 mr-2" />
                  글쓰기 팁
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="font-medium text-blue-600">📚 어휘 늘리기</p>
                    <p className="text-gray-600">책을 많이 읽고 모르는 단어는 사전에서 찾아보세요.</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="font-medium text-green-600">✍️ 문장 연습</p>
                    <p className="text-gray-600">짧은 문장과 긴 문장을 적절히 섞어서 써보세요.</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="font-medium text-purple-600">💭 감정 표현</p>
                    <p className="text-gray-600">내가 어떻게 느꼈는지 구체적으로 표현해보세요.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WritingAnalyzer; 