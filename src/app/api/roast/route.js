import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request) {
  const { url } = await request.json();
  if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 });

  // 1. Check if we already have a roast for this URL
  const existingRoast = await prisma.roast.findUnique({
    where: { url },
    include: {
      _count: { select: { comments: true, reactions: true } }
    }
  });

  if (existingRoast) {
    return NextResponse.json({
      ...existingRoast,
      roastLines: JSON.parse(existingRoast.roastLines),
      cached: true
    });
  }

  // 2. Generate new roast
  const geminiKey = process.env.GEMINI_API_KEY;
  let roastData = null;

  if (geminiKey) {
    try {
      const prompt = `You are a brutally honest Gen-Z product critic. Analyze "${url}". Return ONLY valid JSON (no markdown):
{"productName":"...","category":"...","painScore":75,"truthScore":80,"hypeGap":25,"roastHeadline":"One brutal headline max 15 words","roastLines":["line 1","line 2","line 3"],"uxVerdict":"brief brutal UX review","trustVerdict":"truth score explanation","worstFeature":"worst thing","bestFeature":"best thing","tag":"CERTIFIED TRASH"}
painScore 0-100 (user suffering), truthScore 0-100 (marketing honesty), hypeGap 0-100 (promise vs reality)`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.9, maxOutputTokens: 1024 } })
      });
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        roastData = JSON.parse(text.replace(/```json|```/g, '').trim());
      }
    } catch (err) { console.error('Gemini error:', err); }
  }

  // Fallback to mock
  if (!roastData) {
    const domain = url.replace(/https?:\/\/(www\.)?/, '').split('/')[0];
    roastData = {
      productName: domain.split('.')[0],
      category: 'Software',
      painScore: Math.floor(Math.random() * 40) + 45,
      truthScore: Math.floor(Math.random() * 40) + 50,
      hypeGap: Math.floor(Math.random() * 30) + 15,
      roastHeadline: "Another SaaS that could've been a spreadsheet",
      roastLines: ["Homepage copy is so generic it could describe any startup.", "Pricing page requires a PhD to decode.", "The About page has 12 people smiling at laptops."],
      uxVerdict: "Navigation is functional but uninspired.",
      trustVerdict: "Marketing language is vague enough to mean anything.",
      worstFeature: "45-minute onboarding before you can see if it works",
      bestFeature: "At least it loads fast",
      tag: 'STANDARD ISSUE SAAS',
    };
  }

  // 3. Save to DB
  const savedRoast = await prisma.roast.create({
    data: {
      url,
      productName: roastData.productName,
      tag: roastData.tag,
      roastHeadline: roastData.roastHeadline,
      painScore: roastData.painScore,
      truthScore: roastData.truthScore,
      hypeGap: roastData.hypeGap,
      roastLines: JSON.stringify(roastData.roastLines),
      uxVerdict: roastData.uxVerdict,
      trustVerdict: roastData.trustVerdict,
      bestFeature: roastData.bestFeature,
      worstFeature: roastData.worstFeature,
    }
  });

  // 4. Update User Gamification
  const session = await getServerSession(authOptions);
  if (session?.user?.email) {
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        savageScore: { increment: 50 },
        streak: { increment: 1 },
        lastRoastAt: new Date(),
      }
    });
  }

  return NextResponse.json({
    ...savedRoast,
    roastLines: roastData.roastLines,
    cached: false
  });
}
