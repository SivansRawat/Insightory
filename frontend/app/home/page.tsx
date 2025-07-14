
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Star,
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description:
        'Get deep insights into your inventory performance with beautiful, interactive charts and reports.',
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description:
        'Monitor your stock levels and sales in real-time with automatic synchronization across all platforms.',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description:
        'Enterprise-grade security with 99.9% uptime guarantee. Your data is safe and always accessible.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description:
        'Invite team members and collaborate seamlessly with role-based access controls.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Inventory Manager',
      company: 'TechCorp',
      content:
        'Insightory transformed how we manage our inventory. The analytics are game-changing!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Operations Director',
      company: 'RetailPro',
      content:
        'The real-time insights helped us reduce waste by 40% and increase efficiency.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="absolute inset-0 bg-black/20" />
        <nav className="relative z-10 container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Insightory</span>
          </div>
          <Link href="/login">
            <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm">
              Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </nav>

        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4">
            Transform Your{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Inventory
            </span>{' '}
            Into Insights
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Unlock the power of your product data with our intelligent
            analytics platform. Track performance, predict trends, and make
            data-driven decisions.
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90 font-semibold px-8 py-4 text-lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything you need to manage inventory
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Powerful features designed to help you track, analyze, and
              optimize your inventory with actionable insights.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-slate-600 mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Loved by teams worldwide
            </h2>
            <p className="text-xl text-slate-600">
              See what our customers are saying about Insightory
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p className="text-slate-700 mb-6 text-lg leading-relaxed">
                 &quot; {testimonial.content}&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-indigo-600 font-semibold">
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      {testimonial.name}
                    </div>
                    <div className="text-slate-600">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to transform your inventory management?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using Insightory to make
            smarter, data-driven inventory decisions.
          </p>
          <Link href="/login">
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-white/90 font-semibold px-8 py-4 text-lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BarChart3 className="h-6 w-6" />
            <span className="text-xl font-bold">Insightory</span>
          </div>
          <p className="text-slate-400">
            &copy; {new Date().getFullYear()} Insightory. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
