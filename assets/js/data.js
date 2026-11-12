const PHOTO_BASE = 'https://images.pexels.com/photos';

export function imageUrl(id, width = 940, height = 650) {
  return `${PHOTO_BASE}/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}&h=${height}&fit=crop`;
}

export const HERO_IMAGE = imageUrl(26859066, 1920, 1080);
export const ABOUT_IMAGE = imageUrl(7598368, 1200, 900);
export const STORY_IMAGE = imageUrl(7031604, 1200, 900);

export const TYPE_LABELS = {
  apartment: 'شقة سكنية',
  villa: 'فيلا مستقلة',
  townhouse: 'تاون هاوس',
  twinhouse: 'توين هاوس',
  penthouse: 'بنتهاوس',
  duplex: 'دوبلكس',
  studio: 'استوديو',
  commercial: 'وحدة تجارية',
  shop: 'محل تجاري',
  office: 'مكتب إداري',
  medical: 'وحدة طبية',
};

export const PURPOSE_LABELS = { sale: 'للبيع', rent: 'للإيجار' };

export const FINISHING_OPTIONS = ['سوبر لوكس', 'تشطيب كامل', 'نصف تشطيب', 'على الهيكل'];

export const CATEGORIES = [
  { label: 'الشقق', type: 'apartment', image: imageUrl(7173666, 800, 600), description: 'شقق سكنية بتصميمات عملية ومساحات متنوعة.' },
  { label: 'الفيلات', type: 'villa', image: imageUrl(8143671, 800, 600), description: 'فيلات مستقلة بحدائق وخصوصية كاملة.' },
  { label: 'البنتهاوس', type: 'penthouse', image: imageUrl(7045918, 800, 600), description: 'وحدات علوية بتراسات واسعة وإطلالات مميزة.' },
  { label: 'التاون هاوس', type: 'townhouse', image: imageUrl(10628470, 800, 600), description: 'منازل متصلة بمساحات مرنة وواجهات حديثة.' },
  { label: 'الوحدات التجارية', type: 'commercial', image: imageUrl(32367382, 800, 600), description: 'وحدات ومحلات في مواقع حيوية للاستثمار التجاري.' },
  { label: 'المكاتب الإدارية', type: 'office', image: imageUrl(6794970, 800, 600), description: 'مساحات مكتبية مرنة لشركات ومكاتب استشارية.' },
];

export const AGENTS = {
  a1: { name: 'كريم عبد الرحمن', role: 'مستشار عقاري أول', initials: 'ك ع' },
  a2: { name: 'سارة الحسيني', role: 'متخصصة في الفيلات والمشروعات', initials: 'س ح' },
  a3: { name: 'طارق منصور', role: 'متخصص في الوحدات التجارية والمكاتب', initials: 'ط م' },
};

const RAW_PROPERTIES = [
  {
    id: 'NV-1001', title: 'شقة فاخرة بثلاث غرف في التجمع الخامس', type: 'apartment', purpose: 'sale',
    location: 'التجمع الخامس', governorate: 'القاهرة', price: 11500000, area: 165, beds: 3, baths: 3,
    floors: 10, floor: 4, finishing: 'سوبر لوكس', delivery: 'جاهز للتسليم', listingDate: '2026-10-02',
    agentId: 'a1', featured: true,
    description: 'شقة واسعة بتشطيب سوبر لوكس في دور مرتفع بعمارة حديثة، تتضمن صالة استقبال مزدوجة ومطبخًا مجهزًا بالكامل وغرفة نوم رئيسية بحمام خاص. مناسبة للعائلات التي تبحث عن مساحة مريحة قريبة من الخدمات والمحاور الرئيسية.',
    features: ['حمام خاص بغرفة النوم الرئيسية', 'مطبخ مجهز بالكامل', 'شرفة واسعة مطلة على الواجهة', 'مصعد وموقف سيارات', 'تشطيب سوبر لوكس'],
    images: [
      { id: 9170385, label: 'واجهة العمارة' }, { id: 7173666, label: 'صالة الاستقبال' },
      { id: 6523300, label: 'المطبخ' }, { id: 6585757, label: 'غرفة النوم الرئيسية' },
      { id: 8082195, label: 'الحمام' }, { id: 7045918, label: 'الشرفة' },
    ],
  },
  {
    id: 'NV-1002', title: 'فيلا مستقلة بحمام سباحة في الشيخ زايد', type: 'villa', purpose: 'sale',
    location: 'الشيخ زايد', governorate: 'الجيزة', price: 58000000, area: 520, beds: 5, baths: 6,
    floors: 3, floor: null, finishing: 'تشطيب كامل', delivery: 'جاهز للتسليم', listingDate: '2026-09-18',
    agentId: 'a2', featured: true,
    description: 'فيلا مستقلة على ثلاثة طوابق بحديقة خاصة وحمام سباحة، مع صالات معيشة واستقبال منفصلة وغرف نوم بحمامات خاصة. تناسب العائلات الكبيرة التي تبحث عن الخصوصية والمساحات المفتوحة.',
    features: ['حمام سباحة خاص', 'حديقة خارجية', 'صالة استقبال ومعيشة منفصلتان', 'حمام خاص لكل غرفة نوم', 'جراج لسيارتين'],
    images: [
      { id: 26859066, label: 'واجهة الفيلا ليلًا' }, { id: 8143671, label: 'حمام السباحة' },
      { id: 8143683, label: 'الحديقة' }, { id: 20200291, label: 'منطقة الجلسات الخارجية' },
      { id: 8089172, label: 'صالة المعيشة' }, { id: 7587743, label: 'المطبخ' },
      { id: 18285944, label: 'غرفة النوم الرئيسية' }, { id: 6920610, label: 'حمام الماستر' },
    ],
  },
  {
    id: 'NV-1003', title: 'تاون هاوس بثلاث طوابق في العاصمة الإدارية', type: 'townhouse', purpose: 'sale',
    location: 'العاصمة الإدارية الجديدة', governorate: 'القاهرة', price: 19000000, area: 230, beds: 4, baths: 4,
    floors: 3, floor: null, finishing: 'نصف تشطيب', delivery: 'تسليم خلال 18 شهرًا', listingDate: '2026-08-25',
    agentId: 'a1', featured: true,
    description: 'تاون هاوس متصل بثلاثة طوابق بواجهة عصرية ومساحات مرنة تسمح بتخصيص التشطيب الداخلي. يضم أربع غرف نوم وحديقة خلفية صغيرة، ويقع في حي متكامل الخدمات.',
    features: ['واجهة عصرية متصلة', 'حديقة خلفية', 'تشطيب داخلي قابل للتخصيص', 'قريب من المحاور الرئيسية'],
    images: [
      { id: 10628470, label: 'واجهة التاون هاوس' }, { id: 10486073, label: 'الواجهة الأمامية' },
      { id: 7587783, label: 'صالة المعيشة' }, { id: 7535073, label: 'المطبخ' },
      { id: 8135505, label: 'غرفة النوم' }, { id: 6636254, label: 'الحمام' },
    ],
  },
  {
    id: 'NV-1004', title: 'توين هاوس بحديقة أمامية في 6 أكتوبر', type: 'twinhouse', purpose: 'sale',
    location: '6 أكتوبر', governorate: 'الجيزة', price: 16500000, area: 280, beds: 4, baths: 4,
    floors: 3, floor: null, finishing: 'سوبر لوكس', delivery: 'جاهز للتسليم', listingDate: '2026-10-20',
    agentId: 'a2', featured: true,
    description: 'توين هاوس بتصميم متماثل وحديقة أمامية، يوفر مساحة معيشة مريحة على ثلاثة طوابق مع أربع غرف نوم. التشطيب سوبر لوكس والمساحات مرتبة لتسهيل الحياة اليومية.',
    features: ['حديقة أمامية', 'تشطيب سوبر لوكس', 'صالة معيشة وطعام مشتركة', 'حمام خاص لغرفة النوم الرئيسية'],
    images: [
      { id: 30580640, label: 'واجهة التوين هاوس' }, { id: 7598368, label: 'الحديقة الأمامية' },
      { id: 6970051, label: 'صالة الطعام' }, { id: 7587737, label: 'المطبخ' },
      { id: 39733066, label: 'غرفة النوم' }, { id: 6587859, label: 'الحمام' },
    ],
  },
  {
    id: 'NV-1005', title: 'بنتهاوس بتراس واسع في القاهرة الجديدة', type: 'penthouse', purpose: 'sale',
    location: 'القاهرة الجديدة', governorate: 'القاهرة', price: 24000000, area: 285, beds: 4, baths: 4,
    floors: 10, floor: 10, finishing: 'سوبر لوكس', delivery: 'جاهز للتسليم', listingDate: '2026-11-03',
    agentId: 'a2', featured: true,
    description: 'وحدة علوية بتراس واسع وإطلالة بانورامية على المنطقة المحيطة، مع صالة معيشة مفتوحة وأربع غرف نوم. التشطيب سوبر لوكس مع مساحات خارجية مناسبة للجلسات والتجمعات.',
    features: ['تراس خاص واسع', 'إطلالة بانورامية', 'صالة معيشة مفتوحة', 'تشطيب سوبر لوكس'],
    images: [
      { id: 7045918, label: 'التراس' }, { id: 7045920, label: 'صالة بإطلالة بانورامية' },
      { id: 7377669, label: 'صالة المعيشة' }, { id: 19980206, label: 'المطبخ' },
      { id: 6585757, label: 'غرفة النوم' }, { id: 7534282, label: 'الحمام' },
    ],
  },
  {
    id: 'NV-1006', title: 'دوبلكس بدورين في الشيخ زايد', type: 'duplex', purpose: 'sale',
    location: 'الشيخ زايد', governorate: 'الجيزة', price: 14200000, area: 210, beds: 3, baths: 3,
    floors: 2, floor: '5 و6', finishing: 'تشطيب كامل', delivery: 'جاهز للتسليم', listingDate: '2026-07-14',
    agentId: 'a1', featured: true,
    description: 'دوبلكس على دورين يضم صالة معيشة في الدور الأرضي للوحدة وغرف النوم في الدور العلوي، مع درج داخلي يفصل بين المساحات. مناسب للأسر التي تفضل الفصل الواضح بين مناطق المعيشة والنوم.',
    features: ['درج داخلي مميز', 'فصل واضح بين المعيشة والنوم', 'مطبخ مجهز', 'تشطيب كامل'],
    images: [
      { id: 5997960, label: 'الدرج الداخلي' }, { id: 6296923, label: 'الصالة' },
      { id: 30857589, label: 'المطبخ' }, { id: 7147369, label: 'ركن الطعام' },
      { id: 7031909, label: 'ممر الدور الأول' }, { id: 7534282, label: 'الحمام' },
    ],
  },
  {
    id: 'NV-1007', title: 'استوديو مفروش للإيجار في المعادي', type: 'studio', purpose: 'rent',
    location: 'المعادي', governorate: 'القاهرة', price: 14000, area: 60, beds: 1, baths: 1,
    floors: 7, floor: 3, finishing: 'تشطيب كامل', delivery: 'جاهز للتسليم', listingDate: '2026-11-08',
    agentId: 'a1', featured: false,
    description: 'استوديو مفروش بمطبخ مفتوح على صالة المعيشة وحمام مستقل. مناسب لمن يبحث عن سكن عملي في موقع قريب من الخدمات والمواصلات.',
    features: ['مفروش بالكامل', 'مطبخ مفتوح', 'حمام مستقل', 'إيجار شهري'],
    images: [
      { id: 8142976, label: 'الاستوديو' }, { id: 6447384, label: 'المطبخ والمعيشة' },
      { id: 7019016, label: 'الصالة' }, { id: 7060828, label: 'ركن النوم' },
    ],
  },
  {
    id: 'NV-1008', title: 'شقة بثلاث غرف للإيجار في مدينة نصر', type: 'apartment', purpose: 'rent',
    location: 'مدينة نصر', governorate: 'القاهرة', price: 28000, area: 150, beds: 3, baths: 2,
    floors: 8, floor: 6, finishing: 'تشطيب كامل', delivery: 'جاهز للتسليم', listingDate: '2026-10-28',
    agentId: 'a3', featured: false,
    description: 'شقة بتشطيب كامل وثلاث غرف نوم في عمارة متوسطة الارتفاع، مع صالة معيشة واسعة ومطبخ مجهز. مناسبة للعائلات الباحثة عن إيجار قريب من الخدمات.',
    features: ['تشطيب كامل', 'مطبخ مجهز', 'شرفة', 'إيجار شهري'],
    images: [
      { id: 40664815, label: 'واجهة العمارة' }, { id: 8089172, label: 'صالة المعيشة' },
      { id: 7535073, label: 'المطبخ' }, { id: 6207940, label: 'غرفة النوم' },
    ],
  },
  {
    id: 'NV-1009', title: 'فيلا للإيجار بحديقة في القاهرة الجديدة', type: 'villa', purpose: 'rent',
    location: 'القاهرة الجديدة', governorate: 'القاهرة', price: 95000, area: 420, beds: 4, baths: 5,
    floors: 2, floor: null, finishing: 'تشطيب كامل', delivery: 'جاهز للتسليم', listingDate: '2026-11-05',
    agentId: 'a2', featured: false,
    description: 'فيلا مستقلة على دورين بحديقة خارجية ومساحة جلسات مطلة على المسبح. تضم أربع غرف نوم وخمسة حمامات، وتناسب الإيجار للعائلات الكبيرة.',
    features: ['حديقة خارجية', 'منطقة جلسات', 'مسبح مشترك', 'جراج'],
    images: [
      { id: 8583822, label: 'واجهة الفيلا' }, { id: 6032280, label: 'حمام السباحة والجلسات' },
      { id: 7174106, label: 'الحديقة' }, { id: 7377669, label: 'صالة المعيشة' },
    ],
  },
  {
    id: 'NV-1010', title: 'محل تجاري بواجهة زجاجية في التجمع الخامس', type: 'shop', purpose: 'rent',
    location: 'التجمع الخامس', governorate: 'القاهرة', price: 40000, area: 65, beds: null, baths: null,
    floors: 4, floor: 'أرضي', finishing: 'نصف تشطيب', delivery: 'جاهز للتسليم', listingDate: '2026-09-30',
    agentId: 'a3', featured: false,
    description: 'محل تجاري في الدور الأرضي بواجهة زجاجية واسعة على شارع تجاري نشط، مناسب لعرض المنتجات أو فتح فرع خدمي.',
    features: ['واجهة زجاجية', 'دور أرضي', 'مدخل من الشارع', 'إيجار شهري'],
    images: [
      { id: 32367382, label: 'واجهة المحل' }, { id: 4061967, label: 'الواجهة من الشارع' },
      { id: 12805817, label: 'المحل ليلًا' },
    ],
  },
  {
    id: 'NV-1011', title: 'وحدة تجارية بمدخل مستقل في العاصمة الإدارية', type: 'commercial', purpose: 'sale',
    location: 'العاصمة الإدارية الجديدة', governorate: 'القاهرة', price: 9600000, area: 120, beds: null, baths: null,
    floors: 5, floor: 'أرضي', finishing: 'تشطيب كامل', delivery: 'تسليم خلال 12 شهرًا', listingDate: '2026-06-22',
    agentId: 'a3', featured: false,
    description: 'وحدة تجارية في الدور الأرضي بمدخل مستقل وواجهة على شارع رئيسي، مناسبة لمشروعات الخدمات والتجزئة.',
    features: ['مدخل مستقل', 'واجهة على شارع رئيسي', 'تشطيب كامل', 'مناسبة للتجزئة والخدمات'],
    images: [
      { id: 34417195, label: 'واجهة الوحدة' }, { id: 29831547, label: 'المدخل التجاري' },
      { id: 8919461, label: 'واجهات تجارية' },
    ],
  },
  {
    id: 'NV-1012', title: 'مكتب إداري بإطلالة على التجمع الخامس', type: 'office', purpose: 'rent',
    location: 'التجمع الخامس', governorate: 'القاهرة', price: 35000, area: 120, beds: null, baths: null,
    floors: 12, floor: 7, finishing: 'تشطيب كامل', delivery: 'جاهز للتسليم', listingDate: '2026-10-10',
    agentId: 'a3', featured: false,
    description: 'مكتب إداري بتشطيب كامل وإطلالة مفتوحة، يضم مساحات عمل ومدخلًا مخصصًا وإمكانية تقسيمه حسب احتياج الشركة.',
    features: ['تشطيب كامل', 'إطلالة مفتوحة', 'قابل للتقسيم', 'إيجار شهري'],
    images: [
      { id: 6794970, label: 'مساحة العمل' }, { id: 5483188, label: 'مكتب بإطلالة' },
      { id: 7511754, label: 'قاعة الاجتماعات' }, { id: 7511755, label: 'ممر المكاتب' },
    ],
  },
  {
    id: 'NV-1013', title: 'مكتب إداري للبيع في مدينة نصر', type: 'office', purpose: 'sale',
    location: 'مدينة نصر', governorate: 'القاهرة', price: 6800000, area: 95, beds: null, baths: null,
    floors: 9, floor: 4, finishing: 'نصف تشطيب', delivery: 'جاهز للتسليم', listingDate: '2026-08-08',
    agentId: 'a3', featured: false,
    description: 'مكتب إداري بمساحة مرنة ونصف تشطيب، مناسب لاستقبال فريق عمل صغير أو مكتب استشاري بمساحة مخصصة للاجتماعات.',
    features: ['نصف تشطيب', 'مساحة مرنة', 'مناسب للشركات الصغيرة', 'مدخل مشترك'],
    images: [
      { id: 1128207, label: 'مساحة المكتب' }, { id: 265101, label: 'مكتب بالنباتات' },
      { id: 7511755, label: 'الممر' },
    ],
  },
  {
    id: 'NV-1014', title: 'وحدة طبية للإيجار في مصر الجديدة', type: 'medical', purpose: 'rent',
    location: 'مصر الجديدة', governorate: 'القاهرة', price: 32000, area: 90, beds: null, baths: null,
    floors: 5, floor: 2, finishing: 'تشطيب كامل', delivery: 'جاهز للتسليم', listingDate: '2026-11-01',
    agentId: 'a3', featured: false,
    description: 'وحدة طبية بتجهيز مناسب للعيادات، تضم منطقة استقبال وانتظار وغرفتي كشف مع مدخل مستقل. مناسبة لأطباء الأسنان والعيادات الاستشارية.',
    features: ['منطقة استقبال وانتظار', 'غرفتا كشف', 'مدخل مستقل', 'تشطيب كامل'],
    images: [
      { id: 7108324, label: 'العيادة' }, { id: 8459996, label: 'صالة الانتظار' },
      { id: 7108325, label: 'الاستقبال' }, { id: 6812429, label: 'غرفة الكشف' },
    ],
  },
  {
    id: 'NV-1015', title: 'شقة بإطلالة بحرية في سموحة بالإسكندرية', type: 'apartment', purpose: 'sale',
    location: 'سموحة', governorate: 'الإسكندرية', price: 9800000, area: 140, beds: 3, baths: 2,
    floors: 8, floor: 5, finishing: 'سوبر لوكس', delivery: 'جاهز للتسليم', listingDate: '2026-09-05',
    agentId: 'a2', featured: false,
    description: 'شقة بثلاث غرف نوم وشرفة مطلة على البحر بتشطيب سوبر لوكس، في عمارة حديثة بموقع هادئ قريب من الكورنيش.',
    features: ['إطلالة بحرية', 'شرفة واسعة', 'تشطيب سوبر لوكس', 'قريب من الكورنيش'],
    images: [
      { id: 39485848, label: 'واجهة العمارة' }, { id: 7167073, label: 'صالة المعيشة' },
      { id: 6636290, label: 'المطبخ' }, { id: 6207940, label: 'غرفة النوم' },
      { id: 6980656, label: 'الحمام' },
    ],
  },
];

export const PROPERTIES = RAW_PROPERTIES.map(({ images, ...property }) => {
  const gallery = images.map(({ id, label }) => ({
    src: imageUrl(id),
    thumb: imageUrl(id, 400, 300),
    alt: `${property.title} - ${label}`,
  }));
  return {
    ...property,
    gallery,
    cover: gallery[0].src,
    pricePerM2: property.purpose === 'sale' ? Math.round(property.price / property.area) : null,
  };
});

export const LOCATIONS = [...new Set(PROPERTIES.map((property) => property.location))].sort((a, b) => a.localeCompare(b, 'ar'));

export function getPropertyById(id) {
  return PROPERTIES.find((property) => property.id === id) ?? null;
}

export const TESTIMONIALS = [
  {
    quote: 'تجربة بحث واضحة ومعلومات مرتبة عن كل وحدة، ما ساعدني على اختيار الشقة المناسبة لعائلتي دون تضييع وقت.',
    name: 'عميل نموذجي',
    detail: 'مثال توضيحي - القاهرة الجديدة',
  },
  {
    quote: 'الفلترة والمقارنة بين الوحدات كانت سهلة، وصفحة المفضلة ساعدتني على متابعة الخيارات الأقرب لاحتياجي.',
    name: 'عميل نموذجي',
    detail: 'مثال توضيحي - الشيخ زايد',
  },
  {
    quote: 'احتجت وحدة تجارية لفرع جديد، وكانت صفحات التفاصيل واضحة في المساحة والتشطيب ومواصفات الموقع.',
    name: 'عميل نموذجي',
    detail: 'مثال توضيحي - مدينة نصر',
  },
];

export const SITE = {
  name: 'NOVA',
  email: 'sample@nova.example',
  phone: 'غير متاح في النسخة التجريبية',
  address: 'عنوان توضيحي - القاهرة، مصر',
};
