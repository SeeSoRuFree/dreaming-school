'use client'

import { useState } from 'react'
import GeneralInquirySection from '@/components/contact/GeneralInquirySection'
import DonationInquirySection from '@/components/contact/DonationInquirySection'

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'donation'>('general')

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="container-main py-16">
          <h1 className="heading-1 text-center">문의</h1>
          <p className="body-text text-center mt-6 max-w-3xl mx-auto text-gray-600">
            궁금한 사항이나 문의하실 내용이 있으시면 언제든지 연락해 주세요
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white">
        <div className="container-main">
          <div className="flex justify-center">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('general')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'general'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                일반 문의
              </button>
              <button
                onClick={() => setActiveTab('donation')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'donation'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                후원 문의
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container-main section-padding">
        {activeTab === 'general' && <GeneralInquirySection />}
        {activeTab === 'donation' && <DonationInquirySection />}
      </div>
    </>
  )
}