import "./Style.css";
export const menuItems = [
  {
    title: "Начална страница",
    url: "/home",
  },
  {
    title: "Събития",
    url: "/events",
  },
  {
    title: "Профил",
    url: "/profile",
    submenu: [
      {
        title: "Запазени билети",
        url: "yourTickets",
      },
      {
        title: "Лични данни",
        url: "personalDetails",
      },

      {
        title: "Регистрация",
        url: "registration",
      },
      {
        title: "Влез в профил",
        url: "login",
      },
      {
        title: "Излизане от профил",
        url: "personalDetails",
      },
    ],
  },
];
