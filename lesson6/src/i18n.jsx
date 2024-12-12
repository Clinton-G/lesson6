import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "header": {
        "title": "Blog Platform"
      },
      "createPost": {
        "title": "Create New Post",
        "placeholderTitle": "Enter the post title",
        "placeholderBody": "Enter the post body"
      },
      "postList": {
        "title": "Posts List"
      },
      "commentForm": {
        "title": "Post a Comment",
        "placeholder": "Write your comment here",
        "error": "Please enter a comment."
      }
    }
  },
  sv: {
    translation: {
      "header": {
        "title": "Bloggplattform"
      },
      "createPost": {
        "title": "Skapa Ny Post",
        "placeholderTitle": "Ange posttitel",
        "placeholderBody": "Ange postens innehåll"
      },
      "postList": {
        "title": "Inläggslista"
      },
      "commentForm": {
        "title": "Skicka en Kommentar",
        "placeholder": "Skriv din kommentar här",
        "error": "Var god ange en kommentar."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;