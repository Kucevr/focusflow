import { Language } from '../types';

export const translations = {
  en: {
    nav: {
      start: 'Start',
      algorithm: 'Algorithm',
      trap: 'Trap',
      burden: 'Burden',
      problem: 'Problem',
      chaos: 'Chaos',
      rewiring: 'Rewiring',
      clarity: 'Clarity',
      manifesto: 'Manifesto',
      test: 'Test',
      action: 'Action',
      takeControl: 'Take Control'
    },
    hero: {
      titleLine1: 'Reclaim',
      titleLine2: 'Your',
      titleHighlight: 'Time',
      subtitle: 'In an economy of attention, focus is the only currency that matters.',
      scroll: 'Scroll to Begin'
    },
    algorithm: {
      badge: 'Surveillance Active',
      title: 'They are watching.',
      targeting: 'Targeting',
      targetingDesc: 'Your hesitation, clicks, and scrolls are auctioned in real-time to the highest bidder.',
      prediction: 'Prediction',
      predictionDesc: 'The algorithm knows what you want to see before you even think it.',
      capture: 'Capture',
      captureDesc: 'Designed to bypass your logic and hijack your dopamine receptors.',
      hud: {
        dataStream: 'DATA_STREAM_OUT',
        retention: 'RETENTION_RATE',
        predictive: 'PREDICTIVE_MODEL',
        vulnerability: 'VULNERABILITY',
        accurate: 'ACCURATE',
        high: 'HIGH'
      }
    },
    dopamine: {
      badge: 'Simulated Hedonic Loop',
      title: 'The Dopamine',
      titleHighlight: 'Trap',
      subtitle: 'Algorithms are designed to create a dependency. Keep the bar full to feel "happy".',
      tap: 'Tap for Reward',
      good: 'Feeling Good!',
      chasing: 'Chasing the High...',
      dontStop: "Don't Stop!",
      withdrawal: 'Withdrawal.',
      empty: 'EMPTY',
      hitMe: 'HIT ME',
      quote: '"It\'s not that we enjoy it.\nIt\'s that we can\'t stop."'
    },
    burden: {
      badge: 'Cognitive Friction',
      title: 'The Switch',
      titleHighlight: 'Cost',
      desc: 'Multitasking is a myth. Your brain doesn\'t parallel process; it switches contexts. Every switch costs energy and IQ points.',
      game: {
        instruction: 'Select the TEXT COLOR',
        color: 'COLOR',
        word: 'WORD',
        start: 'Start Test',
        score: 'Score',
        gameOver: 'System Overload',
        tryAgain: 'Try Again',
        colors: {
          red: 'RED',
          blue: 'BLUE',
          green: 'GREEN',
          yellow: 'YELLOW'
        }
      }
    },
    problem: {
      title: 'We are losing the',
      titleHighlight: 'battle.',
      desc: 'Doomscrolling isn\'t a bad habit; it\'s a feature. Algorithms are engineered to monetize your anxiety and harvest your attention span, one second at a time.',
      quantify: 'Quantify the damage',
      calc: {
        header: 'The Cost of Attention',
        daily: 'Daily Screen Time',
        monk: 'Monk Mode (0h)',
        average: 'Average (4h)',
        terminal: 'Terminally Online (12h)',
        yearsLost: 'Years of Life Lost',
        wakingLife: 'Of Waking Life',
        quote: '"{years} years is not just time. It\'s books unread, places unseen, and memories unmade."'
      }
    },
    chaos: {
      noise: 'NOISE',
      title: 'System',
      titleHighlight: 'Overload',
      quote: '"We are drowning in information, \nwhile starving for wisdom."',
      badge: 'The Cognitive Cost of Distraction',
      notifications: {
        mom: "Mom: Where are you?",
        slack: "@channel deployment failed 🚨",
        insta: "sarah_j and 42 others liked your story",
        mail: "URGENT: Project Update Request",
        news: "BREAKING: Market volatility continues...",
        tiktok: "Wait until you see this ending 😱",
        calendar: "Meeting in 10 minutes",
        twitter: "New trending topic in your area",
        health: "Time to stand up!",
        bank: "Large transaction detected",
        boss: "Dm from Boss: Can we talk?",
        snap: "New memory available",
        verify: "Verify your identity code: 8291",
        linkedin: "Recruiter viewed your profile"
      }
    },
    rewiring: {
      badge: 'The Biological Solution',
      title: 'Neuroplasticity.',
      desc: 'Your brain is not fixed. It’s fluid. Every time you',
      descHighlight: 'resist',
      descEnd: 'a distraction, you physically strengthen the neural pathways of focus.',
      hint: '// MOVE CURSOR TO STIMULATE NEURAL GROWTH'
    },
    clarity: {
      title: 'Deep Work is a',
      titleHighlight: 'Superpower.',
      desc: 'When you intentionally block out the noise, you don\'t just become more productive. You reclaim your autonomy. Clarity returns. Anxiety fades.',
      stat1: 'Productivity Boost',
      stat2: 'Anxiety Reduction',
      guide: {
        sync: 'Sync your breath to clear your mind',
        inhale: 'Inhale',
        hold: 'Hold',
        exhale: 'Exhale'
      }
    },
    manifesto: {
      title: 'WE CHOOSE',
      depth: 'DEPTH',
      over: 'OVER',
      breadth: 'BREADTH.',
      p1: 'We believe that a focused life is a good life. In a world screaming for your attention, silence is the ultimate luxury.',
      p2: 'We refuse to be the product. We choose to be the creators, the thinkers, and the masters of our own minds.'
    },
    resilience: {
      badge: 'Focus Resilience Check',
      focusBroken: 'FOCUS BROKEN',
      resistNoise: 'RESIST THE NOISE',
      holdToFocus: 'HOLD TO FOCUS',
      instructionHold: 'Press and hold',
      instructionKeep: 'Do not release',
      start: 'START',
      successTitle: 'Neural Pathway Strengthened.',
      successDesc: 'You have successfully inhibited the impulse to switch tasks. This is the mechanism of deep focus.',
      distractions: ["LOOK HERE", "NEW MESSAGE", "TRENDING", "VIRAL", "DON'T MISS OUT", "URGENT", "SALE", "UPGRADE", "NOTIFICATION", "LIKE", "COMMENT"]
    },
    action: {
      badge: 'Interactive Session',
      title: 'Begin Your Session',
      desc: 'Identify the distraction. Name it. Tame it.',
      footer: 'Designed for Digital Wellbeing.',
      resources: 'Resources',
      tools: 'Tools',
      privacy: 'Privacy',
      latency: 'Latency',
      science: 'The Science',
      calculator: 'Calculator'
    },
    coach: {
      placeholder: "What's distracting you?",
      loading: "Analyzing...",
      strategy: "Your Focus Strategy",
      action: "Immediate Action",
      newTopic: "New Topic",
      lockIn: "Lock In (25m)",
      footer: "AI Personalized Coaching • Powered by Gemini"
    },
    timer: {
      currentFocus: "Current Focus",
      endSession: "End Session",
      soundscape: "Soundscape",
      deepWork: "Deep Work Mode",
      sounds: {
        brown: "Brown Noise",
        rain: "Heavy Rain",
        waves: "Ocean Waves",
        zen: "Deep Zen",
        none: "Silence"
      }
    },
    progress: {
      level: "Neural Level",
      exp: "Experience",
      unlocked: "Unlocked",
      achievements: "Achievements",
      exercises: "Exercises Completed",
      sounds: "Soundscapes",
      themes: "Visual Themes"
    },
    poisons: {
      title: "Digital Poisons",
      subtitle: "Dark patterns designed to exploit your biology.",
      infinite: "Infinite Scroll",
      infiniteDesc: "Removes natural stopping points to keep you scrolling forever.",
      variable: "Variable Rewards",
      variableDesc: "The slot machine effect. You keep checking because you might find something good.",
      fomo: "FOMO Engineering",
      fomoDesc: "Creating artificial urgency to trigger your social anxiety."
    }
  },
  ru: {
    nav: {
      start: 'Начало',
      algorithm: 'Алгоритм',
      trap: 'Ловушка',
      burden: 'Нагрузка',
      problem: 'Проблема',
      chaos: 'Хаос',
      rewiring: 'Нейро',
      clarity: 'Ясность',
      manifesto: 'Манифест',
      test: 'Тест',
      action: 'Действие',
      takeControl: 'Взять Контроль'
    },
    hero: {
      titleLine1: 'Верни',
      titleLine2: 'Свое',
      titleHighlight: 'Время',
      subtitle: 'В экономике внимания фокус — это единственная валюта, которая имеет значение.',
      scroll: 'Листай вниз'
    },
    algorithm: {
      badge: 'Слежка Активна',
      title: 'Они следят.',
      targeting: 'Таргетинг',
      targetingDesc: 'Ваши колебания, клики и скроллы продаются на аукционе в реальном времени.',
      prediction: 'Предсказание',
      predictionDesc: 'Алгоритм знает, что вы хотите увидеть, еще до того, как вы об этом подумаете.',
      capture: 'Захват',
      captureDesc: 'Создано, чтобы обойти логику и взломать ваши дофаминовые рецепторы.',
      hud: {
        dataStream: 'ПОТОК_ДАННЫХ',
        retention: 'УДЕРЖАНИЕ',
        predictive: 'МОДЕЛЬ_ПРОГНОЗА',
        vulnerability: 'УЯЗВИМОСТЬ',
        accurate: 'ТОЧНО',
        high: 'ВЫСОКАЯ'
      }
    },
    dopamine: {
      badge: 'Симуляция Гедонизма',
      title: 'Дофаминовая',
      titleHighlight: 'Ловушка',
      subtitle: 'Алгоритмы создают зависимость. Держи шкалу полной, чтобы чувствовать себя "счастливым".',
      tap: 'Жми для награды',
      good: 'Кайф!',
      chasing: 'Погоня за кайфом...',
      dontStop: "Не останавливайся!",
      withdrawal: 'Ломка.',
      empty: 'ПУСТО',
      hitMe: 'ДАЙ ЕЩЕ',
      quote: '"Дело не в том, что нам это нравится.\nДело в том, что мы не можем остановиться."'
    },
    burden: {
      badge: 'Когнитивное Трение',
      title: 'Цена',
      titleHighlight: 'Переключения',
      desc: 'Мультизадачность — это миф. Мозг не работает параллельно, он переключается. Каждое переключение стоит энергии и пунктов IQ.',
      game: {
        instruction: 'Выберите ЦВЕТ ТЕКСТА',
        color: 'ЦВЕТ',
        word: 'СЛОВО',
        start: 'Начать Тест',
        score: 'Счет',
        gameOver: 'Системная Перегрузка',
        tryAgain: 'Повторить',
        colors: {
          red: 'КРАСНЫЙ',
          blue: 'СИНИЙ',
          green: 'ЗЕЛЕНЫЙ',
          yellow: 'ЖЕЛТЫЙ'
        }
      }
    },
    problem: {
      title: 'Мы проигрываем',
      titleHighlight: 'битву.',
      desc: 'Думскроллинг — это не плохая привычка, это функция. Алгоритмы созданы монетизировать тревогу и собирать ваше внимание по секундам.',
      quantify: 'Оценить ущерб',
      calc: {
        header: 'Цена Внимания',
        daily: 'Экранное время в день',
        monk: 'Монах (0ч)',
        average: 'Среднее (4ч)',
        terminal: 'Онлайн навечно (12ч)',
        yearsLost: 'Потерянные годы жизни',
        wakingLife: 'От бодрствования',
        quote: '"{years} лет — это не просто время. Это непрочитанные книги, невиданные места и несозданные воспоминания."'
      }
    },
    chaos: {
      noise: 'ШУМ',
      title: 'Системная',
      titleHighlight: 'Перегрузка',
      quote: '"Мы тонем в информации, \nно жаждем мудрости."',
      badge: 'Когнитивная цена отвлечения',
      notifications: {
        mom: "Мама: Ты где?",
        slack: "@channel деплой упал 🚨",
        insta: "sarah_j и 42 другим понравилась история",
        mail: "СРОЧНО: Запрос обновления проекта",
        news: "МОЛНИЯ: Рынок продолжает падать...",
        tiktok: "Досмотри до конца, ты не поверишь 😱",
        calendar: "Встреча через 10 минут",
        twitter: "Новый тренд в твоем регионе",
        health: "Пора размяться!",
        bank: "Подозрительная транзакция",
        boss: "Босс: Можем поговорить?",
        snap: "Новое воспоминание",
        verify: "Ваш код подтверждения: 8291",
        linkedin: "Рекрутер просмотрел профиль"
      }
    },
    rewiring: {
      badge: 'Биологическое Решение',
      title: 'Нейропластичность.',
      desc: 'Ваш мозг не зафиксирован. Он пластичен. Каждый раз, когда вы',
      descHighlight: 'сопротивляетесь',
      descEnd: 'отвлечению, вы физически укрепляете нейронные пути фокуса.',
      hint: '// ДВИГАЙ КУРСОРОМ ДЛЯ РОСТА НЕЙРОНОВ'
    },
    clarity: {
      title: 'Глубокая Работа — это',
      titleHighlight: 'Суперсила.',
      desc: 'Когда вы намеренно блокируете шум, вы не просто становитесь продуктивнее. Вы возвращаете автономию. Ясность возвращается. Тревога уходит.',
      stat1: 'Рост Продуктивности',
      stat2: 'Снижение Тревоги',
      guide: {
        sync: 'Синхронизируй дыхание для ясности',
        inhale: 'Вдох',
        hold: 'Задержка',
        exhale: 'Выдох'
      }
    },
    manifesto: {
      title: 'МЫ ВЫБИРАЕМ',
      depth: 'ГЛУБИНУ',
      over: 'ВМЕСТО',
      breadth: 'ШИРИНЫ.',
      p1: 'Мы верим, что сфокусированная жизнь — это хорошая жизнь. В мире, кричащем о внимании, тишина — это высшая роскошь.',
      p2: 'Мы отказываемся быть продуктом. Мы выбираем быть творцами, мыслителями и хозяевами своего разума.'
    },
    resilience: {
      badge: 'Проверка Устойчивости Фокуса',
      focusBroken: 'ФОКУС СБИТ',
      resistNoise: 'СОПРОТИВЛЯЙСЯ ШУМУ',
      holdToFocus: 'ДЕРЖИ ФОКУС',
      instructionHold: 'Нажми и держи',
      instructionKeep: 'Не отпускай',
      start: 'СТАРТ',
      successTitle: 'Нейронный путь укреплен.',
      successDesc: 'Вы успешно подавили импульс переключить задачу. Это механизм глубокого фокуса.',
      distractions: ["СМОТРИ СЮДА", "НОВОЕ СООБЩЕНИЕ", "ТРЕНДЫ", "ВИРУСНОЕ", "НЕ ПРОПУСТИ", "СРОЧНО", "СКИДКИ", "ОБНОВИ", "УВЕДОМЛЕНИЕ", "ЛАЙК", "КОММЕНТ"]
    },
    action: {
      badge: 'Интерактивная Сессия',
      title: 'Начни Сессию',
      desc: 'Определи отвлечение. Назови его. Победи его.',
      footer: 'Создано для Цифрового Благополучия.',
      resources: 'Ресурсы',
      tools: 'Инструменты',
      privacy: 'Приватность',
      latency: 'Задержка',
      science: 'Наука',
      calculator: 'Калькулятор'
    },
    coach: {
      placeholder: "Что вас отвлекает?",
      loading: "Анализ...",
      strategy: "Твоя Стратегия Фокуса",
      action: "Действие Прямо Сейчас",
      newTopic: "Новая Тема",
      lockIn: "В Поток (25м)",
      footer: "Персональный ИИ Коуч • Powered by Gemini"
    },
    timer: {
      currentFocus: "Текущий Фокус",
      endSession: "Завершить",
      soundscape: "Звуковая сцена",
      deepWork: "Режим Deep Work",
      sounds: {
        brown: "Коричневый Шум",
        rain: "Ливень",
        waves: "Океан",
        zen: "Глубокий дзен",
        none: "Тишина"
      }
    },
    progress: {
      level: "Нейронный уровень",
      exp: "Опыт",
      unlocked: "Разблокировано",
      achievements: "Достижения",
      exercises: "Упражнений выполнено",
      sounds: "Звуки",
      themes: "Темы"
    },
    poisons: {
      title: "Цифровые яды",
      subtitle: "Темные паттерны, созданные для эксплуатации твоей биологии.",
      infinite: "Бесконечный скролл",
      infiniteDesc: "Убирает естественные точки остановки, чтобы ты листал вечно.",
      variable: "Переменная награда",
      variableDesc: "Эффект игрового автомата. Ты проверяешь снова и снова, надеясь найти что-то стоящее.",
      fomo: "Инженерия FOMO",
      fomoDesc: "Создание искусственной срочности для активации социальной тревоги."
    }
  }
};