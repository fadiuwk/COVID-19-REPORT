import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    //hide navbar onscroll down and show navbar onscroll up
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        $('nav').css('top' , '0')
      } else {
        $('nav').css('top' , '-72px')
      }
      prevScrollpos = currentScrollPos;

      // When the user scrolls down 20px from the top of the document, show the button
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        $('#goTop').css('opacity', '1')
      } else {
        $('#goTop').css('opacity', '0')
      }
    }
  }

}
