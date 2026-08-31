import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

const ContactSection: FC = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="pt-24 pb-24 min-h-[70vh] flex flex-col justify-center px-4 md:px-8">
      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-headline-lg font-bold text-gray-900 dark:text-white mb-4">
            {t('contact.title', 'Get in Touch')}
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 font-body-lg max-w-2xl mx-auto">
            {t('contact.subtitle', 'Have questions about a book, your membership, or a community club? We are here to help.')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact Details & Map */}
          <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-[#16273b] p-6 rounded-3xl shadow-xl border border-gray-200 dark:border-white/10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('contact.infoTitle', 'Contact Information')}</h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary-container/20 text-primary dark:text-primary-container rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">{t('contact.locationTitle', 'Our Location')}</h4>
                    <p className="text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: t('contact.locationValue', '123 Express Books HQ<br/>Colombo 00100<br/>Sri Lanka') }}></p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary-container/20 text-primary dark:text-primary-container rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">{t('contact.phoneTitle', 'Phone')}</h4>
                    <p className="text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: t('contact.phoneValue', '+94 11 234 5678<br/>Mon-Fri, 9am - 6pm') }}></p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary-container/20 text-primary dark:text-primary-container rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">{t('contact.emailTitle', 'Email')}</h4>
                    <p className="text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: t('contact.emailValue', 'hello@expressbooks.lk<br/>support@expressbooks.lk') }}></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-[250px] rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-white/10">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.63162582855!2d79.7738031575087!3d6.92183352773418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Colombo Location"
              ></iframe>
            </div>
          </div>

          {/* Form */}
          <form className="bg-white dark:bg-[#16273b] p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 w-full h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('contact.formTitle', 'Send us a message')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t('contact.fName', 'First Name')}</label>
                <input 
                  type="text" 
                  className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t('contact.lName', 'Last Name')}</label>
                <input 
                  type="text" 
                  className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t('contact.emailAddress', 'Email Address')}</label>
                <input 
                  type="email" 
                  className="w-full h-11 px-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t('contact.mobile', 'Mobile Number')}</label>
                <input 
                  type="tel" 
                  className="w-full h-11 px-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                  placeholder="+94 77 123 4567"
                />
              </div>
            </div>

            <div className="mb-6 flex-1 flex flex-col">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t('contact.message', 'Message')}</label>
              <textarea 
                className="w-full flex-1 min-h-[100px] p-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none dark:text-white"
                placeholder={t('contact.messagePlaceholder', 'How can we help you today?')}
              ></textarea>
            </div>

            <button 
              type="button" 
              className="w-full py-3 bg-primary-container text-black font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity active:scale-95 mt-auto"
            >
              {t('contact.send', 'Send Message')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
