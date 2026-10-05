import { Component, inject } from '@angular/core';
import { NavComponent } from './layout/nav/nav.component';
import { HeroComponent } from './sections/hero/hero.component';
import { StatStripComponent } from './sections/stat-strip/stat-strip.component';
import { AboutComponent } from './sections/about/about.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { EducationComponent } from './sections/education/education.component';
import { ContactComponent } from './sections/contact/contact.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ThemeService } from './core/theme.service';

@Component({
  selector: 'app-root',
  imports: [
    NavComponent,
    HeroComponent,
    StatStripComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Instantiated here so the theme is applied as soon as the app boots.
  private theme = inject(ThemeService);
}
