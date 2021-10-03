import Home from "./Scenes/Home";
import Lobby from "./Scenes/Lobby";
import Room from "./Scenes/Room";
import Mappers from "./Scenes/Games/Mappers";

const routes = [
  {
    path: "/lobby",
    component: Lobby,
    label: "HomePage",
    keywords: "home",
    description: "page d'accueil",
    exact: true,
  },
  {
    path: "/room",
    component: Room,
    label: "Room",
    keywords: "room",
    description: "page de room",
    exact: true,
  },
  {
    path: "/mappers",
    component: Mappers,
    label: "Mappers",
    keywords: "mappers",
    description: "page de jeu Mappers",
    exact: true,
  },
  // {
  //   path: "/roguedefenser",
  //   component: RogueDefenser,
  //   label: "RogueDefenser",
  //   keywords: "roguedefenser",
  //   description: "page de jeu RogueDefenser",
  //   exact: true,
  // },
  // {
  //   path: "/simonisyou",
  //   component: SimonIsYou,
  //   label: "SimonIsYou",
  //   keywords: "simonisyou",
  //   description: "page de jeu SimonIsYou",
  //   exact: true,
  // },
  {
    path: "/",
    component: Home,
    label: "HomePage",
    keywords: "home",
    description: "page d'accueil",
    exact: true,
  },
  {
    path: "/404",
    component: Home,
    error404: true,
    label: "404Page",
    keywords: "404",
    description: "page 404",
    menuDisplay: false,
  },
];

export default routes;
