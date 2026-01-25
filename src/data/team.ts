import { TeamStructure } from "../types";
import { AMBASSADORS } from "./index";

const getMember = (name: string) =>
  AMBASSADORS.find((a) => a.name.includes(name))!;

export const TEAM_STRUCTURE: TeamStructure = {
  overallLeader: getMember("Oloviddin"),
  deputyLeaders: [
    getMember("Husnida"),
    getMember("Gulzoda"),
    getMember("Munisa"),
  ],
  departments: [
    {
      name: "Presentation",
      leader: getMember("Iroda"),
      members: [],
    },
    {
      name: "Marketing & Partnership",
      leader: getMember("Bobur"),
      members: [
        getMember("Ruxshona"),
        getMember("Ibrat"),
        getMember("Muhammadamin"),
      ],
    },
    {
      name: "Event Managers",
      leader: getMember("Ibrat"),
      members: [
        getMember("Doniyor"),
        getMember("Yulduz"),
        getMember("Feruzbek"),
        getMember("Jahongir"),
        getMember("S. Muhammadmin"),
        getMember("Iroda"),
        getMember("Rasul"),
        getMember("Zeboxon"),
        getMember("Gulzoda"),
        getMember("Husnida"),
      ],
    },
    {
      name: "Website (IT) Team",
      leader: getMember("Bobur"),
      members: [
        getMember("Doniyor"),
        getMember("Bexruz"),
        getMember("Jahongir"),
      ],
    },
    {
      name: "Media Team",
      leader: getMember("Muhammadamin"),
      members: [
        getMember("Shaxruza"),
        getMember("Munisa"),
        getMember("Afruza"),
        getMember("Sardor"),
        getMember("Mavluda"),
      ],
    },
    {
      name: "Operations & System",
      leader: getMember("Xanifa"),
      members: [getMember("Sardorbek")],
    },
  ],
};
