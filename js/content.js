(function(){
  const defaultContent = {
    featuredServices: [
      { title: 'استشارة اختيار التخصص', description: 'نساعدك في اكتشاف التخصص الجامعي الذي يتوافق مع شغفك وقدراتك، ويوفر لك أفضل الفرص المستقبلية.' },
      { title: 'استشارة اختيار الجامعة', description: 'نوجهك لاختيار الجامعة الأنسب بناءً على معدلك، التخصص المطلوب، السمعة الأكاديمية، والموقع الجغرافي.' },
      { title: 'تطوير المهارات الدراسية', description: 'جلسات مخصصة لتزويدك بأدوات وتقنيات الدراسة الفعالة، إدارة الوقت، والاستعداد للاختبارات بثقة.' }
    ],
    aboutHeroText: 'نحن هنا لمساعدتك في رسم ملامح مستقبلك الأكاديمي والمهني بثقة واقتدار.',
    consultants: [
      { photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80' },
      { photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80' },
      { photo: 'https://images.unsplash.com/photo-1603415526960-f8f1f66216d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80' }
    ]
  };
  if(!localStorage.getItem('siteContent')){
    localStorage.setItem('siteContent', JSON.stringify(defaultContent));
  }
  window.siteContent = JSON.parse(localStorage.getItem('siteContent'));
  window.saveSiteContent = function(){
    localStorage.setItem('siteContent', JSON.stringify(window.siteContent));
  }
})();
