import type {ISkillService} from "./ISkillService.ts";
import type {ISkill} from "../models/ISkill.ts";

export class MockSkillService implements ISkillService {
    async getSkills(): Promise<readonly ISkill[]> {
        return Promise.resolve([
            { id: 1, title: "Уверенный пользователь ПК" },
            { id: 2, title: "Уверенный пользователь телефона" },
            { id: 3, title: "Крутой работник" },
            { id: 4, title: "Добряк" },
            { id: 5, title: "Молодец" },
            { id: 6, title: "Angular" },
        ]);
    }
}
