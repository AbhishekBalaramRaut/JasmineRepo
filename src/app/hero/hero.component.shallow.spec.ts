import { TestBed } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import {NO_ERRORS_SCHEMA } from "@angular/core";
import {By } from "@angular/platform-browser";
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

describe(' HeroComponent (shallow tests)',() =>{
    let fixture;

    @Component({
        template: ''
      })
      class DummyComponent {
      }

    beforeEach(() => {
        TestBed.configureTestingModule({

            imports: [
                CommonModule,
                RouterTestingModule.withRoutes([
                 { path: 'detail/:hero.id', component: DummyComponent }
                ])
              ],
            declarations : [HeroComponent, DummyComponent],
         //   schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroComponent);
    });

    it('should have the correct hero',() => {
        fixture.componentInstance.hero = {id :1 ,name:'SuperDude',strength:3};

        expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
    });

    it('should render the hero name in an anchor tag',() => {
        fixture.componentInstance.hero = {id :1 ,name:'SuperDude',strength:3};
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('SuperDude');
        console.log('after 1st expect');
      //  expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    });

});