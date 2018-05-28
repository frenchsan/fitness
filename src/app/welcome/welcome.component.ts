import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params  } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  private var1: string;
  ngOnInit() {

    this.route.queryParams.subscribe((params: Params) => {

      this.var1 = params['var1'];
      console.log(this.var1);
    });

  }

}
