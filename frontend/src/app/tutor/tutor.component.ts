import { Component, OnInit } from '@angular/core';
import { SubjectCourseMap } from '../models/subjectcoursemap';
import { TutorService } from '../services/tutor/tutor.service';
import { Course } from '../models/subjectcoursemap';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss']
})
export class TutorComponent implements OnInit {

  public subjectCourseMap: SubjectCourseMap[];
  mentorAvailability = new Array<MentorAvailability>();
  selectedRow: number;


  constructor(private service: TutorService) { }

  ngOnInit() {
    this.getAllSubjects();
    const mentor = new MentorAvailability();
    this.mentorAvailability.push(mentor);
    this.selectedRow = 0;

  }

  getAllSubjects() {
    this.service.getAllSubjects().subscribe(data => {
      this.subjectCourseMap = data.subjects;
      console.log(this.subjectCourseMap);
    });


  }

  onSubjectChange() {
    console.log('subject change triggered');
    this.mentorAvailability[this.selectedRow].courseList = this.mentorAvailability[this.selectedRow].selectedSubject.courses;
    console.log(this.mentorAvailability[this.selectedRow].courseList);
    this.mentorAvailability[this.selectedRow].selectedCourse = undefined;

  }

  onAddBtnClick() {
    console.log('add btn triggered');
    const mentor = new MentorAvailability();
    this.mentorAvailability.push(mentor);
    console.log(this.mentorAvailability);
  }

  onDeleteBtnClick() {
    console.log('del btn triggered');
    if (this.mentorAvailability.length > 1) {
      this.mentorAvailability.splice(this.selectedRow);
    }
  }

  onRowClick(index: number) {
    console.log('row click triggered');
    // debugger
    this.selectedRow = index;
    console.log(this.selectedRow);
  }

}

export class MentorAvailability {
  selectedCourse: Course;
  selectedSubject: SubjectCourseMap;
  courseList: Course[];
  date: string;
  public MentorAvailability() {
  }
}
