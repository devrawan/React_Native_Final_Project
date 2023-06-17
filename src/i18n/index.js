import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {  I18nManager} from 'react-native';
const resources = {
  en: {
    translation: {
      "Settings": "Settings",
      "Main":"Main",
      "Favorite":"Favorite",
      "Pay Book":"Pay Book",
      "Blog":"Blog",
      "Change Password":"Change Password",
      "Privacy Policy":"Privacy Policy",
      "Call Us":"Call Us",
      "Amazon products at 10% off":"Amazon products at 10% off",
      "10/15/2022 with an expiring date":"10/15/2022 with an expiring date",
      "Change Lnaguage":"Change Lnaguage",
      "Contact Us" : "Contact Us",
      "PrivText":"This text is an example of text that can be replaced in the same text space, this text was generated from the generator of the Arabic text, Where you can generate such text or many texts Other in addition to increase If you need more paragraphs, the text generator allows you  Elaraby Increase the number of paragraphs as you like, the text will not appear divided It does not contain linguistic errors, the Arabic text generator is useful for designers Websites in particular, where the customer needs a lot Sometimes to see a real picture of the design of the site",
    "ContactText":"Hence, the designer must put temporary texts on Design to show the client the full form, the role of the text generator Al-Arabi saves the designer from the trouble of searching for an alternative text It has a relationship with the topic that the design is talking about, and it appears in a form dose not fit. This text can be superimposed on any design without a problem  It will not look like copied, unstructured, unformatted text, or even  Not understood. Because it is still an alternative and temporary text"
    ,"Offers":"Offers",
    "All":"All",
    "Sport":"Sport",
    "Gifts":"Gifts",
    "Home":"Home",
    "Fashion":"Fashion",
    "Food":"Food",
    "Electronics":"Electronic",
    "Off":" off",
    "R.S":"R.S",
    "Details":"Details",
"DetText":"Amazon Saudi Arabia is a store that sells all items, clothes and electrical appliances"
,"Related Coupons":"Related Coupons",
"Place":"Place",
"Type":"Type",
"Children":"Children",
"Mans":"Mans",
"Apply":"Apply",
"Cancel":"Cancel",
"Terms and Conditions":"Terms and Conditions",
" No available coupons for this category":" No available coupons for this category"



}
  },
  ar: {
    translation: {
      "Settings": "القائمة",
      "Main":"الرئيسية",
      "Favorite":"المفضلة",
      "Pay Book":"سجل المدفوعات",
      "Blog":"المدونة",
      "Change Password":"تغيير كلمة المرور",
      "Privacy Policy":"سياسة الخصوصية",
      "Call Us":"اتصل بنا",
"Amazon products at 10% off":"خصم (10%) على منتجات امازون",
"with an expiring date":" ينتهي بتاريخ ",
"Change Lnaguage":"تغيير اللغة",
"Contact Us":"تواصل معنا ",
"PrivText":"هذا النص هو مثال لنص يمكن أن يستبدل في نفس مساحة النص ، هذا النص تم إنشاؤه من منشئ النص العربي ، حيث يمكنك إنشاء مثل هذا النص أو العديد من النصوص الأخرى بالإضافة إلى الزيادة. مولد النص يتيح لك العربي زيادة عدد الفقرات كما تريد ، لن يظهر النص مقسما ولا يحتوي على أخطاء لغوية ، مولد النص العربي مفيد لمصممي مواقع الويب على وجه الخصوص ، حيث يحتاج العميل كثيرا في بعض الأحيان لرؤية حقيقية صورة تصميم الموقع",
"ContactText":"ومن هنا يجب على المصمم وضع نصوص مؤقتة على التصميم ليوضح للعميل الشكل الكامل ، ودور منشئ النص العربي يحفظ المصمم من عناء البحث عن نص بديل له علاقة بالموضوع أن التصميم يتحدث عنه ، ويظهر في شكل جرعة غير مناسبة. يمكن تركيب هذا النص على أي تصميم دون مشكلة ، ولن يبدو مثل نص منسوخ ، أو غير منظم ، أو غير منسق ، أو حتى غير مفهوم. لأنه لا يزال نصًا بديلًا ومؤقتًا"
,"Offers":"العروض",
"All":"الكل",
    "Sport":"رياضة",
    "Gifts":"هدايا",
    "Home":"منزل",
    "Fashion":"أزياء",
    "Food":"طعام",
    "Electronics":"الكترونيات",
    "Off":" خصم",
    "R.S":" ر.س",
    "Details":"تفاصيل",
    "DetText":" امازون السعودية متجر لبيع جميع الأصناف والملابس والأجهزة الكهربائية"
    ,"Related Coupons":"كوبونات ذات علاقة",
    "Place":"المكان",
"Type":"النوع",
"Children":"اطفال",
"Mans":"رجال",
"Apply":"تطبيق",
"Cancel":"اغلاق",
"Terms and Conditions":"الشروط والاحكام",
"No available coupons for this category":"لا يوجد كوبونات متاحة لهذا الصنف",
"No available offer for this category":"لا يوجد عروض متاحة لهذا الصنف",

"Register" : "تسجيل",

"Coupons" : "الكوبونات",
"All": "الكل",
"Mobile" : "رقم الهاتف",
"Email" : "البريد الالكتروني",
"Title" : "العنوان",
"Details" : "التفاصيل",
"Send" : "أرسل",
"Mobile Field must be 9 digit" : "رقم الهاتف يجب أن يتكون من 9 أرقام",
"Success" : "نجاح",
"Contact US" : "اتصل بنا",
"Name" : "الاسم",
"skip": "تخطي",

}
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    resources,
    // lng: "en", 
lng: I18nManager.isRTL ? 'ar' : 'en',
    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;