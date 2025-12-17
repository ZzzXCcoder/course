import type {ISkill} from "../models/ISkill.ts";

export interface ISkillService {
    getSkills(): Promise<readonly ISkill[]>;
}
