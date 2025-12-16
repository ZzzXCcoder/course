import { MockSkillService } from "../services/SkillService";
import type { ISkill } from "../models/ISkill";

const skillService = new MockSkillService();

const skillsList: HTMLElement|null = document.getElementById("skills-list");

if (!skillsList) {
    throw new Error("Контейнер навыков не найден");
}

function renderSkills(skills: readonly ISkill[]) {
    if (skillsList){
        skillsList.innerHTML = "";

        for (const skill of skills) {
            const li :HTMLElement = document.createElement("li");
            li.className = "base-section__right-container__list__item";

            li.innerHTML = `
          <h3 class="base-section__right-container__list__item__h3">
            <span>•</span> ${skill.title}
          </h3>
        `;

            skillsList.appendChild(li);
        }
    }

}

async function loadSkills() {
    const skills = await skillService.getSkills();
    renderSkills(skills);
}

loadSkills();
