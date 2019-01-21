import { Component, OnInit } from '@angular/core';
import { Project } from './model/project';
import { ProjectService } from './core/project.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  projects: Array<Project>;

  constructor(private _projectService: ProjectService) { }

  ngOnInit() {
    this._projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }
}
