// ============================================================
// QuickKaam - Language Translations
// Languages: English (en), Hindi (hi), Marathi (mr)
// ============================================================

const TRANSLATIONS = {

    // ==================== COMMON ====================
    'brand': { en: 'QuickKaam', hi: 'क्विककाम', mr: 'क्विककाम' },
    'brand-quick': { en: 'Quick', hi: 'क्विक', mr: 'क्विक' },
    'brand-kaam': { en: 'Kaam', hi: 'काम', mr: 'काम' },
    'btn-login': { en: '🔐 Login', hi: '🔐 लॉग इन', mr: '🔐 लॉग इन' },
    'btn-logout': { en: '🚪 Logout', hi: '🚪 लॉग आउट', mr: '🚪 लॉग आउट' },
    'btn-back': { en: '← Back', hi: '← वापस', mr: '← मागे' },
    'btn-submit': { en: 'Submit', hi: 'सबमिट करें', mr: 'सबमिट करा' },
    'btn-close': { en: '✕ Close', hi: '✕ बंद करें', mr: '✕ बंद करा' },
    'btn-refresh': { en: '🔄 Refresh', hi: '🔄 रीफ्रेश', mr: '🔄 रीफ्रेश' },
    'btn-edit-profile': { en: '📝 Edit Profile', hi: '📝 प्रोफ़ाइल संपादित करें', mr: '📝 प्रोफाइल संपादित करा' },
    'btn-deactivate': { en: '⚠️ Deactivate Account', hi: '⚠️ खाता निष्क्रिय करें', mr: '⚠️ खाते निष्क्रिय करा' },
    'loading': { en: 'Loading...', hi: 'लोड हो रहा है...', mr: 'लोड होत आहे...' },
    'nav-profile': { en: 'Profile', hi: 'प्रोफ़ाइल', mr: 'प्रोफाइल' },
    'nav-notifications': { en: '🔔 Notifications', hi: '🔔 सूचनाएं', mr: '🔔 सूचना' },
    'nav-accepted': { en: '✅ Accepted Work', hi: '✅ स्वीकृत काम', mr: '✅ स्वीकारलेले काम' },
    'nav-history': { en: '📚 Work History', hi: '📚 काम का इतिहास', mr: '📚 कामाचा इतिहास' },
    'nav-terms': { en: '📋 Terms & Conditions', hi: '📋 नियम और शर्तें', mr: '📋 अटी व शर्ती' },
    'nav-help': { en: '📋 Help', hi: '📋 सहायता', mr: '📋 मदत' },
    'nav-search': { en: '🔍 Search', hi: '🔍 खोज', mr: '🔍 शोध' },
    'nav-requests': { en: '📝 Requests', hi: '📝 अनुरोध', mr: '📝 विनंती' },
    'nav-completed': { en: '✅ Completed', hi: '✅ पूर्ण', mr: '✅ पूर्ण झाले' },
    'select-state': { en: 'Select State', hi: 'राज्य चुनें', mr: 'राज्य निवडा' },
    'select-city': { en: 'Select City', hi: 'शहर चुनें', mr: 'शहर निवडा' },
    'select-state-first': { en: 'Select State First', hi: 'पहले राज्य चुनें', mr: 'आधी राज्य निवडा' },
    'label-name': { en: 'Full Name *', hi: 'पूरा नाम *', mr: 'पूर्ण नाव *' },
    'label-email': { en: 'Email ID *', hi: 'ईमेल आईडी *', mr: 'ईमेल आयडी *' },
    'label-mobile': { en: 'Mobile Number *', hi: 'मोबाइल नंबर *', mr: 'मोबाइल नंबर *' },
    'label-password': { en: 'Create Password *', hi: 'पासवर्ड बनाएं *', mr: 'पासवर्ड तयार करा *' },
    'label-confirm-password': { en: 'Confirm Password *', hi: 'पासवर्ड की पुष्टि करें *', mr: 'पासवर्ड पुष्टी करा *' },
    'label-state': { en: 'State *', hi: 'राज्य *', mr: 'राज्य *' },
    'label-city': { en: 'City *', hi: 'शहर *', mr: 'शहर *' },
    'forgot-password': { en: 'Forgot Password?', hi: 'पासवर्ड भूल गए?', mr: 'पासवर्ड विसरलात?' },
    'ph-email': { en: 'example@email.com', hi: 'example@email.com', mr: 'example@email.com' },
    'ph-mobile': { en: 'Enter 10-digit mobile', hi: '10 अंकों का मोबाइल डालें', mr: '10 अंकी मोबाइल नंबर टाका' },
    'ph-password': { en: 'Enter strong password', hi: 'मजबूत पासवर्ड डालें', mr: 'मजबूत पासवर्ड टाका' },
    'ph-confirm-password': { en: 'Re-enter password', hi: 'पासवर्ड दोबारा डालें', mr: 'पासवर्ड पुन्हा टाका' },
    'ph-name': { en: 'Enter your full name', hi: 'अपना पूरा नाम डालें', mr: 'तुमचे पूर्ण नाव टाका' },

    // ==================== LANGUAGE SELECTOR ====================
    'lang-select-title': { en: 'Choose Your Language', hi: 'अपनी भाषा चुनें', mr: 'तुमची भाषा निवडा' },
    'lang-select-subtitle': { en: 'Select a language to continue', hi: 'जारी रखने के लिए भाषा चुनें', mr: 'पुढे जाण्यासाठी भाषा निवडा' },
    'lang-switcher-label': { en: '🌐 Language', hi: '🌐 भाषा', mr: '🌐 भाषा' },

    // ==================== HOME PAGE ====================
    'home-tagline': { en: '🚀 Your Gateway to Quick Work Solutions', hi: '🚀 त्वरित काम समाधान का आपका प्रवेशद्वार', mr: '🚀 जलद काम समाधानाचे तुमचे प्रवेशद्वार' },
    'home-subtitle': { en: 'Connecting Skilled Workers with Opportunities', hi: 'कुशल कामगारों को अवसरों से जोड़ना', mr: 'कुशल कामगारांना संधींशी जोडणे' },
    'home-create-account': { en: '👤 Create Account', hi: '👤 खाता बनाएं', mr: '👤 खाते तयार करा' },
    'home-get-started': { en: 'Join QuickKaam today and get started', hi: 'आज ही QuickKaam से जुड़ें और शुरू करें', mr: 'आजच QuickKaam मध्ये सामील व्हा' },
    'home-services-title': { en: '⚡ Our Services', hi: '⚡ हमारी सेवाएं', mr: '⚡ आमच्या सेवा' },
    'home-services-subtitle': { en: 'Discover what makes QuickKaam special', hi: 'जानें क्या QuickKaam को खास बनाता है', mr: 'QuickKaam ला खास काय बनवते ते जाणा' },
    'home-about-title': { en: 'ℹ️ About Us', hi: 'ℹ️ हमारे बारे में', mr: 'ℹ️ आमच्याबद्दल' },
    'home-about-desc': { en: 'Learn about our mission and vision', hi: 'हमारे मिशन और विज़न के बारे में जानें', mr: 'आमचे ध्येय आणि दृष्टीकोन जाणा' },
    'home-about-text': { en: "QuickKaam is India's premier platform bridging the gap between skilled professionals and those seeking their expertise.", hi: 'QuickKaam भारत का प्रमुख प्लेटफ़ॉर्म है जो कुशल पेशेवरों और सेवाओं की तलाश करने वालों के बीच की खाई को पाटता है।', mr: 'QuickKaam हे भारताचे प्रमुख व्यासपीठ आहे जे कुशल व्यावसायिक आणि त्यांच्या सेवा शोधणाऱ्यांमधील अंतर कमी करते.' },
    'home-for-workers': { en: 'For Workers: Showcase your skills, find relevant jobs, and grow your career', hi: 'कामगारों के लिए: अपने कौशल दिखाएं, काम खोजें और करियर बढ़ाएं', mr: 'कामगारांसाठी: तुमचे कौशल्य दाखवा, काम शोधा आणि करिअर वाढवा' },
    'home-for-users': { en: 'For Users: Access verified professionals instantly for any service you need', hi: 'उपयोगकर्ताओं के लिए: किसी भी सेवा के लिए तुरंत सत्यापित पेशेवर प्राप्त करें', mr: 'वापरकर्त्यांसाठी: कोणत्याही सेवेसाठी तात्काळ पडताळलेल्या व्यावसायिकांपर्यंत पोहोचा' },
    'home-services-covered': { en: 'Services Covered: Construction, repairs, teaching, technical work, household services & more', hi: 'सेवाएं: निर्माण, मरम्मत, शिक्षण, तकनीकी कार्य, घरेलू सेवाएं और अधिक', mr: 'सेवा: बांधकाम, दुरुस्ती, शिक्षण, तांत्रिक काम, घरगुती सेवा आणि बरेच काही' },
    'home-service-1': { en: 'Direct Worker-User Communication', hi: 'कामगार-उपयोगकर्ता सीधा संपर्क', mr: 'कामगार-वापरकर्ता थेट संपर्क' },
    'home-service-2': { en: 'Quick Job & Worker Search', hi: 'त्वरित नौकरी और कामगार खोज', mr: 'जलद काम आणि कामगार शोध' },
    'home-service-3': { en: 'Secure Login & Registration', hi: 'सुरक्षित लॉग इन और पंजीकरण', mr: 'सुरक्षित लॉग इन आणि नोंदणी' },
    'home-service-4': { en: 'Location-Based Matching', hi: 'स्थान-आधारित मिलान', mr: 'स्थान-आधारित जुळणी' },
    'home-help-btn': { en: 'Help & Support', hi: 'सहायता', mr: 'मदत' },

    // ==================== LOGIN / AUTH ====================
    'login-title-worker': { en: '👷 Worker Login', hi: '👷 कामगार लॉग इन', mr: '👷 कामगार लॉग इन' },
    'login-title-user': { en: '👤 User Login', hi: '👤 उपयोगकर्ता लॉग इन', mr: '👤 वापरकर्ता लॉग इन' },
    'login-select-type': { en: '🔐 Select Login Type', hi: '🔐 लॉग इन प्रकार चुनें', mr: '🔐 लॉग इन प्रकार निवडा' },
    'login-worker-option': { en: '👷 Worker Login', hi: '👷 कामगार लॉग इन', mr: '👷 कामगार लॉग इन' },
    'login-worker-desc': { en: 'Login with Mobile Number', hi: 'मोबाइल नंबर से लॉग इन करें', mr: 'मोबाइल नंबरने लॉग इन करा' },
    'login-user-option': { en: '👤 User Login', hi: '👤 उपयोगकर्ता लॉग इन', mr: '👤 वापरकर्ता लॉग इन' },
    'login-user-desc': { en: 'Login with Email Address', hi: 'ईमेल पते से लॉग इन करें', mr: 'ईमेल पत्त्याने लॉग इन करा' },
    'login-btn-worker': { en: 'Login as Worker', hi: 'कामगार के रूप में लॉग इन', mr: 'कामगार म्हणून लॉग इन' },
    'login-btn-user': { en: 'Login', hi: 'लॉग इन', mr: 'लॉग इन' },
    'ph-login-mobile': { en: 'Enter 10-digit Mobile', hi: '10 अंकों का मोबाइल डालें', mr: '10 अंकी मोबाइल टाका' },
    'ph-login-password': { en: 'Enter Password', hi: 'पासवर्ड डालें', mr: 'पासवर्ड टाका' },
    'ph-login-email': { en: 'Enter Email ID', hi: 'ईमेल आईडी डालें', mr: 'ईमेल आयडी टाका' },

    // ==================== ACCOUNT CREATION ====================
    'create-title': { en: 'Select your account type to continue', hi: 'जारी रखने के लिए खाता प्रकार चुनें', mr: 'पुढे जाण्यासाठी खाते प्रकार निवडा' },
    'create-user-title': { en: 'User', hi: 'उपयोगकर्ता', mr: 'वापरकर्ता' },
    'create-user-desc': { en: 'Find skilled workers & services in your area quickly and easily', hi: 'अपने क्षेत्र में कुशल कामगार और सेवाएं जल्दी और आसानी से खोजें', mr: 'तुमच्या परिसरातील कुशल कामगार आणि सेवा सहज शोधा' },
    'create-worker-title': { en: 'Worker', hi: 'कामगार', mr: 'कामगार' },
    'create-worker-desc': { en: 'Register your skills and connect with users seeking your expertise', hi: 'अपने कौशल नोंदणी करें और अपनी विशेषज्ञता चाहने वाले उपयोगकर्ताओं से जुड़ें', mr: 'तुमचे कौशल्य नोंदवा आणि तुमच्या कौशल्याची गरज असलेल्यांशी जोडा' },
    'create-instruction': { en: 'Click on your role to proceed with registration', hi: 'नोंदणी के लिए अपनी भूमिका पर क्लिक करें', mr: 'नोंदणीसाठी तुमच्या भूमिकेवर क्लिक करा' },

    // ==================== USER REGISTRATION ====================
    'user-portal-title': { en: 'User Portal', hi: 'उपयोगकर्ता पोर्टल', mr: 'वापरकर्ता पोर्टल' },
    'btn-register-user': { en: '🚀 Register User', hi: '🚀 उपयोगकर्ता नोंदणी करें', mr: '🚀 वापरकर्ता नोंदणी करा' },
    'security-questions-info': { en: '🔐 Security Questions: These will help you recover your password if you forget it.', hi: '🔐 सुरक्षा प्रश्न: ये आपको पासवर्ड भूलने पर उसे पुनः प्राप्त करने में सहायता करेंगे।', mr: '🔐 सुरक्षा प्रश्न: पासवर्ड विसरल्यास हे प्रश्न मदत करतील.' },
    'label-pet-name': { en: "What is your pet's name (nickname)? *", hi: 'आपके पालतू जानवर का नाम (उपनाम) क्या है? *', mr: 'तुमच्या पाळीव प्राण्याचे नाव (टोपणनाव) काय आहे? *' },
    'label-teacher-name': { en: "What is your favorite teacher's name? *", hi: 'आपके पसंदीदा शिक्षक का नाम क्या है? *', mr: 'तुमच्या आवडत्या शिक्षकाचे नाव काय आहे? *' },
    'ph-pet-name': { en: "Enter your pet's nickname", hi: 'अपने पालतू का उपनाम डालें', mr: 'तुमच्या पाळीव प्राण्याचे टोपणनाव टाका' },
    'ph-teacher-name': { en: "Enter your favorite teacher's name", hi: 'अपने पसंदीदा शिक्षक का नाम डालें', mr: 'आवडत्या शिक्षकाचे नाव टाका' },
    'security-note': { en: '🔒 Important: Please remember this password and security answers. They will be required for future logins and account recovery.', hi: '🔒 महत्वपूर्ण: कृपया यह पासवर्ड और सुरक्षा उत्तर याद रखें। भविष्य के लॉग इन और खाता पुनः प्राप्ति के लिए आवश्यक होंगे।', mr: '🔒 महत्त्वाचे: हा पासवर्ड आणि सुरक्षा उत्तरे लक्षात ठेवा. भविष्यातील लॉग इन आणि खाते पुनर्प्राप्तीसाठी आवश्यक आहेत.' },

    // ==================== WORKER REGISTRATION ====================
    'worker-portal-title': { en: 'Worker Portal', hi: 'कामगार पोर्टल', mr: 'कामगार पोर्टल' },
    'btn-register-worker': { en: '🚀 Register Worker', hi: '🚀 कामगार नोंदणी करें', mr: '🚀 कामगार नोंदणी करा' },
    'label-worker-name': { en: 'Full Name *', hi: 'पूरा नाम *', mr: 'पूर्ण नाव *' },
    'label-father-name': { en: "Father's Name *", hi: 'पिता का नाम *', mr: 'वडिलांचे नाव *' },
    'label-mother-name': { en: "Mother's Name *", hi: 'माता का नाम *', mr: 'आईचे नाव *' },
    'label-experience': { en: 'Years of Experience *', hi: 'अनुभव के वर्ष *', mr: 'अनुभवाचे वर्ष *' },
    'label-work-type': { en: 'Type of Work *', hi: 'काम का प्रकार *', mr: 'कामाचा प्रकार *' },
    'label-other-work': { en: 'Other Work (if any)', hi: 'अन्य काम (यदि कोई हो)', mr: 'इतर काम (असल्यास)' },
    'label-location': { en: 'Your Location', hi: 'आपका स्थान', mr: 'तुमचे स्थान' },
    'label-friend-name': { en: "Best Friend's Name *", hi: 'बचपन के दोस्त का नाम *', mr: 'जिवलग मित्राचे नाव *' },
    'label-school-name': { en: 'Primary School Name *', hi: 'प्राथमिक विद्यालय का नाम *', mr: 'प्राथमिक शाळेचे नाव *' },
    'label-birthplace': { en: 'Birthplace *', hi: 'जन्म स्थान *', mr: 'जन्मस्थान *' },

    // ==================== USER DASHBOARD ====================
    'dashboard-welcome': { en: 'Welcome to QuickKaam', hi: 'QuickKaam में आपका स्वागत है', mr: 'QuickKaam मध्ये आपले स्वागत आहे' },
    'dashboard-subtitle': { en: 'Find skilled workers and manage your service requests', hi: 'कुशल कामगार खोजें और अपने सेवा अनुरोध प्रबंधित करें', mr: 'कुशल कामगार शोधा आणि सेवा विनंत्या व्यवस्थापित करा' },
    'profile-identity': { en: 'Personal Identity', hi: 'व्यक्तिगत पहचान', mr: 'वैयक्तिक ओळख' },
    'profile-verified': { en: 'Your details are verified under QuickKaam Guidelines.', hi: 'आपकी जानकारी QuickKaam दिशानिर्देशों के अंतर्गत सत्यापित है।', mr: 'तुमचा तपशील QuickKaam मार्गदर्शक तत्त्वांनुसार पडताळला गेला आहे.' },
    'profile-name': { en: 'Name:', hi: 'नाम:', mr: 'नाव:' },
    'profile-email': { en: 'Email:', hi: 'ईमेल:', mr: 'ईमेल:' },
    'profile-mobile': { en: 'Mobile:', hi: 'मोबाइल:', mr: 'मोबाइल:' },
    'profile-city': { en: 'City:', hi: 'शहर:', mr: 'शहर:' },
    'search-title': { en: 'Search Workers by Location', hi: 'स्थान के अनुसार कामगार खोजें', mr: 'स्थानानुसार कामगार शोधा' },
    'search-subtitle': { en: 'Find skilled workers in your area and send them work requests directly', hi: 'अपने क्षेत्र में कुशल कामगार खोजें और सीधे काम के अनुरोध भेजें', mr: 'तुमच्या परिसरातील कुशल कामगार शोधा आणि त्यांना थेट काम विनंती पाठवा' },
    'search-location-btn': { en: '📍 Use my current location to find nearest workers', hi: '📍 निकटतम कामगार खोजने के लिए मेरा वर्तमान स्थान उपयोग करें', mr: '📍 जवळचे कामगार शोधण्यासाठी माझे सध्याचे स्थान वापरा' },
    'select-work-type': { en: 'Select Work Type', hi: 'काम का प्रकार चुनें', mr: 'कामाचा प्रकार निवडा' },
    'ticket-title': { en: 'Raise a Service Request', hi: 'सेवा अनुरोध उठाएं', mr: 'सेवा विनंती करा' },
    'ticket-subtitle': { en: 'Submit a ticket that will be sent to all matching workers in your selected area', hi: 'एक टिकट सबमिट करें जो आपके चुने हुए क्षेत्र में सभी मिलान करने वाले कामगारों को भेजा जाएगा', mr: 'एक तिकीट सबमिट करा जे तुमच्या निवडलेल्या क्षेत्रातील सर्व जुळणाऱ्या कामगारांना पाठवले जाईल' },
    'label-problem': { en: 'Problem Description', hi: 'समस्या विवरण', mr: 'समस्येचे वर्णन' },
    'ph-problem': { en: 'Describe your problem in detail...', hi: 'अपनी समस्या विस्तार से बताएं...', mr: 'तुमची समस्या तपशीलात सांगा...' },
    'btn-submit-ticket': { en: '📤 Submit Ticket to Matching Workers', hi: '📤 मिलान करने वाले कामगारों को टिकट भेजें', mr: '📤 जुळणाऱ्या कामगारांना तिकीट पाठवा' },
    'my-requests-title': { en: 'My Requests', hi: 'मेरे अनुरोध', mr: 'माझ्या विनंत्या' },
    'tab-pending': { en: 'My Requests (Pending)', hi: 'मेरे अनुरोध (लंबित)', mr: 'माझ्या विनंत्या (प्रलंबित)' },
    'tab-accepted': { en: 'Accepted Tickets', hi: 'स्वीकृत टिकट', mr: 'स्वीकारलेले तिकीट' },
    'tab-completed': { en: 'Completed History', hi: 'पूर्ण इतिहास', mr: 'पूर्ण झालेला इतिहास' },
    'no-pending': { en: '📋 No pending requests. Search for workers or raise a ticket to get started!', hi: '📋 कोई लंबित अनुरोध नहीं। शुरू करने के लिए कामगार खोजें या टिकट उठाएं!', mr: '📋 कोणत्याही प्रलंबित विनंत्या नाहीत. सुरुवात करण्यासाठी कामगार शोधा किंवा तिकीट करा!' },
    'deactivation-warning': { en: '⚠️ Account Scheduled for Deletion', hi: '⚠️ खाता हटाने के लिए निर्धारित', mr: '⚠️ खाते हटवण्यासाठी नियोजित' },
    'deactivation-text': { en: 'Your account will be permanently deleted in:', hi: 'आपका खाता स्थायी रूप से हटा दिया जाएगा:', mr: 'तुमचे खाते कायमचे हटवले जाईल:' },
    'deactivation-cancel': { en: 'Login again before the timer expires to cancel the deletion.', hi: 'हटाने को रद्द करने के लिए टाइमर समाप्त होने से पहले फिर से लॉग इन करें।', mr: 'हटवणे रद्द करण्यासाठी टायमर संपण्यापूर्वी पुन्हा लॉग इन करा.' },

    // ==================== WORKER DASHBOARD ====================
    'worker-welcome': { en: 'Welcome,', hi: 'स्वागत है,', mr: 'स्वागत आहे,' },
    'worker-city': { en: '📍 City:', hi: '📍 शहर:', mr: '📍 शहर:' },
    'worker-work-type': { en: '🛠️ Work Type:', hi: '🛠️ काम का प्रकार:', mr: '🛠️ कामाचा प्रकार:' },
    'worker-contact': { en: '📞 Contact:', hi: '📞 संपर्क:', mr: '📞 संपर्क:' },
    'worker-completed-jobs': { en: 'Completed Jobs', hi: 'पूर्ण काम', mr: 'पूर्ण झालेले काम' },
    'worker-avg-rating': { en: 'Avg Rating', hi: 'औसत रेटिंग', mr: 'सरासरी रेटिंग' },
    'notifications-title': { en: 'Service Request Notifications', hi: 'सेवा अनुरोध सूचनाएं', mr: 'सेवा विनंती सूचना' },
    'notifications-subtitle': { en: 'New service requests from users', hi: 'उपयोगकर्ताओं से नए सेवा अनुरोध', mr: 'वापरकर्त्यांकडून नवीन सेवा विनंत्या' },
    'accepted-title': { en: 'My Accepted Work', hi: 'मेरा स्वीकृत काम', mr: 'माझे स्वीकारलेले काम' },
    'accepted-subtitle': { en: 'Jobs you have accepted and are currently working on', hi: 'वे काम जो आपने स्वीकार किए और अभी कर रहे हैं', mr: 'तुम्ही स्वीकारलेले आणि सध्या काम करत असलेले काम' },
    'history-title': { en: 'My Work History', hi: 'मेरा काम इतिहास', mr: 'माझा कामाचा इतिहास' },
    'history-subtitle': { en: 'All your completed jobs with ratings', hi: 'रेटिंग के साथ आपके सभी पूर्ण काम', mr: 'रेटिंगसह तुमचे सर्व पूर्ण झालेले काम' },

    // ==================== TERMS & CONDITIONS ====================
    'terms-worker-title': { en: '📋 Terms & Conditions for Workers', hi: '📋 कामगारों के लिए नियम और शर्तें', mr: '📋 कामगारांसाठी अटी व शर्ती' },
    'terms-user-title': { en: '📋 Terms & Conditions for Users', hi: '📋 उपयोगकर्ताओं के लिए नियम और शर्तें', mr: '📋 वापरकर्त्यांसाठी अटी व शर्ती' },
    'terms-disclaimer': { en: '⚠️ Liability Disclaimer', hi: '⚠️ दायित्व अस्वीकरण', mr: '⚠️ दायित्व अस्वीकरण' },

    // ==================== HELP PAGE ====================
    'help-title': { en: 'Help & Support', hi: 'सहायता और समर्थन', mr: 'मदत आणि आधार' },
    'help-subtitle': { en: 'Facing an issue? Describe it below and our team will get back to you.', hi: 'कोई समस्या है? नीचे बताएं और हमारी टीम आपसे संपर्क करेगी।', mr: 'काही समस्या आहे? खाली सांगा आणि आमची टीम तुमच्याशी संपर्क साधेल.' },
    'help-category': { en: 'Category of Issue', hi: 'समस्या की श्रेणी', mr: 'समस्येची श्रेणी' },
    'help-name': { en: 'Your Name', hi: 'आपका नाम', mr: 'तुमचे नाव' },
    'help-description': { en: 'Detailed Description', hi: 'विस्तृत विवरण', mr: 'तपशीलवार वर्णन' },
    'help-btn-send': { en: 'Send to Support', hi: 'सहायता को भेजें', mr: 'आधाराला पाठवा' },
    'help-back': { en: '← Back to Dashboard', hi: '← डैशबोर्ड पर वापस', mr: '← डॅशबोर्डवर मागे' },
    'help-opt-profile': { en: 'Profile Update Issue', hi: 'प्रोफ़ाइल अपडेट समस्या', mr: 'प्रोफाइल अपडेट समस्या' },
    'help-opt-worker': { en: 'Worker Not Responding', hi: 'कामगार जवाब नहीं दे रहा', mr: 'कामगार प्रतिसाद देत नाही' },
    'help-opt-booking': { en: 'Booking/History Error', hi: 'बुकिंग/इतिहास त्रुटि', mr: 'बुकिंग/इतिहास त्रुटी' },
    'help-opt-bug': { en: 'Technical Bug/App Crash', hi: 'तकनीकी बग/ऐप क्रैश', mr: 'तांत्रिक बग/ॲप क्रॅश' },
    'help-opt-verification': { en: 'Skill India Verification', hi: 'स्किल इंडिया सत्यापन', mr: 'स्किल इंडिया पडताळणी' },
    'help-opt-other': { en: 'Other', hi: 'अन्य', mr: 'इतर' },

    // ==================== PASSWORD RECOVERY ====================
    'recovery-title': { en: '🔑 Recovery Method', hi: '🔑 पुनः प्राप्ति विधि', mr: '🔑 पुनर्प्राप्ती पद्धत' },
    'recovery-subtitle': { en: 'How do you want to reset?', hi: 'आप कैसे रीसेट करना चाहते हैं?', mr: 'तुम्हाला कसे रीसेट करायचे आहे?' },
    'recovery-questions': { en: '🔐 Security Questions', hi: '🔐 सुरक्षा प्रश्न', mr: '🔐 सुरक्षा प्रश्न' },
    'recovery-questions-desc': { en: 'Answer your secret questions', hi: 'अपने गुप्त प्रश्नों के उत्तर दें', mr: 'तुमच्या गुप्त प्रश्नांची उत्तरे द्या' },
    'recovery-otp': { en: '📱 OTP via SMS', hi: '📱 SMS द्वारा OTP', mr: '📱 SMS द्वारे OTP' },
    'recovery-otp-desc': { en: 'Get code on registered mobile', hi: 'नोंदणीकृत मोबाइल पर कोड प्राप्त करें', mr: 'नोंदणीकृत मोबाइलवर कोड मिळवा' },
    'verify-title': { en: 'Verify Identity', hi: 'पहचान सत्यापित करें', mr: 'ओळख पडताळा' },
    'reset-password-title': { en: 'Reset Password', hi: 'पासवर्ड रीसेट करें', mr: 'पासवर्ड रीसेट करा' },
    'btn-send-otp': { en: 'Send OTP', hi: 'OTP भेजें', mr: 'OTP पाठवा' },
    'btn-verify-otp': { en: 'Verify OTP', hi: 'OTP सत्यापित करें', mr: 'OTP पडताळा' },
    'ph-otp': { en: 'Enter 6-digit OTP', hi: '6 अंकों का OTP डालें', mr: '6 अंकी OTP टाका' },

    // ==================== REQUEST DIALOG ====================
    'send-request-title': { en: '📩 Send Work Request', hi: '📩 काम का अनुरोध भेजें', mr: '📩 काम विनंती पाठवा' },
    'btn-send-request': { en: '📤 Send Request', hi: '📤 अनुरोध भेजें', mr: '📤 विनंती पाठवा' },

    // ==================== WORKER CARD ====================
    'card-rating': { en: 'Rating:', hi: 'रेटिंग:', mr: 'रेटिंग:' },
    'card-jobs': { en: 'Jobs Done:', hi: 'पूर्ण काम:', mr: 'पूर्ण काम:' },
    'card-experience': { en: 'Yrs Experience:', hi: 'वर्ष अनुभव:', mr: 'वर्ष अनुभव:' },
    'card-location': { en: '📍 Location:', hi: '📍 स्थान:', mr: '📍 स्थान:' },
    'btn-send-direct': { en: '📩 Send Direct Request', hi: '📩 सीधा अनुरोध भेजें', mr: '📩 थेट विनंती पाठवा' }
};

// ============================================================
// Language Cookie Functions
// ============================================================
function getLang() {
    // Check localStorage first (reliable across all pages), then cookie as fallback
    const lsLang = localStorage.getItem('qk_lang');
    if (lsLang) return lsLang;
    const match = document.cookie.split('; ').find(c => c.startsWith('qk_lang='));
    return match ? match.split('=')[1] : null;
}

function setLang(lang) {
    // Save to both localStorage and cookie for maximum reliability
    localStorage.setItem('qk_lang', lang);
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `qk_lang=${lang}; expires=${expires}; path=/; SameSite=Lax`;
}

// ============================================================
// Apply translations to the page
// ============================================================
function applyTranslations(lang) {
    if (!lang) return;
    document.documentElement.lang = lang;

    // Text content
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
            el.textContent = TRANSLATIONS[key][lang];
        }
    });

    // Placeholders
    document.querySelectorAll('[data-lang-ph]').forEach(el => {
        const key = el.getAttribute('data-lang-ph');
        if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
            el.placeholder = TRANSLATIONS[key][lang];
        }
    });

    // HTML content (for elements that need innerHTML)
    document.querySelectorAll('[data-lang-html]').forEach(el => {
        const key = el.getAttribute('data-lang-html');
        if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
            el.innerHTML = TRANSLATIONS[key][lang];
        }
    });

    // Update switcher button if present
    const switcher = document.getElementById('langSwitcherBtn');
    if (switcher) {
        const labels = { en: 'A', hi: 'अ', mr: 'अ' };
        switcher.textContent = labels[lang] || 'A';
    }
}

// ============================================================
// Language Switcher UI (injected into all pages)
// ============================================================
function injectLangSwitcher() {
    const style = document.createElement('style');
    style.textContent = `
        #langSwitcher {
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 99999;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
        }
        #langSwitcherBtn {
            background: #ff9933;
            color: white;
            border: none;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            font-size: 1.3rem;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(255,153,51,0.5);
            transition: all 0.3s;
            font-family: 'Poppins', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
        }
        #langSwitcherBtn:hover { background: #e68a00; transform: scale(1.08); }
        #langDropdown {
            display: none;
            flex-direction: column;
            gap: 6px;
            background: rgba(26,26,26,0.95);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255,153,51,0.4);
            border-radius: 14px;
            padding: 10px;
            min-width: 130px;
        }
        #langDropdown.open { display: flex; }
        .lang-opt {
            background: rgba(255,255,255,0.08);
            color: white;
            border: 1px solid rgba(255,255,255,0.15);
            padding: 8px 14px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: 600;
            font-family: 'Poppins', sans-serif;
            transition: all 0.2s;
            text-align: left;
        }
        .lang-opt:hover { background: #ff9933; border-color: #ff9933; }
        .lang-opt.active { background: #ff9933; border-color: #ff9933; }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.id = 'langSwitcher';
    container.innerHTML = `
        <div id="langDropdown">
            <button class="lang-opt" data-lang="en">English</button>
            <button class="lang-opt" data-lang="hi">हिंदी</button>
            <button class="lang-opt" data-lang="mr">मराठी</button>
        </div>
        <button id="langSwitcherBtn" title="Change Language">A</button>
    `;
    document.body.appendChild(container);

    const btn = document.getElementById('langSwitcherBtn');
    const dropdown = document.getElementById('langDropdown');

    btn.addEventListener('click', () => dropdown.classList.toggle('open'));
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) dropdown.classList.remove('open');
    });

    container.querySelectorAll('.lang-opt').forEach(opt => {
        opt.addEventListener('click', () => {
            const lang = opt.getAttribute('data-lang');
            setLang(lang);
            applyTranslations(lang);
            updateActiveBtn(lang);
            dropdown.classList.remove('open');
        });
    });

    const currentLang = getLang() || 'en';
    updateActiveBtn(currentLang);

    function updateActiveBtn(lang) {
        container.querySelectorAll('.lang-opt').forEach(o => {
            o.classList.toggle('active', o.getAttribute('data-lang') === lang);
        });
        const labels = { en: 'A', hi: 'अ', mr: 'अ' };
        btn.textContent = labels[lang] || 'A';
    }
}

// ============================================================
// Language Selection Modal (shown on first visit)
// ============================================================
function showLangModal() {
    const overlay = document.createElement('div');
    overlay.id = 'langModal';
    overlay.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.92);
        display: flex; align-items: center; justify-content: center;
        z-index: 999999; font-family: 'Poppins', sans-serif;
    `;
    overlay.innerHTML = `
        <div style="
            background: rgba(255,255,255,0.08); backdrop-filter: blur(20px);
            border: 2px solid rgba(255,153,51,0.5); border-radius: 24px;
            padding: 50px 40px; text-align: center; max-width: 420px; width: 90%;
            animation: langModalIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275);
        ">
            <h2 style="color: #ff9933; font-size: 1.8rem; font-weight: 800; margin-bottom: 6px; letter-spacing: 1px;">
                Choose Your Language
            </h2>
            <p style="color: rgba(255,255,255,0.65); font-size: 0.9rem; margin-bottom: 8px;">अपनी भाषा चुनें &nbsp;|&nbsp; तुमची भाषा निवडा</p>
            <p style="color: rgba(255,255,255,0.45); font-size: 0.75rem; margin-bottom: 35px;">
                You can change this anytime from the bottom-left button
            </p>
            <div style="display: flex; flex-direction: column; gap: 14px;">
                <button onclick="selectLangAndClose('en')" style="
                    background: rgba(255,255,255,0.1); color: white; border: 2px solid rgba(255,255,255,0.25);
                    padding: 16px; border-radius: 12px; font-size: 1.05rem; font-weight: 700;
                    cursor: pointer; transition: all 0.3s; font-family: 'Poppins', sans-serif;
                    display: flex; align-items: center; justify-content: center; gap: 12px;
                " onmouseover="this.style.background='#ff9933'; this.style.borderColor='#ff9933';"
                   onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.borderColor='rgba(255,255,255,0.25)';">
                    <span style="font-size: 1.5rem;">🇬🇧</span> English
                </button>
                <button onclick="selectLangAndClose('hi')" style="
                    background: rgba(255,255,255,0.1); color: white; border: 2px solid rgba(255,255,255,0.25);
                    padding: 16px; border-radius: 12px; font-size: 1.05rem; font-weight: 700;
                    cursor: pointer; transition: all 0.3s; font-family: 'Poppins', sans-serif;
                    display: flex; align-items: center; justify-content: center; gap: 12px;
                " onmouseover="this.style.background='#ff9933'; this.style.borderColor='#ff9933';"
                   onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.borderColor='rgba(255,255,255,0.25)';">
                    <span style="font-size: 1.5rem;">🇮🇳</span> हिंदी (Hindi)
                </button>
                <button onclick="selectLangAndClose('mr')" style="
                    background: rgba(255,255,255,0.1); color: white; border: 2px solid rgba(255,255,255,0.25);
                    padding: 16px; border-radius: 12px; font-size: 1.05rem; font-weight: 700;
                    cursor: pointer; transition: all 0.3s; font-family: 'Poppins', sans-serif;
                    display: flex; align-items: center; justify-content: center; gap: 12px;
                " onmouseover="this.style.background='#ff9933'; this.style.borderColor='#ff9933';"
                   onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.borderColor='rgba(255,255,255,0.25)';">
                    <span style="font-size: 1.5rem;">🇮🇳</span> मराठी (Marathi)
                </button>
            </div>
        </div>
        <style>
            @keyframes langModalIn {
                from { opacity: 0; transform: scale(0.85); }
                to { opacity: 1; transform: scale(1); }
            }
        </style>
    `;
    document.body.appendChild(overlay);
}

function selectLangAndClose(lang) {
    setLang(lang);
    applyTranslations(lang);
    const modal = document.getElementById('langModal');
    if (modal) modal.remove();
    // Update switcher active state
    document.querySelectorAll('.lang-opt').forEach(o => {
        o.classList.toggle('active', o.getAttribute('data-lang') === lang);
    });
    const btn = document.getElementById('langSwitcherBtn');
    if (btn) {
        const labels = { en: 'A', hi: 'अ', mr: 'अ' };
        btn.textContent = labels[lang] || 'A';
    }
}

// ============================================================
// Initialize on page load
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const lang = getLang();
    if (!lang) {
        // First visit - show language selection modal
        showLangModal();
    } else {
        applyTranslations(lang);
    }
    // Always inject the floating language switcher icon on every page
    injectLangSwitcher();
});
