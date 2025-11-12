interface WeekDay {
  name: string;
  done: boolean;
}

interface Task {
  title: string;
  id: number;
  weekDays: WeekDay[];
}

export const tasks: Task[] = [
  {
    title: "Курс 1-2 часа",
    id: 1,
    weekDays: [
      {
        name: "Пн",
        done: false,
      },
      {
        name: "Вт",
        done: false,
      },
      {
        name: "Ср",
        done: false,
      },
      {
        name: "Чт",
        done: false,
      },
      {
        name: "Пт",
        done: false,
      },
      {
        name: "Сб",
        done: false,
      },
      {
        name: "Вс",
        done: false,
      },
    ],
  },
  {
    title: "Проект 2-4 часа",
    id: 2,
    weekDays: [
      {
        name: "Пн",
        done: false,
      },
      {
        name: "Вт",
        done: false,
      },
      {
        name: "Ср",
        done: false,
      },
      {
        name: "Чт",
        done: false,
      },
      {
        name: "Пт",
        done: false,
      },
      {
        name: "Сб",
        done: false,
      },
      {
        name: "Вс",
        done: false,
      },
    ],
  },
  {
    title: "Codewars 1 час",
    id: 3,
    weekDays: [
      {
        name: "Пн",
        done: false,
      },
      {
        name: "Вт",
        done: false,
      },
      {
        name: "Ср",
        done: false,
      },
      {
        name: "Чт",
        done: false,
      },
      {
        name: "Пт",
        done: false,
      },
      {
        name: "Сб",
        done: false,
      },
      {
        name: "Вс",
        done: false,
      },
    ],
  },
  {
    title: "Задачи 1 час",
    id: 4,
    weekDays: [
      {
        name: "Пн",
        done: false,
      },
      {
        name: "Вт",
        done: false,
      },
      {
        name: "Ср",
        done: false,
      },
      {
        name: "Чт",
        done: false,
      },
      {
        name: "Пт",
        done: false,
      },
      {
        name: "Сб",
        done: false,
      },
      {
        name: "Вс",
        done: false,
      },
    ],
  },
  {
    title: "Статьи 30 минут",
    id: 5,
    weekDays: [
      {
        name: "Пн",
        done: false,
      },
      {
        name: "Вт",
        done: false,
      },
      {
        name: "Ср",
        done: false,
      },
      {
        name: "Чт",
        done: false,
      },
      {
        name: "Пт",
        done: false,
      },
      {
        name: "Сб",
        done: false,
      },
      {
        name: "Вс",
        done: false,
      },
    ],
  },
];
